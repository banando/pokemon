
//charcater select
console.log('main.js loaded');


/* MODEL */

var activePokemonIndices = [
	24,
	6,
	3,
	0,
	38
];

var pokemon1 = {};
var pokemon2 = {};
var turn = 1;

var choosePokemonMode = 1;
var cpuBattleMode = true;

/* HELPER / ACTION FUNCTIONS */

var randomActivePokemon = function() {
	var randomIndex = Math.floor(Math.random()*activePokemonIndices.length);
	return pokemons[activePokemonIndices[randomIndex]];
}

var readyPokemonForBattle = function(p1, p2) {
	p1.hp = p1.health;
	p2.hp = p2.health;
	p1.ap = p1.attack;
	p1.ap = p1.attack;
};

/* CACHE DOM REFERENCES */
var $text = $("#textBox");
var $playerSelect = $("#playerSelect");

/* EVENT LISTENERS */

var selectPokemon = function(evt) {
	console.log('selected');
	var pokemonIndex = activePokemonIndices[this.id.slice(-1)];
	
	if (cpuBattleMode) {
		pokemon1 = pokemons[pokemonIndex];
		// randomly set pokemon2
		pokemon2 = randomActivePokemon();
		// change to battle mode
        choosePokemonMode = false;
	} else {
		if (choosePokemonMode === 1) {
			pokemon1 = pokemons[pokemonIndex];
			choosePokemonMode = 2;
		} else {
			pokemon2 = pokemons[pokemonIndex];
			choosePokemonMode = false;
		}
	}

	readyPokemonForBattle(pokemon1, pokemon2);
	render();
};


/* RENDER */

var renderPlayerChooseMode = function() {
	$playerSelect.html("<h1>Choose your starting <span>Pokemon</span></h1>");

	// build the html for each pokemon choice
	for (var i = 0; i < activePokemonIndices.length; i++) {
		var currentPokemon = pokemons[activePokemonIndices[i]];

		var $table = $("<table>", {id: "active-pokemon" + i, class: "selection"});
		$table.append($("<img>", {src: currentPokemon.image_url, class: "choice-pic"}));

		$table.append($("<tr>").append(
			$("<td>", {text: "Name"}),
			$("<td>", {text: currentPokemon.name})
		));

		$table.append($("<tr>").append(
			$("<td>", {text: "Health"}),
			$("<td>", {text: currentPokemon.health})
		));

		$table.append($("<tr>").append(
			$("<td>", {text: "Attack"}),
			$("<td>", {text: currentPokemon.attack})
		));

		$table.append($("<tr>").append(
			$("<td>", {text: "Defense"}),
			$("<td>", {text: currentPokemon.defense})
		));
		
		$playerSelect.append($table);
	};

	$("table.selection").on('click', selectPokemon);

	$("#board").css('display', 'none');
    // setTimeout(chooseCpu,1000);
};

// shortcut to render each player
var renderPlayers = function(){
	$('#hp1').html(pokemon1.hp + " / " + pokemon1.health);
	$('#hp2').html(pokemon2.hp + " / " + pokemon2.health);
	$("#ap1").html(pokemon1.ap);
	$("#ap2").html(pokemon2.ap);
}


var render = function() {
	if (choosePokemonMode) {
		renderPlayerChooseMode();
	} else {
		// battle mode
		$("#board").css('display', '');
		renderPlayers();
	}
}

	
render();

/*
var turn = true;
$("#board").on('click', 'button', function(evt){
	var attacker, enemy;
	var move = $(evt.target).html();
	console.log("clicked!")
	if(turn){
		attacker = p1stats;
		enemy = p2stats;
	}
	else{
		attacker = p2stats;
		enemy = p1stats
	}
	if(move==="attack"){
		battleCalculations(attacker, enemy);
		$text.html("Your " + attacker.names + " used attack");
		$("#sp1").attr("disabled", false);


	}
	else if(move === "special"){
		attacker.special = 2;
		battleCalculations(attacker,enemy);
		$("#sp1").attr("disabled", true)
		$text.html("Your " + attacker.names + " used special attack");
	}
	else {
		attacker.block = .25;
		$text.html("Your " + attacker.names + " used defend");
		$("#sp1").attr("disabled", false);

	}
	renderPlayers();
	isWinner(enemy, attacker)
	turn = !turn;
	$("#p1Moves button").prop("disabled", !turn);
	$("#p2Moves button").prop("disabled", turn);
})






// check winner funtion
var isWinner = function(enemy, attacker){
	if(enemy.hp<1){
		if(enemy === p1stats){
			$("#p1Pokemon").fadeOut(2000,playAgain);
		}
		else {
			$("#p2Pokemon").fadeOut(2000,playAgain);
		}
		$text.html("Player " + attacker.player + " is the winner!");
		enemy.hp = 1;
		
		return true;
	}
}
var playAgain= function(){
	if(confirm('Do you want to play again?')){
			//reload game
			$("#sp1").prop('disabled', false);
			$("#p2Pokemon").attr("style", "");			
			$("#p2Pokemon").attr("style", "");
			playerChoose();
			console.log("this is happening")
		}
		else{
			console.log("something is wrong");
			//disable buttons
			//add a button somewhere to play again
		}
}


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
	p2stats.hp= pokemon[cpuChoice].health;
	p2stats.element= pokemon[cpuChoice].element;
	p2stats.ap= pokemon[cpuChoice].attack;
	p2stats.names = pokemon[cpuChoice].name;
	p2stats.player = 2;
	p2stats.special = 1;
	p2stats.block = 1;
	p2stats.defense = pokemon[cpuChoice].defense;
	p2stats.choice = cpuChoice;
	$('#hp2').html(pokemon[cpuChoice].health);
	$('#ap2').html(pokemon[cpuChoice].attack);
	$("#df2").html(pokemon[cpuChoice].defense);
	$('#p2Pokemon').attr('src', pokemon[cpuChoice].image_url);
	$('#p2Name').html(pokemon[cpuChoice].name);
	$text.html("Player 1's turn")
};

//displays and saves values of the pokemon chosen by player 1

var renderPlayerInitial = function(){
// input stats for player 1
	p1stats.hp = pokemon[p1Choice].health;
	p1stats.ap = pokemon[p1Choice].attack;
	p1stats.names = pokemon[p1Choice].name;
	p1stats.player = 1;
	p1stats.special = 1;
	p1stats.defense = pokemon[p1Choice].defense;
	p1stats.block = 1;
	p1stats.choice = p1Choice;
	$('#p1Name').html(pokemon[p1Choice].name);
	$('#p1Pokemon').css('background: ' + pokemon[p1Choice].image_url);
	$('#p1Pokemon').attr('src',pokemon[p1Choice].image_url);
	$('#hp1').html(pokemon[p1Choice].health);
	$('#ap1').html(pokemon[p1Choice].attack);
	$("#df1").html(pokemon[p1Choice].defense);
	useSpecial = true;

}

/// working on better battle algorithm 
var battleCalculations = function(attacker, enemy){
	var damage = Math.floor(5*attacker.ap*attacker.special*enemy.block / enemy.defense);
	console.log( attacker, damage);
	enemy.hp -= damage;
	attacker.special=1;
	enemy.block=1;
	return (damage);

}
//special should not be used twice in a row
//when used, make button disabled
//enable again when any other move is used within that move.


var cpuMove= function(){
	var x = Math.random();
	//resets attack in case defense was used
	p1stats.ap = pokemon[p1Choice].attack;
	if(x<.33){
		battleCalculations(p2stats, p1stats);
		$text.html("Gary's " + p2stats.names + " used attack");
	}
	else if(x<.66){
		p2stats.ap *= 2;
		battleCalculations(p2stats, p1stats);
		$text.html("Gary's " + p2stats.names + " used special attack");
	}
	else {
		p2stats.block = .25;
		$text.html("Gary's " + p2stats.names + " used defense");
	}
	renderPlayers();
	isWinner(p1stats, p2stats);
}
*/