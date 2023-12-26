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
let speed = 1500;
speedMeter.textContent = speed;

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
    img.src = 'sprites/mole.png';

    if(score > 70){
        speed = 500;
    } else if(score > 50){
        speed = 700;
    } else if(score > 30){
        speed = 900;
    }else if(score > 15){
        speed = 1100;
    }else if(score> 5){
        speed = 1300;
    }
    speedMeter.textContent = speed;

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
        gameover();
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