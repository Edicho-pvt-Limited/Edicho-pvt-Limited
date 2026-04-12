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
  sideMenu.style.right = "-100%";
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


// SCROLL EFFECT

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


// FADE-IN ANIMATION 

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

// ================= HERO SLIDER =================
(function(){

/* ===============================
ELEMENTS
=============================== */

const hero = document.getElementById("hero");
const scrollTrigger = document.getElementById("scrollTrigger");

const targetSection =
document.getElementById("tutorial-video") ||
document.querySelector("section:nth-of-type(2)");

let isScrolling = false;


/* ===============================
SCROLL TO VIDEO FUNCTION
=============================== */

function goToVideo(){

if(isScrolling || !targetSection) return;

isScrolling = true;

targetSection.scrollIntoView({
behavior:"smooth"
});

setTimeout(()=>{
isScrolling = false;
},1200);

}


/* ===============================
CLICK TRIGGER
=============================== */

if(scrollTrigger){

scrollTrigger.addEventListener("click",goToVideo);

}


/* ===============================
MOUSE WHEEL SCROLL
=============================== */

window.addEventListener("wheel",(e)=>{

if(e.deltaY > 60 && window.scrollY < window.innerHeight * 0.4){

goToVideo();

}

},{passive:true});


/* ===============================
TRACKPAD SCROLL
=============================== */

window.addEventListener("scroll",()=>{

if(window.scrollY > 80 && window.scrollY < window.innerHeight * 0.4){

goToVideo();

}

});


/* ===============================
MOBILE SWIPE DETECTION
=============================== */

let touchStartY = 0;
let touchEndY = 0;

window.addEventListener("touchstart",(e)=>{

touchStartY = e.changedTouches[0].screenY;

});

window.addEventListener("touchend",(e)=>{

touchEndY = e.changedTouches[0].screenY;

handleSwipe();

});

function handleSwipe(){

if(touchStartY - touchEndY > 60){

if(window.scrollY < window.innerHeight * 0.4){

goToVideo();

}

}

}


/* ===============================
HERO PARALLAX
=============================== */

const heroBg = document.querySelector(".hero-bg");

if(heroBg){

document.addEventListener("mousemove",(e)=>{

const x = (window.innerWidth - e.pageX * 2) / 120;
const y = (window.innerHeight - e.pageY * 2) / 120;

heroBg.style.transform =
`scale(1.08) translate(${x}px, ${y}px)`;

});

}


/* ===============================
INTERACTIVE SWIPE INDICATOR
=============================== */

const scrollLine = document.querySelector(".scroll-line");

if(scrollLine){

let direction = 1;

setInterval(()=>{

scrollLine.style.transform =
`translateY(${direction * 6}px)`;

direction *= -1;

},1200);

}

})();

/* ===============================
MAGNETIC CTA EFFECT
=============================== */

const cta = document.getElementById("scrollTrigger");

if(cta){

cta.addEventListener("mousemove",(e)=>{

const rect = cta.getBoundingClientRect();

const x = e.clientX - rect.left - rect.width/2;
const y = e.clientY - rect.top - rect.height/2;

cta.style.transform =
`translate(${x*0.05}px, ${y*0.05}px)`;

});

cta.addEventListener("mouseleave",()=>{
cta.style.transform="translate(0,0)";
});

}

// =====================================================

// ================= EDICHO OVERVIEW VIDEO SECTION =================
(function initShowcaseVideo(){

const video = document.getElementById("mainVideo");
const playPauseBtn = document.getElementById("playPauseBtn");
const muteBtn = document.getElementById("muteBtn");
const videoSection = document.getElementById("tutorial-video");
const scrollTrigger = document.getElementById("scrollTrigger");

if(!video || !playPauseBtn || !muteBtn || !videoSection) return;


/* ===============================
AUTO PLAY ON LOAD (MUTED)
=============================== */

window.addEventListener("load", () => {
  video.muted = true;
  video.currentTime = 0;
  video.play().catch(()=>{});
});


/* ===============================
ENABLE SOUND ON FIRST CLICK
=============================== */

function enableSoundOnce(){

  video.muted = false;
  video.play().catch(()=>{});
  updateIcons();

  window.removeEventListener("click", enableSoundOnce);
  window.removeEventListener("touchstart", enableSoundOnce);
}

window.addEventListener("click", enableSoundOnce);
window.addEventListener("touchstart", enableSoundOnce);


/* ===============================
HIGHLIGHT MUTE BUTTON
=============================== */

setTimeout(() => {
  muteBtn.classList.add("highlight");
}, 2000);


/* ===============================
ICON UPDATE
=============================== */

function updateIcons(){
  playPauseBtn.classList.toggle("is-paused", video.paused);
  muteBtn.classList.toggle("is-muted", video.muted);
}


/* ===============================
PLAY / PAUSE BUTTON
=============================== */

playPauseBtn.addEventListener("click", () => {

  if(video.paused){
    video.currentTime = 0;
    video.play();
  } else {
    video.pause();
  }

  updateIcons();
});


/* ===============================
MUTE BUTTON
=============================== */

muteBtn.addEventListener("click",()=>{
  video.muted = !video.muted;
  updateIcons();
});


/* ===============================
CTA CLICK → SCROLL + RESTART + SOUND
=============================== */

if(scrollTrigger){

  scrollTrigger.addEventListener("click", () => {

    videoSection.scrollIntoView({
      behavior: "smooth"
    });

    setTimeout(() => {

      video.pause();
      video.load();
      video.muted = false;
      video.play().catch(()=>{});

      updateIcons();

    }, 800);

  });

}


/* ===============================
SYNC ICONS
=============================== */

video.addEventListener("play",updateIcons);
video.addEventListener("pause",updateIcons);
video.addEventListener("volumechange",updateIcons);

})();


// =====================================================

// ================ Company partner section ==================
const track = document.querySelector(".track");
const pills = document.querySelectorAll(".pill");

function applyCenterEffect() {
  const centerPoint = window.innerWidth / 2;

  pills.forEach((pill) => {
    const rect = pill.getBoundingClientRect();
    const pillMidPoint = rect.left + rect.width / 2;

    // Agar pill screen ke bilkul center ke 80px range mein hai
    if (Math.abs(centerPoint - pillMidPoint) < 80) {
      pill.classList.add("active");
    } else {
      pill.classList.remove("active");
    }
  });

  requestAnimationFrame(applyCenterEffect);
}

// Performance Optimization: Sirf jab marquee visible ho tabhi JS chale
const observerPtr = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
        applyCenterEffect();
    }
  });
}, { threshold: 0.1 });

observerPtr.observe(document.querySelector('.elite-marquee'));


// =====================================================

// ================ Video Pop Up==================
const videoBox = document.getElementById("videoBox");
const videoModal = document.getElementById("videoModal");
const closeVideo = document.getElementById("closeVideo");
const aboutVideo = document.getElementById("aboutVideo");

// OPEN VIDEO
videoBox.addEventListener("click", () => {
  videoModal.classList.add("active");
  document.body.style.overflow = "hidden"; // stop background scroll
  aboutVideo.currentTime = 0;
  aboutVideo.play();
});

// CLOSE VIDEO
function closePopup(){
  videoModal.classList.remove("active");
  document.body.style.overflow = ""; // enable scroll
  aboutVideo.pause();
}

closeVideo.addEventListener("click", closePopup);

// CLOSE ON BACKGROUND CLICK
videoModal.addEventListener("click", (e) => {
  if (e.target === videoModal) {
    closePopup();
  }
});

// CLOSE ON ESC KEY
document.addEventListener("keydown", (e)=>{
  if(e.key === "Escape" && videoModal.classList.contains("active")){
    closePopup();
  }
});

// =====================================================

// ================= STATS COUNT ANIMATION =================
const counters = document.querySelectorAll(".count");
let statsStarted = false;

function runCounters(){
  counters.forEach(counter => {
    const target = +counter.getAttribute("data-target");
    let current = 0;
    const increment = target / 100;

    const updateCount = () => {
      if(current < target){
        current += increment;
        counter.innerText = Math.ceil(current) + "+";
        requestAnimationFrame(updateCount);
      }else{
        counter.innerText = target.toLocaleString() + "+";
      }
    };

    updateCount();
  });
}

// Run when visible
const statsSection = document.querySelector(".stats-section");
const statsObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting && !statsStarted){
      runCounters();
      statsStarted = true;
    }
  });
});

statsObserver.observe(statsSection);

// =====================================================

// ================= TESTIMONIALS =================
(function(){

const cards=document.querySelectorAll(".test-video-card");
const modal=document.getElementById("test-videoPopup");
const frame=document.getElementById("test-popupFrame");
const close=document.getElementById("test-closePopup");
const backdrop=document.querySelector(".test-popup-backdrop");

if(!modal)return;

function openVideo(card){

const id=card.getAttribute("data-video");

frame.src=`https://www.youtube.com/embed/${id}?autoplay=1`;

modal.classList.add("active");

document.body.style.overflow="hidden";

}

function closeVideo(){

modal.classList.remove("active");

frame.src="";

document.body.style.overflow="";

}

cards.forEach(card=>{
card.addEventListener("click",()=>openVideo(card));
});

close.addEventListener("click",closeVideo);

backdrop.addEventListener("click",closeVideo);

document.addEventListener("keydown",e=>{
if(e.key==="Escape")closeVideo();
});

})();