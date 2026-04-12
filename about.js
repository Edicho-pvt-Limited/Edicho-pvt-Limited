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

/* ================= HERO COUNTERS ================= */
const counters = document.querySelectorAll(".stat-number");

  if (counters.length) {
    counters.forEach(counter => {
      const target = Number(counter.dataset.target);
      let count = 0;
      const speed = Math.max(target / 80, 1); // safety

      function updateCount() {
        count += speed;
        if (count < target) {
          counter.innerText = Math.ceil(count);
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target;
        }
      }

      updateCount();
    });
  }
// =========================================================

// ================= WHO WE ARE : IMAGE PARALLAX =================

const whoImage = document.querySelector(".who-image img");

// SAFETY CHECK
if (whoImage && window.innerWidth >= 768) {

  let ticking = false;

  function handleParallax() {
    const rect = whoImage.getBoundingClientRect();

    // Sirf viewport ke andar ho tab hi move kare
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const offset = rect.top * 0.06;

      whoImage.style.transform =
        `scale(1.08) translateY(${offset}px)`;
    }

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(handleParallax);
      ticking = true;
    }
  });

}


// =========================================================

/* ================= OUR STORY ANIMATIONS ================= */

(function() {
  const story = document.getElementById("ourStory");
  if (!story) return;

  const reveals = story.querySelectorAll(".reveal");
  const lineFill = story.querySelector(".timeline-line-fill");

  // Reveal Animation on Scroll
  const observerOptions = { threshold: 0.2 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, observerOptions);

  reveals.forEach((el) => observer.observe(el));

  // Dynamic Timeline Line Growth
  window.addEventListener("scroll", () => {
    const rect = story.getBoundingClientRect();
    const winH = window.innerHeight;

    // Calculate progress based on how much of the timeline is in view
    if (rect.top < winH && rect.bottom > 0) {
      const scrollStart = winH * 0.8; // Trigger line growth early
      const totalHeight = rect.height;
      const currentPos = scrollStart - rect.top;
      
      let progress = currentPos / totalHeight;
      progress = Math.min(Math.max(progress, 0), 1);
      
      lineFill.style.height = `${progress * 100}%`;
    }
  });
})();

// =========================================================

/* ================= TEAM REVEAL ================= */
(() => {

  const slider = document.querySelector(".team-specialists");
  if (!slider) return;

  const cards = slider.querySelectorAll(".team-card.specialist");

  let index = 0;
  let direction = 1;
  let interval;
  let isUserInteracting = false;

  function getCardWidth(){
    return cards[0].offsetWidth + 30;
  }

  function setActiveCard(){
    cards.forEach(c => c.classList.remove("is-active"));
    if(cards[index]) cards[index].classList.add("is-active");
  }

  function autoSlide(){

    if(isUserInteracting) return;

    if(index >= cards.length - 2) direction = -1;
    else if(index <= 0) direction = 1;

    index += direction;

    slider.scrollTo({
      left: index * getCardWidth(),
      behavior: "smooth"
    });

    setActiveCard();
  }

  function start(){
    interval = setInterval(autoSlide, 2500);
  }

  function stop(){
    clearInterval(interval);
  }

  /* hover pause */
  slider.addEventListener("mouseenter", () => {
    isUserInteracting = true;
    stop();
  });

  slider.addEventListener("mouseleave", () => {
    isUserInteracting = false;
    start();
  });

  /* mobile touch */
  slider.addEventListener("touchstart", () => {
    isUserInteracting = true;
    stop();
  });

  slider.addEventListener("touchend", () => {
    isUserInteracting = false;
    start();
  });

  /* init */
  setActiveCard();
  start();

})();


// =========================================================

/* ================= Tools and technology ================= */
(function(){
  const boxes = document.querySelectorAll('[data-magnetic]');

  boxes.forEach(box => {
    box.addEventListener('mousemove', e => {
      const rect = box.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      box.style.transform =
        `rotateX(${(-y / 25)}deg) rotateY(${(x / 25)}deg)`;
    });

    box.addEventListener('mouseleave', () => {
      box.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  });
})();

// =========================================================

/* ================= Workflow ================= */
(function () {
  const track = document.getElementById("workflowTrack");
  const steps = document.querySelectorAll(".workflow-step");
  const playhead = document.getElementById("playhead");

  if (!track || !steps.length || !playhead) return;

  function updatePlayhead(clientX) {
    const rect = track.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    playhead.style.left = `${x}px`;

    steps.forEach(step => {
      const stepRect = step.getBoundingClientRect();
      const center = stepRect.left + stepRect.width / 2;

      if (clientX >= center - 30) {
        step.classList.add("active");
      } else {
        step.classList.remove("active");
      }
    });
  }

  // Mouse-based playhead
  track.addEventListener("mousemove", e => updatePlayhead(e.clientX));

  // Scroll-based fallback
  window.addEventListener("scroll", () => {
    const rect = track.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const progress =
        (window.innerHeight - rect.top) /
        (window.innerHeight + rect.height);
      updatePlayhead(rect.left + rect.width * progress);
    }
  });
})();

// =========================================================

// ================= TESTIMONIAL SLIDER =================
const tCards = document.querySelectorAll(".testimonial-card");
const tTrack = document.querySelector(".testimonial-track");
const tNav = document.querySelector(".testimonial-nav");

let tIndex = 0;
let tAuto;

tCards.forEach((_,i)=>{
  const span=document.createElement("span");
  if(i===0) span.classList.add("active");
  span.onclick=()=>goSlide(i);
  tNav.appendChild(span);
});

const navBars=document.querySelectorAll(".testimonial-nav span");

function goSlide(i){
  tIndex=i;
  tTrack.style.transform=`translateX(-${i*100}%)`;
  navBars.forEach(n=>n.classList.remove("active"));
  navBars[i].classList.add("active");
  reset();
}

function next(){
  goSlide((tIndex+1)%tCards.length);
}

function reset(){
  clearInterval(tAuto);
  tAuto=setInterval(next,4000);
}
reset();

/* MODAL */
const modal=document.querySelector(".testimonial-modal");
const frame=document.getElementById("testimonialIframe");
const closeBtn=document.querySelector(".close-modal");
const backdrop=document.querySelector(".testimonial-backdrop");

tCards.forEach(card=>{
  card.onclick=()=>{
    frame.src=card.dataset.video+"?autoplay=1";
    modal.classList.add("active");
    document.body.style.overflow="hidden";
  }
});

function closeModal(){
  modal.classList.remove("active");
  frame.src="";
  document.body.style.overflow="";
}

closeBtn.onclick=closeModal;
backdrop.onclick=closeModal;
