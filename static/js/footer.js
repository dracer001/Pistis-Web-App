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
  
