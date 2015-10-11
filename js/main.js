
//charcater select
console.log('main.js loaded');

$('#p1Stats').html(pokemon[0].name);
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






