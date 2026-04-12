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
// ================= NAVBAR MENU =================
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

// ================= SHORT VIDEO SECTION =================
const cards = [...document.querySelectorAll(".cine-card")];
const nextBtn = document.getElementById("cineNext");
const prevBtn = document.getElementById("cinePrev");

let current = 2;

function updateCarousel() {
    cards.forEach((card, index) => {
        card.className = "cine-card hidden";
        
        if (index === current) {
            card.className = "cine-card center";
        } else if (index === (current - 1 + cards.length) % cards.length) {
            card.className = "cine-card left1";
        } else if (index === (current + 1) % cards.length) {
            card.className = "cine-card right1";
        } else if (index === (current - 2 + cards.length) % cards.length) {
            card.className = "cine-card left2";
        } else if (index === (current + 2) % cards.length) {
            card.className = "cine-card right2";
        }
    });
}

function nextSlide() {
    current = (current + 1) % cards.length;
    updateCarousel();
}

function prevSlide() {
    current = (current - 1 + cards.length) % cards.length;
    updateCarousel();
}

let autoPlay = setInterval(nextSlide, 3500);

const wrapper = document.getElementById("cineTrack");
wrapper.addEventListener("mouseenter", () => clearInterval(autoPlay));
wrapper.addEventListener("mouseleave", () => autoPlay = setInterval(nextSlide, 3500));

nextBtn.onclick = nextSlide;
prevBtn.onclick = prevSlide;

cards.forEach((card, index) => {
    card.onclick = () => {
        if (index !== current) {
            current = index;
            updateCarousel();
            return;
        }

        const videoId = card.dataset.video;
        const player = card.querySelector(".cine-player");
        
        document.querySelectorAll(".cine-player").forEach(p => {
            p.innerHTML = "";
            p.style.pointerEvents = "none";
        });

        player.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0" allow="autoplay" allowfullscreen></iframe>`;
        player.style.pointerEvents = "auto";
    };
});

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
});


updateCarousel();

// =====================================================

// ================= LONG VIDEO SECTION =================
/* VIDEO SWITCH (uses a unique selector variable name) */
const lfOptionItems = document.querySelectorAll(".lf-card");
const lfPlayerFrame = document.getElementById("lfPlayer");

lfOptionItems.forEach(item => {
  item.addEventListener("click", () => {
    const videoId = item.dataset.video;
    if (!videoId || !lfPlayerFrame) return;

    lfPlayerFrame.src =
      `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`;
  });
});


/* BEFORE / AFTER COMPARISON */
const lfCompareRange = document.getElementById("compareSlider");
const lfAfterLayer = document.getElementById("afterImg");

if (lfCompareRange && lfAfterLayer) {
  lfCompareRange.addEventListener("input", () => {
    const val = Number(lfCompareRange.value);
    lfAfterLayer.style.clipPath = `inset(0 ${100 - val}% 0 0)`;
  });
}


/* MAGNETIC HOVER (3D tilt) */
const lfVideoShell = document.getElementById("videoFrame");

if (lfVideoShell) {
  lfVideoShell.addEventListener("mousemove", e => {
    const rect = lfVideoShell.getBoundingClientRect();
    const offsetX = (e.clientX - rect.left - rect.width / 2) / 15;
    const offsetY = (e.clientY - rect.top - rect.height / 2) / 15;

    lfVideoShell.style.transform =
      `rotateX(${-offsetY}deg) rotateY(${offsetX}deg)`;
  });

  lfVideoShell.addEventListener("mouseleave", () => {
    lfVideoShell.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
}


/* CINEMATIC CURSOR GLOW */
const lfCursorGlow = document.getElementById("cursorGlow");
const lfVisualArea = document.getElementById("lfVisual");

if (lfCursorGlow && lfVisualArea) {
  lfVisualArea.addEventListener("mousemove", e => {
    lfCursorGlow.style.left = e.clientX + "px";
    lfCursorGlow.style.top = e.clientY + "px";
  });
}

const lfpCards = document.querySelectorAll(".lfp-video-card");
const lfpModal = document.getElementById("lfpModal");
const lfpFrame = document.getElementById("lfpFrame");
const lfpClose = document.querySelector(".lfp-close");
const lfpBackdrop = document.querySelector(".lfp-modal-backdrop");

lfpCards.forEach(card=>{
  card.addEventListener("click",()=>{
    const videoID = card.dataset.video;
    lfpFrame.src = `https://www.youtube.com/embed/${videoID}?autoplay=1`;
    lfpModal.classList.add("active");
    document.body.style.overflow="hidden";
  });
});

function closeModal(){
  lfpModal.classList.remove("active");
  lfpFrame.src="";
  document.body.style.overflow="";
}

lfpClose.addEventListener("click",closeModal);
lfpBackdrop.addEventListener("click",closeModal);

document.addEventListener("keydown",(e)=>{
  if(e.key==="Escape") closeModal();
});

// =====================================================

// ================= UGC VIDEO SECTION =================
const phoneContainer = document.getElementById("ugcPhones");

phoneContainer.addEventListener("scroll", () => {

  const phones = document.querySelectorAll(".ugc-phone");

  phones.forEach(phone=>{
    const rect = phone.getBoundingClientRect();
    const center = window.innerWidth/2;

    if(rect.left < center && rect.right > center){
      phone.style.transform = "scale(1.08)";
    } else {
      phone.style.transform = "scale(1)";
    }
  });

});

// =====================================================

// ================= Our Process ======================
const advantageSection = document.querySelector(".edicho-advantage");
const advantagePoints = document.querySelectorAll(".ea-point");

const advantageObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){

      advantageSection.classList.add("show");

      advantagePoints.forEach((point,index)=>{
        setTimeout(()=>{
          point.classList.add("show");
        }, index * 150);
      });

    }
  });
},{threshold:0.25});

if(advantageSection) advantageObserver.observe(advantageSection);


/* IMAGE PARALLAX */

const eaImage = document.querySelector(".ea-visual img");

if(eaImage && window.innerWidth > 768){
  window.addEventListener("scroll",()=>{
    const rect = eaImage.getBoundingClientRect();
    if(rect.top < window.innerHeight && rect.bottom > 0){
      const offset = rect.top * 0.05;
      eaImage.style.transform = `scale(1.08) translateY(${offset}px)`;
    }
  });
}

// =====================================================

// ================= FAQ section ======================
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item=>{
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  question.addEventListener("click",()=>{

    const isOpen = item.classList.contains("active");

    // Close all
    faqItems.forEach(i=>{
      i.classList.remove("active");
      i.querySelector(".faq-answer").style.maxHeight = null;
    });

    // Open clicked
    if(!isOpen){
      item.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }

  });
});
