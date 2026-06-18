document.addEventListener('DOMContentLoaded', async () => {
  try {
    // CRITICAL: Point directly to movies.json since that is what exists in your GitHub repo!
    const response = await fetch('movies.json');
    if (!response.ok) {
        throw new Error(`HTTP network error! Status response tracking code: ${response.status}`);
    }
    const data = await response.json();

    // Populate profile components dynamically
    document.getElementById('showTitle').innerText = data.show || "Hazbin Hotel";
    document.getElementById('summaryText').innerText = data.description || "";

    // Generate standard layout classification metrics
    const badgesRow = document.getElementById('badgesRow');
    if (badgesRow) {
      badgesRow.innerHTML = '';
      const items = [data.rating, data.years, data.classification, data.avgRuntime, data.genres].filter(Boolean);
      items.forEach((text, index) => {
        const span = document.createElement('span');
        span.className = 'badge' + (index === 0 ? ' highlight' : '');
        span.innerText = text;
        badgesRow.appendChild(span);
      });
    }

    // Populate Tab Handles
    const tabNav = document.getElementById('tabNav');
    const container = document.getElementById('episodeContainer');

    if (tabNav && container && data.seasons) {
      tabNav.innerHTML = '';
      data.seasons.forEach((season, idx) => {
        const btn = document.createElement('button');
        // Default highlight to Season 1 (index 1)
        btn.className = 'tab-link' + (idx === 1 ? ' active' : '');
        btn.innerText = season.tabLabel;
        btn.addEventListener('click', () => {
          document.querySelectorAll('.tab-link').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          renderSeason(season);
        });
        tabNav.appendChild(btn);
      });

      // Default load view to Season 1 if present
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

    console.log("System initialization sequence complete: movies.json successfully loaded.");

  } catch (err) {
    console.error("Critical error mapping profile elements from remote source file tree:", err);
    // Display fallback tracking message safely inside container window
    const container = document.getElementById('episodeContainer');
    if (container) {
        container.innerHTML = `<div style="color:#ef4444; padding:20px; text-align:center;">Failed to resolve dynamic item index arrays. Verify movies.json parameters.</div>`;
    }
  }

  // INTERACTIVE NAVIGATION INTERFACE LOGIC
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
});