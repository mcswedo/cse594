//Javascript used in test.html

//Test 1: Writing at beginning of load
document.write("<h1>Javascript-written Heading.</h1>");
document.write("<p>Javascript-written Paragraph.</p>");

//Test 2: Changing the text of a paragraph
function changeText() {
	document.getElementById("change").innerHTML="Success, it changed the text!";
}

//Test 3: Writing after HTML is loaded
function breakHTML() {
	document.write("Well, I warned you.");
}

//Object datatype "person"
var person = {
	firstName : "Michael",
	lastName : "Swedo",
	studentID : "004132686"
};

//Test 4: Printing info about an object
function printPersonInfo() {
	document.write("<p> First Name: " + person.firstName + "<br>" + "Last Name: " + person.lastName + "<br>" + "Student ID: " + person.studentID + "<br>");
}

//Test 5: Changing an object, Calling another function
function changePerson() {
	person.firstName = "David";
	person.lastName = "Turner";
	person.studentID = "none";

	printPersonInfo();
}
