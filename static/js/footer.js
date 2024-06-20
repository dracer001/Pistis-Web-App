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
          btn.disabled = true;
        }
        else if('warning' in response){
          btn.innerText = "Subscribed";
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
    xhttp.open("POST", "/add-newsLetter");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("email="+email);
  }
  


  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('newsletterEmail').addEventListener('input', function(event) {
      checkNewsLetter(event);
    });
  });

  function checkNewsLetter(event) {
    const value = event.target.value;
    const btn = document.getElementById('nl-btn');
    const xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status === 200) {
          try {
            const response = JSON.parse(this.responseText);
            console.log(response);
            if ('exists' in response) {
              btn.textContent = "Subscribed";
              btn.style.backgroundColor = 'green';
              btn.disabled = true;
            } else {
              btn.disabled = false;
              btn.textContent = "Subscribe";
              btn.style.backgroundColor = 'transparent';
            }
          } catch (e) {
            console.error('Error parsing JSON:', e);
          }
        } else {
          console.error('Request failed with status:', this.status);
        }
      }
    };
      xhttp.open("POST", "/checkNewsletter");
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send("email="+value);
  }
