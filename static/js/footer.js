function submitNewsLetter(btn) {
    const email = document.getElementById('newsletterEmail').value;

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      if (this.status === 200) {
      console.log(this);
      try {
        const response = JSON.parse(this.responseText);
        console.log(response);
        if('success' in response){
          btn.innerText = "Subscribed";
          btn.style.backgroundColor = 'green'
        }
        else if('warning' in response){
          btn.innerText = "Subscribed";
          btn.style.backgroundColor = 'green'
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
    xhttp.open("POST", "/add-newsLetter");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("email="+email);
  }
  
