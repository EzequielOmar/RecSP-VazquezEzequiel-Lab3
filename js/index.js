import { GetData, PostData, DeleteData, PutData } from "./bd/api.js";
import {
  ObtenerArtPorForm,
  hideDeleteButton,
  showDeleteButton,
  ChangeTextButton,
} from "./funciones/lista.js";

//data es la variable que guardara los datos de la lista
const data = { articulos: [] };
let form = document.forms[0];
//lee el valor de los checkbox del filtro de columnas, si no existe en el localstorage,
//las settea a todas visibles por defecto
let columnas = JSON.parse(localStorage.getItem("columnas")) || {
  0: true,
  1: true,
  2: true,
  3: true,
  4: true,
  5: true,
  6: true,
  7: true,
};

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", handlerClick);
  form.addEventListener("submit", handlerSubmit);
  leerColumnas();
  GetData(data, handlerCheckBoxColumnas);
});

function handlerClick(e) {
  if (e.target.matches("td")) handlerTdClick(e, data);
  if (e.target.matches("#cancel")) handlerLimpiarForm(e);
  if (e.target.matches("#filtro-animal")) handlerFiltro(data);
  if (e.target.matches(".cb_columnas")) handlerCheckBoxColumnas();
}

function handlerSubmit(e) {
  e.preventDefault();
  let id = form.id.value;
  if (id) {
    let artViejo = data.articulos.find((a) => a.id === parseInt(id));
    let artNuevo = ObtenerArtPorForm(form, id);
    if (JSON.stringify(artViejo) === JSON.stringify(artNuevo)) {
      //sin cambios
      alert("no se han realizado modificaciones.");
    } else {
      //modificar
      if (confirm("¿Desea confirmar las modificaciones?")) {
        PutData(id, artNuevo, data);
        GetData(data);
      }
    }
  } else {
    //alta
    PostData(ObtenerArtPorForm(form, Date.now()));
    GetData(data);
  }
}

function handlerDeleteClick(e) {
  e.preventDefault();
  let id = form.id.value;
  if (confirm("¿Seguro que desea eliminar?")) {
    DeleteData(id);
    GetData(data);
  }
  handlerLimpiarForm(e);
}

function handlerLimpiarForm(e) {
  e.preventDefault();
  form.reset();
  ChangeTextButton("send", "Alta");
  hideDeleteButton();
}

function handlerTdClick(e, data) {
  let art = data.articulos.find(
    (a) => a.id === parseInt(e.target.parentNode.dataset.id)
  );
  const { id, titulo, descripcion, precio, animal, raza, fecha, vacuna } = art;
  form.id.value = id;
  form.titulo.value = titulo;
  form.descripcion.value = descripcion;
  form.precio.value = precio;
  form.animal.value = animal;
  form.raza.value = raza;
  form.fecha.value = fecha;
  form.vacuna.value = vacuna;
  showDeleteButton(handlerDeleteClick);
  ChangeTextButton("send", "Modificar");
}

/**
 * maneja el filtro de tipo perro o gato, y modifica los valores de 
 * promedio, maximo, minimo, y promedio de vacunas, acorde al filtro.
 */
function handlerFiltro(data) {
  let $selectFiltro = document.getElementById("filtro-animal");
  let $promedioLabel = document.getElementById("promedio");
  let $maximo = document.getElementById("maximo");
  let $minimo = document.getElementById("minimo");
  let $vacunados = document.getElementById("vacunados");
  let aux = [];
  if ($selectFiltro.value == "todos") aux = data.articulos;
  else
    aux = data.articulos.filter(
      (articulo) => articulo.animal == $selectFiltro.value
    );
  $promedioLabel.innerText =
    aux.reduce(
      (promedio, articulo) => promedio + parseFloat(articulo.precio),
      0
    ) / aux.length;
  $maximo.innerText = aux.reduce(
    (acc, value) => Math.max(acc, value.precio),
    aux[0].precio
  );
  $minimo.innerText = aux.reduce(
    (acc, value) => Math.min(acc, value.precio),
    aux[0].precio
  );
  $vacunados.innerText =
    (100 * aux.filter((articulo) => articulo.vacuna == "si").length) /
    aux.length;
  $vacunados.innerText += "%";
}

/**
 * es llamada una vez al cargar el dom, setea los checkbox de columnas como quedaron
 * en la sesion anterior
 */
function leerColumnas() {
  let $inputs_checkbox = [...document.getElementsByClassName("cb_columnas")];
  $inputs_checkbox.map((i) => {
    i.checked = columnas[parseInt(i.parentElement.cellIndex)];
  });
}

/**
 * es pasada como callback a getData, para que actualice las columnas
 * visibles cuando se regresca la tabla
 */
function handlerCheckBoxColumnas() {
  let $inputs_checkbox = [...document.getElementsByClassName("cb_columnas")];
  $inputs_checkbox.map((i) => {
    columnas[parseInt(i.parentElement.cellIndex)] = i.checked;
    let index = parseInt(i.parentElement.cellIndex) + 1;
    let $td = [
      ...document.querySelectorAll("#lista tr > *:nth-child(" + index + ")"),
    ];
    if (i.checked == false) {
      $td.map((td) => {
        td.setAttribute("class", "d-none");
      });
    } else {
      $td.map((td) => {
        td.removeAttribute("class", "d-none");
      });
    }
  });
  localStorage.setItem("columnas", JSON.stringify(columnas));
}
