/** Clase que representa una matriz de 2 dimensiones */
class Matriz {
  constructor(height, width, data = null) {
    this.height = height;
    this.width = width;
    this.data = [];

    // Si el usuario no pasa los datos de inicialización entonces se inician con 0
    for (let i = 0; i < this.height; i++) {
      this.data.push([]);

      for (let j = 0; j < this.width; j++) {
        this.data[i].push(data != null ? data[i][j] : 0);
      }
    }
  }

  // Operaciones de transformación de matrices

  transponer() {
    let result = new Matriz(this.width, this.height);

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        result.data[j][i] = this.data[i][j];
      }
    }

    return result;
  }

  // Operaciones con matrices

  sum(matriz) {
    // Solo se pueden sumar dos matrices si ambas tienen la misma altura y anchura
    if (this.height != matriz.height || this.width != matriz.width) {
      throw "Las dos matrices deben ser del mismo tamaño para sumarlas";
    }

    let result = new Matriz(this.height, this.width);

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        result.data[i][j] = this.data[i][j] + matriz.data[i][j];
      }
    }

    return result;
  }

  multiplicar(matriz) {
    if (this.width != matriz.height) {
      throw "La matriz actual debe tener el mismo ancho que la altura de la matriz ingresada para multiplicarlas.";
    }

    let result = new Matriz(this.height, matriz.width);

    for (let i = 0; i < this.height; i++) {
      for (let k = 0; k < matriz.width; k++) {
        let sum = 0;

        for (let j = 0; j < this.width; j++) {
          sum += this.data[i][j] * matriz.data[j][k];
        }

        result.data[i][k] = sum;
      }
    }

    return result;
  }

  // Operaciones elemento por elemento

  restar(num) {
    let result = new Matriz(this.height, this.width);

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        result.data[i][j] = this.data[i][j] - num;
      }
    }

    return result;
  }

  dividir(num) {
    let result = new Matriz(this.height, this.width);

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        result.data[i][j] = this.data[i][j] / num;
      }
    }

    return result;
  }

  // Se utiliza para aplicar una función de activación a cada elemento de la matriz.

  activacion(func) {
    let result = new Matriz(this.height, this.width);

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        result.data[i][j] = func(this.data[i][j]);
      }
    }

    return result;
  }

  // Comparación de matrices

  comparar(matriz) {
    if (this.height != matriz.height || this.width != matriz.width) {
      return false;
    }

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.data[i][j] != matriz.data[i][j]) return false;
      }
    }

    return true;
  }
}
