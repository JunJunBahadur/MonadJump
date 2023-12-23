const cursor = document.querySelector('.cursor');
const holes = [...document.querySelectorAll('.hole')];
const scoreEl = document.querySelector('.score span');
let score = 0;

const sound = new Audio("sprites/smash.mp3");

function run(){
    const i = Math.floor(Math.random()*holes.length);
    const hole = holes[i];
    let timer = null;

    const img = document.createElement('img');
    img.classList.add('mole');
    img.src = 'sprites/mole.png';

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
    timer = setTimeout(() => {
        hole.removeChild(img);
        run();
    },1500);
}
run()

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