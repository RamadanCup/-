
document.querySelectorAll('.bottom-nav button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(tab => {
      tab.classList.remove('active');
    });
    document.querySelectorAll('.bottom-nav button').forEach(b => {
      b.classList.remove('active');
    });
    document.getElementById(btn.dataset.tab).classList.add('active');
    btn.classList.add('active');
  });
});
