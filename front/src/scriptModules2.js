const formRegister = document.querySelector('#formRegister')
const closeBtn = document.querySelector('#close-register')

function clearInputs(){
     document.querySelector("#login").value = '';
     document.querySelector("#apellido").value = '';
     document.querySelector("#cedula").value = '';
     document.querySelector("#userId").value = ''
}

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
    clearInputs()
    let overlay = document.getElementById("registrationOverlay");
    let registrationForm = document.getElementById("registro-formulario");

    overlay.style.display = "none";
    registrationForm.style.display = "none";
    document.body.style.overflow = "auto";
}


//Lisstener//
closeBtn.addEventListener("click", closeRegister)
formRegister.addEventListener("click", openRegister)
//

export { openRegister, closeRegister, clearInputs }