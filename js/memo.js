document.addEventListener("DOMContentLoaded", iniciarPagina);
function iniciarPagina(){

    let textoSpan = document.getElementById("typed");
    function inicio(){
        let palabra =  str => {
            let newArr = str.split('');
            let i = 0;
            let printnStr = setInterval(function(){
                textoSpan.innerHTML += newArr[i];
                i++;
                if(i == newArr.length){
                    clearInterval(printnStr);
                }
            }, 50);
        }
        palabra('Bienvenido al juego de memoria.');
    }
    inicio();

    document.getElementById("btn").addEventListener("click", generarTablero);
    let lvl = 6;
    let fichas = [];
    let simbolos = ['🔥','🎂', '🍩', '🍬', '🍨', '🥙', '🍓', '🌭', '🍭', '🍫', '🍷', '✨', '🎄', '☢️','🐶', '🐣' ];

    function generarTablero(){
        document.querySelector('audio').play();
        setTimeout(function(){
            document.querySelector('#game').play();
        }, 500);
        //dejo de mostrar los objetos del menu
        let menu = document.querySelector(".titulo");
        menu.style.display = "none";
        let boton = document.querySelector("#btn");
        boton.style.display = "none";

        let tablero = document.getElementById("tablero");
        for(let i = 0; i < lvl; i++){
            fichas.push(document.createElement('div'));
        }
        tablero.style.display = "flex";
        for (let i = 0; i < fichas.length; i++){
            fichas[i].innerHTML = '';
            fichas[i].classList.add('fichas');
            fichas[i].addEventListener('click', jugar);
            tablero.appendChild(fichas[i]);
        }
        let max = fichas.length;
        for(let i = 0; i < lvl /2; i++){
            let casillero = Math.floor(Math.random() * max);
            let simbolo = simbolos[i];
            completarTablero(fichas, simbolo, casillero);
            max = max -1;
            casillero = Math.floor(Math.random() * max);
            completarTablero(fichas, simbolo, casillero);
            max = max -1;
        }
        //nivel();
        //da vuelta las fichas para iniciar el juego
        setTimeout(function(){
            for (let i = 0; i < fichas.length; i++){
                fichas[i].classList.remove('fichas');
                fichas[i].classList.add('vueltaFicha');
            }
        }, 1000);
    }

    function completarTablero(fichas, simbolo, casillero){
        let indice = 0;
        for(let pos = 0; pos < casillero; pos++){
            if (fichas[indice].innerHTML == ''){
                indice++;
            }else{
                while(fichas[indice].innerHTML !== ''){
                    indice++;
                }
            }
        }
        while(fichas[indice].innerHTML !== ''){
            indice++;
        }
        fichas[indice].innerHTML = simbolo;
    }

    function jugar(e){
        let clicked = e.currentTarget;
        clicked.classList.remove('vueltaFicha');
        clicked.classList.add('fichas');

        let fichaElejida = document.getElementsByClassName('fichas');
        arr = [...fichaElejida];

        if(arr[0].textContent == arr[1].textContent){
           arr.forEach(element => {
               element.classList.remove('fichas');
               element.classList.add('correcta');
           });
        }else{
            arr.forEach(element => {
                element.classList.remove('fichas');
                element.classList.add('vueltaFicha');
            });
            arr = [];
        }

        let acertadas = document.getElementsByClassName('correcta');
        if (acertadas.length == fichas.length){
            setTimeout(function(){
                siguienteNivel();
            }, 500);
        }
    }
    function siguienteNivel(){
        if (lvl == 15){
            setTimeout(function(){
                document.querySelector('#game').pause();
                document.querySelector('audio').pause();
                document.querySelector('#winner').play();
            }, 500);
        }else{
            fichas.length = 0;
            tablero.innerHTML = "";
            lvl = lvl + 2;
            nivel();
            setTimeout(function(){
                generarTablero();
            }, 1000);
        }
    }
    let level = 2;
    function nivel(){
        let niveles = document.getElementById("niveles");
        //tablero.style.display = "none";
        niveles.innerHTML = "";
        let palabra =  str => {
            let newArr = str.split('');
            let i = 0;
            let printnStr = setInterval(function(){
                niveles.innerHTML += newArr[i];
                i++;
                if(i == newArr.length){
                    clearInterval(printnStr);
                }
            }, 50);
        }
        palabra('Nivel ' + (level++));
    }
}