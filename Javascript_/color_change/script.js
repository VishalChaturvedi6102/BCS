

document.addEventListener('DOMContentLoaded', function() {
    const colorButton = document.getElementById('colorButton');
    const body = document.body;

   
    const colors = ['#f0f8ff', '#ffe4e1', '#afeeee', '#f5f5dc', '#e6e6fa'];
    let currentColorIndex = 0;

    colorButton.addEventListener('click', function() {
    
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        body.style.backgroundColor = colors[currentColorIndex];
    });
});