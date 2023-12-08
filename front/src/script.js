import calles from "./sriptModule.js";
import { openRegister, closeRegister } from "./scriptModules2.js";
import './registerService.js'
const $imageSection = document.getElementById("box-Sites");
const buttonsS = document.querySelectorAll("#bScrool");
const b_habitantes = document.querySelector("#btn-habitantes");
const calles_scroll = document.getElementById('scrolls-calles')
const buttonSTop = document.querySelector("#scrollBtn");
const btnCalles = document.querySelectorAll("#btnCalles");

// fin de los import //

// variables de calles //
let nameCA = document.getElementById("nameC-Actual");
let textCA = document.getElementById("textoC-Actual");
let count = 0;

//Ir a la derecha
function updateImageRigth() {
  //Uso de la ternaria
  count === calles.length - 1 ? (count = 0) : count++;
  //cambio de imagen
  $imageSection.style.transition = "background 0.6s ease";
  $imageSection.style.background = `url('../public/assets/TodasLasCalles/${calles[count].url}') left / 50% 100% no-repeat`;
  $imageSection.style.backgroundColor = "rgb(24, 32, 57)";
  nameCA.textContent = calles[count].name;
  textCA.textContent = calles[count].text;

  setTimeout(() => {
    $imageSection.style.transition = "none";
  }, 500);
}

//Ir a la izquierda
function updateImageLeft() {
  //Uso de la ternaria
  count === 0 ? (count = calles.length - 1) : count--;

  //cambio de imagen
  $imageSection.style.transition = "background 0.8s ease";
  $imageSection.style.background = `url('../public/assets/TodasLasCalles/${calles[count].url}') left / 50% 100% no-repeat`;
  $imageSection.style.backgroundColor = "rgb(24, 32, 57)";
  nameCA.textContent = calles[count].name;
  textCA.textContent = calles[count].text;
  setTimeout(() => {
    $imageSection.style.transition = "none";
  }, 500);
}

// Scrolls de la pagina //
function scrollToSection(evt) {
  const target = evt.target
  
  let targetElement = document.getElementById(target.name);
  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: "smooth",
    });
  }
}

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  var scrollBtn = document.getElementById("scrollBtn");

  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
}

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

//Eventos de los botones//


btnCalles.forEach((btn) => {
  btn.addEventListener("click", (evt) => {
    if (evt.target.name === "before") updateImageLeft();
    if (evt.target.name === "after") updateImageRigth();
  });
});

buttonSTop.addEventListener("click", scrollToTop);
b_habitantes.addEventListener("click", scrollToSection);
buttonsS[0].addEventListener("click", scrollToSection)
buttonsS[1].addEventListener("click", scrollToSection)
calles_scroll.addEventListener("click", scrollToSection)



// Fin de los scrolls //
