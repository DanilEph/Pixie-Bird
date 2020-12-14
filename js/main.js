let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

//Создание объектов, в качестве которых выступают картинки
let pixie = new Image(); 
let bg = new Image();
let bottomConstrain = new Image();
let hurdleBottom = new Image();
let hurdleTop = new Image();

pixie.src = 'img/pixie.png';
bg.src = 'img/background.png';
bottomConstrain.src = 'img/bottom-constrain.png';
hurdleBottom.src = 'img/hurdle-bottom.png';
hurdleTop.src = 'img/hurdle-top.png';

//Создание объектов, в качестве которых выступаеют звуки
let fly = new Audio();
fly.volume = 0.6;
let point = new Audio();
point.volume = 0.8;
let fail = new Audio();
fail.volume = 0.8;
let choose = new Audio();
let baudio = new Audio();
baudio.volume = 0.2;
baudio.autoplay = true;

fly.src = 'mp3/fly.mp3';
fail.src = 'mp3/fail.mp3';
point.src = 'mp3/point.mp3';
baudio.src = 'mp3/backmusic.mp3';

let gap = 90;
let grav = 2;

//Массив объектов, в качестве которых выступают препятствия
let constrainTop = [];
constrainTop[0] = {
    x: canvas.width,
    y: -120
};

//Позиция пикси
let xPos = 30;
let yPos = 150;

//Управление пикси
document.addEventListener('keydown', moveUp);
canvas.addEventListener('click', moveUp);

//Счетчик
let score = 0;
let _score = document.querySelector('.score');

//Запрос на анимацию
let anim;


//Фоновая музыка
// let backmusic = document.querySelector('audio');

// if (canvas.style.display != 'block') {
//     backmusic.play();
// }

function moveUp () {
    yPos -= 40;
    if (canvas.style.display == 'block') {
        fly.play();
    }
    
} 

function draw () {
    let isTrue = false;
    ctx.drawImage(bg, 0, 0);
    
    for (let i = 0; (i < constrainTop.length) && (canvas.style.display == 'block'); i++) {

        ctx.drawImage(hurdleTop, constrainTop[i].x, constrainTop[i].y);
        ctx.drawImage(hurdleBottom, constrainTop[i].x, hurdleTop.height + constrainTop[i].y + gap);
        constrainTop[i].x--;

        if (constrainTop[i].x == 50) {
            constrainTop.push({
                x: canvas.width,
                // y: Math.floor(Math.random() * hurdleTop.height) - hurdleTop.height
                y: constrainTop[0].y - getRandomNubmer(0, 230)
            });
        }

        if (xPos + pixie.width >= (constrainTop[i].x + 4)
            && xPos <= (constrainTop[i].x + hurdleTop.width - 4)
            && (yPos <= (constrainTop[i].y + hurdleTop.height - 4)
                || yPos + pixie.height >= constrainTop[i].y + hurdleTop.height + gap + 6)
                || yPos + pixie.height >= canvas.height - bottomConstrain.height + 4) {                    
                    funFail();                    
                    isTrue = true;
                    // location.reload();
                    
        }
        ctx.drawImage(bottomConstrain, 0, bg.height - bottomConstrain.height);
        
        if (constrainTop[i].x == 5) {
            score += 1;
            point.play();
            _score.innerHTML = 'Счет: ' + score;
        
        }
    }

    
    ctx.drawImage(pixie, xPos, yPos);

    yPos += grav;    

    if (!isTrue) {
        anim = requestAnimationFrame(draw);
    }
    else {
        window.cancelAnimationFrame(anim);
    }
}

function getRandomNubmer(min, max) {
    return Math.random() * (max - min) + min;
}

// Навигация
let mainMenu = document.querySelector('.main-menu');
let replayMenu = document.querySelector('.replay-menu');
let play = document.querySelector('.play');
let replay = document.querySelector('.replay');
let back = document.querySelector('.back');

play.onclick = function () {
    baudio.play();
    mainMenu.style.display = 'none';
    canvas.style.display = 'block';

    score = 0;
    _score.innerHTML = 'Счет: ' + score;
    xPos = 30;
    yPos = 150;
    constrainTop = [];
    constrainTop[0] = {
        x: canvas.width,
        y: -120
    };

    window.onload = draw();
};

function funFail () {
    fail.play();
    baudio.pause();
    baudio.currentTime = 0;
    canvas.style.display = 'none';
    replayMenu.style.display = 'block';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    window.cancelAnimationFrame(anim);

    replay.onclick = function () {
        baudio.play();
        replayMenu.style.display = 'none';
        canvas.style.display = 'block';
        
        score = 0;
        _score.innerHTML = 'Счет: ' + score;
        xPos = 30;
        yPos = 150;
        constrainTop = [];
        constrainTop[0] = {
            x: canvas.width,
            y: -120
        };

        window.onload = draw();
    }

    back.addEventListener('click', () => {
        replayMenu.style.display = 'none';
        mainMenu.style.display = 'block';
    });    
}



