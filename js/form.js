"use strict";

var scale = document.querySelector(".scale");
var bar = document.querySelector(".bar");
var toggleMin = document.querySelector(".toggle-min");
var toggleMax = document.querySelector(".toggle-max");
var minPrice = document.querySelector("input[name=min-price]");
var maxPrice = document.querySelector("input[name=max-price]");

function getCoords(elem) {
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

var barWidth = bar.offsetWidth;

toggleMin.addEventListener("mousedown", function(evt) {
  evt.preventDefault();
  bar.style.position = "relative";
  var startCoordsMin = evt.pageX - bar.offsetLeft;

  var onMouseMoveMin = function(evtMove) {
    evtMove.preventDefault();
    var coordsMax = getCoords(toggleMax);
    var coordsMin = getCoords(toggleMin);
    var barCoords = getCoords(bar);
    var shiftMin;

    if (coordsMin.left + toggleMin.offsetWidth >= coordsMax.left) {
      if (evtMove.pageX <= startCoordsMin) {
        shiftMin = startCoordsMin - evtMove.pageX;
        toggleMin.style.left = shiftMin + "px";
        bar.style.left = shiftMin + "px";
        bar.style.width = (parseInt(barWidth - shiftMin) + "px");
      }

    } else {
      if (evtMove.pageX > startCoordsMin) {
        shiftMin = evtMove.pageX - startCoordsMin;
      } else {
        shiftMin = startCoordsMin - evtMove.pageX;
        /*  startCoordsMin = shiftMin;*/
      }
      toggleMin.style.left = shiftMin + "px";
      bar.style.left = shiftMin + "px";
      bar.style.width = parseInt(toggleMax.offsetLeft) - shiftMin + "px" /*(parseInt(barWidth - shiftMin) + "px")*/ ;
      if (toggleMin.style.left > 220) {
        toggleMin.style.left = "220px";
        bar.style.width = "220px"
      }
      minPrice.value = (parseInt(toggleMin.style.left) * 100);
    }
  }

  var onMouseUp = function() {
    document.removeEventListener("mousemove", onMouseMoveMin);
    document.removeEventListener("mouseup", onMouseUp);
  }

  document.addEventListener("mousemove", onMouseMoveMin);
  document.addEventListener("mouseup", onMouseUp);
});


toggleMax.addEventListener("mousedown", function(evt2) {
  evt2.preventDefault();
  var startCoordsMax = evt2.pageX - bar.offsetLeft - bar.offsetWidth; /* чтобы не скакол курсор при первом клике */
  var onMouseMoveMax = function(evt2) {
    evt2.preventDefault();
    var coordsMax = getCoords(toggleMax);
    var coordsMin = getCoords(toggleMin);
    var shiftMax;

    if (coordsMax.left - toggleMax.offsetWidth <= coordsMin.left) {
      if (evt2.pageX - bar.offsetLeft > startCoordsMax) {
        shiftMax = evt2.pageX - startCoordsMax;
        toggleMax.style.left = shiftMax + "px";
        bar.style.width = shiftMax + "px";
        if (parseInt(toggleMax.style.left) > 220 || parseInt(bar.style.width) > 220) {
          toggleMax.style.left = "220px";
          bar.style.width = "220px";
        }
        if (toggleMax.style.left < 20) {
          toggleMax.style.left = "20px";
        }
      }
    } else {
      if (evt2.pageX > startCoordsMax) {
        shiftMax = evt2.pageX - startCoordsMax;
        /*startCoordsMax = shiftMax;*/
      } else {
        shiftMax = startCoordsMax - evt2.pageX;
        /*startCoordsMax = shiftMax;*/
      }
      toggleMax.style.left = shiftMax + "px";
      bar.style.width = toggleMax.offsetLeft - toggleMin.offsetLeft + "px";
      /*bar.style.width = parseInt(shiftMax / 220 * 100).toFixed() + "%";*/

      if (parseInt(toggleMax.style.left) > 220 || parseInt(bar.style.width) > 220 && toggleMin.style.left < 20) {
        toggleMax.style.left = "220px";
        bar.style.width = 220 - parseInt(toggleMin.style.left) + "px";
      }

      maxPrice.value = (parseInt(toggleMax.style.left) * 100);
      if (parseInt(bar.style.width) > 220) {
        bar.style.width = "220px";
      }
    }
  }

  var onMouseUp = function(evtUp) {
    document.removeEventListener("mousemove", onMouseMoveMax);
    document.removeEventListener("mouseup", onMouseUp);
  }

  document.addEventListener("mousemove", onMouseMoveMax);
  document.addEventListener("mouseup", onMouseUp);
});
