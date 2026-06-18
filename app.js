document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('data.json');
    const data = await response.json();

    // Populate Page Meta Data
    document.getElementById('showTitle').innerText = data.show;
    document.getElementById('summaryText').innerText = data.description;

    // Populate Badge Elements Safely
    const badgesRow = document.getElementById('badgesRow');
    const items = [data.rating, data.years, data.classification, data.avgRuntime, data.genres];
    items.forEach((text, index) => {
      const span = document.createElement('span');
      span.className = 'badge' + (index === 0 ? ' highlight' : '');
      span.innerText = text;
      badgesRow.appendChild(span);
    });

    // Handle Tabs and Content Render
    const tabNav = document.getElementById('tabNav');
    const container = document.getElementById('episodeContainer');

    data.seasons.forEach((season, idx) => {
      const btn = document.createElement('button');
      btn.className = 'tab-link' + (idx === 1 ? ' active' : ''); // Default active Season 1
      btn.innerText = season.tabLabel;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-link').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderSeason(season);
      });
      tabNav.appendChild(btn);
    });

    function renderSeason(season) {
      container.innerHTML = '';
      season.episodes.forEach(ep => {
        const row = document.createElement('div');
        row.className = 'episode-row';
        row.innerHTML = `
          <div class="thumb-box">Ep ${ep.id} Thumb</div>
          <span class="episode-number">${ep.id}</span>
          <div class="episode-details">
            <h3>${ep.title}</h3>
            <p>${ep.desc}</p>
          </div>
          <span class="runtime-badge">${ep.runtime}</span>
        `;
        container.appendChild(row);
      });
    }

    // Default view initialization
    renderSeason(data.seasons[1]);

  } catch (err) {
    console.error("Error reading or loading dataset framework initialization:", err);
  }

  // Drawer Toggle Control Modules
  const openMenuBtn = document.getElementById('openMenuBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const sideMenu = document.getElementById('sideMenu');
  const drawerOverlay = document.getElementById('drawerOverlay');

  openMenuBtn.addEventListener('click', () => {
    sideMenu.classList.add('open');
    drawerOverlay.classList.add('visible');
  });

  const closeDrawer = () => {
    sideMenu.classList.remove('open');
    drawerOverlay.classList.remove('visible');
  };

  closeMenuBtn.addEventListener('click', closeDrawer);
  drawerOverlay.addEventListener('click', closeDrawer);
});