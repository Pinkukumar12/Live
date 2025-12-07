 // --- 1. Theme Logic ---
        const themeBtn = document.getElementById('theme-toggle');
        const body = document.body;
        themeBtn.addEventListener('click', () => {
            if(body.classList.contains('dark-theme')) {
                body.classList.replace('dark-theme', 'light-theme');
                themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                body.classList.replace('light-theme', 'dark-theme');
                themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });

        // --- 2. Music Logic ---
        const musicBtn = document.getElementById('music-btn');
        const audio = document.getElementById('bg-music');
        let isPlaying = false;
        musicBtn.addEventListener('click', () => {
            if (!isPlaying) {
                audio.play().catch(e => alert("Interact first!"));
                musicBtn.classList.add('playing');
                musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
                isPlaying = true;
            } else {
                audio.pause();
                musicBtn.classList.remove('playing');
                musicBtn.innerHTML = '<i class="fas fa-music"></i>';
                isPlaying = false;
            }
        });

        // --- 3. Start Button Redirect Logic ---
        const startBtn = document.getElementById('start-btn');
        const statusText = document.getElementById('status-text');
        const btnLabel = document.getElementById('btn-label');
        let isRedirecting = false;

        startBtn.addEventListener('click', () => {
            if (isRedirecting) return; // Prevent double clicks
            isRedirecting = true;
            
            startBtn.classList.add('active-countdown');
            let timeLeft = 10;

            statusText.style.color = "var(--accent-secondary)";
            statusText.innerText = "Initializing...";

            const timer = setInterval(() => {
                btnLabel.innerText = timeLeft + "s";
                statusText.innerText = `Redirecting in ${timeLeft} seconds...`;
                
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    statusText.innerText = "Redirecting...";
                    // REDIRECT TO TOXTOOLS
                    window.location.href = "https://toxtools.com"; 
                }
                timeLeft -= 1;
            }, 1000);
        });

        // --- 4. Modal Logic (About & Contact) ---
        const modalContainer = document.getElementById('modal-container');
        const modalContentDiv = document.getElementById('modal-body-content');

        // Define content for modals
        const modalData = {
            about: `
                <!-- Logo Circle -->
                <div class="profile-circle">
                   <i class="fas fa-user-astronaut"></i>
                </div>
                
                <!-- Title -->
                <div class="tech-title">Bhuakaal Tech</div>
                
                <!-- Credits -->
                <div class="powered-by">Powered by Pinku & Manish</div>
                
                <!-- Description -->
                <p class="text-[var(--text-secondary)] text-sm mb-4 leading-relaxed">
                    We provide premium VPN configurations and free internet tricks. Join our community to stay updated with the latest secure tunneling methods.
                </p>
                
                <!-- Social Media Buttons (Telegram & Instagram) -->
                <div class="social-btns-modal">
                    <a href="#" class="social-btn-m"><i class="fab fa-telegram"></i></a>
                    <a href="#" class="social-btn-m"><i class="fab fa-instagram"></i></a>
                </div>
            `,
            contact: `
                <h2 class="text-2xl font-bold mb-4 text-[var(--accent-primary)] font-[Orbitron]">Contact Us</h2>
                <div class="text-[var(--text-secondary)] text-left space-y-4">
                    <div class="flex items-center gap-3">
                        <i class="fas fa-envelope text-[var(--accent-primary)]"></i>
                        <span>support@nettunnel.com</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <i class="fab fa-telegram text-[var(--accent-primary)]"></i>
                        <span>@BhuakaalSupport</span>
                    </div>
                    <p class="text-xs text-center mt-4 opacity-50">Reply within 24 hours.</p>
                </div>
            `
        };

        function openModal(type) {
            modalContentDiv.innerHTML = modalData[type];
            modalContainer.classList.add('active');
        }

        function closeModal() {
            modalContainer.classList.remove('active');
        }

        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) closeModal();
        });

        // --- 5. Background Animation ---
        const canvas = document.getElementById('hero-background-canvas');
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2;
            }
            draw() {
                ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--accent-primary').trim();
                ctx.globalAlpha = 0.5;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
                ctx.fill();
            }
            update() {
                this.x += this.vx; this.y += this.vy;
                if(this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if(this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
        }

        function initParticles() {
            particles = [];
            for(let i=0; i<40; i++) particles.push(new Particle());
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update(); p.draw();
                particles.forEach(p2 => {
                    const dx = p.x - p2.x; const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    if(dist < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--accent-primary').trim();
                        ctx.globalAlpha = 1 - (dist/100);
                        ctx.lineWidth = 0.3;
                        ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                });
            });
            requestAnimationFrame(animateParticles);
        }
        initParticles();
        animateParticles();
