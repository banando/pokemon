
//charcater select
console.log('main.js loaded');
//This has to happen using player choice and then 
//random for computer choice
var playerChoice;
//should equal 1,3,6, or 25.
$('#p1Name').html(pokemon[0].name);
$('#p1Pokemon').css('background: ' + pokemon[0].image_url);

$('#p1Pokemon').attr('src', function(){
	return pokemon[0].image_url;
	});
$('#p2Pokemon').attr('src', function(){
	return pokemon[3].image_url;
	});
$('#p2Pokemon').attr('src', function(){
	return pokemon[3].image_url;
	});
$('#p2Name').html(pokemon[3].name);


$('#p1Pokemon').addClass('flipped');
//input the stats value in table for comp/player2
$('#hp2').html(pokemon[3].health*2);
$('#ap2').html(pokemon[3].attack/2);
$("#element2").html(pokemon[3].element);
// input stats for player 1
$('#hp1').html(pokemon[0].health*2);
$('#ap1').html(pokemon[0].attack/2);
$("#element1").html(pokemon[0].element);

//special should not be used twice in a row
//when used, make button disabled
//enable again when any other move is used within that move.