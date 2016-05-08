$(document).ready(function(){
console.log("connected.")
console.log($("input:text").length)

$("#pro_submit").click(function(){
	if ( $("input:text").length === 0 ){
		$(".pro_ul").append("<input type='text' placeholder='Pro ?'>")
		// $(".pro_ul").append("<input type='text' placeholder='Pro ?'> <button id='pro_ACTUALLY'>Submit</button>")

		console.log($("input:text").length)
	}
	else {
		alert("There is already a text field open.");
		console.log($("input:text").length)
	}
	//if a text field doesn't already exist on the page, add one
})

$("#pro_ACTUALLY").on("click", function(){
// click(function(){
	// alert("hey!")
	// if ($("input:text")[0].value !== ""){
		var inputted_pro = $("input:text")[0].value ;

		console.log($("input:text").value);
		console.log(inputted_pro);

		$(".pro_ul").append("<li>" + inputted_pro + "</li>") ;
		$("input:text").remove()
		// $("#pro_ACTUALLY").remove()

	// }
	// else {
	 // alert("You must enter a pro.")
	// }
})

//put in functionality so when they press enter, the text from input turns into a list item 

// logic: value from input field would be added to the pro_ul as a list item, 
// 1) form, with submit button, and upon submit press, takes value from text field and removes input field from pro_ul 

// eventually, i want to make the input be turned into the li upon "enter" keypress
// and i want them to be able to remove any lis if they see fit (remove button, edit button)
// also, i want validations on the input field, shouldnt be able to submit unless the value is not empty

// right now: have a working model that adds, but want to look into html storage 

// tonight: styling. add edit and remove buttons, make it very stylized with font and borders and everything

})