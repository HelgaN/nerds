"use strict";

var itemOne = document.querySelector("#product-1");
var itemTwo = document.querySelector("#product-2");
var itemThree = document.querySelector("#product-3");

function change() {
  if(itemOne.checked === true) {
    itemTwo.checked = true;
  } else if(itemTwo.checked === true) {
    itemThree.checked = true;
  } else {
    itemOne.checked = true;
  }
}

setInterval(change, 5000);
