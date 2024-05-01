function createMatrix(matrixNum) {
    const rows = parseInt(document.getElementById(`rows${matrixNum}`).value);
    const cols = parseInt(document.getElementById(`cols${matrixNum}`).value);

    let matrixInput = document.getElementById(`matrix${matrixNum}`);
    matrixInput.innerHTML = '';

    for (let i = 0; i < rows; i++) {
      let rowInputs = document.createElement('div');
      for (let j = 0; j < cols; j++) {
        let input = document.createElement('input');
        input.type = 'number';
        input.setAttribute('placeholder', `(${i + 1},${j + 1})`);
        rowInputs.appendChild(input);
      }
      matrixInput.appendChild(rowInputs);
    }
  }

  function multiplyMatrices() {
    const matrix1 = getMatrixValues('matrix1');
    const matrix2 = getMatrixValues('matrix2');

    if (!matrix1 || !matrix2) {
      alert('Please create both matrices before multiplying.');
      return;
    }

    if (matrix1[0].length !== matrix2.length) {
      alert('Number of columns in Matrix 1 must be equal to number of rows in Matrix 2');
      return;
    }

    const resultMatrix = multiply(matrix1, matrix2);
    displayResult(resultMatrix);
  }

  function getMatrixValues(matrixId) {
    const matrixInputs = document.querySelectorAll(`#${matrixId} input`);
    if (matrixInputs.length === 0) {
      return null;
    }

    const rows = matrixInputs.length / matrixInputs[0].parentElement.children.length;
    const cols = matrixInputs[0].parentElement.children.length;
    let matrix = [];
    let k = 0;

    for (let i = 0; i < rows; i++) {
      matrix[i] = [];
      for (let j = 0; j < cols; j++) {
        matrix[i][j] = parseFloat(matrixInputs[k].value);
        k++;
      }
    }

    return matrix;
  }

  function multiply(matrix1, matrix2) {
    const result = [];
    for (let i = 0; i < matrix1.length; i++) {
      result[i] = [];
      for (let j = 0; j < matrix2[0].length; j++) {
        let sum = 0;
        for (let k = 0; k < matrix1[0].length; k++) {
          sum += matrix1[i][k] * matrix2[k][j];
        }
        result[i][j] = sum;
      }
    }
    return result;
  }

  function displayResult(matrix) {
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = '<h2>Result Matrix:</h2>';
    const table = document.createElement('table');
    table.classList.add('matrix');
    for (let i = 0; i < matrix.length; i++) {
      const row = document.createElement('tr');
      for (let j = 0; j < matrix[i].length; j++) {
        const cell = document.createElement('td');
        cell.textContent = matrix[i][j];
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
    resultElement.appendChild(table);
  }
