const cursor = document.querySelector('.cursor');
const holes = [...document.querySelectorAll('.hole')];
const scoreEl = document.querySelector('.score span');
const speedMeter = document.querySelector('.score p');
const HighScoreEl = document.querySelector('.highscore span');
const playButton = document.querySelector('.play');

const board = document.querySelector('.board');

playButton.style.visibility = 'visible';
board.style.visibility = 'hidden';
let score = 0;
let speed = 2000;
speedMeter.textContent = '1';

const sound = new Audio("sprites/smash.mp3");

function start(){
    playButton.style.visibility = 'hidden';
    board.style.visibility = 'visible';
    scoreEl.textContent = score;
    run();
}

function run(){

    let over = true;

    const i = Math.floor(Math.random()*holes.length);
    const hole = holes[i];
    let timer = null;

    const img = document.createElement('img');
    img.classList.add('mole');
    img.src = 'sprites/benads.jpg';

    if(score > 80){
        speed = 800;
        img.style['animation-duration'] = '0.8s';
        speedMeter.textContent = 'MAX';
    } else if(score > 50){
        speed = 1000;
        img.style['animation-duration'] = '1s';
        speedMeter.textContent = '4';
    } else if(score > 25){
        speed = 1200;
        img.style['animation-duration'] = '1.2s';
        speedMeter.textContent = '3';
    }else if(score > 10){
        speed = 1500;
        img.style['animation-duration'] = '1.5s';
        speedMeter.textContent = '2';
    }else if(score> 5){
        speed = 1800;
        img.style['animation-duration'] = '1.8s';
        speedMeter.textContent = '1';
    }

    img.addEventListener('click', ()=> {
        score++;
        sound.play();
        scoreEl.textContent = score;
        img.src = 'sprites/mole-whacked.png';
        clearTimeout(timer);
        setTimeout(() => {
            hole.removeChild(img);
            run();
        }, 500);
    })

    hole.appendChild(img);
    
    console.log(speed);
    
    
    timer = setTimeout(() => {
        hole.removeChild(img);
        console.log(over);
        //gameover();
        run();
    },speed);
    
}
//run()

function gameover(){
    playButton.style.visibility = 'visible';
    board.style.visibility = 'hidden';
    curHS = HighScoreEl.textContent;
    if(curHS<score){
        HighScoreEl.textContent = score;
    }
    score = 0;
    speed = 1500;
}

window.addEventListener('mousemove', e=> {
    cursor.style.top = e.pageY + 'px';
    cursor.style.left = e.pageX + 'px';
});

window.addEventListener('mousedown',()=>{
    cursor.classList.add('active');
});
window.addEventListener('mouseup',()=>{
    cursor.classList.remove('active');
});