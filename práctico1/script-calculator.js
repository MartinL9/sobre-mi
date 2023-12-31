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

function formatResult(result) {
    if (typeof result === 'number') {
        if (Math.abs(result) > Number.MAX_SAFE_INTEGER) {
            return "Error el resultado es demasiado grande y no se puede mostrar con precisión";
        }
        return parseFloat(result.toFixed(6)).toString();
    }
    return result;
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
    if(isNaN(num1) || isNaN(num2)) {
        resultado = "Error Números inválidos";
    } else if(resultado === Infinity || resultado === -Infinity) {
        resultado = "Error el resultado es demasiado grande o infinito";
    }

    //Seleccion, almacenamiento y creador de celdas del historial
    let historialTabla = document.getElementById('historial');
    let row = historialTabla.insertRow(0);
    let cellOperacion = row.insertCell(0);
    let cellResultado = row.insertCell(1);
    
    if(!isNaN(num1) && !isNaN(num2)) {
        cellOperacion.textContent = `${num1} ${operator} ${num2}`;
        cellResultado.textContent = formatResult(resultado);
    } else {
        cellOperacion.textContent = "Operación inválida";
        cellResultado.textContent = "Ingrese números";
    }
    
    row.addEventListener('click', () => {
        let textResult = cellResultado.textContent.trim();

        if(!isNaN(textResult)) {
            let numberResult = parseFloat(textResult);
            document.getElementById('num1').value = numberResult;
        }
    });

    document.getElementById('resultado').textContent = formatResult(resultado);
}


