let canvas = document.querySelector('.canvas');
let ctx = canvas.getContext('2d');
let container = document.querySelector('.container');
let hue = 0;

//setting the size of canvas to window inner dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});

let mouse = {
    x: undefined,
    y: undefined
};

//implementing own particle class
class Particle {
    constructor() {
        //properties
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 8;        //[0, 8)
        this.speedX = Math.random() * 2 - 1;    //[-1, 1)
        this.speedY = Math.random() * 2 - 1;    //[-1, 1)
        this.color = `hsl(${hue}, 100%, 50%)`;   //color cycle
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size >= 0.2) {
            this.size -= 0.1;
        }
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
};

let particlesArray = [];
container.addEventListener('mousemove', createParticles);

//creating particles array everytime mouse is down and moved over the canvas
function createParticles(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 10; i++) {
        particlesArray.push(new Particle());
        hue++;
    }
}

//iterating over particles array
function displayParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        if(particlesArray[i].size <= 0.5){
            particlesArray.splice(i, 1);
            i--;
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    displayParticles();
    requestAnimationFrame(animate);
}
animate();