
document.addEventListener('DOMContentLoaded', () => {

  
  const lineNodes = document.querySelectorAll('.life-script p');
  const hoverColors = ['#00c6ff', '#00ff99', '#ffcc00', '#ff6699', '#ff6600'];

  lineNodes.forEach((p, lineIndex) => {
    const words = p.textContent.trim().split(' ').filter(Boolean);
    
    p.innerHTML = words.map(w => `<span class="word">${escapeHtml(w)}</span>`).join(' ');
    
  });

  
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

  
  const lines = Array.from(document.querySelectorAll('.life-script p'));
  lines.forEach((line, i) => {
    const delay = 400 + i * 260; // ms
    setTimeout(() => {
      line.style.transition = 'opacity .6s ease, transform .6s ease';
      line.style.opacity = '1';
      line.style.transform = 'translateY(0)';
    }, delay);
  });

 
  const contactBtn = document.getElementById('contactButton');
  const emailInput = document.getElementById('emailInput');

  if (contactBtn) {
    contactBtn.addEventListener('click', (e) => {
      e.preventDefault();

     
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

    });
  }

  
  const socialCircles = document.querySelectorAll('.social-circle');
 
  socialCircles.forEach((c, idx) => {
    setTimeout(() => {
      c.classList.add('visible');
    }, 700 + idx * 140);
  });

 
  function validateEmail(email) {
   
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function escapeHtml(text) {
   
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return String(text).replace(/[&<>"']/g, (m) => map[m]);
  }
});

