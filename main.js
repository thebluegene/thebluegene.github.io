$(function(){
	var prevTab = 'splash';
	var currentProj = 'tictactoe';
	var prevProj, nextProj;
	$('#splash').show();

	$('#title').on('click', function(){
		var random = Math.floor((Math.random()*4)+1);
		$('#'+prevTab).hide();
		$('#splash').html('<img src="images/splash-'+random+'.jpg" alt="home page image">').show();
		prevTab = 'splash';
	});

	$('#menu').on('click', 'li', function(){
		var select = $(this).attr('class');
		$('#'+prevTab).hide();
		prevTab = select;
		$('#'+select).show();
	});
})