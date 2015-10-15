var battle = function(){

	$("#p1Moves").on('click', 'button', function(evt){
		var move = $(evt.target).html();
		p2stats.ap= pokemon[cpuChoice].attack
		if(move==="attack"){
			battleCalculations(p1stats, p2stats);
			$text.html("Your " + p1stats.names + " used attack");
			$("#sp1").attr("disabled", false);


		}
		else if(move === "special"){
			p1stats.special = 2;
			battleCalculations(p1stats,p2stats);
			$("#sp1").attr("disabled", true)
			$text.html("Your " + p1stats.names + " used special attack");
		}
		else {
			p1stats.block = .25;
			$text.html("Your " + p1stats.names + " used defend");
			$("#sp1").attr("disabled", false);

		}
		renderPlayers();
		isWinner(p2stats, p1stats)

		//this needs to only play in cpu mode, 2 player mode;
		setTimeout(cpuMove,2000);
	})
}

var playerMove = function(attacker, enemy){
//need to add class of move to all moves. 
	$("#board").on('click', 'button', function(evt){
		var move = $(evt.target).html();
		enemy.ap= pokemon[enemy.choice].attack
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

		//this needs to only play in cpu mode, 2 player mode;
		setTimeout(cpuMove,2000);
	})
}
// ################# testing new .on placement. 2 PLAYER MODE
var turn = true;
$("board").on('click', 'button', function(evt){
	var attacker, enemy;
	var move = evt.target.html();
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
	$("#p1Moves").attr("disabled", turn);
	$("#p2Moves").attr("disabled", !turn);
}



})

function playerMove