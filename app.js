// Declaración de variables
let numeroMaximo = 100;
let numeroMinimo = 1;
let numeroSecreto = 0;
let intentos = 1;
let intentosMaximos = 10;

// Función para asignar un texto a un elemento HTML
function asignarElementoTexto(elemento, texto) {
    // Se selecciona el elemento HTML utilizando el parámetro 'elemento' y se almacena en la variable 'elementoHTML'
    let elementoHTML = document.querySelector(elemento);

    // A la variable (elemento) se le coloca un texto que será igual al parámetro 'texto'
    elementoHTML.innerHTML = texto;
    return;
}

// Función para generar un número secreto
function generarNumeroSecreto(){
    // Se elige un número pseudoaleatorio numeroMinimo y numeroMaximo
    let numeroGenerado = Math.floor((Math.random() * numeroMaximo) + numeroMinimo);

    // Retorna el numero pseudoaleatorio que se a creado
    return numeroGenerado;
}

// Función para capturar las teclas 'Enter' y 'Space'
function pulsarEnterSpace() {
    let keyCodeEnter = 13; // El código clave del enter es el 13
    let keyCodeSpace = 32; // El código clave de la tecla space (espaciadora o espacio) es el 32

    // Se compara cual tecla es presionada al momento de estar (focus) en el input numerico (id = 'valorUsuario')
    // En caso de presionar el Enter disparará un click en el boton 'intentar' (id = 'intentar')
    if(event.keyCode === keyCodeEnter) { 
        document.getElementById('intentar').click();

    } 
    // Si la tecla presionada es el espacio o barra espaciadora realizara un click en el boton 'Nuevo Juego' (id = 'reiniciar')
    if(event.keyCode === keyCodeSpace) {
        document.getElementById('reiniciar').click();
    }
}

// Función para limpiar la caja de texto
function limpiarCaja(){
    // Selecciona el elemento HTML con el id = 'valorUsuario' e iguala su valor (value) = a nada ('')
    document.querySelector('#valorUsuario').value = '';
}

// Función para establecer las condiciones iniciales del juego
function condicionesIniciales() {
    // Establece un texto al único h1 (encabezado de primer nivel) del documento HTML
    asignarElementoTexto('h1', 'Juego del número secreto');
    
    // Establece un texto al único p (parráfo) del documento HTML
    asignarElementoTexto('p', `Elige un número del ${numeroMinimo} al ${numeroMaximo}:`);
    
    // Llama la funcion 'limpiarCaja()'
    limpiarCaja();
    
    // Desactiva el botón con el id = 'reiniciar'
    document.getElementById('reiniciar').disabled = true;

    // Genera un nuevo numero secreto
    numeroSecreto = generarNumeroSecreto();

    // Reinicializa los intentos a 1
    intentos = 1;
}

// Función para verificar el intento del usuario
function verificarIntento(){
    // Almacena el número que eliga el usuario en la variable 'numeroDeUsuario'
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    // Verificar si el número ingresado es igual al número secreto
    // Si lo es, se muestran unos mensajes para indicarle al usuario en cuantos intentos ganó el juego, y se activan y desactivan algunos botones
    if (numeroDeUsuario === numeroSecreto){
        asignarElementoTexto('p', `¡Felicidades!<br>Acertaste el número secreto ${intentos == 1 ? 'a la primera' : `en tu ${intentos}º intento`}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('intentar').disabled = true;
    } else{
        // Verificar si el número ingresado es mayor o menor que el número secreto, en caso que el if sea falso, se muestran mensajes para asistir al jugador
        if(numeroDeUsuario > numeroSecreto){
            asignarElementoTexto('p', 'El número secreto es menor');
        } else{
            asignarElementoTexto('p', 'El número secreto es mayor');
        }
        
        // Se limpia el input para que el usuario pueda volver a intentar
        limpiarCaja();
    }          

    // Se incrementan los intentos que lleva el usuario
    intentos++;

    // Verificar si se han agotado los intentos máximos
    // Se muestran unos mensajes para indicarle al usuario que se le agotaron los intentos, y se activan y desactivan algunos botones

    if (intentos > intentosMaximos && numeroDeUsuario != numeroSecreto){
        asignarElementoTexto('p', `¡Se ${intentos == 2 ? 'agotó su único intento!' : `agotaron sus ${intentosMaximos} intentos!`}<br>El número secreto era: ${numeroSecreto}<br>Pulsa el botón "Nuevo Juego"`);
        document.getElementById('intentar').disabled = true;
        document.getElementById('reiniciar').disabled = false;
    }

    // Finaliza la función
    return;
}

// Función para reiniciar el juego
function reiniciarJuego() {
    // Establece las condiciones iniciales que debe tener el juego
    condicionesIniciales();

    // Se activa el botón de 'intentar'
    document.getElementById('intentar').disabled = false;
}

// Esta función sirve para realizar pruebas, que involucren el comportamiento del programa cada vez que se gana (el juego gana solo)
function autoganarPartida(cantRondasGanar) {
    // Variables con la selección de elementos HTML
    let intentar = document.getElementById('intentar');
    let reiniciar = document.getElementById('reiniciar');
    let numUser = document.getElementById('valorUsuario');

    // Bucle 'for' para ganar el juego una cantidad de terminada de veces (parámetro 'cantRondasGanar')
    for (let i = 0; i < cantRondasGanar; i++) {
        // Se muestra el numero secreto en la consola para fines de pruebas
        console.log(numeroSecreto);
        
        // Se establece el valor del input númerico al número secreto para que se auto complete
        numUser.value = numeroSecreto;
        
        // Se dispara un click en los distintos botones
        intentar.click();
        reiniciar.click();
    }
    
}

// Método focus() para enfocar el input numerico al cargar la página
window.addEventListener('DOMContentLoaded', (event) => {
    // Al momento de recargar la página esta aparece con un focus en el input numerico (id = 'valorUsuario')
    let numeroInput = document.querySelector('#valorUsuario');
    numeroInput.focus();
});


// Este evento muestra en la consola el código clave de la tecla que se presiona en el live server de nuestro proyecto
// NOTA: Descomentar este evento hará que el programa se dedique únicamente a capturar el código clave de cada tecla que se presione
/*
document.addEventListener('keydown', function(event) {
    console.log('Código de tecla: ' + event.keyCode);
    event.preventDefault();
});
*/

// Establecer condiciones iniciales del juego al cargar la página
condicionesIniciales();

// Se utiliza para realizar pruebas en las cuales se deben comprobar todas las veces que se gana en el juego.
//autoganarPartida(100);
