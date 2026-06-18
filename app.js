document.addEventListener('DOMContentLoaded', async () => {
  // 1. Core Drawer Menu Slider Handling Logic (Shared across pages)
  const openMenuBtn = document.getElementById('openMenuBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const sideMenu = document.getElementById('sideMenu');
  const drawerOverlay = document.getElementById('drawerOverlay');

  if (openMenuBtn && sideMenu && drawerOverlay) {
    openMenuBtn.addEventListener('click', () => {
      sideMenu.classList.add('open');
      drawerOverlay.classList.add('visible');
    });
  }

  const closeDrawer = () => {
    if (sideMenu) sideMenu.classList.remove('open');
    if (drawerOverlay) drawerOverlay.classList.remove('visible');
  };

  if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  // 2. Conditional Catalog Generator Engine (Runs safely if components exist on movie-detail.html)
  const isCatalogPage = document.getElementById('episodeContainer');
  if (isCatalogPage) {
    try {
      const response = await fetch('movies.json');
      if (!response.ok) throw new Error(`HTTP data load tracking fault: ${response.status}`);
      const data = await response.json();

      document.getElementById('showTitle').innerText = data.show || "Hazbin Hotel";
      document.getElementById('summaryText').innerText = data.description || "";

      const badgesRow = document.getElementById('badgesRow');
      if (badgesRow) {
        badgesRow.innerHTML = '';
        const items = [data.rating, data.years, data.classification, data.avgRuntime, data.genres].filter(Boolean);
        items.forEach((text, idx) => {
          const span = document.createElement('span');
          span.className = 'badge' + (idx === 0 ? ' highlight' : '');
          span.innerText = text;
          badgesRow.appendChild(span);
        });
      }

      const tabNav = document.getElementById('tabNav');
      const container = document.getElementById('episodeContainer');

      if (tabNav && container && data.seasons) {
        tabNav.innerHTML = '';
        data.seasons.forEach((season, idx) => {
          const btn = document.createElement('button');
          btn.className = 'tab-link' + (idx === 1 ? ' active' : '');
          btn.innerText = season.tabLabel;
          btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-link').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderSeason(season);
          });
          tabNav.appendChild(btn);
        });
        renderSeason(data.seasons[1] || data.seasons[0]);
      }

      function renderSeason(season) {
        container.innerHTML = '';
        if (!season || !season.episodes) return;
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
    } catch (err) {
      console.error("Framework matrix data pull fault:", err);
    }
  }
});