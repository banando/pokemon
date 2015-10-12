
//charcater select
console.log('main.js loaded');
//This has to happen using player choice and then 
//random for computer choice
var p1Choice;
//cpu chosen at 'random'
var cpuChoice;
//initialize pictures to choice options
$("#pikachu").attr('src', pokemon[24].image_url);
$("#squirtle").attr('src', pokemon[6].image_url);
$("#charmander").attr('src', pokemon[3].image_url);
$("#bulbasaur").attr('src', pokemon[0].image_url);
var chooseCpu = function(){
	var x = Math.random();
	if(x<.25){
		cpuChoice = 0;
	}
	else if(x<.5){
		cpuChoice = 3;
	}
	else if(x<.75){
		cpuChoice = 6;
	}
	else {
		cpuChoice= 24;
	};
	$('#hp2').html(pokemon[cpuChoice].health*2);
	$('#ap2').html(pokemon[cpuChoice].attack/2);
	$("#element2").html(pokemon[cpuChoice].element);
	$('#p2Pokemon').attr('src', function(){
		return pokemon[cpuChoice].image_url;
		});
	$('#p2Pokemon').attr('src', function(){
		return pokemon[cpuChoice].image_url;
		});
	$('#p2Name').html(pokemon[cpuChoice].name);


};
//valid pokemon choices are 1,3,6, or 24.

var playerChoose= function(){
	p1Choice = null
	$("#board").css('display', 'none');
	$(".choicePic").on('click', function(evt){
		console.log(evt.target.id);
		switch (evt.target.id){
			case "bulbasaur": 
				p1Choice = 0;
				break;
			case "squirtle":
				p1Choice = 6;
				break;
			case "charmander":
				p1Choice = 3;
				break;
			case "pikachu":
				p1Choice = 24;
				break;
		}
		if(p1Choice!==null){
			$("#board").css('display','');
			renderPlayer();
			setTimeout(chooseCpu,3000);
		}
	})

}
playerChoose();
var renderPlayer = function(){
$('#p1Name').html(pokemon[p1Choice].name);
$('#p1Pokemon').css('background: ' + pokemon[p1Choice].image_url);

$('#p1Pokemon').attr('src',pokemon[p1Choice].image_url);
$('#hp1').html(pokemon[p1Choice].health*2);
$('#ap1').html(pokemon[p1Choice].attack/2);
$("#element1").html(pokemon[p1Choice].element);

}
//input the stats value in table for comp/player2

// input stats for player 1

//setTimeout(chooseCpu(), 100000);

//special should not be used twice in a row
//when used, make button disabled
//enable again when any other move is used within that move.