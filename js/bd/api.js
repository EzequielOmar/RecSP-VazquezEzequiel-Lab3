import {
  ActualizarListaDinamica,
  agregarSpinner,
  eliminarSpinner,
} from "../funciones/lista.js";

export const GetData = (data, callback = null) => {
  agregarSpinner(document.getElementById("spinner-div"));
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 299) {
        data.articulos = JSON.parse(xhr.responseText);
      } else {
        const statusText = xhr.statusText || "Ocurrio un error";
        alert(`Error: ${xhr.status} : ${statusText}`);
      }
      eliminarSpinner(document.getElementById("spinner-div"));
      ActualizarListaDinamica(data.articulos);
      if (callback) callback();
    }
  };
  xhr.open("GET", "http://localhost:5000/mascota");
  xhr.send();
};

export const PostData = (postData, data) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 299) {
        alert("Articulo subido al sistema. ¡Gracias por publicar!");
        GetData(data);
      } else {
        const statusText = xhr.statusText || "Ocurrio un error";
        alert(`Error: ${xhr.status} : ${statusText}`);
      }
    }
  };
  xhr.open("POST", "http://localhost:5000/mascota");
  xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
  xhr.send(JSON.stringify(postData));
};

export const DeleteData = (id) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 299) {
        alert("Eliminado correctamente.");
      } else {
        const statusText = xhr.statusText || "Ocurrio un error";
        alert(`Error: ${xhr.status} : ${statusText}`);
      }
    }
  };
  xhr.open("DELETE", `http://localhost:5000/mascota/${id}`);
  xhr.send();
};

export const PutData = (id, modificado) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 299) {
        alert("Modificado correctamente.");
      } else {
        const statusText = xhr.statusText || "Ocurrio un error";
        alert(`Error: ${xhr.status} : ${statusText}`);
      }
    }
  };
  xhr.open("PUT", `http://localhost:5000/mascota/${id}`);
  xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
  xhr.send(JSON.stringify(modificado));
};
