let canv = $('#canvas')

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

// Звуковые файлы
let fly = new Audio();
let score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

let gap = 90;

// При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp);

function moveUp() {
    yPos -= 25;
    fly.play();
}

// Создание блоков
let pipe = [];

pipe[0] = {
    x : canv.width,
    y : 0
}

let score = 0;
// Позиция птички
let xPos = 10;
let yPos = 150;
let grav = 1.5;

function draw() {
    canv.drawImage({
        source: bg, 
        x: 0, y: 0
    });

    for(let i = 0; i < pipe.length; i++) {
        canv.drawImage({
            layer: true,
            source: pipeUp, 
            x: pipe[i].x, y: pipe[i].y
        });
        canv.drawImage({
            layer: true,
            source: pipeBottom, 
            x: pipe[i].x, y: pipe[i].y + pipeUp.height + gap
        });

        pipe[i].x--;

        if(pipe[i].x == 125) {
            pipe.push({
                x : canv.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        // Отслеживание прикосновений
        if(xPos + bird.width >= pipe[i].x
        && xPos <= pipe[i].x + pipeUp.width
        && (yPos <= pipe[i].y + pipeUp.height
        || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= canv.height - fg.height) {
            location.reload(); // Перезагрузка страницы
        }

        if(pipe[i].x == 5) {
            score++;
            score_audio.play();
        }
    }

    canv.drawImage({
        layer: true,
        source: fg, 
        x: 100, y: canv.height - fg.height
    });
    canv.drawImage({
        layer: true,
        source: bird, 
        x: xPos, y: yPos
    });

    yPos += grav;

    canv.fillStyle = "#000";
    canv.font = "24px Verdana";
    canv.drawText({
        layer: true,
        text: "Счет: " + score, 
        x: 10, y: canv.height - 20,
        fontSize: 20,
        color: 'black'
    });

    requestAnimationFrame(draw);
}

pipeBottom.onload = draw;