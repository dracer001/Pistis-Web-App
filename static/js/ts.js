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

