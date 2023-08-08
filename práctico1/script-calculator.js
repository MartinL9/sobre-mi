// Funcion que limpia los 2 inputs de numeros
function clearDisplays() {
    document.getElementById("num1").value = "";
    document.getElementById("num2").value = "";
}

function clearHistory() {
    let tbody = document.getElementById("historial");
    
    while(tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}

// Funcion main
function calcular() {
    //Variables
    let num1 = parseFloat(document.getElementById('num1').value);
    let num2 = parseFloat(document.getElementById('num2').value);
    let operator = document.getElementById('operator').value;
    let resultado = 0;

    switch(operator) {
        case '+':
            resultado = num1 + num2;
            break;
        case '-':
            resultado = num1 - num2;
            break;
        case '*':
            resultado = num1 * num2;
            break;
        case '÷':
            if(num2 === 0) {
                resultado = "Error No se puede dividir entre cero.";
                } else {
                    resultado = num1 / num2;
            }
            break;
        default: 
            resultado = "Operador inválido"; 
    }

    //Comprobación y errores
    if(isNaN(resultado)) {
        resultado = "Error Números inválidos";
    } else if(resultado === Infinity || resultado === -Infinity) {
        resultado = "Error el resultado es demasiado grande o infinito";
    } else if(Math.abs(resultado) > Number.MAX_SAFE_INTEGER) {
        resultado = "Error el resutado es demasiado grande y no se puede mostrar con precisión";
    }

    //Seleccion, almacenamiento y creador de celdas del historial
    let historialTabla = document.getElementById('historial');
    let row = historialTabla.insertRow(0);
    let cellOperacion = row.insertCell(0);
    let cellResultado = row.insertCell(1);
    cellOperacion.textContent = `${num1} ${operator} ${num2}`;
    cellResultado.textContent = resultado;

    document.getElementById('resultado').textContent = resultado;
}


