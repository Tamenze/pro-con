$(document).ready(function(){
console.log("connected.")
console.log($("input:text").length)
proArray = []
conArray = []

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
	if (localStorage.getItem("cons") !== null ){
    	 conArray = JSON.parse(localStorage.getItem('cons'))
    	var conPrevArray = JSON.parse(localStorage.getItem('cons'))
	      	if (conPrevArray !== null){
	      		for (var i = 0; i < conPrevArray.length; i++){
	      			$(".con_ul").append("<li>" + conPrevArray[i] + "</li>") 
	      		}
	      	}
	}
}
else{
    console.log("No web storage support")
}



$("#pro_add").click(function(){
	if ( $("input:text").length === 0 ){
		$(".pro_ul").append("<input id='pro_space' type='text' placeholder='Pro?'>");
		$("#pro_space").get(0).focus();
		$("#pro_space").keypress(function(event){
			
			if (event.which === 13 && $("input:text")[0].value !== ""){ //add presence validations
				var inputted_pro = $("input:text")[0].value ;
				proArray.push(inputted_pro);
				localStorage.setItem("pros", JSON.stringify(proArray) );

				console.log($("input:text").value);
				console.log(inputted_pro);
				console.log(proArray);
				console.log("length of proArray: " + proArray.length);

				$(".pro_ul").append("<li>" + inputted_pro + "</li>") ;
				$("input:text").remove()
			}

		})
	}
	else {
		alert("There is already a text field open.");
		console.log($("input:text").length)
	}

})


$("#con_add").click(function(){
	if ( $("input:text").length === 0){ 
		$(".con_ul").append("<input id='con_space' type='text' placeholder='Con?'>");
		$("#con_space").get(0).focus();
		$("#con_space").keypress(function(event){
			if (event.which === 13 && $("input:text")[0].value !== ""){
				var inputted_con = $("input:text")[0].value ;
				conArray.push(inputted_con);
				localStorage.setItem("cons", JSON.stringify(conArray) );

				console.log($("input:text").value);
				console.log(inputted_con);
				console.log(conArray);
				console.log("length of conArray: " + conArray.length);

				$(".con_ul").append("<li>" + inputted_con + "</li>") ;
				$("input:text").remove()
			}
		})
	}
	else {
		alert("There is already a text field open.");
		console.log($("input:text").length)
	}

})








$("#pro_clear").click(function(){
	localStorage.removeItem("pros");
	document.location.reload(true)
})

$("#con_clear").click(function(){
	localStorage.removeItem("cons");
	document.location.reload(true)
})

// STILL TO D0
// -add styling (think responsive)
// -dry up code (leave big comments in there, add better comments)
// -add delete functionality 

// -add validations for input fields
// -make it so that on click of "add pro/con", the focus is put on the text input field

// MAYBES
// -maybe draggable ui? there can be an unsure area and they can drag that text to either side and have it turn pro/con styled
// -add what do i do button? and side with most items gets animation?
// -add title functionality (so you can name the topic at hand)?
// -make it so that they can have multiple lists stored, saved with time and date last edited

// -should be able to write some text in a yellow sticky note type space (for aspects they're not sure if pro or con), and then drag to the proper side later
// -should also be able to drag things, once written in list, to opposite side

// -at end of pro/con listing, the side with more aspects should populate a modal that covers the whole page and say yes! or noooooo 
// -user should be able to send links of their list to others
// -should be able to put images/gifs in. 

// -put links to my github and portfolio on it 

})