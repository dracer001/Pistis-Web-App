// document.addEventListener('DOMContentLoaded', function () {
//     const heroText = document.querySelector('.hero-text');
//     const heroTitle = document.querySelector('.hero-title');
//     const heroDetail = document.querySelector('.hero-detail');

//     const contents = [
//         {
//             title: 'Pistis Training Solutions',
//             detail: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo, dolorum!'
//         },
//         {
//             title: 'Web Development Training',
//             detail: 'Learn the latest web technologies from industry experts.'
//         },
//         {
//             title: 'Data Science Courses',
//             detail: 'Master data analysis, machine learning, and AI.'
//         },
//         // Add more content objects as needed
//     ];

//     let currentIndex = 0;
//     const interval = 5000; // Interval for carousel to change (in milliseconds)

//     function changeContent() {
//         heroTitle.textContent = contents[currentIndex].title;
//         heroDetail.textContent = contents[currentIndex].detail;
//         currentIndex++;
//         if (currentIndex >= contents.length) {
//             currentIndex = 0;
//         }
//     }

//     setInterval(changeContent, interval);
// });


// document.addEventListener('DOMContentLoaded', function () {
//     const animatedDivs = document.querySelectorAll('.benefit-item');

//     function checkPosition() {
//         for (let i = 0; i < animatedDivs.length; i++) {
//             const animatedDiv = animatedDivs[i];
//             const triggerPoint = animatedDiv.getBoundingClientRect().top + window.scrollY;
//             const windowHeight = window.innerHeight;

//             if (triggerPoint < windowHeight) {
//                 animatedDiv.classList.add('animate');
//             }
//         }
//     }

//     // Initial check on page load
//     checkPosition();

//     // Check on scroll
//     window.addEventListener('scroll', checkPosition);
// });


document.addEventListener('DOMContentLoaded', function () {
    const benefitItems = document.querySelectorAll('.benefit-item');

    // Options for the IntersectionObserver
    const options = {
        root: null, // Use the viewport as the root
        rootMargin: '0px', // Margin around the root (no margin)
        threshold: 0.3 // Percentage of the target element which is visible
    };

    // IntersectionObserver callback function
    function handleIntersect(entries, observer) {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }

    // Create the IntersectionObserver
    const observer = new IntersectionObserver(handleIntersect, options);

    // Observe each .benefit-item
    benefitItems.forEach(item => {
        observer.observe(item);
    });
});





// FAQS

const toggleFaq = () => {
    const viewMoreBtn = document.getElementById("viewMoreBtn");
    const viewLessBtn = document.getElementById("viewLessBtn");
    const faqItems = document.querySelectorAll(".accordion-item");

    viewMoreBtn.addEventListener("click", function() {
        faqItems.forEach((item, index) => {
            if (index >= 3) { // Show items starting from index 3
                item.style.display = "block";
            }
        });
        viewMoreBtn.style.display = "none";
        viewLessBtn.style.display = "block";
    });

    viewLessBtn.addEventListener("click", function() {
        faqItems.forEach((item, index) => {
            if (index >= 3) { // Hide items starting from index 3
                item.style.display = "none";
            }
        });
        viewMoreBtn.style.display = "block";
        viewLessBtn.style.display = "none";
    });

    // Initially hide FAQ items starting from index 3
    faqItems.forEach((item, index) => {
        if (index >= 3) {
            item.style.display = "none";
        }
    });
}


function checkDeviceWidth() {
    var mediaQuery = window.matchMedia('(min-width: 900px)');
    if (!mediaQuery.matches) {
        toggleFaq();
    }else{
        const faqCollaps = document.querySelectorAll(".accordion-collapse");
        faqCollaps.forEach((item, index) => {
            item.removeAttribute('data-bs-parent');
        });

        const faqItems = document.querySelectorAll(".accordion-item");
        faqItems.forEach((item, index) => {
            item.style.display = "block";
        });
        const viewMoreBtn = document.getElementById("viewMoreBtn").style.display = 'none';
        const viewLessBtn = document.getElementById("viewLessBtn").style.display = 'none';

    }
}
    
// Initial check when the script loads
checkDeviceWidth();
    
    // Add an event listener for media query changes
window.matchMedia('(min-width: 900px)').addEventListener('change', checkDeviceWidth);
    // window.addEventListener('resize', checkDeviceWidth);
    


function displayForm(course_id) {
    const xhttp = new XMLHttpRequest();

    xhttp.onload = function() {
        if (this.status === 200) {
        console.log(this);
        try {
          const response = JSON.parse(this.responseText);
          console.log(response);
          createForm(response)
        } catch (err) {
          console.error('Error parsing JSON:', err);
        }
      } else {
         console.error('Request failed with status:', this.status);
      }
    }
    xhttp.open("GET", "/training-solution/get-course/"+course_id);
    xhttp.send();
}

function createForm(course){
    document.getElementById('course').value = course.course_title
    document.getElementById('course-duration').value = course.course_duration
    document.getElementById('course-price').value = course.course_price
    document.getElementById('course_id').value = course._id
}


function registerCourse(btn) {
    const name = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const course_id = document.getElementById('course_id').value;
    
    if(document.getElementById('cookie-check').checked){
        localStorage.setItem('name', name)
        localStorage.setItem('email', email)
    }else{
        localStorage.removeItem('name')
        localStorage.removeItem('email')
    }

    const xhttp = new XMLHttpRequest()

    xhttp.onload = function() {
        if (this.status === 200) {
            console.log(this);
            try {
              const response = JSON.parse(this.responseText);
              console.log(response);
              if('success' in response){
                btn.innerText = "Registered";
                btn.style.backgroundColor = 'green'
                btn.disabled = true;
              }
              else if('warning' in response){
                btn.innerText = "Registered";
                btn.style.backgroundColor = 'green'
                btn.disabled = true;
              }
              else if('error' in response){
                btn.innerText = "Subscribe";
                btn.style.backgroundColor = 'red'
              }
            } catch (e) {
              console.error('Error parsing JSON:', e);
            }
        } else {
             console.error('Request failed with status:', this.status);
        }
    }
    xhttp.open('POST', "/training-solution/reg-student")
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`name=${name}&email=${email}&course_id=${course_id}`)
}