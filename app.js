document.addEventListener('DOMContentLoaded', async () => {
  // Global Drawer Toggle Handling Engine
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

  // Dynamic Content Loading Framework - LOOKING FOR data.json
  const container = document.getElementById('episodeContainer');
  if (container) {
    // Fail-safe payload to render instantly if data.json fetch has network blockades or server lags
    const failSafeData = {
      "show": "Hazbin Hotel",
      "rating": "⭐ 7.7 / 10 System",
      "years": "2024–Present",
      "classification": "TV-MA Classification",
      "avgRuntime": "24m Avg Time",
      "genres": "Musical Dark Comedy",
      "description": "In Hell, Charlie Morningstar, the princess of Hell, pursues her seemingly impossible goal of rehabilitating demons to peacefully reduce overpopulation in her kingdom. She opens a hotel in hopes that patients will \"check out\" into Heaven.",
      "seasons": [
        {
          "tabLabel": "Specials",
          "episodes": [
            { "id": 1, "title": "That's Entertainment (Pilot)", "runtime": "31m", "desc": "Charlie Morningstar introduces her ambitious project to the public through a chaotic live television broadcast." },
            { "id": 2, "title": "Addict (Music Video Special)", "runtime": "5m", "desc": "A deeper look into Angel Dust and Cherri Bomb's turbulent lives under Valentino's rule." },
            { "id": 3, "title": "Look My Way (Music Video Feature)", "runtime": "4m", "desc": "An emotional musical showcase exploring devotion and ties impacting key residents." }
          ]
        },
        {
          "tabLabel": "Season 1",
          "episodes": [
            { "id": 1, "title": "Overture", "runtime": "25m", "desc": "Charlie pitches her project to heaven, running into aggressive bureaucratic red tape." },
            { "id": 2, "title": "Radio Killed the Video Star", "runtime": "24m", "desc": "Alastor protects the hotel from Vox and the modern media empire of the Vees." },
            { "id": 3, "title": "Scrambled Eggs", "runtime": "24m", "desc": "Trust exercises cause chaos while Sir Pentious tries to infiltrate the hotel with Egg Boiz." },
            { "id": 4, "title": "Masquerade", "runtime": "24m", "desc": "Angel Dust struggles with his toxic double life as an adult media star under Valentino's contract." },
            { "id": 5, "title": "Dad Beat Dad", "runtime": "25m", "desc": "Charlie struggles to connect with her eccentric father, King Lucifer, for an urgent meeting." },
            { "id": 6, "title": "Welcome to Heaven", "runtime": "27m", "desc": "Charlie and Vaggie travel directly to the pearly gates of Heaven to present their case." },
            { "id": 7, "title": "Hello Rosie", "runtime": "25m", "desc": "With the fast-approaching deadline, Charlie travels to Cannibal Town to bargain for an army." },
            { "id": 8, "title": "The Show Must Go On", "runtime": "29m", "desc": "An all-out war erupts at the hotel gates as Adam and his angelic legion clash with the residents." }
          ]
        },
        {
          "tabLabel": "Season 2",
          "episodes": [
            { "id": 1, "title": "New Pentious", "runtime": "28m", "desc": "Sir Pentious adjusts to his unexpected new reality in Heaven, navigating social hierarchies." },
            { "id": 2, "title": "Storyteller", "runtime": "28m", "desc": "Secrets of Lilith's mysterious absence and past bargains begin to unravel across the grid." },
            { "id": 3, "title": "Hazbin Hotel: Behind Closed Doors", "runtime": "28m", "desc": "The hotel faces new structural challenges and disputes as counseling tests the limits." },
            { "id": 4, "title": "It's A Deal", "runtime": "29m", "desc": "Alastor's tight-lipped bargains come back into play, shifting alliances among overlords." },
            { "id": 5, "title": "Silenced", "runtime": "28m", "desc": "An unexpected radio silence falls over Hell's media grid, triggering widespread paranoia." },
            { "id": 6, "title": "Scream Rain", "runtime": "28m", "desc": "Tensions boil over into an all-out storm inside the Pride Ring as internal arguments hit peaks." },
            { "id": 7, "title": "Weapon of Mass Distraction", "runtime": "29m", "desc": "The team scrambles to build defensive perimeters ahead of counter-offensives." },
            { "id": 8, "title": "Curtain Call", "runtime": "38m", "desc": "The thrilling conclusion bringing massive consequences to both realms as a stand is taken." }
          ]
        }
      ]
    };

    let dataset = failSafeData;

    try {
      // REQUIREMENT: Target 'data.json' exactly
      const response = await fetch('data.json');
      if (response.ok) {
        dataset = await response.json();
        console.log("Successfully connected to live data.json datastore file tree.");
      } else {
        console.warn(`data.json returned status code ${response.status}. Using script backup.`);
      }
    } catch (err) {
      print("Network mapping blocked. Activating integrated fail-safe data engine array: ", err);
    }

    // Populate metadata views safely
    document.getElementById('showTitle').innerText = dataset.show || "Hazbin Hotel";
    document.getElementById('summaryText').innerText = dataset.description || "";

    const badgesRow = document.getElementById('badgesRow');
    if (badgesRow) {
      badgesRow.innerHTML = '';
      const flags = [dataset.rating, dataset.years, dataset.classification, dataset.avgRuntime, dataset.genres].filter(Boolean);
      flags.forEach((text, index) => {
        const span = document.createElement('span');
        span.className = 'badge' + (index === 0 ? ' highlight' : '');
        span.innerText = text;
        badgesRow.appendChild(span);
      });
    }

    // Render navigation hooks for season selections
    const tabNav = document.getElementById('tabNav');
    if (tabNav && dataset.seasons) {
      tabNav.innerHTML = '';
      dataset.seasons.forEach((season, idx) => {
        const btn = document.createElement('button');
        btn.className = 'tab-link' + (idx === 1 ? ' active' : ''); // Default active is Season 1
        btn.innerText = season.tabLabel;
        btn.addEventListener('click', () => {
          document.querySelectorAll('.tab-link').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          renderEpisodes(season);
        });
        tabNav.appendChild(btn);
      });

      // Initialize primary viewport display (Season 1)
      renderEpisodes(dataset.seasons[1] || dataset.seasons[0]);
    }

    function renderEpisodes(season) {
      container.innerHTML = '';
      if (!season || !season.episodes) return;
      
      season.episodes.forEach(ep => {
        const row = document.createElement('div');
        row.className = 'episode-row';
        row.innerHTML = `
          <div class="thumb-box"></div>
          <span class="episode-number">${ep.id}</span>
          <div class="episode-details">
            <h3>${ep.title}</h3>
            <p>${ep.desc || ""}</p>
          </div>
          <span class="runtime-badge">${ep.runtime}</span>
        `;
        container.appendChild(row);
      });
    }
  }
});