/*
 * yardcalc.js
 *

function template()
{
}

 */

function greyOutShareButton()
{
	const share_button_android = document.querySelector('#share-button-android');
}

/* see:
 * https://www.heise.de/news/Einfacher-Teilen-direkt-von-der-Website-Neue-API-vom-W3C-7395882.html
 * https://www.w3.org/TR/web-share/
 * https://hellocoding.de/blog/coding-language/javascript/web-share-api
 */

function webShareApiAvailable()
{
	return navigator.share && navigator.canShare;
}

function createSailedTime() // this as a new object of a class?
{
	const hours_value = document.querySelector("#hours_input");
	const minutes_value = document.querySelector("#minutes_input");
	const seconds_value = document.querySelector("#seconds_input");

	const seconds_sailed = ( hours_value * 60 * 60 ) + ( minutes_value * 60 ) + seconds_value * 1;

	return new Date(seconds_sailed * 1000);
}

function getYardstickNumber()
{
	const yardstick_value = document.querySelector("#yardstick_input").value;
	log.debug("getYardstickNumber: is %i", yardstick_value);
}

function calculateTime(sailed_time, yardstick_number)
{
	const seconds_sailed = sailed_time.getSeconds;
	const seconds_calculated = seconds_sailed * 100 / yardstick_number;
	return new Date(seconds_calculated * 1000);
}

function shareThis()
{
		// see https://www.w3.org/TR/web-share/
	if ( ! ( webShareApiAvailable() ) ) {
		console.warn("Web Share API not available");
		alert("UuUu. Web Share API nicht verfügbar!");
		// done that, we might grey out the button
		greyOutShareButton();
		return -1;
	}

	// if available ...
	console.log("Web Share API is available");
	alert("Toll. Web Share API verfügbar!");

	const time_sailed = createSailedTime();
	const yardstick_number = getYardstickNumber();
	const time_calculated = calculateTime(time_sailed, yardstick_number);
	const data = {
		title: "Yardstick Calculator",
		text: "Sailed Time:\n" + time_sailed.toISOString().slice(11, 19) + "Calculated Time:\n" + time_calculated.toISOString().slice(11, 19)
	}

	return 0;
}
