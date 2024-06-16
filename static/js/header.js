// function to toggle nav bar for small and medium device
function toggleMenu() {
    const menuIcon = document.querySelector('.menu-icon');
    menuIcon.classList.toggle('open');

    const offCanvasMenu = document.querySelector('nav');
    offCanvasMenu.classList.toggle('open');
}
