let pantalla = document.body.getBoundingClientRect();
let score = 0;

document.addEventListener('keypress',(e)=>{
    let personaje = document.getElementById('nave');
    let boundsPersonaje = personaje.getBoundingClientRect();
    let x = personaje.getBoundingClientRect().x;
    let y = personaje.getBoundingClientRect().y;

    const DESPLAZAR = 5;

    if(e.code=='KeyA'){
        x = x == 0 ? 0 : x - DESPLAZAR;
    }
    if(e.code=='KeyS'){
        if((y + boundsPersonaje.height) >= pantalla.height){
            y = pantalla.height - boundsPersonaje.height;
        }else{
            y = y + DESPLAZAR;
        }
    }
    if(e.code=='KeyD'){
        if((x + boundsPersonaje.width) >= pantalla.width){
            x = pantalla.width - boundsPersonaje.width;
        }else{
            x = x + DESPLAZAR;
        }
    }
    if(e.code=='KeyW'){
        y = y == 0 ? 0 : y - DESPLAZAR;
    }
    if(e.code=='Space'){
        comenzarJuego();
    }
    if(e.code=='Enter'){
        finalizarJuego();
    }
    personaje.style.transform = `translate(${x}px,${y}px)`;
});


let comenzar = null;
let eliminar = null;
let game = null;
function comenzarJuego() {
    comenzar = setInterval(agregarVillano, 2000);
    eliminar = setInterval(eliminarVillano, 500);
    game = setInterval(vive, 100);
}

function vive(){
    score = score + 5;
    let villanos = document.getElementsByClassName('villano');
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

function finalizarJuego(){
    clearInterval(comenzar);
    clearInterval(eliminar);
    clearInterval(game);
}

function agregarVillano() {
    let y = Math.floor(Math.random() * 617);
    const villano = document.createElement("div");
    villano.classList.add("villano");
    villano.style.transform = `translateY(${y}px)`;
    villano.style.animation = 'mover 5.5s linear';
    villano.id = `VLL${Math.floor(Math.random() * 100)}`;
    document.body.appendChild(villano);
}

function eliminarVillano(){
    let villanos = document.getElementsByClassName('villano');
    for (let i = 0; i < villanos.length; i++) {
        let id = villanos[i].getAttribute('id');
        if(document.getElementById(id).getBoundingClientRect().x < 0){
            document.getElementById(id).remove();
        }
    }
}