//lagging problem
// // //creating m x n grid of boxes
// let homepage_header = document.querySelector('.home-header')
// let grid_element_parent = document.querySelector('.grid-element-parent');
// let m = parseInt(homepage_header.clientWidth / grid_element_parent.clientWidth);
// let n = parseInt(homepage_header.clientHeight / grid_element_parent.clientHeight);
// console.log(m);
// console.log(n);
// for (let i = 1; i <= m; i++) {
//     let temp_ele = document.createElement('span');
//     temp_ele.style.display = "inline-block";
//     for (let j = 1; j <= n; j++) {
//         //create an element
//         let ele = document.createElement('div');
//         //add the grid-element class to this element
//         ele.classList.add("grid-element");
//         //push it inside a span
//         temp_ele.appendChild(ele);
//     }
//     homepage_header.appendChild(temp_ele);
// }


//explore button javascript
let homepage_header = document.querySelector('.home-header');
let explore_btn = document.querySelector('.explore-btn button');
let about_container = document.querySelector(".about_container");
explore_btn.addEventListener('click', (event) => {
    homepage_header.style.left = "-100vw";
    homepage_header.style.transition = "left 1s";
    about_container.style.height = `${3 * (window.innerWidth) + window.innerHeight}px`;
});
//back to header button javascript
about_container.children[0].addEventListener('click', (event) => {
    if (homepage_header.style.left == "-100vw") {
        homepage_header.style.left = "0vw";
        homepage_header.style.transition = "left 1s";
        about_container.style.height = "0vw";
    }
});

//tilt effect javascript 
let container = document.querySelectorAll('.container');
container.forEach(function (x) {
    x.addEventListener('mousemove', (event) => {
        //calculate the width of container
        let container_width = x.clientWidth;
        let container_height = x.clientHeight;
        //Now calculate the position of center of container with respect to window
        let centerX = x.offsetLeft + (container_width / 2);
        let centerY = x.offsetTop + (container_height / 2);
        //Let us get the position of mouse with respect to centerX and centerY
        let mouseX = centerX - event.clientX;
        let mouseY = centerY - event.clientY;
        //Now if we divide mouseX by container_width/2 then it will get a range between -1 to 1
        //Similarly container_height will also get the range between -1 to 1 when we divide mouseY by container_height/2
        let factorX = mouseX / (container_width / 2);
        let factorY = mouseY / (container_height / 2);
        //Now we will rotate the container by this factor
        let rotate_x = (-1) * 10 * factorX;
        let rotate_y = (-1) * 10 * factorY;
        //Let us rotate the container using transform property 
        x.style.transform = `perspective(1000px) rotateX(${rotate_x}deg)  rotateY(${rotate_y}deg)`;
    });
});

container.forEach(function (x) {
    x.addEventListener('mouseout', (event) => {
        x.style.transform = `perspective(1000px) rotateX(0deg)  rotateY(0deg)`;
    });
});



let layer_1 = document.querySelector('.layer_1');
let layer_2 = document.querySelector('.layer_2');
let layer_3 = document.querySelector('.layer_3');
let one_third_scroll = (3 * (window.innerWidth)) / 3;

//wheel scroll effect 
window.addEventListener("scroll", (event) => {
    let scrollAmt = parseInt(window.pageYOffset);
    //for 1st 1 third part of scroll bar move the layer 1
    if (scrollAmt <= one_third_scroll) {
        layer_1.style.left = `-${scrollAmt}px`;
    }
    else if (scrollAmt > one_third_scroll && scrollAmt <= (2 * one_third_scroll)) {
        layer_2.style.left = `${scrollAmt - one_third_scroll}px`;
    }
    else if (scrollAmt > (2 * one_third_scroll) && scrollAmt <= (3 * one_third_scroll)) {
        layer_3.style.left = `-${scrollAmt - (2 * one_third_scroll)}px`;
    }
});



//Randomly moving client divs
let client_container = document.querySelector('.client_container');
let prev_pos_x;
let prev_pos_y;

function findNewCoordinates(element) {
    let min_x = client_container.offsetLeft;
    let max_x = client_container.offsetLeft + client_container.clientWidth - element.clientWidth;
    let min_y = client_container.offsetTop;
    let max_y = client_container.offsetTop + client_container.clientHeight - element.clientHeight;
    let new_x = Math.floor((Math.random() * (max_x - min_x)));
    let new_y = Math.floor((Math.random() * (max_y - min_y)));
    return [new_x, new_y];
};

function animateClient(element_id) {
    let element = document.getElementById(element_id);
    let new_pos = findNewCoordinates(element);
    element.style.transform = `translate(${new_pos[0]}px, ${new_pos[1]}px)`
    element.style.transition = "transform 5s linear 0s";
    prev_pos_x = new_pos[0];
    prev_pos_y = new_pos[1];
}

setInterval(function () {
    let n = client_container.childElementCount;
    for (let i = 0; i < n; i++) {
        animateClient(client_container.children[i].getAttribute("id"));
    }
}, 5000);


//faq button show/hide javascript
let show = document.querySelectorAll(".add");
let hide = document.querySelectorAll(".remove");
let ans = document.querySelectorAll(".answer");
for (let i = 0; i < show.length; i++) {
    show[i].addEventListener('click', () => {
        show[i].style.display = "none";
        hide[i].style.display = "flex";
        ans[i].style.display = "block";
    });
    hide[i].addEventListener('click', () => {
        show[i].style.display = "flex";
        hide[i].style.display = "none";
        ans[i].style.display = "none";
    });
}

