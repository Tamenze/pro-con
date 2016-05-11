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
	      			$(".pros").append("<li class='" + proPrevArray.indexOf(proPrevArray[i]) + "'>" + proPrevArray[i] + " <span class='delete'>X</span> </li>") 
	      		}
	      	}
	}

	if (localStorage.getItem("cons") !== null ){
    	conArray = JSON.parse(localStorage.getItem('cons'))
    	var conPrevArray = JSON.parse(localStorage.getItem('cons'))
	      	
	      	if (conPrevArray !== null){
	      		for (var i = 0; i < conPrevArray.length; i++){
	      			$(".cons").append("<li class='" + conPrevArray.indexOf(conPrevArray[i]) + "'>" + conPrevArray[i] + " <span class='delete'>X</span> </li>") 
	      		}
	      	}
	}
}
else{
    console.log("No web storage support")
}



$("#pro_add").click(function(){
	var key = $(this).parent().siblings("ul").attr('class')
	console.log(key) 

	if ( $("input:text").length === 0 ){
		$(".pros").append("<input id='pro_space' type='text' placeholder='PRO? (Enter)'>");
		$("#pro_space").get(0).focus();
		$("#pro_space").keypress(function(event){
			
			if (event.which === 13 && $("input:text")[0].value !== ""){ //add presence validations
				var inputted_pro = $("input:text")[0].value ;
				proArray.push(inputted_pro);
				localStorage.setItem("pros", JSON.stringify(proArray) );

				// console.log($("input:text").value);
				// console.log(inputted_pro);
				// console.log(proArray);
				// console.log("length of proArray: " + proArray.length);

				var myArray = JSON.parse(localStorage.getItem(key))
				var index = myArray.length - 1


				$(".pros").append("<li class=" + index +">" + inputted_pro + " <span class='delete'>X</span> </li>") ;
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
	var key = $(this).parent().siblings("ul").attr('class')
	console.log(key) 	

	if ( $("input:text").length === 0){ 
		$(".cons").append("<input id='con_space' type='text' placeholder='Con? (Enter)'>");
		$("#con_space").get(0).focus();
		$("#con_space").keypress(function(event){

			if (event.which === 13 && $("input:text")[0].value !== ""){
				var inputted_con = $("input:text")[0].value ;
				conArray.push(inputted_con);
				localStorage.setItem("cons", JSON.stringify(conArray) );

				var myArray = JSON.parse(localStorage.getItem(key))
				var index = myArray.length - 1


				$(".cons").append("<li class=" + index +">" + inputted_con + " <span class='delete'>X</span> </li>") ;
					//i need to dynamically add an event listener to this span class
				$("input:text").remove()
			}
		})
	}
	else {
		alert("There is already a text field open.");
		console.log($("input:text").length)
	}

})


$("ul li").mouseenter(function(){


	var delete_me = $(this).find(".delete")
	delete_me.css({"visibility":"visible"});

	var myIndex = $(this).attr('class')
	console.log("myIndex: "+ myIndex)

	var key = $(this).parents("ul").attr('class') 
	
	delete_me.click(function(){



		console.log("2nd way" + JSON.parse(localStorage.getItem(key))[myIndex])
		// localStorage.removeItem(key[myIndex])
		// PROBLEM: we can only pass in whole objects to the remove Item function, not array indexes
		// we need to find a way to loop through the relevant array and delete the value at myIndex

		var items = JSON.parse(localStorage.getItem(key))
		console.log("pre-splice items: " + items)
		if (myIndex > -1){
			items.splice(myIndex, 1)
			//removes 1 item at myIndex from items Array.splice(positionToStartRemoval, howMany)
		}

		console.log("items: " + items)
		
		localStorage.setItem(key, JSON.stringify(items))
		console.log("new local: "+ JSON.parse(localStorage.getItem(key)))
		document.location.reload(true)

			// console.log(localStorage.getItem(key[index]))
				// localStorage.removeItem(key[index])
		//remove it from the corresponding cookie array
			// -perhaps give each li the class corresponding to its place in the index,
			// and when the x is clicked, it removes only the localstorage item in the specified key and index location 
		//remove the parent li of this span from the page
	})

})

$("ul li").mouseleave(function(){
	$(this).find(".delete").css({"visibility":"hidden"})
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
// -dry up code (leave big comments in there, add better comments)
//-add some pop up instructions if they have never visited the site before (cookies)
	// -they can use html to put <strong> or <i> or images, etc

// bugs
// -the x doesnt show up until a refresh
// -switching back and forth quickly between lis and then deleting one sometimes deletes the other one too



// MAYBES
// -add what do i do button? and side with most items gets animation?
// -add title functionality (so you can name the topic at hand)?
// -make it so that they can have multiple lists stored, saved with time and date last edited


// -at end of pro/con listing, the side with more aspects should populate a modal that covers the whole page and say yes! or noooooo 
// -user should be able to send links of their list to others
// -should be able to put images/gifs in. 


})