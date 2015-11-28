$(function(){
	var prevTab = 'splash';
	$('#splash').addClass('show');
	$('#title').on('click', function(){
		$('#'+prevTab).removeClass('show');
		$('#splash').addClass('show');
		prevTab = 'splash';
	})

	$('#menu').on('click', 'li', function(){
		var select = $(this).attr('class');
		$('#'+prevTab).removeClass('show');
		prevTab = select;
		$('#'+select).addClass('show');
	})
})