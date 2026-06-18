
document.addEventListener('DOMContentLoaded', async () => {
    const res = await fetch('data.json');
    const data = await res.json();
    
    // Bind Meta
    document.getElementById('showTitle').innerText = data.show;
    document.getElementById('desc').innerText = data.description;
    
    // Bind Tabs & Episodes
    const tabNav = document.getElementById('tabNav');
    const viewContainer = document.getElementById('episodeViewContainer');
    
    data.seasons.forEach((s, idx) => {
        const btn = document.createElement('button');
        btn.className = 'tab-link' + (idx === 1 ? ' active' : '');
        btn.innerText = s.tabLabel;
        btn.onclick = () => renderEpisodes(s);
        tabNav.appendChild(btn);
    });

    function renderEpisodes(season) {
        viewContainer.innerHTML = season.episodes.map(ep => `
            <div class="episode-row">
                <div class="thumb-box"></div>
                <div><h3>${ep.title}</h3><p>${ep.runtime}</p></div>
            </div>
        `).join('');
    }
    renderEpisodes(data.seasons[1]); // Default S1

    // Drawer Logic
    document.getElementById('openMenuBtn').onclick = () => {
        document.getElementById('sideMenu').classList.add('open');
        document.getElementById('drawerOverlay').classList.add('visible');
    };
    document.getElementById('closeMenuBtn').onclick = () => {
        document.getElementById('sideMenu').classList.remove('open');
        document.getElementById('drawerOverlay').classList.remove('visible');
    };
});