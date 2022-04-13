let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("test-soc-slide");
  let dots = document.getElementsByClassName("test-author-one");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" activeAuthor", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " activeAuthor";
  setTimeout(showSlides, 7000);
}

faq()
function faq() {
  let faqquestion = document.querySelectorAll('.faqdroptitle')
  Array.from(faqquestion).forEach(header => {
      header.addEventListener('click', () => {
        if(!header.nextElementSibling.classList.contains('faqShow')){
          for (let i = 0; i < Array.from(faqquestion).length; i++) {
              Array.from(faqquestion)[i].nextElementSibling.classList.remove('faqShow')
              Array.from(faqquestion)[i].firstElementChild.nextElementSibling.classList.remove('angleDown')  
          }
            header.nextElementSibling.classList.toggle('faqShow')
            header.firstElementChild.nextElementSibling.classList.toggle('angleDown')
        } else {
            header.nextElementSibling.classList.remove('faqShow')
            header.firstElementChild.nextElementSibling.classList.remove('angleDown')
        }
      });
  });
}