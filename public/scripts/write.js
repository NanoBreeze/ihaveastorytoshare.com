
$(document).ready( function() {

	//puts today's date in the "Date posted" input box
	document.writeForm.dateCreated.value = getDatePosted();



	function getDatePosted() {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();

		if(dd<10) {
			dd='0'+dd
		} 

		if(mm<10) {
			mm='0'+mm
		} 

		today = mm+'/'+dd+'/'+yyyy;
		return today;
	}



});