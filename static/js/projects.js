
  document.querySelectorAll('.send-whatsapp').forEach(button => {
    button.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      const phoneNumber = '+2348083981055'; // Replace with the desired phone number
      const message = encodeURIComponent(`From Pistis Networking Academy\nCategory: ${category}`);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
      
      // Open WhatsApp link
      window.open(whatsappUrl, '_blank');
    });
  });



document.querySelector('.send-whatsapp-form').addEventListener('click', function(e) {
    e.preventDefault();
    const form = document.querySelector('#contact-us-form');

    const formData = new FormData(form);

    // Collecting values from the form
    const name = formData.get('name');
    const email = formData.get('email');
    const category = formData.get('category');
    const messageContent = formData.get('message'); // This will get the textarea value

    // Construct the WhatsApp message
    const phoneNumber = '+2348083981055'; // Replace with the desired phone number
    const message = encodeURIComponent(
      `From Pistis Networking Academy\nName: ${name}\nEmail: ${email}\nCategory: ${category}\nMessage: ${messageContent}`
    );

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Open WhatsApp link
    window.open(whatsappUrl, '_blank');
    
    // Optional: Reset form after sending
    form.reset();
});

document.querySelectorAll('.send-email').forEach(button=>{

    button.addEventListener('click', function() {
        // Get the data-category attribute value
        const category = this.getAttribute('data-category');

        // Set the category in the select element
        const categorySelect = document.getElementById('category-select');
        categorySelect.value = category; // Set the value of the select

        // Scroll to the contact us form
        const contactForm = document.getElementById('contact-us-form');
        
        contactForm.scrollIntoView({ behavior: 'smooth' }); // Smooth scrolling to the form
    })
});

