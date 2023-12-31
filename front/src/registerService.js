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
  },
});


let tableData = [];

const cleanTable = () => {
  document.querySelector("tbody").innerHTML = "";
};

const destroy = (id) => {
  post("/user_destroy", { id })
    .then((res) => res.json())
    .then((res) => {
      tableData = res;
      createTableFromArray();
    });
};

function search(evt) {
  const value = evt.target.value
  const tempData = tableData.filter(user => user.name.toLowerCase().includes(value.toLowerCase()) || user.ci.toLowerCase().includes(value.toLowerCase()) || user.lastname.toLowerCase().includes(value.toLowerCase()))
  createTableFromArray(tempData)
}

const createTableFromArray = (tableDataTemp = tableData) => {
  cleanTable()
  tableDataTemp.forEach((user) => {
    const { name, lastname, ci, gender, id } = user;
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
    const buttonEdit = document.createElement("button");
    
    button.addEventListener("click", () => destroy(id));
    buttonEdit.addEventListener('click', ()=> {
      document.querySelector("#userId").value = user.id
      document.querySelector("#login").value = user.name
      document.querySelector("#apellido").value = user.lastname;
      document.querySelector("#cedula").value = user.ci;
      let gender = Array.from(
        document.querySelectorAll("input[type='radio']")
      ).find((item) => item.value === user.gender.toUpperCase());
  
      gender.click()

      openRegister()
    })

    button.innerText = "Borrar";
    buttonEdit.innerText = 'Editar'

    td.appendChild(button);
    td.appendChild(buttonEdit)

    tr.appendChild(td);
    document.querySelector("tbody").appendChild(tr);
  });
};

document.querySelector("#enviar").addEventListener("click", async () => {
  const userId = document.querySelector("#userId").value
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

  const url = userId ? '/update' : '/register'

  post(url, {
    name,
    lastname,
    ci,
    gender,
    userId
  })
    .then((res) => res.json())
    .then((json) => {
      
      if(userId){
        tableData = tableData.map(user => user.id == json.id ? json : user) 
      }
      else {
        tableData.push(json);
      }

      createTableFromArray();
      clearInputs();
      Toast.fire({
        icon: "success",
        title: "Usuario registrado con exito!",
      });
      closeRegister();
    });
});

document.getElementById('search').addEventListener('keyup', search)

document.addEventListener("DOMContentLoaded", () => {
  get("/users")
    .then((res) => res.json())
    .then((res) => {
      tableData = res;
      createTableFromArray();
    });
});

