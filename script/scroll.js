/* $(window).on('scroll', function() {
	var i=0;
	var sP = $(this).scrollTop();
	var x=sP/4;
	i=Math.sin(x*(Math.PI/180))
	
	if(sP<721){
    $('#welcome').css({'opacity':i});
	console.log(i);
	}
}); */
$(window).on('scroll', function() {
	
 var i=0;
 var sP = $(window).scrollTop();
 console.log(sP);
 var c=$('.first').eq(0).height()/2;
 var rotat=($(window).scrollTop())*2;
  $(".first img").css({'top':($(window).scrollTop())*0.3+'px'});
  $(".first img").css({'transform':'rotate('+(rotat*0.3)+'deg)'});
  $(".first img:last-child").css({'transform':'rotate('+(rotat*-0.3)+'deg)'});
  console.log('rotate>>>>> '+rotat);
 if(sP<c){
 var x=sP/(c/180);
 console.log('deg>>>'+x);
 console.log('rad>>>'+(x*(Math.PI/180)));
 var i=Math.sin(x*(Math.PI/180));
 console.log('opacity>>> '+i);
 $('#welcome').text("Asphalt Alpha");
 $('#welcome').css({'opacity':i});
 }
else if(sP>c){
  $('#welcome').css({'opacity':0});
  var remove=($(window).scrollTop()-$(".second").eq(0).offset().top)/10;
  if(remove>0){
	  var three=$(".third").eq(0).offset().top;
	  var sS=$(window).scrollTop()-$(".second").eq(0).offset().top;
	  console.log('remove'+remove+' sS'+sS+' right'+parseFloat($('#c2').css('right')));
	$('#c1,#c2').css({'top' :sS+'px'});
	console.log($('#c1,#c2').css('top'));
	$('#c1').css({'transform': 'translateX(-'+(remove*2)+'%)' });
	$('#c2').css({'transform': 'translateX('+(remove*2)+'%)' });
	 $('.third figure').css({'top':'100%'});
	 if(remove<=1.2){
		console.log('animate');
		$('#c1,#c2').animate({'top':'0'},80); 
		$('#c1').css({'transform': 'translateX(0px)'});
		$('#c2').css({'transform': 'translateX(0px)'});
	} 
	 else if(sP>=$(".third").eq(0).offset().top){

		 $('.third figure').eq(0).css({'top':'15%'});
		 $('.third figure').eq(1).css({'top':'70%'});
		 } 
 }
 } 
 
});
var selectedCar=0;
var cpuCar=0;
/* $(".second").eq(0).offset().top<= $(window).scrollTop() && $(".third").eq(0).offset().top>=$(window).scrollTop() */
$('#start').on('click',function(){
	var carno=parseInt($('#carselect').val());
	if(carno==1 || carno==2){
		selectedCar=carno;
		cpuCar=(carno==1)?2:1;
		$('.car_no').hide();
		timeout(5);
		$('body').css('overflow-y','hidden');
		 $('#c1,#c2').hide();
		$('.third figcaption').hide();
		console.log(cpuCar);
	}
});
function timeout(a){
var time= setInterval(function(){
	$('#welcome').animate({'opacity':'1'},250);
 if(a==0){
	$('#welcome').text("Let's Start");
	$('#third').trigger('focus');
	/* cpuControl(); */
	cpuCarmove();
	 clearInterval(time);
 }	 
 else{
	$('#welcome').text(a);
	a=a-1;
	};
	$('#welcome').animate({'opacity':'0'},500);
 },1000);
 console.log($('#welcome').text());
}
var distance=0,
	distanceCpu=0,
	flag=0;
$('#third').keydown(function(event){
	console.log(event);
	if(event.keyCode==39){
		distance+=30;
		$('#car'+selectedCar).css({'transform':'translateX('+distance+'px)'});
		if(distance>$(window).width()){
			$('#car'+selectedCar).hide();
			result('You');
		}
	}
	else if(event.keyCode==37 && distance>0){
		distance-=30;
		$('#car'+selectedCar).css({'transform':'translateX('+distance+'px)'});
	}
});

/* function cpuControl(){
	$('#car'+cpuCar).css({'transition':'5s linear'});
	$('#car'+cpuCar).css({'transform':'translateX('+$(window).width()+'px)'});
} */

function cpuCarmove(){
	var dis =setInterval(function(){
		if(distanceCpu>($(window).width())){
			result('CPU');
			 clearInterval(dis);
		}
		distanceCpu+=randomSpeed(30,35);
		$('#car'+cpuCar).css({'transform':'translateX('+distanceCpu+'px)'});
	},50);
}

function randomSpeed(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function result(winner){
	if(flag==0){
		flag=1;
		$('#welcome').text(winner+' wins');
		$('#welcome').css({'opacity':'1'});
		$('body').css('overflow-y','initial');
		$('#welcome').animate({'opacity':'0'},500);
		$('#c1,#c2').show();
	}
}