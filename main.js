$(document).ready(function(){
console.log("connected.")
console.log($("input:text").length)
proArray = []

if(typeof(Storage) !== "undefined"){
    // PROBLEM = inputs that contain commas within themselves get split into separate array items. 
    // 	we need to find a way to split the array into strings without messing up the internal strings, a way that doesnt use commas
    // Solution = JSON.stringify (converts proArray to string) and JSON.parse(converts string back to array)

    if (localStorage.getItem("pros") !== null ){
    	 proArray = JSON.parse(localStorage.getItem('pros'))
    	// PROBLEM = when pushed to proArray, length is fine. but when localStorage sets 'pros' to be proArray, it is pushing each new character as a separate item in the array, rather than whole strings. 
		// we need to find a way to make sure the setItem is accepting things as Arrays, not as strings
    	// var proPrevArray = localStorage.getItem('pros').split(",")
    	var proPrevArray = JSON.parse(localStorage.getItem('pros'))
	      	if (proPrevArray !== null){
	      		for (var i = 0; i < proPrevArray.length; i++){
	      			$(".pro_ul").append("<li>" + proPrevArray[i] + "</li>") 
	      		}
	      	}
	}
}
else{
    console.log("No web storage support")
}




$("#pro_add").click(function(){
	if ( $("input:text").length === 0 ){
		$(".pro_ul").append("<input type='text' placeholder='Pro ?'>")
		//if a text field doesn't already exist on the page, add one
		
		// $(".pro_ul").append("<input type='text' placeholder='Pro ?'> <button id='pro_ACTUALLY'>Submit</button>")

		console.log($("input:text").length)
	}
	else {
		alert("There is already a text field open.");
		console.log($("input:text").length)
	}

})

$("#pro_submit").on("click", function(){
// click(function(){
	// alert("hey!")
	// if ($("input:text")[0].value !== ""){
		var inputted_pro = $("input:text")[0].value ;
		//each time submit pro button is pressed, we should 
		// 1)push the innertext to the proArray 
		// 2)reset the localstorage item
		proArray.push(inputted_pro);
		// localStorage.setItem("pros", proArray);
		localStorage.setItem("pros", JSON.stringify(proArray) );

		console.log($("input:text").value);
		console.log(inputted_pro);
		console.log(proArray);
		console.log("length of proArray: " + proArray.length);



		$(".pro_ul").append("<li>" + inputted_pro + "</li>") ;
		$("input:text").remove()
		// $("#pro_ACTUALLY").remove()

	// }
	// else {
	 // alert("You must enter a pro.")
	// }
})

$("#pro_clear").click(function(){
	localStorage.removeItem("pros");
	document.location.reload(true)
})



// -html local storage for storing the pros and cons
	// i think it would be arrays within an object
	// 	{ 
	// 	  pros:["first", "second"],
	// 	  cons: ["1","the 2"]
	// 	}
// 	-also rendering them in the correct div after a refresh

// -validations 




//put in functionality so when they press enter, the text from input turns into a list item 

// logic: value from input field would be added to the pro_ul as a list item, 
// 1) form, with submit button, and upon submit press, takes value from text field and removes input field from pro_ul 

// eventually, i want to make the input be turned into the li upon "enter" keypress
// and i want them to be able to remove any lis if they see fit (remove button, edit button)
// also, i want validations on the input field, shouldnt be able to submit unless the value is not empty

// right now: have a working model that adds, but want to look into html storage 

// tonight: styling. add edit and remove buttons, make it very stylized with font and borders and everything

})