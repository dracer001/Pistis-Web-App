console.log('JavaScript is loaded!'); //SHOW JS IS LOADED

// TOGGLE DISPLAYS FOR LARGE AND SMALL DEVICE
const carouselItem = document.querySelectorAll('.carousel-item'); //WHY-CHOOSE-US

//Testimonials
const testimonialContainer = document.querySelector('.testimonial-container');
const testimonialItems = document.querySelectorAll('.testimonial-item');
let testimonialLength = testimonialItems.length;


function checkWidth() {
    if (window.innerWidth >= 960) {
        carouselItem.forEach((item)=>{
            item.classList.remove('carousel-item');
            console.log(item, 'remove');
        });
        testimonialContainer.classList.replace('testimonial-container', 'testimonial-slider');
        testimonialItems.forEach(item =>{item.classList.replace('testimonial-item','testimonial-slide')})
        showSlide_lg(currentSlide);
        setInterval(nextSlide, 5000);
    } else {
        carouselItem.forEach((item)=>{
            item.classList.add('carousel-item');
            console.log(item, 'add')
        })
        testimonialContainer.classList.replace('testimonial-slider', 'testimonial-container');
        testimonialItems.forEach(item =>{item.classList.replace('testimonial-slide','testimonial-item')});

        
        testimonialContainer.addEventListener('wheel', (event) => {
            if (event.deltaY > 0) {
                nextItem();
            } else {
                prevItem();
            }
        });

        testimonialContainer.addEventListener('touchstart', (event) => {
            startY = event.touches[0].clientY;
        });

        testimonialContainer.addEventListener('touchmove', (event) => {
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
        testimonialContainer.addEventListener('click', () => {
            nextItem();
        });

        showItem_sm(currentIndex);
    }
}


document.addEventListener('DOMContentLoaded', () => {

    checkWidth();
})
// Add event listener for window resize
window.addEventListener('resize', checkWidth);



// function to toggle nav bar for small and medium device
function toggleMenu() {
    const menuIcon = document.querySelector('.menu-icon');
    menuIcon.classList.toggle('open');

    const offCanvasMenu = document.querySelector('nav');
    offCanvasMenu.classList.toggle('open');
}



// TESTIMONIAL DISPLAY FOR Medium and Small Device

var currentIndex = 0;
var startY;
function showItem_sm(index) {
    testimonialItems.forEach((item, i) => {
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
    currentIndex = (currentIndex + 1) % testimonialLength;
    showItem_sm(currentIndex);
}

function prevItem() {
    currentIndex = (currentIndex - 1 + testimonialLength) % testimonialLength;
    showItem_sm(currentIndex);
}


// TESTIMONIAL DISPLAY FOR Large and greater than device width

let currentSlide = 0;

function showSlide_lg(index) {
    testimonialItems.forEach((slide, i) =>{slide.classList.toggle('active', i === index)})
}


function nextSlide() {
    for (let i=0; i < testimonialItems.length; i++) {
        if (testimonialItems[i].matches(':hover')) return false;
    }
    currentSlide = (currentSlide + 1) % testimonialLength;
    showSlide_lg(currentSlide);
}

// Show the first slide initially
showSlide_lg(currentSlide);

// Change slide every 5 seconds
setInterval(nextSlide, 5000);




// function submitNewsLetter (){    
//     console.log('active')
//     const email = document.getElementById('newsletterEmail').value;
//     // Prepare form data
//     const formData = new FormData();
//     formData.append("email", email);
//     console.log(typeof email)
//     console.log(typeof formData)
//     // Send POST request to Express.js route
//     fetch('/training-solutions/add-email', {
//         method: 'POST',
//         body: formData
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         console.log(response.json());
//         return response.json;
//     })
//     .then(data => {
//         // Handle the response data
//         console.log(data)
//         // document.getElementById('response').innerHTML = `<p>Response from server: ${data.message}</p>`;
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// }

function submitNewsLetter() {
    const email = document.getElementById('newsletterEmail').value;

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      console.log(this.responseText);
      }
    xhttp.open("POST", "/training-solutions/add-email");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("email="+email);
  }
  
