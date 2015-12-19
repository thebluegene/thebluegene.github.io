$(function(){
	var prevTab = 'splash';
	var currentProj = 'Poll_App'; //This is the starting project
	var prevProj, nextProj;
	var xs = window.matchMedia("(max-width: 480px)");
	var sm = window.matchMedia("(max-width: 768px)");
	var url = window.location.href;
	var random = Math.floor((Math.random()*4)+1);
	var atTitle = true;

	//Splash page with random image at the start...
	$('#splash').html('<img src="images/splash-'+random+'.jpg" alt="home page image">').show();
	$('#splash').show();

	//Behavior on resize
	function windowBehavior(){
		if(xs.matches){
			if(!atTitle){
				$('#title h1').addClass('notHome');
				$('#menu li').addClass('notHome');
			}
			$('#subtitle').hide();
			$('.project-list').hide();
			$('#projects .item').addClass('active');
		}
		else if(sm.matches){
			$('#projects .item').addClass('active');
			$('#subtitle').show();
			$('.project-list').hide();
		}
		else{
			$('#title h1').removeClass('notHome');
			$('#menu li').removeClass('notHome');
			$('.project-list').show();
			$('#projects .item').removeClass('active');
			//First selected proejct
			$('#Simon_Game').addClass('active');
			$('#subtitle').show();
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
	//$('#menu li').each(function(){
	//	$(this).wrapInner('<a href= index.html#'+$(this).attr('class')+'/>');
	//});

	//take user back to splash screen
	$('#title').on('click', function(){
		atTitle = true;
		var temp = random;
		random = Math.floor((Math.random()*4)+1);
		while(temp == random){
			random = Math.floor((Math.random()*4)+1);
		}
		$('#menu li').css('border-bottom','none');
		$('#'+prevTab).hide();
		$('#splash').html('<img src="images/splash-'+random+'.jpg" alt="home page image">').show();
		prevTab = 'splash';

		$('#title h1').removeClass('notHome');
		$('#menu li').removeClass('notHome');

	});

	//go to tab content
	$('#menu').on('click', 'li', function(){
		var select = $(this).attr('class').split(' ');
		atTitle = false;

		$('#menu li').css('border-bottom','none');
		$(this).css('border-bottom','2px solid black');

		$('#'+prevTab).hide();
		prevTab = select[0];
		$('#'+select[0]).show();

		$('#title h1').addClass('notHome');
		$('#menu li').addClass('notHome');

		$('.project-list li').removeClass('selected');

		//This is the first project
		$('.project-list .Simon_Game').addClass('selected');
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