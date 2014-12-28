
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
