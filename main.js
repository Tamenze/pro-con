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
			
			if (event.which === 13 && $("input:text")[0].value !== ""){ //adds presence validations
				var inputted_pro = $("input:text")[0].value ; //gets text 
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


//DELETES LIST ITEMS
$(document).on('click', ".delete", function(){	
	var myIndex = $(this).parents("li").attr('class')
	var localKey = $(this).parents("ul").attr('class')
	var items = JSON.parse(localStorage.getItem(localKey)) //sets items to be array of all elements in current array

	console.log("element selected for removal: " + JSON.parse(localStorage.getItem(localKey))[myIndex]) //logs selected li item 
	console.log("removal index: "+ myIndex) //log selected li's index

	if (myIndex > -1){  //if selected index is larger than -1 (should always be)
		console.log("pre-splice items: " + items)   //log selected li's containing array to console 
		items.splice(myIndex, 1)  //removes one item from containing temporary array at the selected index 
		console.log("post-splice items: " + items) 	 //logs new temporary array after splicing
	}

	localStorage.setItem(localKey, JSON.stringify(items))  //sets pro/con array to be newly post-splice array 
	console.log("new local " + localKey + " array: "+ JSON.parse(localStorage.getItem(localKey))) //logs new array from local storage
	document.location.reload(true) //reloads page so that array appears as from local storage 

});


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
	////set up so when they exit the intro popups, key prior in locla storage is set to true
		//so when they next come, i only show the popups if(localStorage.getItem("prior") !== "true")

// bugs
// -the x doesnt show up until a refresh
		//FIXED BY USING OPACITY INSTEAD OF VISIBILITY
// -switching back and forth quickly between lis and then deleting one sometimes deletes the other one too
		//FIXED BY REMOVING MOUSE ENTER EVENT, WHICH WAS ATTACHING MULTIPLE CLICK HANDLERS TO DELETE BUTTON
// // -the x doesnt work with the function until refreshed
		//FIXED BY USING .ON TO BIND EVENT TO DYNAMICALLY ADDED ELEMENT (http://stackoverflow.com/questions/203198/event-binding-on-dynamically-created-elements)


// MAYBES
// -add what do i do button? and side with most items gets animation?
// -add title functionality (so you can name the topic at hand)?
// -make it so that they can have multiple lists stored, saved with time and date last edited


// -welcome! this interface is simply designed to let you jot down positive and negative aspects of any situation

// -you can weigh your woes here and come back to them for introspection later 




// -at end of pro/con listing, the side with more aspects should populate a modal that covers the whole page and say yes! or noooooo 
// -user should be able to send links of their list to others
// -should be able to put images/gifs in. 


})