
// Chcia³bym wygenerowaæ liczbê z przedzia³u 00 do 66. Struktura wymusza u¿ycie dwóch liczb i zestawienie ich ze sob¹
// Liczby przekonwertujê na elementy string przy pomocy .toString(); Nastêpnie dodam je do siebie co spowoduje stworzenie odpowiedniej liczby

var allCells = document.getElementsByTagName("td");
var fireButton = document.getElementById("fire-button");
var shot = document.getElementById("shot");
var userGuess;
var message = document.getElementById("message-area");
var scoreboard = document.getElementById("scoreboard-area");
var shipsLeft = 3;
var shotsCounter = 0;
var counter = document.getElementsByClassName("counter")[0];


var Battleships = {
//Step 1. Place ships on the board
	//1.1 Generate two number between 0 and 6
	randomNum: function() {
		var num = Math.floor(Math.random() * 6) + 1;
		return num;
	},
	generateId: function() {
		var num01 = this.randomNum();
		var num02 = this.randomNum();
	//1.2 Convert two numbers to string with .toString() and add them together creating ID number
		var string01 = num01.toString();
		var string02 = num02.toString();
		var idNum = string01 + string02;
		return idNum;
	},
	placeShip: function() {
	//1.3 Find cells with certain ID number and add class "ship"
		var shipCell01 = document.getElementById(this.generateId());
		shipCell01.classList.add("ship");		
		console.log(shipCell01);
		var shipCell02 = document.getElementById(this.generateId());
		if (shipCell02 == shipCell01) {
			console.log("same cells!");
			shipCell02 = document.getElementById(this.generateId());
		}
		shipCell02.classList.add("ship");		
		console.log(shipCell02);
		var shipCell03 = document.getElementById(this.generateId());
		if (shipCell03 == shipCell02 || shipCell03 == shipCell01) {
			console.log("same cells!");
			shipCell03 = document.getElementById(this.generateId());
		}
		shipCell03.classList.add("ship");		
		console.log(shipCell03);
	},
	//1.4 Select all the other cells and add class "miss"
	placeMiss: function() {
		for (var i = 0; i < allCells.length; i++) {
			if (!allCells[i].classList.contains("ship")) {
				allCells[i].classList.add("miss")
			}
		}
	}
}

	//1.5 Place ships and misses on the board
	Battleships.placeShip();
	Battleships.placeMiss();

//Step 2. Get users input and check if it was a hit
	//2.1 Get value of the input field when user hits "fire" button
	fireButton.addEventListener("click", function(event){
		event.preventDefault();
		userGuess = shot.value.trim();
		if (shot.value.length != 2) {
			message.innerText = "Select field between A0 and G6";
			alert("You need to select field between A0 and G6");
		}
		Game.conversion();
		Game.hitCheck();
		shot.value= "";
	});	
	
var Game = {
	//2.2 Convert the value so it can be compared with cells ID
	conversion: function() {
		var rowYguess = userGuess.charAt(0);
		if (rowYguess.toUpperCase() == "A") {
			rowYguess = "0";
		}
		else if (rowYguess.toUpperCase() == "B") {
			rowYguess = "1";
		}
		else if (rowYguess.toUpperCase() == "C") {
			rowYguess = "2";
		}
		else if (rowYguess.toUpperCase() == "D") {
			rowYguess = "3";
		}
		else if (rowYguess.toUpperCase() == "E") {
			rowYguess = "4";
		}
		else if (rowYguess.toUpperCase() == "F") {
			rowYguess = "5";
		}
		else if (rowYguess.toUpperCase() == "G") {
			rowYguess = "6";
		}
		var rowXguess = userGuess.charAt(1);
		fullGuess = rowYguess + rowXguess;
		console.log(fullGuess);
	},
	hitCheck: function() {
		//2.3 Find cell with certain ID and check it it does have class "ship"
		var cellHit = document.getElementById(fullGuess);
		//2.3.1 If it has class "ship" show message "it's a hit!" and change visibility to "visible"
		if (cellHit.classList.contains("hit")) {
			message.innerText = "You can't hit the same spot twice!"
			alert("You can't hit the same spot twice!");
		}
		else if (cellHit.classList.contains("ship")) {
			cellHit.style.visibility = "visible";
			message.innerText = "Yey! It's a hit!";
			shipsLeft -= 1;
			scoreboard.innerText = shipsLeft + " ships left to hit";
			shotsCounter += 1;
			counter.innerText = "Counter: " + shotsCounter;
			cellHit.classList.add("hit");
			if (shipsLeft == 0) {
				message.innerText = "You hit all the ships!";
			}

		}
		//2.3.2 If it doesn't have class "ship" show message "it's a miss!" and change visibility to "visible"
		else {
			console.log("It's a miss!");
			cellHit.style.visibility = "visible";
			message.innerText = "Wops, it's a miss!";
			shotsCounter += 1;
			counter.innerText = "Counter: " + shotsCounter;
		}
	}
}







	
	