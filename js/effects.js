// // effects.js — adds interactivity and animations for Coming Soon page

// // Wait for the DOM to load
// document.addEventListener("DOMContentLoaded", () => {
//   // ================================
//   // Fade-in animation for heading and paragraph
//   // ================================
//   const fadeElements = document.querySelectorAll(".masthead-content h1, .masthead-content p");
//   fadeElements.forEach((el, index) => {
//     el.style.opacity = 0;
//     el.style.transform = "translateY(30px)";
//     setTimeout(() => {
//       el.style.transition = "all 1s ease";
//       el.style.opacity = 1;
//       el.style.transform = "translateY(0)";
//     }, 500 * index);
//   });

//   // ================================
//   // Countdown Timer
//   // ================================
//   const countdownContainer = document.createElement("div");
//   countdownContainer.classList.add("countdown", "text-white", "mt-4", "fs-4", "fw-bold");
//   document.querySelector(".masthead-content .container-fluid").appendChild(countdownContainer);

//   // Set your launch date here 👇
//   const launchDate = new Date("2025-12-31T00:00:00").getTime();

//   const updateCountdown = () => {
//     const now = new Date().getTime();
//     const distance = launchDate - now;

//     if (distance <= 0) {
//       countdownContainer.textContent = "We are live! 🚀";
//       clearInterval(timer);
//       return;
//     }

//     const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//     countdownContainer.textContent = `Launching in ${days}d ${hours}h ${minutes}m ${seconds}s`;
//   };

//   const timer = setInterval(updateCountdown, 1000);
//   updateCountdown();

//   // ================================
//   // Button hover glow effect
//   // ================================
//   const button = document.querySelector("#submitButton");
//   if (button) {
//     button.addEventListener("mouseenter", () => {
//       button.style.boxShadow = "0 0 15px rgba(255,255,255,0.6)";
//       button.style.transition = "box-shadow 0.3s ease";
//     });

//     button.addEventListener("mouseleave", () => {
//       button.style.boxShadow = "none";
//     });

//     // ================================
//     // Button click listener
//     // ================================
//     button.addEventListener("click", (e) => {
//       e.preventDefault();
//       alert("Thanks for subscribing! We'll keep you updated 🚀");
//     });
//   }
// });
// effects.js — interactions for Life script, contact button, social rail
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1) Split lines into words and enable hover-color per word ---------- */
  const lineNodes = document.querySelectorAll('.life-script p');
  const hoverColors = ['#00c6ff', '#00ff99', '#ffcc00', '#ff6699', '#ff6600'];

  lineNodes.forEach((p, lineIndex) => {
    const words = p.textContent.trim().split(' ').filter(Boolean);
    // replace with spans
    p.innerHTML = words.map(w => `<span class="word">${escapeHtml(w)}</span>`).join(' ');
    // add trailing space after each word (via CSS inline-block spacing works)
  });

  // word hover color behavior
  const wordNodes = document.querySelectorAll('.life-script .word');
  wordNodes.forEach(word => {
    word.addEventListener('mouseenter', () => {
      const c = hoverColors[Math.floor(Math.random() * hoverColors.length)];
      word.style.color = c;
      word.style.transition = 'color .28s ease, transform .18s ease';
    });
    word.addEventListener('mouseleave', () => {
      word.style.color = '';
    });
  });

  /* ---------- 2) Staggered fade-in for each line ---------- */
  const lines = Array.from(document.querySelectorAll('.life-script p'));
  lines.forEach((line, i) => {
    const delay = 400 + i * 260; // ms
    setTimeout(() => {
      line.style.transition = 'opacity .6s ease, transform .6s ease';
      line.style.opacity = '1';
      line.style.transform = 'translateY(0)';
    }, delay);
  });

  /* ---------- 3) Contact button behavior (glow on click + friendly message) ---------- */
  const contactBtn = document.getElementById('contactButton');
  const emailInput = document.getElementById('emailInput');

  if (contactBtn) {
    contactBtn.addEventListener('click', (e) => {
      e.preventDefault();

      // quick validation (simple)
      const email = emailInput ? emailInput.value.trim() : '';
      if (email && !validateEmail(email)) {
        contactBtn.textContent = 'Enter a valid email';
        contactBtn.classList.add('glow');
        setTimeout(() => {
          contactBtn.classList.remove('glow');
          contactBtn.textContent = 'Contact Me';
        }, 2000);
        return;
      }

      // Visual feedback (glow + text)
      contactBtn.classList.add('glow');
      contactBtn.textContent = 'Thanks for reaching out!';
      setTimeout(() => {
        contactBtn.classList.remove('glow');
        contactBtn.textContent = 'Contact Me';
        if (emailInput) emailInput.value = '';
      }, 2500);

      // Optional: replace this with real submission call (AJAX/fetch) later
    });
  }

  /* ---------- 4) Social icons slide-in (and hover already handled in CSS) ---------- */
  const socialCircles = document.querySelectorAll('.social-circle');
  // stagger appearance from top to bottom so spacing feels natural
  socialCircles.forEach((c, idx) => {
    setTimeout(() => {
      c.classList.add('visible');
    }, 700 + idx * 140);
  });

  /* ---------- Utilities ---------- */
  function validateEmail(email) {
    // simple regex for basic validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function escapeHtml(text) {
    // small escape to avoid HTML injection if text changes
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return String(text).replace(/[&<>"']/g, (m) => map[m]);
  }
});
