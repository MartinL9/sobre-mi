# Calculadora Básica

Esta es una calculadora básica creada utilizando HTML, CSS y JavaScript. Puedes realizar operaciones simples de suma, resta, multiplicación y división.

## Uso

1. Clona o descarga este repositorio en tu máquina local.
2. Abre el archivo `index.html` en tu navegador web para cargar la calculadora.
3. Ingresa los números y selecciona la operación que deseas realizar.
4. Haz clic en el botón "Calcular" para ver el resultado.
5. Haz clic si es necesario en el botón "Borrar" para limpiar los 2 campos de números.
6. Los resultados de tus operaciones se registrarán automáticamente en la tabla de historial.
7. Haz clic si es necesario en "Limpiar Historial" para limpiar resultados y operaciones anteriores.

## Historial Interactivo

La característica principal de esta calculadora es el historial interactivo. Cuando haces clic en un resultado en la tabla de historial, el valor numérico se llena automáticamente en el primer campo de entrada.

- Para usar un resultado del historial en un nuevo cálculo:
  - Haz clic en la fila correspondiente en la tabla de historial.
  - El número se llenará en el campo de entrada superior.
  - Realiza una nueva operación con el número del historial y otro número de tu elección.
  - Haz clic en "Calcular" para ver el nuevo resultado.

## Tecnologías Utilizadas

- HTML
- CSS
- JavaScript

## Características

- Realiza operaciones básicas de suma, resta, multiplicación y división.
- Interfaz simple y fácil de usar.
- Cuenta con un historial de operaciónes interactivo para reutilizar resultados anteriores ademas de un botón para la limpieza de dicha sección.

## Manejo de Errores

En caso de que ocurran errores durante el cálculo, la calculadora mostrará un mensaje de error en la pantalla. Algunos ejemplos de posibles errores son:

- División por cero.
- Ingreso de ningún número o NaN.
- Resultado infinito o demasiado grande.
- Resultados que exceden el número más grande representable con precisión en JavaScript.

## Bugs y Arreglos

A continuación, se presentan algunos de los bugs de versiones anteriores de la calculadora y los arreglos realizados: 

1. **División por cero muestra error no relacionado:** La división por cero no manejaba correctamente el caso de error y mostraba en su lugar otro error por numero invalido.
    - **Arreglo:** Se ha ajustado la sección Comprobación y errores, donde la condicional ahora toma los valores numéricos en vez del resultado.

2. **Resultado Infinito Causa Desbordamiento:** Infinitos causaban overflow en su contenedor.
    - **Arreglo:** Se creo la condicional de si el resultado es infinito de un mensaje de error.

3. **Resultado al ser un numero grande era ilegible:** Resultados grandes causaban overflow e ilegibilidad.
    - **Arreglo:** Se modificó la condicional para verificar si el valor absoluto del resultado es mayor al máximo seguro representable por JS.

4. **Historial de operaciónes guardaba NaN "operación" NaN:** Al calcular sin ningún número en los inputs el historial guardaba NaN.
    - **Arreglo:** Se creó una condicional que en vez de guardar NaN "operación" NaN, guarde Operación invalida Ingrese números.

5. **Boton del historial solo eliminaba su primer elemento:** Al cliquear Limpiar Historial solo eliminaba el primer elemento en la lista dejando los otros intactos.
    - **Arreglo:** Se hizo uso de un while para iniciar un bucle que se ejecutara mientras el "tbody" tenga elementos hijos, dentro del bucle se utilizó el método "removeChild()" para eliminar el primer hijo hasta que el bucle se complete.

6. **Dividir numeros grandes daba resultados en formato cientifico:** Al realizar operaciones de división con números grandes, el resultado con decimales se mostraba en formato científico, lo que dificultaba la lectura. Por ejemplo: 100000 ÷ 3 = 3.33333e+4.
    - **Arreglo:** Se implementó la funcion llamada "formatResult()" que toma partes de codigo anterior de Comprobación y errores con la adición de: 
        - Verificar si el resultado es de tipo numérico utilizando "typeof result === 'number'".
        - Si el resultado es un número, verifica si su valor absoluto es mayor que "Number.MAX_SAFE_INTEGER". Esto evita que se muestren resultados con pérdida de precisión debida a limitaciones de JavaScript para números grandes
        - Si el resultado cumple con las condiciones anteriores, se formatea utilizando ".toFixed(6)" para limitar la cantidad de decimales a 6 y luego se convierte a un número y nuevamente a una cadena de texto. Esto elimina los ceros innecesarios en la parte decimal y presenta el resultado en un formato más legible.
        - Si el resultado no es un número (por ejemplo, un mensaje de error), se mantiene sin cambios.


## Créditos

Este proyecto fue creado como Práctico 1 de Argentina Programa 4.0 Segunda Parte, presentada por Universidad Nacional de Córdoba Facultad de Matemática, Astronomía, Física y Computación (FAMAF).
