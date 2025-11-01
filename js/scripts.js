
      const paragraphs = document.querySelectorAll('.life-script p');
      paragraphs.forEach(p => {
        const words = p.textContent.split(' ');
        p.innerHTML = words.map(word => `<span class='word'>${word}</span>`).join(' ');
      });

      const colors = ['#00c6ff', '#00ff99', '#ffcc00', '#ff6699', '#ff6600'];
      document.querySelectorAll('.word').forEach(word => {
        word.addEventListener('mouseover', () => {
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          word.style.color = randomColor;
          word.style.transition = 'color 0.3s ease';
        });
        word.addEventListener('mouseleave', () => {
          word.style.color = '#fff';
        });
      });

    
      const contactButton = document.getElementById('contactButton');
      if (contactButton) {
        contactButton.addEventListener('click', (e) => {
          e.preventDefault();
          contactButton.style.boxShadow = '0 0 20px 5px rgba(0,255,100,0.7)';
          contactButton.textContent = "Thanks for reaching out!";
          setTimeout(() => {
            contactButton.style.boxShadow = 'none';
            contactButton.textContent = "Contact Me";
          }, 2500);
        });

      }
