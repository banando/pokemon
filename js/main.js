
//charcater select
console.log('main.js loaded');


/* MODEL */

 var activePokemonIndices = [];
// 	24,1,2,4,5,7,8,10,11,12,13,14,15,16,17,
// 	6,
// 	3,
// 	0,
// 	38,
// 	11,
// 	15,
// 	51,
// ];
for (var i = 0; i < 149; i++) {
	activePokemonIndices.push(i);

};

var pokemon1 = {};
var pokemon2 = {};
var turn = 1;

var choosePokemonMode = 1;
var cpuBattleMode = false;

/* HELPER / ACTION FUNCTIONS */

var randomActivePokemon = function() {
	var randomIndex = Math.floor(Math.random()*activePokemonIndices.length);
	return pokemons[activePokemonIndices[randomIndex]];
}

var readyPokemonForBattle = function(p1, p2) {
	p1.hp = p1.health;
	p2.hp = p2.health;
	p1.ap = p1.attack;
	p2.ap = p2.attack;
	p1.block = p2.block = 1;
	p1.special = p2.special = 1;
	p1.usedSpecial = p2.usedSpecial = false;
	p1.player = 1;
	p2.player = 2;
};

/* CACHE DOM REFERENCES */
var $text = $("#textBox");
var $playerSelect = $("#playerSelect");

/* EVENT LISTENERS */

var selectPokemon = function(evt) {
	console.log('selected');
	var pokemonIndex = activePokemonIndices[this.id.slice(-1)];
	console.log(this.id)
	if (cpuBattleMode) {
		pokemon1 = pokemons[pokemonIndex];
		// randomly set pokemon2
		pokemon2 = randomActivePokemon();
		// change to battle mode
        choosePokemonMode = false;
	} else {
		if (choosePokemonMode === 1) {
			$("#playerSelect span").first().html("2");
			pokemon1 = pokemons[pokemonIndex];
			console.log(pokemon1);
			choosePokemonMode = 2;
		} else {
			pokemon2 = pokemons[pokemonIndex];
			choosePokemonMode = false;
			$playerSelect.css('display', 'none')
		}
	}

	readyPokemonForBattle(pokemon1, pokemon2);
	render();
};


/* RENDER */

var renderPlayerChooseMode = function() {
	$playerSelect.html("<h1>Player <span>1</span> Choose your starting <span>Pokemon</span></h1>");

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
	$("#df1").html(pokemon1.defense);
	$("#df2").html(pokemon2.defense);
	$("#p1Name").html(pokemon1.name);
	$("#p2Name").html(pokemon2.name);
	$("#p1Pokemon").attr("src", pokemon1.image_url);
	$("#p2Pokemon").attr("src", pokemon2.image_url);
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


$("#board").on('click', 'button', function(evt){
	var attacker, enemy;
	var move = $(evt.target).html();
	console.log("clicked!")
	if(turn === 1){
		attacker = pokemon1;
		enemy = pokemon2;
	}
	else{
		attacker = pokemon2;
		enemy = pokemon1;
	}
	if (attacker.usedSpecial = true){
		$("sp" + turn).attr("disabled", true)
	}
	if(move==="attack"){
		battleCalculations(attacker, enemy);
		$text.html("player " + attacker.player+ "'s " + attacker.name + " used attack");
		attacker.usedSpecial = false

	}
	else if(move === "special"){
		attacker.special = 2;
		battleCalculations(attacker,enemy);
		$text.html("player " + attacker.player+ "'s " + attacker.name + " used special attack");
		attacker.usedSpecial = true;
	}
	else {
		attacker.block = .25;
		$text.html("player " + attacker.player+ "'s " + attacker.name + " used defend");
		attacker.usedSpecial = false;
	}
	renderPlayers();
	isWinner(enemy, attacker)
	turn ++;
	if(turn===3){turn = 1;}
	$("#p1Moves button").prop("disabled", (attacker === pokemon1));
	$("#p2Moves button").prop("disabled", (attacker === pokemon2));
})






// check winner funtion
var isWinner = function(enemy, attacker){
	if(enemy.hp<1){
		if(enemy === pokemon1){
			$("#p1Pokemon").fadeOut(1000,playAgain);
		}
		else {
			$("#p2Pokemon").fadeOut(1000,playAgain);
		}
		var playerwins = attacker
		$text.html("Player " + attacker.player + " is the winner!");
		enemy.hp = 1;
		
		return true;
	}
}




var battleCalculations = function(attacker, enemy){
	var damage = Math.floor(5*attacker.ap*attacker.special*enemy.block / enemy.defense);

	console.log( attacker, damage);
	enemy.hp -= damage;
	attacker.special=1;
	enemy.block=1;
	return (damage);

}
var playAgain= function(){
	if(confirm('Do you want to play again?')){
			//reload game
			$("#sp1").prop('disabled', false);
			$("#p2Pokemon").attr("style", "");			
			$("#p1Pokemon").attr("style", "");
			choosePokemonMode = 1;
			renderPlayerChooseMode();
			console.log("this is happening")
		}
		else{
			console.log("something is wrong");
			//disable buttons
			//add a button somewhere to play again
		}
}
	




//displays and saves values of the pokemon chosen by player 1



/// working on better battle algorithm 
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
