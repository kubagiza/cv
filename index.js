// // podpinamy sie pod wszystkie headery akordeonu
// // przechodzimy przez nie dzieki forEACH
// document.querySelectorAll('.title').forEach(header => {
//     header.addEventListener('click', () => {
//         // w razue kiedy klikniemy to pobieramy nasza tresc ktora musimy rozwinac
//         const content = header.nextElementSibling;
//         // dodajemy nasza klase active dzieki czemu nasz obiekt zwiekszy sie do max 1000px 
//         header.classList.toggle('active');
//         // Automatyczne dostosowanie max-height na podstawie zawartości
//         // tą nasza wysokosc pobierzemy z tresci naszego dokumentu
//         content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";
//     });
// });


document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.accordion-header').forEach(header => {

    const content = header.nextElementSibling;      // odpowiadająca .grid

    // domyślnie schowane
    content.style.maxHeight = 0;

    header.addEventListener('click', () => {

      const isOpen = header.classList.toggle('active');

      // (opcjonalnie) zwijaj pozostałe sekcje —
      // usuń poniższą pętlę, jeśli chcesz otwierać kilka naraz
      if (isOpen) {
        document.querySelectorAll('.accordion-header').forEach(h => {
          if (h !== header) {
            h.classList.remove('active');
            h.nextElementSibling.style.maxHeight = 0;
          }
        });
      }

      // rozwijanie / zwijanie klikniętej sekcji
      content.style.maxHeight = isOpen ? content.scrollHeight + 'px' : 0;
    });
  });
});

function attachAutoScroll(scroller){
  let raf;                 // do requestAnimationFrame

  scroller.addEventListener('mousemove', e => {
    const {left, width} = scroller.getBoundingClientRect();
    const x = e.clientX - left;
    const edge = width * 0.25;            // 25 % od krawędzi
    const maxSpeed =45;                  // px / frame

    let speed = 0;
    if (x < edge)           speed = -maxSpeed * (1 - x/edge);
    else if (x > width-edge) speed =  maxSpeed * ((x-(width-edge))/edge);

    cancelAnimationFrame(raf);
    if (speed !== 0){
      const step = () => {
        scroller.scrollLeft += speed;
        raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }
  });

  scroller.addEventListener('mouseleave', () => cancelAnimationFrame(raf));
}

document.addEventListener('DOMContentLoaded', () => {
  /* Twój kod od akordeonu… */

  /* podpinamy auto-scroll do wszystkich pasków zdjęć */
  document.querySelectorAll('.image-scroller').forEach(attachAutoScroll);
});