document.addEventListener('DOMContentLoaded', function() {
  // ------------------------------
  // کدهای اولیه (منو، اسکرول نرم، پخش زنده، شمارش معکوس و دکمه بازگشت به بالا)
  // ------------------------------
  
  // اسکرول نرم برای لینک‌های منو
  const navLinks = document.querySelectorAll('nav ul li a');
  const navUl = document.querySelector('nav ul');
  const menuToggle = document.querySelector('.menu-toggle');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      // بستن منو پس از کلیک روی لینک
      navUl.classList.remove('active');
    });
  });

  // منوی همبرگری
  menuToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    navUl.classList.toggle('active');
  });

  // بستن منو در صورت کلیک خارج از آن
  document.addEventListener('click', function(e) {
    if (!navUl.contains(e.target) && !menuToggle.contains(e.target)) {
      navUl.classList.remove('active');
    }
  });

  // بررسی وضعیت پخش زنده
  const liveIframe = document.querySelector('.h_iframe-aparat_embed_frame iframe');
  const liveOverlay = document.querySelector('.live-overlay');
  if (liveIframe && liveIframe.getAttribute('src') === "https://www.aparat.com/embed/live/ramadancup") {
    liveOverlay.innerHTML = '<span class="live-badge">LIVE در حال پخش</span>';
  } else {
    liveOverlay.innerHTML = '<span class="live-notice">پخش زنده در حال حاضر در دسترس نیست</span>';
  }

  // دکمه‌های جزئیات بازی
  const detailButtons = document.querySelectorAll('.details-btn');
  detailButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      // مخفی کردن سایر جزئیات
      document.querySelectorAll('.game-details').forEach(detail => {
        if (detail !== this.nextElementSibling) {
          detail.style.display = "none";
        }
      });
      const details = this.nextElementSibling;
      if (details.style.display === "none" || details.style.display === "") {
        details.style.display = "block";
      } else {
        details.style.display = "none";
      }
    });
  });

  // به‌روز‌رسانی شمارش معکوس
  function updateCountdown() {
    const countdownElements = document.querySelectorAll('.countdown');
    countdownElements.forEach(el => {
      const matchTime = new Date(el.getAttribute('data-matchtime'));
      const now = new Date();
      const diff = matchTime - now;
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        el.textContent = `شروع در: ${days} روز ${hours} ساعت ${minutes} دقیقه ${seconds} ثانیه`;
      } else {
        el.textContent = "شروع شده";
      }
    });
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // دکمه بازگشت به بالا
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTop.style.display = "block";
    } else {
      backToTop.style.display = "none";
    }
  });
  backToTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // ------------------------------
  // کد جدید: اسلاید برنامه مسابقات
  // ------------------------------
  
  const slider = document.querySelector('.game-slider');
  let gameCards = document.querySelectorAll('.game-card');
  const leftBtn = document.querySelector('.left-btn');
  const rightBtn = document.querySelector('.right-btn');
  let currentIndex = 0;
  let cardWidth = 0;
  
  // تابع به‌روز‌رسانی عرض کارت‌ها (با استفاده از getBoundingClientRect)
  function updateCardWidth() {
    if (gameCards.length > 0) {
      cardWidth = gameCards[0].getBoundingClientRect().width + 20; // عرض کارت + فاصله (margin)
      // به‌روز‌رسانی موقعیت اسلاید بر اساس currentIndex
      slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
  }
  
  // تابع حذف بازی‌های شروع‌شده
  function removeExpiredGames() {
    const now = new Date();
    gameCards.forEach(card => {
      const matchTimeStr = card.getAttribute('data-matchtime');
      if (matchTimeStr) {
        const matchTime = new Date(matchTimeStr);
        if (matchTime <= now) {
          card.remove();
          console.log('Removed expired game:', card);
        }
      }
    });
    // به‌روز‌رسانی لیست کارت‌ها پس از حذف
    gameCards = document.querySelectorAll('.game-card');
  }
  
  // اجرای اولیه حذف بازی‌های منقضی و به‌روز‌رسانی عرض کارت‌ها
  removeExpiredGames();
  updateCardWidth();
  
  // به‌روز‌رسانی عرض کارت‌ها هنگام تغییر اندازه پنجره
  window.addEventListener('resize', updateCardWidth);
  
  // حرکت به سمت راست (جهت جلو رفتن)
  rightBtn.addEventListener('click', function() {
    if (currentIndex < gameCards.length - 1) {
      currentIndex++;
      slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
  });
  
  // حرکت به سمت چپ (جهت عقب رفتن)
  leftBtn.addEventListener('click', function() {
    if (currentIndex > 0) {
      currentIndex--;
      slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
  });
});