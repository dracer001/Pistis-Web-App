function submitNewsLetter() {
    const email = document.getElementById('newsletterEmail').value;

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      if (this.status === 200) {
      console.log(this);
      try {
        const response = JSON.parse(this.responseText);
        console.log(response);
      } catch (e) {
        console.error('Error parsing JSON:', e);
      }
    } else {
       console.error('Request failed with status:', this.status);
    }
  }
    xhttp.open("POST", "/add-newsLetter");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("email="+email);
  }
  
