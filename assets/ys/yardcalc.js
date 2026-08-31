
const sailedOutput = document.getElementById('time_sailed');
const calculatedOutput = document.getElementById('time_calculated');

const hoursSlider = document.getElementById("hours-range-line"); // <input>!
const hoursBullet = document.getElementById("hours-bullet"); // <input>!

const minutesSlider = document.getElementById("minutes-range-line"); // <input>!
const minutesBullet = document.getElementById("minutes-bullet"); // <input>!

const secondsSlider = document.getElementById("seconds-range-line"); // <input>!
const secondsBullet = document.getElementById("seconds-bullet"); // <input>!

const yardstickSlider = document.getElementById("yardstick-range-line");
const yardstickBullet = document.getElementById("yardstick-bullet");

hoursSlider.addEventListener("input", showSliderValue, false);
minutesSlider.addEventListener("input", showSliderValue, false);
secondsSlider.addEventListener("input", showSliderValue, false);
yardstickSlider.addEventListener("input", showSliderValue, false);

hoursSlider.addEventListener("input", updateTimes, false);
minutesSlider.addEventListener("input", updateTimes, false);
secondsSlider.addEventListener("input", updateTimes, false);
yardstickSlider.addEventListener("input", updateTimes, false);

// custom propertiy offset (some weird number from css)
yardstickSlider.offset = 380;
hoursSlider.offset = 380;
minutesSlider.offset = 380;
secondsSlider.offset = 380;

function showSliderValue(offset) {
  var bullet = this.previousElementSibling;
  bullet.innerHTML = this.value;
  // console.log("bulletValue: " + this.value);
  // var bulletPosition = (this.value / this.max); // this is the original
  // var minPlusMax = Number(this.min) + Number(this.max);
  // console.log("minPlusMax: " + minPlusMax);
  var minMaxDiff = Number(this.max) - Number(this.min);
  // console.log("minMaxDiff: " + minMaxDiff);
  var bulletPosition = (this.value - this.min) / minMaxDiff;
  // console.log("bulletPosition: " + bulletPosition);
  bullet.style.left = (bulletPosition * this.offset) + "px";
}

window.addEventListener("load", (event) => {
  // console.log("page is fully loaded");

  // TODO: do this in a loop over sliders and bullets
  // var bullet = slider.previousElementSibling;

  yardstickBullet.innerHTML = yardstickSlider.value;
  var minMaxDiff = Number(yardstickSlider.max) - Number(yardstickSlider.min);
  var bulletPosition = (yardstickSlider.value - yardstickSlider.min) / minMaxDiff;
  yardstickBullet.style.left = (bulletPosition * yardstickSlider.offset) + "px";

  hoursBullet.innerHTML = hoursSlider.value;
  var minMaxDiff = Number(hoursSlider.max) - Number(hoursSlider.min);
  var bulletPosition = (hoursSlider.value - hoursSlider.min) / minMaxDiff;
  hoursBullet.style.left = (bulletPosition * hoursSlider.offset) + "px";

  minutesBullet.innerHTML = minutesSlider.value;
  var minMaxDiff = Number(minutesSlider.max) - Number(minutesSlider.min);
  var bulletPosition = (minutesSlider.value - minutesSlider.min) / minMaxDiff;
  minutesBullet.style.left = (bulletPosition * minutesSlider.offset) + "px";

  secondsBullet.innerHTML = secondsSlider.value;
  var minMaxDiff = Number(secondsSlider.max) - Number(secondsSlider.min);
  var bulletPosition = (secondsSlider.value - secondsSlider.min) / minMaxDiff;
  secondsBullet.style.left = (bulletPosition * secondsSlider.offset) + "px";

});

function updateTimes() {
  	const h = parseFloat(hoursSlider.value) || 0;
	const m = parseFloat(minutesSlider.value) || 0;
	const s = parseFloat(secondsSlider.value) || 0;
	const ys = parseFloat(yardstickSlider.value) || 0;

	const sailedTime =
	  String(h).padStart(2, '0') + ':' +
	  String(m).padStart(2, '0') + ':' +
	  String(s).padStart(2, '0');

	// console.log("sailedTime: " + sailedTime);
  	sailedOutput.textContent = sailedTime;

	// Gesegelte Zeit komplett in Sekunden umrechnen
	const gesegelteSekunden = (h * 3600) + (m * 60) + s;

	// Deutsche Yardstick-Formel: (Gesegelte Zeit * 100) / Yardstickzahl
	// Laut DSV-Vorgabe wird das Ergebnis kaufmännisch gerundet
	const berechneteSekunden = Math.round((gesegelteSekunden * 100) / ys);

	// Berechnete Sekunden wieder in Stunden, Minuten und Sekunden umrechnen
	const resultH = Math.floor(berechneteSekunden / 3600);
	const resultM = Math.floor((berechneteSekunden % 3600) / 60);
	const resultS = berechneteSekunden % 60;

	// Text formatieren (z.B. führende Nullen hinzufügen: 02:45:09)
	const calculatedTime =
	  String(resultH).padStart(2, '0') + ':' +
	  String(resultM).padStart(2, '0') + ':' +
	  String(resultS).padStart(2, '0');

	// Ergebnis sofort im HTML anzeigen
	// console.log("calculatedTime: " + calculatedTime);
	calculatedOutput.textContent = calculatedTime;
}
