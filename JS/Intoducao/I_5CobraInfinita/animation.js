/*
Simplest Possible Way:

function repeatOften() {
  $("<div />").appendTo("body");
  requestAnimationFrame(repeatOften);
}
requestAnimationFrame(repeatOften);
*/

/*
Polyfill: http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
*/

var globalID;

function repeatOften() {
    $("<div />").appendTo("body");
    globalID = requestAnimationFrame(repeatOften);
}

globalID = requestAnimationFrame(repeatOften);

$("#stop").on("click", function() {
    cancelAnimationFrame(globalID);
});
$("#start").on("click", function() {
    globalID = requestAnimationFrame(repeatOften);
});