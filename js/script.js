var contact = document.querySelector(".button-contacts");
var popup = document.querySelector(".modal-contacts");
var close = document.querySelector(".modal-close");

var form = document.querySelector(".form-contacts");
var userName = document.getElementById("contacts-name");
var userMail = document.getElementById("contacts-email");
var mess = document.getElementById("your-message");

var storage = localStorage.getItem("userName");
var storage2 = localStorage.getItem("userMail");

contact.addEventListener("click", function(evt) {
  evt.preventDefault();
  popup.classList.add("modal-show");

  if (storage2 && storage) {
    userMail.value = storage2;
    userName.value = storage;
    mess.focus();
  } else if (storage) {
    userName.value = storage;
    userMail.focus();
  }
    else {
    userName.focus();
  }
});

close.addEventListener("click", function(evt) {
  evt.preventDefault();
  popup.classList.remove("modal-show");
});

form.addEventListener("submit", function(evt) {
  if (!userName.value || !userMail.value) {
    evt.preventDefault();
    alert("Введите имя и email!");
  } else {
    localStorage.setItem("userName", userName.value);
    localStorage.setItem("userMail", userMail.value);
  }
});

window.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27) {
    if (popup.classList.contains("modal-show")) {
      popup.classList.remove("modal-show");
      }
  }
});
