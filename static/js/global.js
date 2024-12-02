document.querySelectorAll('.send-whatsapp').forEach(button => {
    button.addEventListener('click', function() {
      const phoneNumber = '+2348083981055'; // Replace with the desired phone number
      const message = encodeURIComponent(`From Pistis Networking Academy:\n I `);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
      
      // Open WhatsApp link
      window.open(whatsappUrl, '_blank');
    });
  });
