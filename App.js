// ==========================================
// ⚙️ APP CONFIGURATION (पासवर्ड और डेटा सेटिंग्स)
// ==========================================
const ENABLE_PASSWORD = true;      // इसे false करने पर पासवर्ड नहीं मांगेगा
const APP_PASSWORD = "1234";       // आपका पासवर्ड
const JSON_URL = 'https://raw.githubusercontent.com/Pinkukumar12/Pmtuber/main/Video.json';

// ==========================================
// 🎨 CSS STYLES (इंजेक्शन्स)
// ==========================================
const appStyles = `
    :root {
        --bg-color: #f0f2f5; --card-bg: #ffffff; --text-main: #333; --text-muted: #666;
        --primary: #4a90e2; --secondary: #2c3e50; --accent: #ff4757; --success: #2ed573;
        --border: #e1e8ed; --skeleton: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    }
    [data-theme="dark"] {
        --bg-color: #121212; --card-bg: #1e1e1e; --text-main: #f5f6fa; --text-muted: #a4b0be;
        --primary: #3742fa; --secondary: #2f3542; --border: #2f3640;
        --skeleton: linear-gradient(90deg, #222 25%, #333 50%, #222 75%);
    }
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Tahoma, sans-serif; }
    body { background: var(--bg-color); color: var(--text-main); transition: 0.3s; min-height: 100vh; display: flex; flex-direction: column;}
    
    /* LOGIN SCREEN */
    #login-screen { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: var(--bg-color); display: flex; justify-content: center; align-items: center; z-index: 9999; }
    .login-card { background: var(--card-bg); padding: 40px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center; width: 90%; max-width: 400px; border: 1px solid var(--border); }
    .login-card h2 { color: var(--primary); margin-bottom: 20px; font-size: 1.8rem; }
    .login-card input { width: 100%; padding: 12px; margin-bottom: 15px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg-color); color: var(--text-main); font-size: 1rem; outline: none; text-align: center; }
    .login-card button { width: 100%; padding: 12px; background: var(--primary); color: white; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer; font-weight: bold; transition: 0.3s; }
    .error-msg { color: var(--accent); margin-bottom: 15px; font-size: 0.9rem; display: none; }

    /* HEADER & MAIN UI */
    #main-app { display: none; flex-direction: column; flex: 1; }
    header { background: var(--secondary); color: white; padding: 15px 20px; position: sticky; top: 0; z-index: 100; box-shadow: 0 4px 10px rgba(0,0,0,0.2); }
    .header-content { display: flex; justify-content: space-between; align-items: center; max-width: 1400px; margin: 0 auto; }
    .progress-container { width: 100%; background: rgba(255,255,255,0.2); height: 6px; margin-top: 10px; border-radius: 5px; overflow: hidden; }
    .progress-bar { height: 100%; background: var(--success); width: 0%; transition: 0.5s; }
    
    .toolbar { max-width: 1400px; margin: 20px auto; padding: 0 20px; display: flex; gap: 15px; flex-wrap: wrap; justify-content: space-between; width: 100%;}
    .search-box { flex: 1; min-width: 250px; position: relative; }
    .search-box input { width: 100%; padding: 12px 20px 12px 40px; border-radius: 25px; border: 1px solid var(--border); background: var(--card-bg); color: var(--text-main); outline: none; }
    .search-box i { position: absolute; left: 15px; top: 14px; color: var(--text-muted); }
    .controls { display: flex; gap: 10px; }
    .btn-icon { background: var(--card-bg); border: 1px solid var(--border); color: var(--text-main); padding: 10px 15px; border-radius: 8px; cursor: pointer; transition: 0.2s; }
    select { padding: 10px; border-radius: 8px; border: 1px solid var(--border); background: var(--card-bg); color: var(--text-main); outline: none; }

    .tabs { max-width: 1400px; margin: 0 auto 20px; padding: 0 20px; display: flex; overflow-x: auto; gap: 10px; scrollbar-width: none; width: 100%;}
    .tabs::-webkit-scrollbar { display: none; }
    .tab-btn { white-space: nowrap; padding: 8px 20px; border-radius: 20px; border: 1px solid var(--primary); background: transparent; color: var(--primary); cursor: pointer; font-weight: bold; }
    .tab-btn.active { background: var(--primary); color: white; }

    main { max-width: 1400px; margin: 0 auto; padding: 0 20px; width: 100%; flex: 1; margin-bottom: 30px;}
    .video-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
    .video-grid.list-view { grid-template-columns: 1fr; }
    .video-grid.list-view .card { flex-direction: row; align-items: center; }
    
    .card { background: var(--card-bg); border-radius: 12px; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); display: flex; flex-direction: column; position: relative; border: 1px solid var(--border); }
    .card-icon { font-size: 3rem; color: var(--primary); margin-bottom: 15px; text-align: center; }
    .card-title { font-size: 1.05rem; font-weight: 600; margin-bottom: 10px; line-height: 1.4; flex: 1; }
    .card-meta { font-size: 0.8rem; color: var(--text-muted); margin-bottom: 15px; display: flex; justify-content: space-between; }
    
    .card-actions { display: flex; gap: 10px; width: 100%; }
    .play-btn { flex: 3; background: var(--primary); color: white; border: none; padding: 10px; border-radius: 8px; cursor: pointer; font-weight: bold; display: flex; justify-content: center; gap: 8px;}
    .play-btn.yt { background: #ff0000; }
    .down-btn { flex: 1; background: var(--success); color: white; border: none; padding: 10px; border-radius: 8px; cursor: pointer; font-weight: bold; display: flex; justify-content: center;}

    .fav-btn { position: absolute; top: 15px; right: 15px; color: #ccc; font-size: 1.2rem; cursor: pointer; }
    .fav-btn.active { color: var(--accent); }
    .badge { position: absolute; top: 15px; left: 15px; background: var(--success); color: white; padding: 2px 8px; font-size: 0.7rem; border-radius: 10px; font-weight: bold; }
    .progress-tiny { height: 4px; background: #eee; width: 100%; margin-bottom: 10px; border-radius: 2px; }
    .progress-tiny-fill { height: 100%; background: var(--primary); width: 0%; border-radius: 2px;}

    /* PLAYER MODAL */
    .modal { display: none; position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.95); z-index: 1000; flex-direction: column; overflow-y: auto; }
    .modal-header { display: flex; justify-content: space-between; padding: 15px 20px; color: white; background: #000; align-items: center; }
    .close-btn { color: white; font-size: 2rem; cursor: pointer; }
    .player-container { width: 100%; max-width: 1000px; margin: 0 auto; position: relative; background: #000; }
    .video-wrapper { position: relative; padding-bottom: 56.25%; height: 0; background: #000; overflow: hidden; }
    video, iframe { position: absolute; top:0; left:0; width:100%; height:100%; }

    .custom-controls { position: absolute; bottom: 0; left: 0; width: 100%; background: linear-gradient(transparent, rgba(0,0,0,0.8)); padding: 20px 15px 10px; display: flex; flex-direction: column; gap: 10px; opacity: 0; transition: opacity 0.3s; color: white;}
    .video-wrapper:hover .custom-controls { opacity: 1; }
    .time-bar { width: 100%; height: 5px; background: rgba(255,255,255,0.3); cursor: pointer; border-radius: 3px; position: relative; }
    .time-fill { height: 100%; background: var(--accent); width: 0%; border-radius: 3px; pointer-events: none; }
    .control-btns { display: flex; justify-content: space-between; align-items: center; }
    .ctrl-btn { background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer; margin-right: 15px;}
    .settings-menu { position: absolute; bottom: 50px; right: 10px; background: rgba(20,20,20,0.95); border-radius: 8px; padding: 10px; display: none; flex-direction: column; gap: 10px; font-size: 0.9rem; z-index: 20;}
    .settings-menu select { background: #333; color: white; border: none; padding: 5px; width: 100%; border-radius: 4px;}

    .player-bottom { max-width: 1000px; margin: 20px auto; padding: 0 20px; color: var(--text-main); width: 100%; }
    .tools-bar { display: flex; gap: 10px; flex-wrap:wrap; margin-bottom: 20px; border-bottom: 1px solid var(--border); padding-bottom: 15px;}
    .tool-btn { padding: 8px 15px; background: var(--card-bg); border: 1px solid var(--primary); color: var(--primary); border-radius: 5px; cursor: pointer; font-weight: bold;}
    
    footer { background: var(--secondary); color: white; text-align: center; padding: 15px; margin-top: auto; }
    @media(max-width: 768px) { .toolbar { flex-direction: column; align-items: stretch; } }
`;

// ==========================================
// 🏗️ HTML STRUCTURE (इंजेक्शन्स)
// ==========================================
const appHTML = `
    <!-- 1. LOGIN SCREEN -->
    <div id="login-screen">
        <div class="login-card">
            <h2><i class="fas fa-lock"></i> Secure Login</h2>
            <div id="pwd-error" class="error-msg">Incorrect Password!</div>
            <input type="password" id="pwd-input" placeholder="Enter Password">
            <button onclick="verifyPassword()">Login to App <i class="fas fa-arrow-right"></i></button>
        </div>
    </div>

    <!-- 2. MAIN APP -->
    <div id="main-app">
        <header>
            <div class="header-content">
                <h2><i class="fas fa-graduation-cap"></i> Prime Learning</h2>
                <div><span id="watched-count">0</span> / <span id="total-count">0</span> Completed</div>
            </div>
            <div class="progress-container"><div class="progress-bar" id="main-progress"></div></div>
        </header>

        <div class="toolbar">
            <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" id="search-input" placeholder="Search for classes...">
            </div>
            <div class="controls">
                <select id="sort-select" onchange="applyFilters()">
                    <option value="oldest">Class 1 to End</option>
                    <option value="newest">Newest First</option>
                </select>
                <button class="btn-icon" onclick="toggleView()"><i id="view-icon" class="fas fa-list"></i></button>
                <button class="btn-icon" onclick="toggleTheme()"><i id="theme-icon" class="fas fa-moon"></i></button>
            </div>
        </div>

        <div class="tabs" id="tabs-container"></div>

        <main>
            <div class="video-grid" id="video-grid">
                <div style="text-align:center; grid-column:1/-1; padding:50px;"><i class="fas fa-spinner fa-spin fa-3x"></i><br>Loading Data...</div>
            </div>
            <div style="text-align: center; margin-top: 30px;">
                <button id="load-more-btn" class="tool-btn" style="display:none;" onclick="loadMore()">Load More Classes</button>
            </div>
        </main>
        <footer><p>&copy; 2024 Premium Railway Batch</p></footer>
    </div>

    <!-- 3. PLAYER MODAL -->
    <div class="modal" id="videoModal">
        <div class="modal-header">
            <h3 id="modal-title">Video Title</h3>
            <i class="fas fa-times close-btn" onclick="closePlayer()"></i>
        </div>
        
        <div class="player-container" id="player-container">
            <div class="video-wrapper" id="video-wrapper">
                <video id="hls-player" playsinline></video>
                <iframe id="yt-player" allowfullscreen style="display: none;"></iframe>
                
                <div class="custom-controls" id="custom-controls">
                    <div class="time-bar" id="time-bar" onclick="seekVideo(event)"><div class="time-fill" id="time-fill"></div></div>
                    <div class="control-btns">
                        <div>
                            <button class="ctrl-btn" onclick="togglePlay()"><i id="play-icon" class="fas fa-play"></i></button>
                            <button class="ctrl-btn" onclick="skipTime(-10)"><i class="fas fa-undo"></i></button>
                            <button class="ctrl-btn" onclick="skipTime(10)"><i class="fas fa-redo"></i></button>
                            <span style="font-size:0.9rem;"><span id="current-time">00:00</span> / <span id="duration-time">00:00</span></span>
                        </div>
                        <div>
                            <button class="ctrl-btn" onclick="toggleSettings()"><i class="fas fa-cog"></i></button>
                            <button class="ctrl-btn" onclick="toggleFullScreen()"><i class="fas fa-expand"></i></button>
                        </div>
                    </div>
                </div>

                <div class="settings-menu" id="settings-menu">
                    <label style="color:#aaa;">Quality</label>
                    <select id="quality-selector" onchange="changeQuality(this.value)"><option value="-1">Auto</option></select>
                    <label style="color:#aaa;">Speed</label>
                    <select onchange="document.getElementById('hls-player').playbackRate = this.value">
                        <option value="0.75">0.75x</option><option value="1" selected>Normal</option><option value="1.5">1.5x</option><option value="2">2.0x</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="player-bottom">
            <div class="tools-bar">
                <button class="tool-btn" onclick="saveTimestamp()"><i class="fas fa-bookmark"></i> Save Note</button>
                <button class="tool-btn" onclick="markAsWatched()"><i class="fas fa-check-circle"></i> Mark Completed</button>
                <button class="tool-btn" style="background:var(--success); color:white;" onclick="downloadCurrentVideo()"><i class="fas fa-download"></i> Download Video</button>
            </div>
            <div id="timestamps-list" style="display:none; background:var(--card-bg); padding:15px; border-radius:8px; border:1px solid var(--border);">
                <h4>My Notes:</h4><div id="ts-container" style="margin-top:10px;"></div>
            </div>
        </div>
    </div>
`;

// Inject Styles & HTML to DOM
const styleTag = document.createElement('style');
styleTag.innerHTML = appStyles;
document.head.appendChild(styleTag);
document.body.innerHTML = appHTML;

// ==========================================
// 🚀 APP LOGIC & VARIABLES
// ==========================================
let allVideos = [];
let filteredVideos = [];
let currentSubject = 'All';
let currentPlayingVideo = null;
let currentPage = 1;
const itemsPerPage = 20;
let hls = null;

const HISTORY_KEY = 'eduHistory';
const FAV_KEY = 'eduFavs';
const NOTES_KEY = 'eduNotes';

// Init
if(localStorage.getItem('theme') === 'dark') {
    document.body.setAttribute('data-theme', 'dark'); document.getElementById('theme-icon').className = 'fas fa-sun';
}

if (ENABLE_PASSWORD) {
    document.getElementById('login-screen').style.display = 'flex';
} else {
    startApp();
}

document.getElementById('pwd-input')?.addEventListener('keypress', e => { if (e.key === 'Enter') verifyPassword(); });

function verifyPassword() {
    if (document.getElementById('pwd-input').value === APP_PASSWORD) startApp();
    else document.getElementById('pwd-error').style.display = 'block';
}

function startApp() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('main-app').style.display = 'flex';
    fetchData(); 
}

// ==========================================
// 📥 DATA FETCH & RENDER
// ==========================================
async function fetchData() {
    try {
        const response = await fetch(JSON_URL);
        const data = await response.json();
        Object.keys(data.subjects).forEach(subject => {
            data.subjects[subject].forEach(vid => {
                allVideos.push({ ...vid, subject: subject, uid: `${subject.replace(/\s+/g, '_')}_${vid.id}` });
            });
        });
        document.getElementById('total-count').innerText = allVideos.length;
        setupTabs(Object.keys(data.subjects));
        applyFilters();
        updateOverallProgress();
    } catch (e) {
        document.getElementById('video-grid').innerHTML = '<p style="color:red; text-align:center;">Failed to load data. Link error.</p>';
    }
}

function setupTabs(subjects) {
    const container = document.getElementById('tabs-container');
    container.innerHTML = `<button class="tab-btn active" onclick="setSubject('All', this)">All</button>
                           <button class="tab-btn" onclick="setSubject('Favs', this)"><i class="fas fa-heart"></i> My Favourites</button>`;
    subjects.forEach(sub => container.innerHTML += `<button class="tab-btn" onclick="setSubject('${sub}', this)">${sub}</button>`);
}

function setSubject(sub, btn) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active'); currentSubject = sub; currentPage = 1; applyFilters();
}

document.getElementById('search-input').addEventListener('input', () => { currentPage = 1; applyFilters(); });

function applyFilters() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const sort = document.getElementById('sort-select').value;
    const favs = JSON.parse(localStorage.getItem(FAV_KEY) || '[]');

    filteredVideos = allVideos.filter(vid => {
        const matchSub = currentSubject === 'All' ? true : (currentSubject === 'Favs' ? favs.includes(vid.uid) : vid.subject === currentSubject);
        const matchSearch = vid.title.toLowerCase().includes(query);
        return matchSub && matchSearch;
    });
    if (sort === 'newest') filteredVideos.reverse();
    document.getElementById('video-grid').innerHTML = ''; 
    renderGrid();
}

function renderGrid() {
    const grid = document.getElementById('video-grid');
    const start = (currentPage - 1) * itemsPerPage;
    const paginated = filteredVideos.slice(start, start + itemsPerPage);
    const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '{}');
    const favs = JSON.parse(localStorage.getItem(FAV_KEY) || '[]');

    paginated.forEach(vid => {
        const isYt = vid.url.includes('youtube') || vid.url.includes('youtu.be');
        const isFav = favs.includes(vid.uid);
        const vidHistory = history[vid.uid] || { time: 0, duration: 1, watched: false };
        const percent = Math.min(100, (vidHistory.time / vidHistory.duration) * 100);
        
        let badgeHTML = vidHistory.watched ? `<span class="badge">✅ Watched</span>` : (percent > 0 ? `<span class="badge" style="background:var(--primary)">▶ ${Math.floor(percent)}%</span>` : '');

        grid.innerHTML += `
            <div class="card">
                ${badgeHTML}
                <i class="fas fa-heart fav-btn ${isFav ? 'active' : ''}" onclick="toggleFav('${vid.uid}', event)"></i>
                <div class="card-icon"><i class="${isYt ? 'fab fa-youtube' : 'fas fa-play-circle'}" style="${isYt ? 'color:red;' : ''}"></i></div>
                <h3 class="card-title">${vid.title}</h3>
                <div class="card-meta"><span>${vid.subject}</span></div>
                <div class="progress-tiny"><div class="progress-tiny-fill" style="width:${percent}%"></div></div>
                <div class="card-actions">
                    <button class="play-btn ${isYt ? 'yt' : ''}" onclick="openPlayer('${vid.uid}')"><i class="fas fa-play"></i> Watch</button>
                    <button class="down-btn" onclick="downloadFile('${vid.url}')" title="Download"><i class="fas fa-download"></i></button>
                </div>
            </div>`;
    });
    document.getElementById('load-more-btn').style.display = start + itemsPerPage < filteredVideos.length ? 'inline-block' : 'none';
}

function loadMore() { currentPage++; renderGrid(); }

// ==========================================
// 💾 DOWNLOAD FEATURE (Offline)
// ==========================================
function downloadFile(url) {
    // Alert the user on how m3u8 download works
    if(url.includes('.m3u8')) {
        alert("📥 M3U8 Video Detected!\n\nTo download this video offline, please copy the URL from the next tab and paste it into an app like '1DM' or 'VLC Player'.");
    }
    // Open URL in new tab for downloading/playing
    window.open(url, '_blank');
}

function downloadCurrentVideo() {
    if(currentPlayingVideo) {
        downloadFile(currentPlayingVideo.url);
    }
}

// ==========================================
// 🎥 SMART PLAYER LOGIC
// ==========================================
function openPlayer(uid) {
    currentPlayingVideo = allVideos.find(v => v.uid === uid);
    document.getElementById('videoModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
    document.getElementById('modal-title').innerText = currentPlayingVideo.title;
    loadTimestamps();

    const isYt = currentPlayingVideo.url.includes('youtube');
    const vPlayer = document.getElementById('hls-player');
    const ytPlayer = document.getElementById('yt-player');
    const customCtrl = document.getElementById('custom-controls');

    vPlayer.style.display = 'none'; ytPlayer.style.display = 'none'; customCtrl.style.display = 'none';
    let resumeTime = JSON.parse(localStorage.getItem(HISTORY_KEY) || '{}')[currentPlayingVideo.uid]?.time || 0;

    if (isYt) {
        ytPlayer.style.display = 'block';
        let vidId = currentPlayingVideo.url.split('v=')[1] || currentPlayingVideo.url.split('youtu.be/')[1];
        if(vidId && vidId.includes('&')) vidId = vidId.split('&')[0];
        ytPlayer.src = `https://www.youtube.com/embed/${vidId}?autoplay=1&start=${Math.floor(resumeTime)}`;
    } else {
        vPlayer.style.display = 'block'; customCtrl.style.display = 'flex';
        initSmartPlayer(currentPlayingVideo.url, resumeTime);
    }
}

const vid = document.getElementById('hls-player');
function initSmartPlayer(url, resumeTime) {
    if (hls) hls.destroy();
    if (Hls.isSupported()) {
        hls = new Hls(); hls.loadSource(url); hls.attachMedia(vid);
        hls.on(Hls.Events.MANIFEST_PARSED, function (e, data) {
            vid.currentTime = resumeTime; vid.play();
            document.getElementById('play-icon').className = 'fas fa-pause';
            const qSelect = document.getElementById('quality-selector');
            qSelect.innerHTML = '<option value="-1">Auto</option>';
            data.levels.forEach((level, i) => qSelect.innerHTML += `<option value="${i}">${level.height}p</option>`);
        });
    } else if (vid.canPlayType('application/vnd.apple.mpegurl')) {
        vid.src = url; vid.currentTime = resumeTime; vid.play();
    }
    vid.ontimeupdate = () => {
        document.getElementById('time-fill').style.width = `${(vid.currentTime / vid.duration) * 100}%`;
        document.getElementById('current-time').innerText = formatTime(vid.currentTime);
        document.getElementById('duration-time').innerText = formatTime(vid.duration);
        saveProgress(currentPlayingVideo.uid, vid.currentTime, vid.duration);
    };
}

// Player Controls
function togglePlay() { if(vid.paused) { vid.play(); document.getElementById('play-icon').className = 'fas fa-pause'; } else { vid.pause(); document.getElementById('play-icon').className = 'fas fa-play'; } }
function skipTime(sec) { vid.currentTime += sec; }
function seekVideo(e) { const r = document.getElementById('time-bar').getBoundingClientRect(); vid.currentTime = ((e.clientX - r.left) / r.width) * vid.duration; }
function changeQuality(val) { if(hls) hls.currentLevel = parseInt(val); }
function toggleSettings() { const m = document.getElementById('settings-menu'); m.style.display = m.style.display === 'flex' ? 'none' : 'flex'; }
function toggleFullScreen() { const w = document.getElementById('video-wrapper'); if (!document.fullscreenElement) w.requestFullscreen(); else document.exitFullscreen(); }
function formatTime(s) { if(isNaN(s)) return "00:00"; let m = Math.floor(s/60); s = Math.floor(s%60); return (m<10?'0':'')+m + ":" + (s<10?'0':'')+s; }

function closePlayer() {
    document.getElementById('videoModal').style.display = 'none'; document.body.style.overflow = 'auto';
    document.getElementById('yt-player').src = ''; vid.pause(); vid.src = '';
    if (hls) { hls.destroy(); hls = null; } applyFilters();
}

// ==========================================
// ⚙️ HELPERS & STORAGE
// ==========================================
function toggleFav(uid, e) {
    e.stopPropagation(); let favs = JSON.parse(localStorage.getItem(FAV_KEY) || '[]');
    if (favs.includes(uid)) favs = favs.filter(id => id !== uid); else favs.push(uid);
    localStorage.setItem(FAV_KEY, JSON.stringify(favs)); applyFilters(); 
}

function saveProgress(uid, time, duration) {
    let history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '{}');
    let watched = history[uid]?.watched || (time / duration > 0.9); 
    history[uid] = { time, duration, watched };
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history)); updateOverallProgress();
}

function markAsWatched() {
    if(!currentPlayingVideo) return;
    let history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '{}');
    history[currentPlayingVideo.uid] = { ...history[currentPlayingVideo.uid], watched: true };
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history)); updateOverallProgress();
    alert("Class marked as completed! ✅");
}

function updateOverallProgress() {
    let history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '{}');
    let count = Object.values(history).filter(h => h.watched).length;
    document.getElementById('watched-count').innerText = count;
    if(allVideos.length > 0) document.getElementById('main-progress').style.width = `${(count / allVideos.length) * 100}%`;
}

function saveTimestamp() {
    if(!currentPlayingVideo || currentPlayingVideo.url.includes('youtube')) return alert('Notes only in Smart Player!');
    const note = prompt("Enter note for " + formatTime(vid.currentTime));
    if(note) {
        let notes = JSON.parse(localStorage.getItem(NOTES_KEY) || '{}');
        if(!notes[currentPlayingVideo.uid]) notes[currentPlayingVideo.uid] = [];
        notes[currentPlayingVideo.uid].push({ time: vid.currentTime, note });
        localStorage.setItem(NOTES_KEY, JSON.stringify(notes)); loadTimestamps();
    }
}

function loadTimestamps() {
    let notes = JSON.parse(localStorage.getItem(NOTES_KEY) || '{}')[currentPlayingVideo?.uid] || [];
    const cont = document.getElementById('timestamps-list');
    if(notes.length > 0) {
        cont.style.display = 'block';
        document.getElementById('ts-container').innerHTML = notes.map(n => `<span class="ts-item" onclick="vid.currentTime=${n.time}; vid.play()" style="color:var(--primary); cursor:pointer; text-decoration:underline;">⏱ ${formatTime(n.time)} - ${n.note}</span><br>`).join('');
    } else { cont.style.display = 'none'; }
}

function toggleView() { const g = document.getElementById('video-grid'); g.classList.toggle('list-view'); document.getElementById('view-icon').className = g.classList.contains('list-view') ? 'fas fa-th-large' : 'fas fa-list'; }
function toggleTheme() {
    const b = document.body; const i = document.getElementById('theme-icon');
    if(b.getAttribute('data-theme') === 'dark') { b.removeAttribute('data-theme'); localStorage.setItem('theme', 'light'); i.className = 'fas fa-moon'; } 
    else { b.setAttribute('data-theme', 'dark'); localStorage.setItem('theme', 'dark'); i.className = 'fas fa-sun'; }
}
