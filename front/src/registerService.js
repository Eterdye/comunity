import { post, get } from "./requestService.js";
import validate from "./registerValidation.js";
import { openRegister, closeRegister, clearInputs } from "./scriptModules2.js";
const Toast = Sweetalert2.mixin({
  toast: true,
  position: "top-right",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Sweetalert2.stopTimer;
    toast.onmouseleave = Sweetalert2.resumeTimer;
  }
});


const cleanTable = () => {
  document.querySelector("tbody").innerHTML = "";
};

const destroy = (id) => {
  post("/user_destroy", { id })
    .then((res) => res.json())
    .then((res) => {
      cleanTable();
      res.forEach((item) => insertObjectInTable(item));
    });
};

const insertObjectInTable = (json) => {
  const { name, lastname, ci, gender, id } = json;
  const tr = document.createElement("tr");

  const content = `
        <td>${id}</td>
        <td>${name}</td>
        <td>${lastname}</td>
        <td>${ci}</td>
        <td>${gender}</td>
    `;
  tr.innerHTML = content;

  const td = document.createElement("td");
  const button = document.createElement("button");

  button.addEventListener("click", () => destroy(id));
  button.innerText = "Borrar";

  td.appendChild(button);
  tr.appendChild(td);
  document.querySelector("tbody").appendChild(tr);
};

document.querySelector("#enviar").addEventListener("click", async () => {
  const name = document.querySelector("#login").value;
  const lastname = document.querySelector("#apellido").value;
  const ci = document.querySelector("#cedula").value;
  let gender = Array.from(
    document.querySelectorAll("input[type='radio']")
  ).find((item) => item.checked);
  gender = gender ? gender.value : "M";

  if (!validate({ name, lastname, ci, gender })) {
    Sweetalert2.fire({
      title: "Un error ha ocurrido!",
      text: "Alguno de los datos es invalido",
      icon: "error",
    });

    return;
  }
  
  post("/register", {
    name,
    lastname,
    ci,
    gender,
  })
    .then((res) => res.json())
    .then((json) => {
      insertObjectInTable(json);
      clearInputs()
      Toast.fire({
        icon: "success",
        title: "Usuario registrado con exito!"
      })
      closeRegister()
    })
});

document.addEventListener("DOMContentLoaded", () => {
  get("/users")
    .then((res) => res.json())
    .then((res) => {
      res.forEach((item) => insertObjectInTable(item));
    });
});
