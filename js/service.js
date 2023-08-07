let canvas = document.querySelector('.canvas');
let context = canvas.getContext("2d");
let web_container = document.querySelector('.web-dev');

canvas.width = web_container.clientWidth;
canvas.height = web_container.clientHeight;
window.addEventListener('resize', () => {
    canvas.width = web_container.clientWidth;
    canvas.height = web_container.clientHeight;
    init();
});
console.log(canvas.height, web_container.clientHeight);

let box = document.querySelectorAll('.box');
//calculate the center of box element with respect to canvas element
let centerX = 0;
let centerY = 0;
let particleArray = [];
let canvasDimensions = canvas.getBoundingClientRect();

function init() {
    box.forEach((x) => {
        x.addEventListener('mouseover', () => {
            centerX = x.getBoundingClientRect().left + (x.clientWidth / 2);
            centerY = x.offsetTop + (x.clientHeight / 2) + 64;
            createParticle();
        });
    });
    box.forEach((x) => {
        x.addEventListener('mouseout', () => {
            particleArray = [];
            context.fillStyle = "transparent";
            context.fillRect(0, 0, canvas.width, canvas.height);
        });
    });
}

function createParticle() {
    particleArray = [];
    for (let i = 0; i < 100; i++) {
        particleArray.push(new Particle());
    }
}

class Particle {
    //properties of a particle
    constructor() {
        this.x = centerX;
        this.y = centerY;
        this.size = 1 + Math.random() * 2;
        this.radian = Math.random() * Math.PI * 2;
        this.velocity = -0.01;
        this.distanceFromCenter = 60 + Math.random() * 20;
        this.gradient;
        this.#createGradient();
    }
    #createGradient() {
        this.gradient = context.createRadialGradient(centerX, centerY, 2, centerX, centerY, this.size);
        this.gradient.addColorStop(0, "rgb(200, 200, 200)");
        this.gradient.addColorStop(0.2, "rgb(210, 210, 210)");
        this.gradient.addColorStop(0.4, "rgb(220, 220, 220)");
        this.gradient.addColorStop(0.6, "rgb(230, 230, 230)");
        this.gradient.addColorStop(0.8, "rgb(240, 240, 240)");
        this.gradient.addColorStop(1, "rgb(255, 255, 255)");
    }
    draw() {
        context.beginPath();
        context.shadowColor = "white";
        context.shadowBlur = 6;
        context.fillStyle = this.gradient;
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
    }
    update() {
        this.x = centerX + Math.sin(this.radian) * this.distanceFromCenter;
        this.y = centerY + Math.cos(this.radian) * this.distanceFromCenter;
        this.radian += this.velocity;
        this.draw();
    }
};

function animate() {
    requestAnimationFrame(animate);
    context.shadowColor = "transparent";
    context.shadowBlur = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    particleArray.forEach((x) => {
        x.update();
    });
}
init();
animate();


//creating the night theme on background canvas
let night_canvas = document.querySelector('.night-theme');
let ctx = night_canvas.getContext("2d");
night_canvas.width = document.body.clientWidth;
night_canvas.height = document.body.clientHeight;
let starArray = [];
class Star {
    constructor() {
        this.x = Math.random() * night_canvas.width;
        this.y = Math.random() * night_canvas.height;
        this.size = 0.1 + Math.random() * 1;
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
};

function CreateStars() {
    starArray = [];
    for (let i = 0; i < 1000; i++) {
        starArray.push(new Star());
    }
}

function displayStar() {
    starArray.forEach((x) => {
        x.draw();
    });
}

CreateStars();
displayStar();

// web dev services button js 
let buttons = document.querySelectorAll('.web-list-item');
let content = document.querySelector('.content');
buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        switch (index) {
            case 0: content.children[0].style.display = "grid";
                    content.children[1].style.display = "none";
                    content.children[2].style.display = "none";
                    content.children[3].style.display = "none";
                    content.children[4].style.display = "none";
            break;
            case 1: content.children[0].style.display = "none";
                    content.children[1].style.display = "grid";
                    content.children[2].style.display = "none";
                    content.children[3].style.display = "none";
                    content.children[4].style.display = "none";
            break;
            case 2: content.children[0].style.display = "none";
                    content.children[1].style.display = "none";
                    content.children[2].style.display = "grid";
                    content.children[3].style.display = "none";
                    content.children[4].style.display = "none";
            break;
            case 3: content.children[0].style.display = "none";
                    content.children[1].style.display = "none";
                    content.children[2].style.display = "none";
                    content.children[3].style.display = "grid";
                    content.children[4].style.display = "none";
            break;
            case 4: content.children[0].style.display = "none";
                    content.children[1].style.display = "none";
                    content.children[2].style.display = "none";
                    content.children[3].style.display = "none";
                    content.children[4].style.display = "grid";
            break;
        }
    });

});