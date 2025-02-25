document.addEventListener('DOMContentLoaded', function() {
  // اسکرول نرم برای لینک‌های منو
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // منوی همبرگر: نمایش/مخفی کردن منو در موبایل
  const menuToggle = document.querySelector('.menu-toggle');
  const navUl = document.querySelector('nav ul');
  menuToggle.addEventListener('click', function() {
    navUl.classList.toggle('active');
  });

  // بررسی وضعیت پخش زنده:
  // اگر src آیفریم برابر با "https://www.aparat.com/embed/live/EvazCup" باشد، پیام "LIVE در حال پخش" نمایش داده می‌شود
  const liveIframe = document.querySelector('.h_iframe-aparat_embed_frame iframe');
  const liveOverlay = document.querySelector('.live-overlay');
  if (liveIframe && liveIframe.getAttribute('src') === "https://www.aparat.com/embed/live/EvazCup") {
    liveOverlay.innerHTML = '<span class="live-badge">LIVE در حال پخش</span>';
  } else {
    liveOverlay.innerHTML = '<span class="live-notice">پخش زنده در حال حاضر در دسترس نیست</span>';
  }

  // دکمه‌های جزئیات: تنها توضیحات کارت مربوطه باز شود
  const detailButtons = document.querySelectorAll('.details-btn');
  detailButtons.forEach(btn => {
    btn.addEventListener('click', function() {
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

  // تابع به‌روز‌رسانی شمارش معکوس برای هر کارت بازی
  function updateCountdown() {
    const countdownElements = document.querySelectorAll('.countdown');
    countdownElements.forEach(el => {
      const matchTime = new Date(el.getAttribute('data-matchtime'));
      const now = new Date();
      const diff = matchTime - now;
      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        el.textContent = `شروع در: ${hours}ساعت ${minutes}دقیقه ${seconds}ثانیه`;
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
});
