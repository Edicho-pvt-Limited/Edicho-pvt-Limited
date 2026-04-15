// =====================================================
// ================= Logo DYNAMIC SUFFIX ROTATION =================
const suffixElement = document.getElementById("dynamicSuffix");
const terms = [".com", ".design", ".studio", ".creative", ".agency"];
let currentIndex = 0;
let isAnimating = false;
let intervalId = null;

function rotateSuffix() {

  // Stop if element not visible
  if (!suffixElement || window.innerWidth <= 320) return;

  if (isAnimating) return;
  isAnimating = true;

  suffixElement.classList.add("exit");

  setTimeout(() => {

    currentIndex = (currentIndex + 1) % terms.length;
    suffixElement.textContent = terms[currentIndex];

    suffixElement.classList.remove("exit");
    suffixElement.classList.add("prepare");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        suffixElement.classList.remove("prepare");
        isAnimating = false;
      });
    });

  }, 600);
}

function startRotation(){
  if(window.innerWidth > 320 && !intervalId){
    intervalId = setInterval(rotateSuffix, 2000);
  }
}

function stopRotation(){
  if(intervalId){
    clearInterval(intervalId);
    intervalId = null;
  }
}

// Initial check
startRotation();

// Re-check on resize
window.addEventListener("resize", () => {
  if(window.innerWidth <= 320){
    stopRotation();
  } else {
    startRotation();
  }
});

// =====================================================
// ================= NAVBAR MENU ======================

const sideMenu = document.getElementById("sideMenu");
const menuIcon = document.getElementById("menuIcon");
const overlay = document.getElementById("menuOverlay");

let menuOpen = false;

// OPEN MENU
function openMenu(){
  sideMenu.style.right = "0";
  overlay.classList.add("active");
  menuIcon.classList.add("active");
  menuIcon.innerHTML = "✖";
  menuOpen = true;
}

// CLOSE MENU
function closeMenu(){
  sideMenu.style.right = "-260px";
  overlay.classList.remove("active");
  menuIcon.classList.remove("active");
  menuIcon.innerHTML = "☰";
  menuOpen = false;
}

// TOGGLE MENU
menuIcon.addEventListener("click", () => {
  menuOpen ? closeMenu() : openMenu();
});

// HOVER (DESKTOP)
menuIcon.addEventListener("mouseenter", () => {
  if(window.innerWidth > 768){
    openMenu();
  }
});

// CLOSE ON OVERLAY CLICK
overlay.addEventListener("click", closeMenu);

// CLOSE ON MENU LINK CLICK
sideMenu.querySelectorAll("a").forEach(link=>{
  link.addEventListener("click", closeMenu);
});


// ================= SCROLL EFFECT =================

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


// ================= FADE-IN ANIMATION =================

const elements = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
});
elements.forEach(el => observer.observe(el));

// =====================================================

// ================= HERO ======================
const scrollBtn = document.getElementById("scrollToSamples");
const samplesSection = document.getElementById("samplesSection");

if (scrollBtn && samplesSection) {
  scrollBtn.addEventListener("click", function(){
    samplesSection.scrollIntoView({
      behavior:"smooth"
    });
  });
}


// =====================================================

// ================= Long Video Sample Work ======================
const main = document.getElementById("fwMain");
const thumbs = document.querySelectorAll(".fw-thumb");
const title = document.getElementById("fwTitle");
const desc = document.getElementById("fwDesc");

if (main && thumbs.length) {

  let currentVideo = main.dataset.video;

  /* =========================
     LOAD PREVIEW IMAGE
  ========================== */
  function loadPreview(videoId) {

    currentVideo = videoId;
    main.dataset.video = videoId;

    main.innerHTML = `
      <div class="fw-media">
        <img 
          src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg" 
          alt="Video Thumbnail"
        >
        <div class="fw-play">
          <div class="play-icon">▶</div>
        </div>
      </div>
    `;
  }

  /* =========================
     PLAY VIDEO (LEFT SIDE)
  ========================== */
  function playVideo(videoId) {

    currentVideo = videoId;

    main.innerHTML = `
      <div class="fw-media">
        <iframe
          src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1"
          frameborder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowfullscreen>
        </iframe>
      </div>
    `;
  }

  /* =========================
     MAIN CLICK → PLAY
  ========================== */
  main.addEventListener("click", function () {
    playVideo(currentVideo);
  });

  /* =========================
     THUMB CLICK → SWITCH + PLAY
  ========================== */
  thumbs.forEach(function (thumb) {

    thumb.addEventListener("click", function (e) {

      e.stopPropagation();

      const videoId = thumb.dataset.video;
      const videoTitle = thumb.dataset.title;
      const videoDesc = thumb.dataset.desc;

      if (!videoId) return;

      // Active update
      thumbs.forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");

      // Update text
      if (title) title.textContent = videoTitle || "";
      if (desc) desc.textContent = videoDesc || "";

      // DIRECTLY PLAY VIDEO
      playVideo(videoId);

    });

  });

}

let progressInterval;

/* =========================
   PLAY VIDEO + PROGRESS
========================= */
function playVideo(videoId) {

  currentVideo = videoId;

  main.innerHTML = `
    <div class="fw-media">
      <iframe
        id="ytPlayer"
        src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1"
        frameborder="0"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowfullscreen>
      </iframe>

      <div class="fw-overlay">
        <div class="fw-progress">
          <div class="fw-progress-bar" id="fwProgress"></div>
        </div>
        <div class="fw-controls">
          <span id="fwTime">00:00</span>
          <span>Playing</span>
        </div>
      </div>
    </div>
  `;

  simulateProgress();
}

/* =========================
   FAKE LONG VIDEO PROGRESS
========================= */
function simulateProgress() {

  let progress = 0;
  const progressBar = document.getElementById("fwProgress");
  const time = document.getElementById("fwTime");

  clearInterval(progressInterval);

  progressInterval = setInterval(() => {
    progress += 0.5;

    if (progress >= 100) {
      clearInterval(progressInterval);
      autoNextVideo();
    }

    progressBar.style.width = progress + "%";

    let seconds = Math.floor(progress * 1.2);
    let min = String(Math.floor(seconds / 60)).padStart(2, '0');
    let sec = String(seconds % 60).padStart(2, '0');

    time.textContent = `${min}:${sec}`;

  }, 200);
}

/* =========================
   AUTO NEXT VIDEO (LIKE PLAYLIST)
========================= */
function autoNextVideo() {

  let currentIndex = [...thumbs].findIndex(t =>
    t.dataset.video === currentVideo
  );

  let nextIndex = (currentIndex + 1) % thumbs.length;
  let nextThumb = thumbs[nextIndex];

  nextThumb.click(); // trigger next
}

// =====================================================

// ================= REEL SECTION ======================
const reelPhones = document.querySelectorAll(".reel-phone");

reelPhones.forEach(phone => {

  phone.addEventListener("click", function(){

    const videoId = phone.dataset.video;
    const frame = phone.querySelector(".phone-frame");

    // Stop other videos
    document.querySelectorAll(".phone-frame").forEach(f => {
      f.innerHTML = `
        <img src="${f.closest('.reel-phone').querySelector('img')?.src}">
        <div class="reel-play">▶</div>
      `;
    });

    // Play selected video
    frame.innerHTML = `
      <iframe 
        src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0"
        frameborder="0"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowfullscreen
        style="width:100%; height:100%; border-radius:36px;">
      </iframe>
    `;

  });

});

// =====================================================

// ================= BRAND VIDEO SECTION ======================
const lfmVideos = document.querySelectorAll(".lfm-media");

lfmVideos.forEach(media => {

  media.addEventListener("click", function(){

    const videoId = media.dataset.video;

    media.innerHTML = `
      <iframe 
        src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0"
        frameborder="0"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowfullscreen
        style="width:100%; height:100%; border-radius:12px;">
      </iframe>
    `;

  });

});

// =====================================================

// ================= UGC VIDEO SECTION ======================
document.querySelectorAll(".ugc-card").forEach(card => {

  card.addEventListener("click", function(){

    const videoId = this.dataset.video;
    if(!videoId) return;

    const media = this.querySelector(".ugc-media");

    media.innerHTML = `
      <iframe
        src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowfullscreen>
      </iframe>
    `;

  });

});

// =====================================================

// ================= Before & After Editing Section ======================
const wrapper = document.getElementById("compareWrapper");
const before = document.getElementById("compareBefore");
const slider = document.getElementById("sliderLine");

let isDragging = false;

function updateSlider(positionX) {
  const rect = wrapper.getBoundingClientRect();
  let offset = positionX - rect.left;

  if (offset < 0) offset = 0;
  if (offset > rect.width) offset = rect.width;

  const percent = (offset / rect.width) * 100;

  before.style.width = percent + "%";
  slider.style.left = percent + "%";
}

/* Mouse */
wrapper.addEventListener("mousedown", () => isDragging = true);
window.addEventListener("mouseup", () => isDragging = false);

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  updateSlider(e.clientX);
});

/* Touch */
wrapper.addEventListener("touchstart", () => isDragging = true);
window.addEventListener("touchend", () => isDragging = false);

window.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  updateSlider(e.touches[0].clientX);
});
