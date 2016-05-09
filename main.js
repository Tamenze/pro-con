$(document).ready(function(){
console.log("connected.")
console.log($("input:text").length)


if(typeof(Storage) !== "undefined"){
    // proArray = [];
    proArray = localStorage.getItem('pros').split(",")


    if (localStorage.getItem("pros") !== null ){
    	// PROBLEM = when pushed to proArray, length is fine. but when localStorage sets 'pros' to be proArray, it is pushing each new character as a separate item in the array, rather than whole strings. 
		// we need to find a way to make sure the setItem is accepting things as Arrays, not as strings
    	var proPrevArray = localStorage.getItem('pros').split(",")
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
		localStorage.setItem("pros", proArray);

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
	//probably refresh the page too
})

// proArray = [];
// proArray.push(inputted_pro);
// localstorage.setItem("pros", proArray);
//each time submit pro button is pressed, we should 
	// 1)push the innertext to the proArray 
	// 2)reset the localstorage item



// var proPrevArray = localstorage.getItem('pros')
// proPrevArray.forEach(function(proText){
// 	$(".pro_ul").append("<li>" + proText + "</li>") ;

// })

//upon refresh of the page (window.load? document.ready?), we should make a loop that iterates through each item in the array by the 'pros' key, and render it as an li on the page

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