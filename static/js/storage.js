const nameEl = document.getElementById('full-name')
const emailEL = document.getElementById('email')
function saveData(){
    if(document.getElementById('cookie-check').checked){
        localStorage.setItem('name', nameEl.value)
        localStorage.setItem('email', emailEL.value)
        console.log(true)
    }else{
        localStorage.removeItem('name')
        localStorage.removeItem('email')
        console.log(false)
    }
}


function loadData() {
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    if (name) {
        nameEl.value = name;
    }
    if (email) {
        emailEL.value = email;
    }
  }

  loadData();
