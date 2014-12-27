var map = [];

function parseKeyToFighter(keyIdentifier){
	switch(keyIdentifier){

		case "U+0057":
		case "U+0053":
		case "U+0041":
		case "U+0044":
		case "U+0020":
			return this.fighter_1;

		case "Up": 
		case "Down":
		case "Left":
		case "Right":
		case "Shift":
			return this.fighter_2;
		
	};
}

function key_event(e,fighter){
	// debugger;
    this.map[e.keyCode] = [];		
	this.map[e.keyCode][0] = (e.type == 'keydown');
    this.map[e.keyCode][1] = (e.keyIdentifier);

    var action;
    var fighter_to_move;
    for (var i = 0; i < this.map.length; i++) { // TODO: refactor this loop... it is executed many times with no need
    	
    	if (this.map[i]) { // key is mapped
	    	if (this.map[i][0]) { // key is pressed
	    		action = this.parseKeyToAction(this.map[i][1]); 
	    		fighter_to_move = this.parseKeyToFighter(this.map[i][1]);
	    		// debugger;
	    		if (fighter === fighter_to_move) {
					boxing.moveFighter(fighter,action);
	    		};
	    		
	    	};

    	};

    };
		
};


function parseKeyToAction(keyIdentifier){
	switch(keyIdentifier){
		case "Up": 
		case "U+0057":
			return "Up";

		case "Down":
		case "U+0053":
			return "Down";

		case "Left":
		case "U+0041":
			return "Left";

		case "Right":
		case "U+0044":
			return "Right";

		case "Shift":
		case "U+0020":
			return "Jab";
					
	};
};


// d3.select("body")
// 	.on('keydown.fighter_1',
// 		function(){
// 			boxing.key_event(
// 				d3.event, 
// 				boxing.fighter_1
// 			);	
// 		}
// 	);

// d3.select("body")
// 	.on('keydown.fighter_2',
// 		function(){
// 			boxing.key_event(
// 				d3.event, 
// 				boxing.fighter_2
// 			);
// 		}	
// 	);


// d3.select("body")
// 	.on('keyup.fighter_1',
// 		function(){
// 			boxing.key_event(
// 				d3.event, 
// 				boxing.fighter_1
// 			);	
// 		}
// 	);

// d3.select("body")
// 	.on('keyup.fighter_2',
// 		function(){
// 			boxing.key_event(
// 				d3.event, 
// 				boxing.fighter_2
// 				// "U+0020"// Spacebar
// 			);
// 		}	
// 	);


// Fighter 1 moves
KeyboardJS.on('w',function(a,b){
	d3Boxing.fighter_1.move("Up");
});

KeyboardJS.on('s',function(a,b){
	d3Boxing.fighter_1.move("Down");
});

KeyboardJS.on('a',function(a,b){
	d3Boxing.fighter_1.move("Left");
});

KeyboardJS.on('d',function(a,b){
	d3Boxing.fighter_1.move("Right");
});

KeyboardJS.on('space',function(a,b){
	d3Boxing.fighter_1.jab();
});


// Fighter 2 moves
KeyboardJS.on('up',function(a,b){
	d3Boxing.fighter_2.move("Up");
});

KeyboardJS.on('down',function(a,b){
	d3Boxing.fighter_2.move("Down");
});

KeyboardJS.on('left',function(a,b){
	d3Boxing.fighter_2.move("Left");
});

KeyboardJS.on('right',function(a,b){
	d3Boxing.fighter_2.move("Right");
});

KeyboardJS.on('enter',function(a,b){
	d3Boxing.fighter_2.jab();
});









