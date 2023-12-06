const formRegister = document.querySelector('#formRegister')
const vForm = document.querySelector('#close-r')
const closeBtn = document.querySelector('#close-register')

function openRegister() {
    let overlay = document.getElementById("registrationOverlay");
    let registrationForm = document.getElementById("registro-formulario");

    if (overlay.style.display === "none" || overlay.style.display === "") {
        overlay.style.display = "block";
        registrationForm.style.display = "block";
        document.body.style.overflow = "hidden";
    } else {
        closeRegistration();
    }
}

function closeRegister() {
    let overlay = document.getElementById("registrationOverlay");
    let registrationForm = document.getElementById("registro-formulario");

    overlay.style.display = "none";
    registrationForm.style.display = "none";
    document.body.style.overflow = "auto";
}


function authenticate (evt) {

    
    
}

//Lisstener//
closeBtn.addEventListener("click", closeRegister)
vForm.addEventListener("click", authenticate)
formRegister.addEventListener("click", openRegister)
//

export  { openRegister, closeRegister }