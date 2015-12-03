$(function(){
	var prevTab = 'splash';
	var currentProj = 'tictactoe';
	var prevProj, nextProj;
	var xs = window.matchMedia("(max-width: 480px)");
	var sm = window.matchMedia("(max-width: 768px)");
	var url = window.location.href;
	var random = Math.floor((Math.random()*4)+1);

	//Splash page with random image at the start...
	$('#splash').html('<img src="images/splash-'+random+'.jpg" alt="home page image">').show();
	$('#splash').show();
	$('#title').wrapInner('<a href= index.html />');

	//Behavior on resize
	function windowBehavior(){
		if(xs.matches){
				$('#title h1').addClass('notHome');
				$('#menu li').addClass('notHome');
				$('#subtitle').hide();
				$('.project-list').hide();
				$('#projects .item').addClass('active');
			}
		else if(sm.matches){
			$('#projects .item').addClass('active');
			$('.project-list').hide();
		}
		else{
			$('#title h1').removeClass('notHome');
			$('#menu li').removeClass('notHome');
			$('#subtitle').show();
			$('.project-list').show();
			$('#projects .item').removeClass('active');
			$('#Simon_Game').addClass('active');
		}
	}

	$(window).bind('resize', function(){
		windowBehavior();
	});

	//Create projects list navigation 
	$('.item').each(function(index){
		var projItem = $(this).attr('id').replace(/_/g,' ');
		$('.project-list').append('<li class="'+$(this).attr('id')+'"><p>'+projItem+'</p></li>');
	});

	$('.project-list li').first().addClass('selected');

	//change url for each tab
	$('#menu li').each(function(){
		$(this).wrapInner('<a href= index.html#'+$(this).attr('class')+'/>');
	});

	//take user back to splash screen
	$('#title').on('click', function(){
		random = Math.floor((Math.random()*4)+1);
		$('#'+prevTab).hide();
		$('#splash').html('<img src="images/splash-'+random+'.jpg" alt="home page image">').show();
		prevTab = 'splash';

		if(xs.matches){
			$('#title h1').removeClass('notHome');
			$('#menu li').removeClass('notHome');
			$('#subtitle').show();
		}
	});

	//go to tab content
	$('#menu').on('click', 'li', function(){
		var select = $(this).attr('class').split(' ');

		$('#'+prevTab).hide();
		prevTab = select[0];
		$('#'+select[0]).show();

		windowBehavior();
	});

	//go to specific project
	$('.project-list').on('click','li',function(){
		var projID = $(this).attr('class');
		if(!$(this).hasClass('selected')){
			$('li').removeClass('selected');
			$(this).addClass('selected');
		
			$('.item').removeClass('active');
			$('#'+projID).addClass('active');
		}
	});


	//To change highlighted project-list item
	$('.carousel-control').on('click', function(){
		//timeout made because active wouldn't move until animation from carousel finished
		setTimeout(
			function(){
				$('li').removeClass('selected');
				$('.item').each(function(){
				if($(this).attr('class').split(' ')[1] == 'active'){
					var currentItem = $(this).attr('id');
				}
				$('.'+currentItem).addClass('selected');
			});
		}, 1000)
	});


})