// Globales
var NETWORK = null;
var WIDTH = 10;
var HEIGHT = 10;

/**
 * Esta función se llama al iniciar la aplicación y dibuja las matrices en la aplicación.
 */
function crearMatrices() {
  let columns = new Array(WIDTH).fill("1fr").join(" ");
  let rows = new Array(HEIGHT).fill("1fr").join(" ");

  $("#inputGrid").css("grid-template-columns", `${columns}`);
  $("#inputGrid").css("grid-template-rows", `${rows}`);
  $("#outputGrid").css("grid-template-columns", `${columns}`);
  $("#outputGrid").css("grid-template-rows", `${rows}`);

  let grids = WIDTH * HEIGHT;

  for (let i = 0; i < grids; i++) {
    $("#inputGrid").append(
      `<div id="input${i}" style="background-color: white;" class="border" onclick=pintar(this)></div>`
    );
    $("#outputGrid").append(
      `<div id="output${i}" style="background-color: white;" class="border"></div>`
    );
  }

  NETWORK = new RedHopfield(WIDTH * HEIGHT);
}

/**
 * Función que muestra todos los patrones de entrenamiento utilizados.
 */
function mostrarPatronesUtilizados() {
  $("#patrones-utilizados > div.grids").empty();

  for (let i = 0; i < NETWORK.patronesUtilizados.length; i++) {
    let patron = NETWORK.patronesUtilizados[i];

    let columns = new Array(WIDTH).fill("1fr").join(" ");
    let rows = new Array(HEIGHT).fill("1fr").join(" ");
    let elements = patron.data[0].map(function (item, index) {
      return `<div id="item${i}${index}" style="background-color: ${item == 1 ? "white" : "black"};" class="border"></div>`;
    });

    $("#patrones-utilizados > div.grids").append(
      `<div class="grid-container">
        <div class="grid" style="grid-template-columns: ${columns}; grid-template-rows: ${rows}">${elements.join(
        ""
      )}</div>
      </div>`
    );
  }
}

/**
 * Cambia el color de un cuadrado a negro. Esta función solo se aplica a la matriz del patrón de entrada.
 */
function pintar(cuadrado) {
  $(`#${cuadrado.id}`).css("background-color", "black");
}

/**
 * Cambia todos los cuadrados dentro de las matrices a fondo blanco.
 */
function limpiarMatrices() {
  $("#inputGrid > div").each(function (index, item) {
    $(item).css("background-color", "white");
  });

  $("#outputGrid > div").each(function (index, item) {
    $(item).css("background-color", "white");
  });
}

/**
 * Se utiliza para transformar la cuadrícula de entrada en una matriz de patrones.
 */
function matrizInput() {
  let data = $("#inputGrid > div").map(function (index, item) {
    let color = $(item).css("background-color");
    return color == "rgb(255, 255, 255)" ? 1 : -1;
  });

  let matrix = new Matriz(1, parseInt(HEIGHT * WIDTH), [data]);

  return matrix;
}

/**
 * Transforma la cuadrícula de entrada en una matriz de 2 dimensiones y entrena la red.
 */
function entrenarRed() {
  let trainData = matrizInput();
  NETWORK.entrenar(trainData);
  mostrarPatronesUtilizados();
}

/**
 * Transforma la cuadrícula de entrada en una matriz de 2 dimensiones y realiza una predicción con la red de Hopfield.
 */
function buscarPatron() {
  let dataForPrediction = matrizInput();
  let prediction = NETWORK.buscarPatron(dataForPrediction);

  $("#outputGrid > div").each(function (index, item) {
    $(item).css(
      "background-color",
      prediction.data[0][index] == 1 ? "white" : "black"
    );
  });
}

window.onload = function () {
  crearMatrices();
};
