const DESPLAZAR = 10;
let pantalla = document.body.getBoundingClientRect();
let score = 0;
let nave = document.getElementById('nave');
let comenzar = null;
let eliminar = null;
let juego = null;
let velocidad = null;
let dificultad = 0;

function play(){
    initComponents();
}

function initComponents(){
    //Reniciar contadores
    score = 0;
    dificultad = 0;
    //iniciar nave
    nave.src = 'images/nave.png';
    nave.style.transform = 'translate(0,0)';
    //quitar presentacion, en caso que sea visible
    let presentacion = document.getElementById('presentacion');
    presentacion.style.display = 'none';
    //quitar vista de perdida, en caso que sea visible
    let perdiste = document.getElementById('perdiste');
    perdiste.style.display = 'none';
    //inicializar los metodos que se repiten            
    comenzar = setInterval(agregarMeteoro, 2000);
    eliminar = setInterval(quitarMeteoro, 500);
    juego = setInterval(verificarEstadoJuego, 100);
    velocidad = setInterval(aumentarVelocidad, 10000);
}

function finalizarJuego(){
    clearInterval(velocidad);
    clearInterval(comenzar);
    clearInterval(eliminar);
    clearInterval(juego);
}

function aumentarVelocidad() {
    dificultad = dificultad + 1;
    comenzar = setInterval(agregarMeteoro, 2000 - dificultad);
}

/**
 * *este metodo funciona correctamente
 */
document.addEventListener('keypress',(e)=>{
    let bounds = nave.getBoundingClientRect();
    let x = bounds.x;
    let y = bounds.y;
    switch(e.code){
        case 'KeyA': 
            x = x == 0 ? 0 : x - DESPLAZAR;
        break;
        case 'KeyS':
            if((y + bounds.height) >= pantalla.height){
                y = pantalla.height - bounds.height;
            }else{
                y = y + DESPLAZAR;
            }
        break;
        case 'KeyD':
            if((x + bounds.width) >= pantalla.width){
                x = pantalla.width - bounds.width;
            }else{
                x = x + DESPLAZAR;
            }
        break;
        case 'KeyW':
            y = y == 0 ? 0 : y - DESPLAZAR;
        break;
    }
    nave.style.transform = `translate(${x}px,${y}px)`;
});

function verificarEstadoJuego(){
    score = score + 5;
    let villanos = document.getElementsByClassName('meteoro');
    let personaje = document.getElementById('nave').getBoundingClientRect();
    let posicionX = personaje.x + personaje.width;
    let posicionInicialY = personaje.y;
    let posicionFinalY = personaje.y + personaje.height;
    
    let record = document.getElementById('score');
    record.innerHTML = score;
    
    for (let i = 0; i < villanos.length; i++) {
        let villano = villanos[i].getBoundingClientRect();
        let villanoPosicioninicialX = villano.x;
        let villanoPosicionfinalX = villano.x + villano.width;
        let villanoPosicioninicialY = villano.y;
        let villanoPosicionFinalY = villano.y + villano.height;
        if(
            (posicionX >= villanoPosicioninicialX && posicionX <= villanoPosicionfinalX) &&
            (
                (posicionInicialY >= villanoPosicioninicialY && posicionInicialY <= villanoPosicionFinalY) ||
                (posicionFinalY >= villanoPosicioninicialY && posicionFinalY <= villanoPosicionFinalY)
            )            
        ){
            let personaje = document.getElementById('nave');
            personaje.src = 'images/explotar.png';
            
            let perdiste = document.getElementById('perdiste');
            perdiste.style.display = 'flex';
            
            let record = document.getElementById('record');
            record.innerHTML = score;
            finalizarJuego();
        }
    }
}

/**
 * este metodo agrega un nuevo meteoro a la pantalla
 */
function agregarMeteoro() {
    let y = Math.floor(Math.random() * pantalla.height);
    const villano = document.createElement("div");
    villano.classList.add("meteoro");
    villano.style.transform = `translateY(${y-50}px)`;
    villano.style.animation = 'mover 5.5s linear';
    villano.id = `VLL${Math.floor(Math.random() * 100)}`;
    document.body.appendChild(villano);
}

/**
 * este metodo se encarga de eliminar los meteoros que salen de la pantalla
 */
function quitarMeteoro(){
    let meteoros = document.getElementsByClassName('meteoro');
    for (let i = 0; i < meteoros.length; i++) {
        let id = meteoros[i].getAttribute('id');
        if(document.getElementById(id).getBoundingClientRect().x < 0){
            document.getElementById(id).remove();
        }
    }
}