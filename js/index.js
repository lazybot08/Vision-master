//navigation page javascript

let nav = document.querySelector('.nav');
let toggle_button = document.querySelector('.toggle-btn');
toggle_button.addEventListener('click', (e)=>{
    nav.classList.toggle('active');
});

// homepage javascript
document.addEventListener('mouseover', (e) => {
    console.log(e.clientX);
});

