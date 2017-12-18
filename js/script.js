var contact = document.querySelector(".button-contacts");
var popup = document.querySelector(".modal-contacts");
var open = document.querySelector(".modal-close");

var form = document.querySelector(".form-contacts");
var username = document.getElementById("contacts-name");
var usermail = document.getElementById("contacts-email");
var mess = document.getElementById("your-message");

var storage = localStorage.getItem("username");
var storage2 = localStorage.getItem("usermail");

contact.addEventListener("click", function(evt) {
  evt.preventDefault();
  popup.classList.add("modal-show");

  if (storage) {
    username.value = storage;
    usermail.focus();
  } else if (storage2) {
    usermail.value = storage2;
    mess.focus();
  }
    else {
    username.focus();
  }
});

open.addEventListener("click", function(evt) {
  evt.preventDefault();
  popup.classList.remove("modal-show");
});

form.addEventListener("submit", function(evt) {
  if (!username.value || !usermail.value) {
    evt.preventDefault();
    alert("Необходимо ввести имя и email!");
  } else {
    localStorage.setItem("username", username.value);
    localStorage.setItem("usermail", usermail.value);
  }
});

window.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27) {
    if (popup.classList.contains("modal-show")) {
      popup.classList.remove("modal-show");
    }
  }
});
