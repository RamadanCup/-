document.addEventListener('DOMContentLoaded', function() {
  // مدیریت نویگیشن
  const navItems = document.querySelectorAll('.nav-item');
  const tabs = document.querySelectorAll('.tab');
  
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      
      navItems.forEach(nav => nav.classList.remove('active'));
      tabs.forEach(tab => tab.classList.remove('active'));
      
      this.classList.add('active');
      const targetTab = this.getAttribute('href');
      document.querySelector(targetTab).classList.add('active');
    });
  });

  // تایمر معکوس مسابقات ۲۰۲۵
  function updateCountdowns() {
    const matchCards = document.querySelectorAll('.match-card');
    const now = new Date();
    
    // تنظیم دقیق زمان‌ها برای ۲۹ مارس ۲۰۲۵
    const matchDates = [
      new Date(2025, 2, 30, 21, 30, 0), // بازی اول: ۲۹ مارس ۲۰۲۵ ساعت ۲۱:۳۰

    ];
    
    matchCards.forEach((card, index) => {
      const matchTime = matchDates[index];
      const countdownElement = card.querySelector('.countdown');
      const statusElement = card.querySelector('.match-status');
      const diff = matchTime - now;
      
      if (diff > 0) {
        // قبل از شروع بازی
        const totalSeconds = Math.floor(diff / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        countdownElement.textContent = 
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        statusElement.textContent = 'شروع نشده';
        statusElement.className = 'match-status';
      } 
      else if (diff > -5400000) { // 90 دقیقه پس از شروع (مدت بازی فوتسال)
        // در حال پخش
        const timePassed = Math.abs(diff);
        const minutesPassed = Math.floor(timePassed / (1000 * 60));
        const secondsPassed = Math.floor((timePassed % (1000 * 60)) / 1000);
        
        countdownElement.textContent = 
          `${minutesPassed.toString().padStart(2, '0')}:${secondsPassed.toString().padStart(2, '0')}`;
        statusElement.textContent = 'در حال پخش';
        statusElement.className = 'match-status live';
      } 
      else {
        // بازی تمام شده
        countdownElement.textContent = '۰۰:۰۰:۰۰';
        statusElement.textContent = 'پایان یافته';
        statusElement.className = 'match-status ended';
      }
    });
  }

  // سایر توابع (مدیریت دکمه‌ها و حالت دارک)
  document.querySelectorAll('.match-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const details = this.parentElement.querySelector('.match-details');
      details.classList.toggle('expanded');
    });
  });

  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;
  
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

  // شروع تایمر
  updateCountdowns();
  setInterval(updateCountdowns, 1000);
});