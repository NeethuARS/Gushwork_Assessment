const mainImg = document.getElementById("mainImage");
const zoomBox = document.getElementById("zoomBox");
const zoomImg = document.getElementById("zoomImage");
const faqItems = document.querySelectorAll(".faq-item");
const stickyProduct = document.getElementById("stickyProduct");
const heroSection = document.querySelector(".hero");

window.addEventListener("scroll", () => {
  const triggerPoint = heroSection.offsetHeight;

  if (window.scrollY > triggerPoint) {
    stickyProduct.classList.add("show");
  } else {
    stickyProduct.classList.remove("show");
  }
});
document.addEventListener("DOMContentLoaded", function () {

  const overlay = document.getElementById("modalOverlay");
  const catalogueModal = document.getElementById("catalogueModal");
  const callbackModal = document.getElementById("callbackModal");

  // OPEN CATALOGUE
  document.querySelectorAll(".open-catalogue").forEach(btn => {
    btn.addEventListener("click", () => {
      overlay.classList.add("show");
      catalogueModal.classList.add("show");
    });
  });

  // OPEN CALLBACK
  document.querySelectorAll(".open-callback").forEach(btn => {
    btn.addEventListener("click", () => {
      overlay.classList.add("show");
      callbackModal.classList.add("show");
    });
  });

  // CLOSE BUTTONS
  document.querySelectorAll(".close-modal").forEach(btn => {
    btn.addEventListener("click", closeModal);
  });

  // CLICK OUTSIDE
  overlay.addEventListener("click", closeModal);

  function closeModal() {
    overlay.classList.remove("show");
    catalogueModal.classList.remove("show");
    callbackModal.classList.remove("show");
  }

});
const data = [
  {
    title: "High-Grade Raw Material Selection",
    desc: "Premium PE100 raw material is carefully selected to ensure superior strength, flexibility, and long-term durability.",
    points: ["PE100 grade material", "Optimal molecular weight distribution"],
    img: "assets/image1.jpeg"
  },
  {
    title: "Precision Extrusion",
    desc: "Advanced extrusion machinery ensures consistent pipe diameter and smooth internal surfaces.",
    points: ["Uniform melt flow", "High dimensional accuracy"],
    img: "assets/image1.jpeg"
  },
  {
    title: "Controlled Cooling",
    desc: "Cooling systems stabilize pipe structure and eliminate deformation during production.",
    points: ["Water bath cooling", "Thermal stability"],
    img: "assets/image1.jpeg"
  },
  {
    title: "Accurate Sizing",
    desc: "Vacuum sizing tanks ensure precise outer diameter and consistent roundness.",
    points: ["Perfect roundness", "Wall thickness control"],
    img: "assets/image1.jpeg"
  },
  {
    title: "Strict Quality Control",
    desc: "Every pipe undergoes rigorous inspection to meet international standards.",
    points: ["ISO certified testing", "Pressure validation"],
    img: "assets/image1.jpeg"
  },
  {
    title: "Marking & Identification",
    desc: "Pipes are clearly marked for traceability and compliance.",
    points: ["Batch identification", "Standard compliance labels"],
    img: "assets/image1.jpeg"
  },
  {
    title: "Precision Cutting",
    desc: "Automated cutting ensures exact lengths without compromising structure.",
    points: ["Clean edges", "Length accuracy"],
    img: "assets/image1.jpeg"
  },
  {
    title: "Secure Packaging",
    desc: "Final products are safely packed for transport and storage.",
    points: ["Damage protection", "Efficient bundling"],
    img: "assets/image1.jpeg"
  }
];

/* =========================
   ELEMENTS
========================= */
let currentIndex = 0;

const tabs = document.querySelectorAll(".tab");
const title = document.querySelector(".process-left h3");
const desc = document.querySelector(".process-left p");
const bullets = document.querySelector(".process-left ul");
const img = document.querySelector(".process-right img");

const leftBtn = document.querySelector(".proc-arrow.left");
const rightBtn = document.querySelector(".proc-arrow.right");

/* =========================
   UPDATE FUNCTION
========================= */
function updateContent(index) {
  const d = data[index];

  // text
  title.innerText = d.title;
  desc.innerText = d.desc;

  // bullets
  bullets.innerHTML = d.points.map(p => `<li>${p}</li>`).join("");

  // image
  img.src = d.img;

  // tabs active
  tabs.forEach(t => t.classList.remove("active"));
  if (tabs[index]) tabs[index].classList.add("active");
}

/* =========================
   TAB CLICK
========================= */
tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => {
    currentIndex = i;
    updateContent(currentIndex);
  });
});

/* =========================
   ARROWS
========================= */
rightBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % data.length;
  updateContent(currentIndex);
});

leftBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + data.length) % data.length;
  updateContent(currentIndex);
});

/* =========================
   INIT LOAD
========================= */
updateContent(currentIndex);
const track = document.querySelector(".test-track");

track.addEventListener("mouseenter", () => {
  track.style.animationPlayState = "paused";
});

track.addEventListener("mouseleave", () => {
  track.style.animationPlayState = "running";
});
window.addEventListener("load", () => {
  const slider = document.getElementById("appSlider");
  const nextBtn = document.getElementById("appNext");
  const prevBtn = document.getElementById("appPrev");

  const cards = slider.querySelectorAll(".app-card");

  let cardWidth = cards[0].getBoundingClientRect().width + 22;
  let index = 2;

  let isDragging = false;
  let startX = 0;
  let currentTranslate = -index * cardWidth;

  /* INIT */
  slider.style.transform = `translateX(${currentTranslate}px)`;

  function moveToIndex() {
    currentTranslate = -index * cardWidth;
    slider.style.transition = "transform 0.45s ease";
    slider.style.transform = `translateX(${currentTranslate}px)`;
  }

  /* ✅ BUTTONS FIXED */
  nextBtn.onclick = () => {
    index++;
    moveToIndex();
  };

  prevBtn.onclick = () => {
    index--;
    moveToIndex();
  };

  /* ✅ TRUE LOOP FIX */
  slider.addEventListener("transitionend", () => {
    const allCards = slider.querySelectorAll(".app-card");

    if (allCards[index].classList.contains("clone")) {
      slider.style.transition = "none";

      if (index <= 1) index = allCards.length - 4;
      if (index >= allCards.length - 2) index = 2;

      currentTranslate = -index * cardWidth;
      slider.style.transform = `translateX(${currentTranslate}px)`;
    }
  });

  /* ✅ DRAG */
  slider.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX;
    slider.style.transition = "none";
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const dx = e.pageX - startX;
    slider.style.transform = `translateX(${currentTranslate + dx}px)`;
  });

  window.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    isDragging = false;

    const dx = e.pageX - startX;

    if (dx < -50) index++;
    if (dx > 50) index--;

    moveToIndex();
  });

  /* TOUCH */
  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    slider.style.transition = "none";
  });

  slider.addEventListener("touchmove", (e) => {
    const dx = e.touches[0].clientX - startX;
    slider.style.transform = `translateX(${currentTranslate + dx}px)`;
  });

  slider.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - startX;

    if (dx < -50) index++;
    if (dx > 50) index--;

    moveToIndex();
  });

  /* RESIZE FIX */
  window.addEventListener("resize", () => {
    cardWidth = cards[0].getBoundingClientRect().width + 22;
    moveToIndex();
  });
});
faqItems.forEach(item => {
  item.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});
/* ZOOM */
mainImg.addEventListener("mousemove", (e) => {
  if (window.innerWidth < 900) return;

  zoomBox.style.display = "block";

  const rect = mainImg.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;

  zoomImg.style.left = `-${x * 100}%`;
  zoomImg.style.top = `-${y * 100}%`;
});

mainImg.addEventListener("mouseleave", () => {
  zoomBox.style.display = "none";
});

/* THUMBS */
document.querySelectorAll(".thumb").forEach(thumb => {
  thumb.addEventListener("click", () => {
    document.querySelector(".active").classList.remove("active");
    thumb.classList.add("active");

    mainImg.src = thumb.src;
    zoomImg.src = thumb.src;
  });
});

/* STICKY HEADER */
let lastScroll = 0;
const sticky = document.getElementById("stickyHeader");

window.addEventListener("scroll", () => {
  const current = window.scrollY;

  if (current > window.innerHeight * 0.5) {
    if (current > lastScroll) {
      sticky.classList.add("show");
    } else {
      sticky.classList.remove("show");
    }
  } else {
    sticky.classList.remove("show");
  }

  lastScroll = current;
}

);
