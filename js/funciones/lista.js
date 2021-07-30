import AnuncioMascota from "../modelo/anuncioMascota.js";

function ObtenerArtPorForm(form, id) {
  return new AnuncioMascota(
    parseInt(id),
    form.titulo.value,
    "venta",
    form.descripcion.value,
    form.precio.value,
    form.animal.value,
    form.raza.value,
    form.fecha.value,
    form.vacuna.value
  );
}

function ActualizarListaDinamica(data) {
  let $divLista = document.getElementById("lista");
  while ($divLista.firstChild) $divLista.removeChild($divLista.firstChild);
  if (data.length > 0) {
    let table = document.createElement("table");
    table.appendChild(DibujarTableHead(data));
    table.appendChild(DibujarTableRows(data));
    /*bootstrap clases*/
    if (data.length > 2) table.setAttribute("class", "table-striped");
    table.setAttribute("class", "table table-hover table-bordered");
    $divLista.appendChild(table);
  }
}

function DibujarTableHead(data) {
  let thead = document.createElement("thead");
  let tr = document.createElement("tr");
  for (let entrie of Object.entries(data[0])) {
    if (entrie[0] != "id") {
      let th = document.createElement("th");
      th.innerText = entrie[0];
      th.setAttribute("scope", "col");
      tr.appendChild(th);
    }
  }
  thead.appendChild(tr);
  return thead;
}

function DibujarTableRows(data) {
  let tbody = document.createElement("tbody");
  for (let i = 0; i < data.length; i++) {
    let tr = document.createElement("tr");
    for (let entrie of Object.entries(data[i])) {
      if (entrie[0] === "id") {
        tr.setAttribute("data-id", entrie[1]);
      } else {
        let td = document.createElement("td");
        td.innerText = entrie[1];
        tr.appendChild(td);
        tbody.appendChild(tr);
      }
    }
  }
  return tbody;
}

/**
 * dibuja un boton con el texto "eliminar" y le agrega clases de bootstrap
 * @param {puntero a funcion que maneja el evento del boton} handlerDeleteClick
 */
function showDeleteButton(handlerDeleteClick) {
  let button = document.getElementById("delete");
  let $div = document.getElementById("form-manager");
  if (!button) {
    button = document.createElement("div");
    button.setAttribute("class", "btn btn-danger");
    button.setAttribute("id", "delete");
    button.addEventListener("click", handlerDeleteClick);
    let i = document.createElement("i");
    i.setAttribute("class", "fa fa-trash-o");
    i.setAttribute("aria-hidden", "true");
    let input = document.createElement("input");
    input.setAttribute("type", "submit");
    input.setAttribute("value", "Eliminar");
    button.appendChild(i);
    button.appendChild(input);
  }
  $div.appendChild(button);
}

function hideDeleteButton() {
  let button = document.getElementById("delete");
  if (button) {
    let $div = document.getElementById("form-manager");
    $div.removeChild(button);
  }
}

function agregarSpinner($divSpinner) {
  let filtro = document.getElementById("filtro");
  filtro.setAttribute("style", "display:none;");
  let select = document.getElementById("select_columna");
  select.setAttribute("style", "display:none;");
  let $lista = document.getElementById("lista");
  $lista.innerText = "";
  let spinner = document.createElement("img");
  spinner.setAttribute("src", "./imagenes/dog.gif");
  spinner.setAttribute("alt", "image spinner");
  let text = document.createElement("p");
  text.innerText = "Uuups  esperando...";
  $divSpinner.appendChild(spinner);
  $divSpinner.appendChild(text);
}

function eliminarSpinner($divSpinner) {
  let filtro = document.getElementById("filtro");
  filtro.setAttribute("style", "display:block;");
  let select = document.getElementById("select_columna");
  select.setAttribute("style", "display:block;");
  $divSpinner.innerText = "";
}

function ChangeTextButton(id,text){
  let $button =  document.getElementById(id);
  $button.value = text;
}

export {
  ObtenerArtPorForm,
  agregarSpinner,
  eliminarSpinner,
  ActualizarListaDinamica,
  hideDeleteButton,
  showDeleteButton,
  ChangeTextButton
};
