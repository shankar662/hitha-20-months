window.onload = () => {
    createParticles();
    heroSlideshow();
    typingEffect();

    // Kick off the entry cinematic logic
    startNetflixIntro();
};

/* 1. NETFLIX VIDEO INTRO (With Click-to-Start Audio Fix) */
function startNetflixIntro() {
    let sound = document.getElementById("introSound");
    let video = document.getElementById("netflixVideo");
    let overlay = document.getElementById("startOverlay");

    // Ensure the video doesn't run away before she clicks
    if (video) video.pause();

    // Wait for her to click the "Click to Start" screen
    overlay.addEventListener('click', () => {
        
        // Hide the overlay immediately
        overlay.style.display = 'none';

        // Play the video and the da-dum sound perfectly synced!
        if (sound) {
            sound.volume = 1;
            sound.play();
        }
        if (video) {
            video.play();
        }

        // Wait exactly 4.5 seconds, then transition to the loading screen
        setTimeout(() => {
            document.getElementById("introScreen").classList.add("hide");
            startLoadingSequence(); 
        }, 4500); 
    });
}

/* 2. PERCENT LOADER TRACK */
function startLoadingSequence() {
    let loader = document.getElementById("loader");
    loader.style.display = "flex";
    
    let count = 0;
    let loading = document.getElementById("loadingText");

    let interval = setInterval(() => {
        count += Math.floor(Math.random() * 12);

        if (count >= 100) {
            count = 100;
            loading.innerHTML = "Welcome Everyone ❤️";
            clearInterval(interval);

            setTimeout(() => {
                loader.style.display = "none";
            }, 1200);
        } else {
            loading.innerHTML = "Loading Memories... " + count + "%";
        }
    }, 120);
}

/* NAVIGATION SYSTEM */
function enterSite() {
    document.getElementById("profiles").style.display = "none";
    document.getElementById("website").style.display = "block";
    loadPhotos();
    playMusicAuto();
}

function openTimeline() {
    enterSite();
    setTimeout(() => {
        document.querySelector(".timeline").scrollIntoView({behavior: "smooth"});
    }, 600);
}

function openForever() {
    document.getElementById("foreverPage").style.display = "flex";
}

function closeForever() {
    document.getElementById("foreverPage").style.display = "none";
}

/* CORE AUDIO TRACKS */
function playMusicAuto() {
    let song = document.getElementById("music");
    song.volume = 0;
    song.play();
    let fade = 0;
    let interval = setInterval(() => {
        fade += 0.05;
        song.volume = fade;
        if (fade >= 0.8) {
            clearInterval(interval);
        }
    }, 300);
}

function playSong(btn) {
    let song = document.getElementById("music");
    if (song.paused) {
        song.play();
        btn.innerHTML = "Pause Music ⏸️";
    } else {
        song.pause();
        btn.innerHTML = "Play Music 🎵";
    }
}

/* IMAGE GRAPHICS & CAROUSELS */
function heroSlideshow() {
    let hero = document.querySelector(".hero");
    let images = ["photos/2.jpg", "photos/3.jpg", "photos/4.jpg", "photos/5.jpg"];
    let i = 0;

    setInterval(() => {
        hero.style.background = `linear-gradient(to top, black, transparent), url('${images[i]}')`;
        hero.style.backgroundSize = "cover";
        hero.style.backgroundPosition = "center";
        i++;
        if (i >= images.length) { i = 0; }
    }, 4000);
}

function typingEffect() {
    let text = "I Think They Call This Love ❤️";
    let target = document.getElementById("typingText");
    let i = 0;
    setInterval(() => {
        if (i < text.length) {
            target.innerHTML += text.charAt(i);
            i++;
        }
    }, 120);
}

function loadPhotos() {
    let gallery = document.getElementById("gallery");
    gallery.innerHTML = "";
    for (let i = 1; i <= 500; i++) {
        let img = document.createElement("img");
        img.src = "photos/" + i + ".jpg";
        img.onerror = () => img.remove();
        img.onclick = () => { openImage(img.src); };
        gallery.appendChild(img);
    }
}

function openImage(src) {
    let viewer = document.createElement("div");
    viewer.style.position = "fixed";
    viewer.style.top = 0; viewer.style.left = 0; viewer.style.width = "100%"; viewer.style.height = "100vh";
    viewer.style.background = "rgba(0,0,0,.95)";
    viewer.style.display = "flex"; viewer.style.justifyContent = "center"; viewer.style.alignItems = "center";
    viewer.style.zIndex = 999999;
    viewer.innerHTML = `<img src="${src}" style="max-width:90%; max-height:90%; border-radius:15px; box-shadow:0 0 40px rgba(255,255,255,.3);">`;
    viewer.onclick = () => { viewer.remove(); };
    document.body.appendChild(viewer);
}

function createParticles() {
    let particles = document.getElementById("particles");
    for (let i = 0; i < 80; i++) {
        let p = document.createElement("div");
        p.classList.add("particle");
        p.style.left = Math.random() * 100 + "%";
        p.style.animationDuration = 5 + Math.random() * 10 + "s";
        p.style.opacity = Math.random();
        particles.appendChild(p);
    }
}

function showEnding() {
    document.getElementById("website").style.display = "none";
    document.getElementById("ending").style.display = "flex";
}

function spawnHeart(event) {
    let heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.classList.add("floating-heart");
    heart.style.left = (event.clientX - 10) + "px"; 
    heart.style.top = (event.clientY - 10) + "px";
    document.getElementById("hearts-container").appendChild(heart);
    setTimeout(() => { heart.remove(); }, 2000);
}

// ==========================================
// RED GLOW CURSOR TRAIL (Money Heist Style)
// ==========================================
const cursorCanvas = document.createElement('canvas');
cursorCanvas.id = 'cursor-canvas';
document.body.appendChild(cursorCanvas);
const ctx = cursorCanvas.getContext('2d');

function resizeCanvas() {
    cursorCanvas.width = window.innerWidth;
    cursorCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let mouse = { x: -100, y: -100 };
let trail = [];
const TRAIL_LENGTH = 15;
const HEAD_RADIUS = 12;

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function drawCursor() {
    ctx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
    trail.push({ x: mouse.x, y: mouse.y });
    if (trail.length > TRAIL_LENGTH) { trail.shift(); }

    if (trail.length > 0) {
        const head = trail[trail.length - 1];
        const glow = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, HEAD_RADIUS * 2);
        glow.addColorStop(0, 'rgba(192, 0, 26, 0.4)');
        glow.addColorStop(0.5, 'rgba(192, 0, 26, 0.15)');
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(head.x, head.y, HEAD_RADIUS * 2, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        for (let i = 0; i < trail.length - 1; i++) {
            const point = trail[i];
            const opacity = i / trail.length;
            ctx.beginPath();
            ctx.arc(point.x, point.y, HEAD_RADIUS * 0.3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(192, 0, 26, ${opacity * 0.6})`;
            ctx.fill();
        }
    }
    requestAnimationFrame(drawCursor);
}
drawCursor();

// ==========================================
// "H" KEY EASTER EGG UPGRADE (CINEMATIC FADING BRUSH)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const hKeyModal = document.getElementById('h-key-modal');
    const closeHKey = document.getElementById('close-h-key');
    const hKeyContainer = document.querySelector('.h-key-reveal-container');
    const canvas = document.getElementById('scratch-canvas');
    const secretImg = document.getElementById('secret-img');

    if (hKeyModal && closeHKey && hKeyContainer && canvas && secretImg) {
        const brushCtx = canvas.getContext('2d');
        let coverImg = new Image();
        coverImg.src = 'photos/1000.jpg';

        let isHovering = false;
        let mousePos = { x: -100, y: -100 };
        let animationFrameId;

        // Ensure canvas perfectly matches the secret image size
        function initCanvas() {
            canvas.width = secretImg.clientWidth || 500;
            canvas.height = secretImg.clientHeight || 500;
            brushCtx.globalCompositeOperation = 'source-over';
            brushCtx.globalAlpha = 1.0;
            
            // Draw the cover completely solid at first
            if (coverImg.complete) {
                brushCtx.drawImage(coverImg, 0, 0, canvas.width, canvas.height);
            } else {
                coverImg.onload = () => brushCtx.drawImage(coverImg, 0, 0, canvas.width, canvas.height);
            }
            
            // Start the cinematic animation loop
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            animateReveal();
        }

        function animateReveal() {
            // 1. Slowly "Heal" the canvas by drawing the cover image at 5% opacity
            // This causes the revealed areas to smoothly vanish back into darkness!
            brushCtx.globalCompositeOperation = 'source-over';
            brushCtx.globalAlpha = 0.05; 
            brushCtx.drawImage(coverImg, 0, 0, canvas.width, canvas.height);

            // 2. Erase the cover softly where the mouse is moving
            if (isHovering) {
                brushCtx.globalCompositeOperation = 'destination-out';
                brushCtx.globalAlpha = 1.0;

                const radius = 80; // Size of the soft brush
                const gradient = brushCtx.createRadialGradient(
                    mousePos.x, mousePos.y, 0, 
                    mousePos.x, mousePos.y, radius
                );
                
                // Soft gradient edges for a perfect smooth brush stroke
                gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
                gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.5)');
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

                brushCtx.beginPath();
                brushCtx.arc(mousePos.x, mousePos.y, radius, 0, Math.PI * 2);
                brushCtx.fillStyle = gradient;
                brushCtx.fill();
            }

            animationFrameId = requestAnimationFrame(animateReveal);
        }

        // Listen for "H" key
        window.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 'h') {
                hKeyModal.classList.add('visible');
                setTimeout(initCanvas, 100); 
            }
        });

        // Close Modal and "Reset" the card
        function closeModal() {
            hKeyModal.classList.remove('visible');
            cancelAnimationFrame(animationFrameId);
            setTimeout(initCanvas, 400); 
        }

        closeHKey.addEventListener('click', closeModal);
        hKeyModal.addEventListener('click', (e) => {
            if (e.target === hKeyModal) closeModal();
        });

        // Mouse Tracking Logic
        function updateMouse(e) {
            const rect = canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            mousePos.x = clientX - rect.left;
            mousePos.y = clientY - rect.top;
            isHovering = true;
        }

        // Desktop and Mobile listeners
        canvas.addEventListener('mousemove', updateMouse);
        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            updateMouse(e);
        }, { passive: false });

        canvas.addEventListener('mouseleave', () => isHovering = false);
        canvas.addEventListener('touchend', () => isHovering = false);
        canvas.addEventListener('mouseenter', () => isHovering = true); 
    }
});