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

  // دکمه‌های جزئیات: تنها توضیحات کارت مربوطه باز شود
  const detailButtons = document.querySelectorAll('.details-btn');
  detailButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      // ابتدا توضیحات همه کارت‌ها را مخفی می‌کنیم
      document.querySelectorAll('.game-details').forEach(detail => {
        if (detail !== this.nextElementSibling) {
          detail.style.display = "none";
        }
      });
      // سپس توضیحات کارت فعلی را تغییر وضعیت می‌دهیم
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
