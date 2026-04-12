// =====================================================
// ================= DYNAMIC SUFFIX ROTATION =================
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
// ================= NAVBAR MENU ======================
const wrap = document.querySelector(".magnetic-wrap");
const btn = document.querySelector(".contact-btn");

wrap.addEventListener("mousemove",(e)=>{
  const rect = wrap.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width/2;
  const y = e.clientY - rect.top - rect.height/2;

  btn.style.transform = `translate(${x*0.25}px, ${y*0.25}px)`;
});

wrap.addEventListener("mouseleave",()=>{
  btn.style.transform = "translate(0,0)";
});

// =====================================================
// ================= CONTACT FORM ======================
const form = document.getElementById("contactForm");
const popup = document.getElementById("formPopup");

emailjs.init({
  publicKey: "-ZhBWrjYB47_6hhTs"
});

form.addEventListener("submit", function(e){

  e.preventDefault();

  emailjs.sendForm(
    "service_f0rb564",
    "template_flxdaic",
    this
  )
  .then(() => {
    console.log("SUCCESS");
    popup.classList.add("active");
    form.reset();
  })
  .catch((error) => {
    console.error("FAILED", error);
    alert("Email failed to send");
  });

});

function closePopup(){
  popup.classList.remove("active");
}

// =====================================================
// ================= Process Section ======================
const section = document.querySelector(".process-section");
const fillLine = document.querySelector(".line-fill");
const steps = document.querySelectorAll(".step");

function animateTimeline(){

  const rect = section.getBoundingClientRect();

  if(rect.top < window.innerHeight * 0.7){

    /* line fill */
    fillLine.style.width = "84%";

    /* sequential icon pop */
    steps.forEach((step,index)=>{
      setTimeout(()=>{
        step.classList.add("active");
      }, index * 300);
    });

    window.removeEventListener("scroll",animateTimeline);
  }
}

window.addEventListener("scroll",animateTimeline);
