
// تابع شمارش معکوس برای هر بازی
function countdown() {
  const countdownElements = document.querySelectorAll('.countdown');
  countdownElements.forEach(element => {
    const matchTime = element.getAttribute('data-time'); // گرفتن زمان بازی
    const countDownDate = new Date(matchTime).getTime(); // تبدیل به timestamp

    const interval = setInterval(function () {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      // محاسبه روزها، ساعت‌ها، دقیقه‌ها و ثانیه‌ها
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // نمایش شماره معکوس
      element.innerHTML = `${hours} : ${minutes} : ${seconds}`;

      // زمانی که شمارش معکوس به پایان می‌رسد
      if (distance < 0) {
        clearInterval(interval);
        element.innerHTML = "پایان بازی";
      }
    }, 1000);
  });
}

// صدا زدن تابع شمارش معکوس برای همه بازی‌ها
document.addEventListener("DOMContentLoaded", function () {
  countdown(); // برای هر بازی شمارش معکوس شروع شود
});
