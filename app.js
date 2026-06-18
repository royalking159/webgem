document.addEventListener('DOMContentLoaded', async () => {
  // Hardcoded backup data so the lists will load IMMEDIATELY even if fetch fails!
  const backupData = {
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
          { "id": 1, "title": "That's Entertainment (Pilot)", "runtime": "31m", "desc": "Charlie Morningstar introduces her ambitious project to the public through a chaotic live television broadcast." }
        ]
      },
      {
        "tabLabel": "Season 1",
        "episodes": [
          { "id": 1, "title": "Overture", "runtime": "25m", "desc": "Charlie pitches her project to heaven, running into aggressive bureaucratic red tape." },
          { "id": 2, "title": "Radio Killed the Video Star", "runtime": "24m", "desc": "Alastor protects the hotel from Vox and the modern media empire of the Vees." },
          { "id": 3, "title": "Scrambled Eggs", "runtime": "24m", "desc": "Trust exercises cause chaos among the crew while Sir Pentious tries to infiltrate the hotel." },
          { "id": 4, "title": "Masquerade", "runtime": "24m", "desc": "Angel Dust struggles with his toxic double life as an adult media star under Valentino's contract." },
          { "id": 5, "title": "Dad Beat Dad", "runtime": "25m", "desc": "Charlie struggles to connect with her eccentric father, King Lucifer." },
          { "id": 6, "title": "Welcome to Heaven", "runtime": "27m", "desc": "Charlie and Vaggie travel directly to the pearly gates of Heaven to present their case." },
          { "id": 7, "title": "Hello Rosie", "runtime": "25m", "desc": "With the fast-approaching deadline, Charlie travels to Cannibal Town to bargain for an army." },
          { "id": 8, "title": "The Show Must Go On", "runtime": "29m", "desc": "An all-out war erupts at the hotel gates as Adam and his angelic exorcist legion clash with the residents." }
        ]
      },
      {
        "tabLabel": "Season 2",
        "episodes": [
          { "id": 1, "title": "New Pentious", "runtime": "28m", "desc": "Sir Pentious adjusts to his unexpected new reality in Heaven, navigating celestial social hierarchies." }
        ]
      }
    ]
  };

  let dataset = backupData;

  // Attempt to load from JSON file if it exists, otherwise fall back to backup data cleanly
  try {
    const response = await fetch('movies.json');
    if (response.ok) {
      dataset = await response.json();
      console.log("Loaded directly from movies.json");
    } else {
      const altRes = await fetch('data.json');
      if (altRes.ok) {
        dataset = await altRes.json();
        console.log("Loaded directly from data.json");
      }
    }
  } catch (err) {
    console.warn("Fetch failed, using built-in backup datasets instead:", err);
  }

  // Populate UI elements
  document.getElementById('showTitle').innerText = dataset.show;
  document.getElementById('summaryText').innerText = dataset.description;

  const badgesRow = document.getElementById('badgesRow');
  badgesRow.innerHTML = '';
  const metaItems = [dataset.rating, dataset.years, dataset.classification, dataset.avgRuntime, dataset.genres];
  metaItems.forEach((text, i) => {
    const span = document.createElement('span');
    span.className = 'badge' + (i === 0 ? ' highlight' : '');
    span.innerText = text;
    badgesRow.appendChild(span);
  });

  const tabNav = document.getElementById('tabNav');
  const container = document.getElementById('episodeContainer');

  tabNav.innerHTML = '';
  dataset.seasons.forEach((season, idx) => {
    const btn = document.createElement('button');
    btn.className = 'tab-link' + (idx === 1 ? ' active' : '');
    btn.innerText = season.tabLabel;
    btn.onclick = () => {
      document.querySelectorAll('.tab-link').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderEpisodes(season);
    };
    tabNav.appendChild(btn);
  });

  function renderEpisodes(season) {
    container.innerHTML = '';
    season.episodes.forEach(ep => {
      const row = document.createElement('div');
      row.className = 'episode-row';
      row.innerHTML = `
        <div class="thumb-box"></div>
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

  // Default to render Season 1 on start
  renderEpisodes(dataset.seasons[1]);

  // Drawer slider triggers
  const openMenuBtn = document.getElementById('openMenuBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const sideMenu = document.getElementById('sideMenu');
  const drawerOverlay = document.getElementById('drawerOverlay');

  openMenuBtn.onclick = () => {
    sideMenu.classList.add('open');
    drawerOverlay.classList.add('visible');
  };
  
  const closeDrawer = () => {
    sideMenu.classList.remove('open');
    drawerOverlay.classList.remove('visible');
  };

  closeMenuBtn.onclick = closeDrawer;
  drawerOverlay.onclick = closeDrawer;
});