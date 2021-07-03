var form = document.getElementById("contactForm");
    
async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    status.className =  "alert alert-primary";
    status.innerHTML =  "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>";
    status.innerHTML += "<strong>Your message has been sent. </strong>";
    form.reset()
  });
}
form.addEventListener("submit", handleSubmit)