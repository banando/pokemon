
//charcater select
console.log('main.js loaded');
//This has to happen using player choice and then 
//random for computer choice
var p1Choice;
var p1stats={};
var p2stats = {};
var restart = false;
var $text = $("#textBox");
//cpu chosen at 'random'
var cpuChoice;
//initialize pictures to choice options
$("#pikachu").attr('src', pokemon[24].image_url);
$("#squirtle").attr('src', pokemon[6].image_url);
$("#charmander").attr('src', pokemon[3].image_url);
$("#bulbasaur").attr('src', pokemon[0].image_url);

// Auto choose player 2 for cpu
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
	//input the stats value in table for comp/player2
	p2stats.hp= pokemon[cpuChoice].health*2;
	p2stats.element= pokemon[cpuChoice].element;
	p2stats.ap= pokemon[cpuChoice].attack/2;
	p2stats.names = pokemon[cpuChoice].name;
	p2stats.player = 2;
	p2stats.special = 1;
	p2stats.block = 1;
	$('#hp2').html(pokemon[cpuChoice].health*2);
	$('#ap2').html(pokemon[cpuChoice].attack/2);
	$("#element2").html(pokemon[cpuChoice].element);
	$('#p2Pokemon').attr('src', pokemon[cpuChoice].image_url);
	$('#p2Name').html(pokemon[cpuChoice].name);
	$text.html("Player 1's turn")
};
var battle = function(){

	$("#p1Moves").on('click', 'button', function(evt){
//need to tweak to account for special and defense variable
		var move = $(evt.target).html();
		//resets attack in case defense was used
		p2stats.ap= pokemon[cpuChoice].attack/2
		if(move==="attack"){
			p2stats.hp -=p1stats.ap;
			useSpecial = true;
			$text.html("Your " + p1stats.names + " used attack");


		}
		else if(move === "special"){
			p2stats.hp -=p1stats.ap*1.5
			useSpecial = false
			$text.html("Your " + p1stats.names + " used special attack");
		}
		else {
			p2stats.ap /= 2;
			useSpecial = true;
			$text.html("Your " + p1stats.names + " used defend");
		}
		if(!useSpecial){
			$("#sp1").prop('disabled', true);
		}
		else{
			$("#sp1").prop('disabled', false);			
		}
		renderPlayers();
		isWinner(p2stats, p1stats);
		setTimeout(cpuMove,2000);
	if(restart){return false;}
	})
}
// check winner funtion
var isWinner = function(enemy, attacker){
	if(enemy.hp<1){
			$text.html("Player " + attacker.player + " is the winner!");
			if(confirm('Do you want to play again?')){
				//reload game
				console.log("this is happening")
				playerChoose();
				return false;
			}
			else{
				console.log("something is wrong");
				//disable buttons
				//add a button somewhere to play again
			}
		}
}

//valid pokemon choices are 1,3,6, or 24.
// Initiate game and restart game
var playerChoose= function(){
	$("#board").css('display', 'none');
	$(".choicePic").on('click', function(evt){
		console.log(evt.target.id);
		p1Choice = null;

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
			renderPlayerInitial();
			$(".choicePic").off();
		}else {p1Choice[2];}

	})
	setTimeout(chooseCpu,1000);

}

//displays and saves values of the pokemon chosen by player 1
playerChoose();
var renderPlayerInitial = function(){
// input stats for player 1
	p1stats.hp = pokemon[p1Choice].health*2;
	p1stats.ap = pokemon[p1Choice].attack/2;
	p1stats.names = pokemon[p1Choice].name;
	p1stats.player = 1;
	$('#p1Name').html(pokemon[p1Choice].name);
	$('#p1Pokemon').css('background: ' + pokemon[p1Choice].image_url);
	$('#p1Pokemon').attr('src',pokemon[p1Choice].image_url);
	$('#hp1').html(pokemon[p1Choice].health*2).value;
	$('#ap1').html(pokemon[p1Choice].attack/2).value;
	$("#element1").html(pokemon[p1Choice].element);

}

//shortcut to render each player
var renderPlayers = function(){
	$('#hp1').html(p1stats.hp);
	$('#hp2').html(p2stats.hp);
}
// working on better battle algorithm 
var battleCalculations = function(attacker, enemy){
	enemy.hp -= 5*attacker.ap*attacker.special*enemy.block/enemy.defense;

}
//special should not be used twice in a row
//when used, make button disabled
//enable again when any other move is used within that move.

var useSpecial;

var cpuMove= function(){
	var x = Math.random();
	//resets attack in case defense was used
	p1stats.ap = pokemon[p1Choice].attack/2;
	if(x<.33){
		p1stats.hp -= p2stats.ap;
		$text.html("Gary's " + p2stats.names + " used attack");
	}
	else if(x<.66){
		p1stats.hp -= p2stats.ap*1.5;
		$text.html("Gary's " + p2stats.names + " used special attack");
	}
	else {
		p1stats.ap /= 2;
		$text.html("Gary's " + p2stats.names + " used defense");
	}
	renderPlayers();
	isWinner(p1stats, p2stats);
}
battle();