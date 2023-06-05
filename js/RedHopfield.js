/** Clase que representa una implementación de la Red Hopfield */
class RedHopfield {
  constructor(neuronas) {
    this.patronesUtilizados = [];
    this.neuronas = neuronas;
    this.pesos = new Matriz(neuronas, neuronas); // Representa los pesos sinápticos entre las neuronas de la red.
  }

  // Vuelve a calcular la matriz de pesos de la red con un patrón de entrada

  entrenar(patron) {
    this.patronesUtilizados.push(new Matriz(1, patron.width, patron.data)); // Agrega el patrón utilizado a la lista de patrones

    this.pesos = new Matriz(this.neuronas, this.neuronas); // Reinicia la matriz de pesos

    let valorPromedio =
      this.patronesUtilizados
        .reduce((a, b) => a.sum(b)) // Suma todos los patrones utilizados
        .data[0].reduce((a, b) => a + b) /
      (this.patronesUtilizados.length * this.neuronas); // Calcula el promedio de los valores

    let restarPatron = null;

    // Calcula la matriz de pesos
    for (let i = 0; i < this.patronesUtilizados.length; i++) {
      restarPatron = this.patronesUtilizados[i].restar(valorPromedio); // Resta el valor promedio a cada patrón

      this.pesos = this.pesos.sum(
        restarPatron.transponer().multiplicar(restarPatron) // Calcula el producto de la matriz transpuesta del patrón por sí mismo
      );
    }

    this.pesos = this.pesos.dividir(this.neuronas); // Divide la matriz de pesos por el número de neuronas

    // Establece los valores diagonales de la matriz de pesos como 0
    for (let i = 0; i < this.neuronas; i++) {
      for (let j = 0; j < this.neuronas; j++) {
        if (i == j) this.pesos.data[i][j] = 0;
      }
    }
  }

  // Devuelve el patrón más similar al patrón de entrada como parámetro

  buscarPatron(patron) {
    let success = false;
    let newPrediction = null;

    let prediction = patron
      .multiplicar(this.pesos) // Realiza la multiplicación de la matriz de entrada con la matriz de pesos
      .activacion(function (x) {
        // Se aplica una función de activación a la predicción.
        return x <= 0 ? -1 : 1;
      });

    let maxIterations = 100;
    let iterations = 0;

    while (!success && iterations < maxIterations) {
      // Se realiza una nueva predicción multiplicando la predicción actual con la matriz de pesos y aplicando la función de activación.
      newPrediction = prediction
        .multiplicar(this.pesos)
        .activacion(function (x) {
          return x <= 0 ? -1 : 1;
        });

      // Se compara la nueva predicción con la predicción anterior. Si son iguales, se sale del bucle.
      if (newPrediction.comparar(prediction)) break;
      else iterations++;
    }

    //Se devuelve la última predicción obtenida o el patrón más similar encontrado
    return newPrediction;
  }
}
