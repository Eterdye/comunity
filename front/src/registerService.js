import { post, get } from "./requestService.js";

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
  const { name, lastname, taxt, sex, id } = json;
  const tr = document.createElement("tr");

  const content = `
        <td>${id}</td>
        <td>${name}</td>
        <td>${lastname}</td>
        <td>${taxt}</td>
        <td>${sex}</td>
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
  const apellido = document.querySelector("#apellido").value;
  const ci = document.querySelector("#cedula").value;
  let gender = Array.from(
    document.querySelectorAll("input[type='radio']")
  ).find((item) => item.checked);
  gender = gender?.value;

  post("/register", {
    name,
    lastname: apellido,
    taxt: ci,
    sex: gender,
  })
    .then((res) => res.json())
    .then((json) => {
      insertObjectInTable(json);
    });
});

document.addEventListener("DOMContentLoaded", () => {
  get("/users")
    .then((res) => res.json())
    .then((res) => {
      res.forEach((item) => insertObjectInTable(item));
    });
});
