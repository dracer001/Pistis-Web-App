document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript is loaded!');
});
function toggleMenu() {
    const menuIcon = document.querySelector('.menu-icon');
    menuIcon.classList.toggle('open');

    const offCanvasMenu = document.querySelector('nav');
    offCanvasMenu.classList.toggle('open');
}

let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Show the first slide initially
showSlide(currentSlide);

// Change slide every 5 seconds
setInterval(nextSlide, 5000);




document.addEventListener("DOMContentLoaded", () => {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    // Show the first slide initially
    showSlide(currentSlide);

    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);
});

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('.testimonial-container');
    const items = document.querySelectorAll('.testimonial-item');
    let currentIndex = 0;
    let startY;

    function showItem(index) {
        items.forEach((item, i) => {
            if (i === index) {
                item.style.transform = 'translateY(0)';
                item.classList.remove('hidden');
            } else if (i < index) {
                item.style.transform = 'translateY(-100%)';
                item.classList.add('hidden');
            } else {
                item.style.transform = 'translateY(100%)';
                item.classList.add('hidden');
            }
        });
    }

    function nextItem() {
        currentIndex = (currentIndex + 1) % items.length;
        showItem(currentIndex);
    }

    function prevItem() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showItem(currentIndex);
    }

    container.addEventListener('wheel', (event) => {
        if (event.deltaY > 0) {
            nextItem();
        } else {
            prevItem();
        }
    });

    container.addEventListener('touchstart', (event) => {
        startY = event.touches[0].clientY;
    });

    container.addEventListener('touchmove', (event) => {
        if (!startY) return;
        
        let currentY = event.touches[0].clientY;
        let diffY = startY - currentY;

        if (diffY > 0) {
            nextItem();
        } else {
            prevItem();
        }

        startY = null; // Reset startY to avoid multiple triggers
    });
        // Add click event listener to the container
        container.addEventListener('click', () => {
            nextItem();
        });

    showItem(currentIndex);
});


// document.addEventListener("DOMContentLoaded", () => {
//     const container = document.querySelector('.testimonial-container');
//     const items = document.querySelectorAll('.testimonial-item');
//     let currentIndex = 0;

//     function showItem(index) {
//         items.forEach((item, i) => {
//             if (i === index) {
//                 item.style.transform = 'translateY(0)';
//                 item.classList.remove('hidden');
//             } else if (i < index) {
//                 item.style.transform = 'translateY(-100%)';
//                 item.classList.add('hidden');
//             } else {
//                 item.style.transform = 'translateY(100%)';
//                 item.classList.add('hidden');
//             }
//         });
//     }

//     function nextItem() {
//         currentIndex = (currentIndex + 1) % items.length;
//         showItem(currentIndex);
//     }

//     function prevItem() {
//         currentIndex = (currentIndex - 1 + items.length) % items.length;
//         showItem(currentIndex);
//     }

//     container.addEventListener('wheel', (event) => {
//         if (event.deltaY > 0) {
//             nextItem();
//         } else {
//             prevItem();
//         }
//     });

//     showItem(currentIndex);
// });

// document.addEventListener("DOMContentLoaded", () => {
//     const container = document.querySelector('.testimonial-container');
//     const items = document.querySelectorAll('.testimonial-item');
//     let currentIndex = 0;

//     function showItem(index) {
//         items.forEach((item, i) => {
//             if (i === index) {
//                 item.style.transform = 'translateY(0%)';
//                 item.classList.remove('hidden');
//             } else {
//                 item.style.transform = 'translateY(100%)';
//                 item.classList.add('hidden');
//             }
//         });
//     }

//     function nextItem() {
//         currentIndex = (currentIndex + 1) % items.length;
//         showItem(currentIndex);
//     }

//     function prevItem() {
//         currentIndex = (currentIndex - 1 + items.length) % items.length;
//         showItem(currentIndex);
//     }

//     container.addEventListener('wheel', (event) => {
//         if (event.deltaY > 0) {
//             nextItem();
//         } else {
//             prevItem();
//         }
//     });

//     showItem(currentIndex);
// });
