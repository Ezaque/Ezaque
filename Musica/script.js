// Data for releases + songs
const tracks = [
    {
        id: 'song1.mp3',
        title: 'Night Drive',
        artist: 'DJ Minimalista',
        cover: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=60&q=80',
        src: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_8e3d8f69d9.mp3?filename=slow-funk-130bpm-12445.mp3'
    },
    {
        id: 'song2.mp3',
        title: 'Bass Explosion',
        artist: 'DJ Minimalista',
        cover: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=60&q=80',
        src: 'https://cdn.pixabay.com/download/audio/2021/10/12/audio_3f5a0e8b1e.mp3?filename=hip-hop-rap-beat-120bpm-12445.mp3'
    },
    {
        id: 'song3.mp3',
        title: 'Noite Vermelha',
        artist: 'DJ Minimalista',
        cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=60&q=80',
        src: 'https://cdn.pixabay.com/download/audio/2022/03/06/audio_5a37a1e3a9.mp3?filename=electronic-ambient-12445.mp3'
    }
];

// Elements
const player = document.getElementById('bgAudio');
const playerTrack = document.getElementById('player-track');
const playerArtist = document.getElementById('player-artist');
const playerCover = document.getElementById('player-cover');
const btnPlayPause = document.getElementById('btn-play-pause');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const iconPlay = document.getElementById('icon-play');
const iconPause = document.getElementById('icon-pause');

let currentTrackIndex = -1;

function loadTrack(index) {
    if (index < 0 || index >= tracks.length) return;
    currentTrackIndex = index;
    const track = tracks[index];
    player.src = track.src;
    playerTrack.textContent = track.title;
    playerArtist.textContent = track.artist;
    playerCover.src = track.cover;
    btnPlayPause.disabled = false;
    btnPrev.disabled = index === 0;
    btnNext.disabled = index === tracks.length - 1;
    iconPlay.style.display = 'inline';
    iconPause.style.display = 'none';
    player.pause();
}

function playTrack() {
    player.play();
    iconPlay.style.display = 'none';
    iconPause.style.display = 'inline';
    btnPlayPause.setAttribute('aria-label', 'Pausar música');
}

function pauseTrack() {
    player.pause();
    iconPlay.style.display = 'inline';
    iconPause.style.display = 'none';
    btnPlayPause.setAttribute('aria-label', 'Tocar música');
}

btnPlayPause.addEventListener('click', () => {
    if (player.paused) {
        playTrack();
    } else {
        pauseTrack();
    }
});

btnPrev.addEventListener('click', () => {
    if (currentTrackIndex > 0) {
        loadTrack(currentTrackIndex - 1);
        playTrack();
    }
});

btnNext.addEventListener('click', () => {
    if (currentTrackIndex < tracks.length - 1) {
        loadTrack(currentTrackIndex + 1);
        playTrack();
    }
});

player.addEventListener('ended', () => {
    if (currentTrackIndex < tracks.length - 1) {
        loadTrack(currentTrackIndex + 1);
        playTrack();
    } else {
        pauseTrack();
    }
});

// Play buttons on releases and carousel
document.querySelectorAll('.btn-play, .carousel-slide button').forEach(button => {
    button.addEventListener('click', e => {
        const songId = button.dataset.play;
        const index = tracks.findIndex(t => t.id === songId);
        if (index !== -1) {
            loadTrack(index);
            playTrack();
            // Scroll to player on small devices
            if (window.innerWidth < 768) {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }
        }
    });
});

// Hero button plays last release
document.getElementById('btn-hero-play').addEventListener('click', () => {
    loadTrack(tracks.length - 1);
    playTrack();
    window.location.hash = '#releases';
});

// Carousel functionality
const carouselTrack = document.getElementById('carousel-track');
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');
let currentSlide = 0;

function updateCarousel() {
    carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
}
prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + tracks.length) % tracks.length;
    updateCarousel();
});
nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % tracks.length;
    updateCarousel();
});

// Navigation active link on scroll
const sections = document.querySelectorAll('main > section[id]');
const navLinks = document.querySelectorAll('nav a');

function onScroll() {
    const scrollPos = window.scrollY + 80;
    sections.forEach(section => {
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + section.id);
            });
        }
    });
}
window.addEventListener('scroll', onScroll);
onScroll();

// Accessibility: Allow keyboard play on release cards
document.querySelectorAll('.release-card').forEach(card => {
    card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const btn = card.querySelector('.btn-play');
            if (btn) btn.click();
        }
    });
});

document.getElementById("btn-hero-play").addEventListener("click", () => {
    const audio = document.getElementById("bgAudio");
    audio.muted = false;
    audio.play();
});
