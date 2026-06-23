document.addEventListener('DOMContentLoaded', async () => {
  // Navigation Drawer Management Module Links Hook Triggers
  const openMenuBtn = document.getElementById('openMenuBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const sideMenu = document.getElementById('sideMenu');
  const drawerOverlay = document.getElementById('drawerOverlay');

  if (openMenuBtn) {
    openMenuBtn.onclick = () => {
      sideMenu.classList.add('open');
      drawerOverlay.classList.add('visible');
    };
  }
  const hideDrawer = () => {
    if(sideMenu) sideMenu.classList.remove('open');
    if(drawerOverlay) drawerOverlay.classList.remove('visible');
  };
  if (closeMenuBtn) closeMenuBtn.onclick = hideDrawer;
  if (drawerOverlay) drawerOverlay.onclick = hideDrawer;

  // Realtime Interactivity Binding Block
  const listContainer = document.getElementById('episodeContainer');
  if (!listContainer) return; // Stop executing if we aren't on movie-detail sub-page

  try {
    const fetchResponse = await fetch('data.json');
    if (!fetchResponse.ok) throw new Error("Data cluster source file tree reference broken.");
    const matrixData = await fetchResponse.json();

    // UI Interactive Update Driver Engine
    function updateActiveDisplay(title, description, rating, runtime, classification, genres, imageFile) {
      document.getElementById('showTitle').innerText = title;
      document.getElementById('summaryText').innerText = description;
      
      // Update poster view dynamically depending on season classification triggers if requested
      const posterImg = document.getElementById('posterImage');
      if(posterImg && imageFile) {
        posterImg.src = imageFile;
      }
      
      const badgeTrack = document.getElementById('badgesRow');
      badgeTrack.innerHTML = '';
      
      const assetTags = [rating, matrixData.years, classification, runtime, genres].filter(Boolean);
      assetTags.forEach((tag, idx) => {
        const span = document.createElement('span');
        span.className = 'badge' + (idx === 0 ? ' highlight' : '');
        span.innerText = tag;
        badgeTrack.appendChild(span);
      });
    }

    // Dynamic Tab Navigation Builder Engine
    const tabNav = document.getElementById('tabNav');
    tabNav.innerHTML = '';
    
    matrixData.seasons.forEach((season, index) => {
      const tabButton = document.createElement('button');
      tabButton.className = 'tab-link' + (index === 1 ? ' active' : ''); // Default highlight Season 1
      tabButton.innerText = season.tabLabel;
      
      tabButton.onclick = () => {
        document.querySelectorAll('.tab-link').forEach(btn => btn.classList.remove('active'));
        tabButton.classList.add('active');
        buildListLayout(season);
      };
      tabNav.appendChild(tabButton);
    });

    // Content Catalog Index List Item Rows Builder Loop
    function buildListLayout(season) {
      listContainer.innerHTML = '';
      if(!season || !season.episodes) return;

      season.episodes.forEach((episode, idx) => {
        const row = document.createElement('div');
        row.className = 'episode-row';
        if (idx === 0) row.classList.add('selected'); // Highlight default row asset node
        
        row.innerHTML = `
          <div class="thumb-placeholder"></div>
          <span class="episode-number">${episode.id}</span>
          <span class="ep-title-text">${episode.title}</span>
          <span class="ep-time-text">${episode.runtime}</span>
        `;
        
        row.onclick = () => {
          document.querySelectorAll('.episode-row').forEach(r => r.classList.remove('selected'));
          row.classList.add('selected');
          
          // Execute dynamic text updates on click triggers safely mapping parameters
          updateActiveDisplay(
            episode.title, 
            episode.desc, 
            episode.rating || matrixData.rating, 
            episode.runtime, 
            matrixData.classification, 
            episode.genres || matrixData.genres,
            season.seasonPoster || matrixData.mainThumbnail
          );
        };
        
        listContainer.appendChild(row);
      });
      
      // Auto-load first episode specs inside the track whenever switching tab selection rules
      if(season.episodes.length > 0) {
        const initialEp = season.episodes[0];
        updateActiveDisplay(
          initialEp.title, 
          initialEp.desc, 
          initialEp.rating || matrixData.rating, 
          initialEp.runtime, 
          matrixData.classification, 
          initialEp.genres || matrixData.genres,
          season.seasonPoster || matrixData.mainThumbnail
        );
      }
    }

    // Initialize Default State View Track (Season 1, Ep 1)
    if (matrixData.seasons[1]) {
      buildListLayout(matrixData.seasons[1]);
    }

  } catch (error) {
    console.error("Critical dashboard interactivity parsing intercept crash:", error);
  }
});