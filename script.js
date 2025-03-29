document.addEventListener('DOMContentLoaded', function() {
  // مدیریت نویگیشن
  const navItems = document.querySelectorAll('.nav-item');
  const tabs = document.querySelectorAll('.tab');
  
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      
      // حذف کلاس active از همه
      navItems.forEach(nav => nav.classList.remove('active'));
      tabs.forEach(tab => tab.classList.remove('active'));
      
      // اضافه کردن کلاس active به آیتم انتخاب شده
      this.classList.add('active');
      const targetTab = this.getAttribute('href');
      document.querySelector(targetTab).classList.add('active');
    });
  });

  // تایمر معکوس مسابقات با تاریخ‌های مشخص
  function updateCountdowns() {
    const matchCards = document.querySelectorAll('.match-card');
    const now = new Date();
    
    // تاریخ‌های مسابقات
    const matchDates = [
      new Date('2024-03-29T21:30:00'), // بازی اول ۲۹ مارس ساعت ۲۱:۳۰
      new Date('2024-03-29T22:45:00')  // بازی دوم ۲۹ مارس ساعت ۲۲:۴۵
    ];
    
    matchCards.forEach((card, index) => {
      const matchTime = matchDates[index];
      const countdownElement = card.querySelector('.countdown');
      const statusElement = card.querySelector('.match-status');
      
      const diff = matchTime - now;
      
      if (diff > 0) {
        // قبل از شروع بازی
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);
        
        countdownElement.textContent = 
          `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        
        statusElement.textContent = 'شروع نشده';
        statusElement.className = 'match-status';
      } 
      else if (diff > -3600000) {
        // در حال پخش (1 ساعت اول)
        countdownElement.textContent = 'در حال پخش';
        statusElement.textContent = 'در حال پخش';
        statusElement.className = 'match-status live';
      } 
      else {
        // بازی تمام شده
        countdownElement.textContent = 'پایان یافته';
        statusElement.textContent = 'پایان یافته';
        statusElement.className = 'match-status';
      }
    });
  }

  // مدیریت دکمه‌های جزئیات
  document.querySelectorAll('.match-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const details = this.parentElement.querySelector('.match-details');
      details.classList.toggle('expanded');
    });
  });

  // مدیریت حالت دارک
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;
  
  // بررسی ذخیره شده در localStorage
  if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i><span>حالت روز</span>';
  }
  
  darkModeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
      this.innerHTML = '<i class="fas fa-sun"></i><span>حالت روز</span>';
    } else {
      localStorage.setItem('darkMode', 'disabled');
      this.innerHTML = '<i class="fas fa-moon"></i><span>حالت شب</span>';
    }
  });

  // به‌روزرسانی اولیه و هر ثانیه
  updateCountdowns();
  setInterval(updateCountdowns, 1000);
});