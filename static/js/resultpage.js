//Sorting options panel slide up/down
$(document).ready(function(){
	$("#flip").click(function(){
		$("#panel1").slideUp("slow")
		$("#panel2").slideUp("slow")
		$("#panel3").slideUp("slow")
		$("#panel").slideToggle("slow");
	})
	$("#flip1").click(function(){
		$("#panel").slideUp("slow")
		$("#panel2").slideUp("slow")
		$("#panel3").slideUp("slow")
		$("#panel1").slideToggle("slow");
	})
	$("#flip2").click(function(){
		$("#panel").slideUp("slow")
		$("#panel1").slideUp("slow")
		$("#panel3").slideUp("slow")
		$("#panel2").slideToggle("slow");
	})
	$("#flip3").click(function(){
		$("#panel").slideUp("slow")
		$("#panel1").slideUp("slow")
		$("#panel2").slideUp("slow")
		$("#panel3").slideToggle("slow")
	})
})

// Show 5 results and 5 more when clicking on see more.
$(document).ready(function() {
	$('#moreResults').click(function () {
	    $('#datalist li:hidden').slice(0, 5).show();
	    if ($('#datalist li').length == $('#datalist li:visible').length) {
	        $('#moreResults').hide();
	    }
	})
	$('#moreResults1').click(function () {
	    $('#datalist1 li:hidden').slice(0, 5).show();
	    if ($('#datalist1 li').length == $('#datalist1 li:visible').length) {
	        $('#moreResults1').hide();
	    }
	})
	$('#moreResults2').click(function () {
	    $('#datalist2 li:hidden').slice(0, 5).show();
	    if ($('#datalist2 li').length == $('#datalist2 li:visible').length) {
	        $('#moreResults2').hide();
	    }
	})
	$('#moreResults3').click(function () {
	    $('#datalist3 li:hidden').slice(0, 5).show();
	    if ($('#datalist3 li').length == $('#datalist3 li:visible').length) {
	        $('#moreResults3').hide();
	    }	    
	});
})


//Tryout
