"use strict";

let mainScreen = document.getElementById("bill");
let tip = document.getElementById("tipAmount");
let total = document.getElementById("total");

let people = document.getElementById("people");
let custom = document.getElementById("custom");

const reset = document.getElementById("reset");

const percentage = document.querySelectorAll(".percentage");
const customcalc = document.querySelectorAll(".cus");

//CUSTOM TIP FUNCTION
const calclateTips = function () {
  if (people.value > 0 && mainScreen.value > 0 && custom.value > 0) {
    let eachPerson = mainScreen.value / people.value;
    tip.textContent = Math.round((custom.value / 100) * eachPerson);

    total.textContent = Math.round(+tip.textContent + eachPerson);
  }
};

//FIXED PERCENTAGE FUNCTION AND EVENT LISTENER FOR TARGET
//CHANGE BACKGROUND WHEN BOTH INPUT HAVE VALUE WHEN CLICK
percentage.forEach((per) => {
  per.addEventListener("click", function (e) {
    percentage.forEach((per) => {
      per.classList.remove("active");
    });

    if (people.value > 0 && mainScreen.value > 0) {
      e.currentTarget.classList.add("active");
      let eachPerson = Number(mainScreen.value / people.value);

      tip.textContent = Math.round(
        (per.textContent.slice(0, -1) / 100) * eachPerson
      );

      total.textContent = Math.round(+tip.textContent + eachPerson);
    }
  });
});

// function allowNumbersOnly(event) {
//   const input = event.target;
//   const value = input.value;

//   input.value = value.replace(/[^0-9]/g, "");
// }

//  KEYUP FOR BORDER CHANGES WITH OR WITHOUT VALUE
customcalc.forEach((press) => {
  press.addEventListener("keyup", function () {
    calclateTips();

    if (press.value) {
      press.classList.add("successBorder");
      press.classList.remove("errorBorder");
    } else if (press.value == "") {
      press.classList.remove("successBorder");
      press.classList.add("errorBorder");
    }

    const notNumber = press.value;
    press.value = notNumber.replace(/[^0-9]/g, "");
  });
});

reset.addEventListener("click", function () {
  mainScreen.value = "";
  custom.value = "";
  people.value = "";
  tip.textContent = "0.00";
  total.textContent = "0.00";
  percentage.forEach((per) =>
    per.classList.contains("active") ? per.classList.remove("active") : ""
  );
});
