document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-link');
  const views = document.querySelectorAll('.season-view');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      views.forEach(v => v.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');
    });
  });

  const openMenuBtn = document.getElementById('openMenuBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const sideMenu = document.getElementById('sideMenu');
  const drawerOverlay = document.getElementById('drawerOverlay');

  function openDrawer() {
    sideMenu.classList.add('open');
    drawerOverlay.classList.add('visible');
  }

  function closeDrawer() {
    sideMenu.classList.remove('open');
    drawerOverlay.classList.remove('visible');
  }

  openMenuBtn.addEventListener('click', openDrawer);
  closeMenuBtn.addEventListener('click', closeDrawer);
  drawerOverlay.addEventListener('click', closeDrawer);
});