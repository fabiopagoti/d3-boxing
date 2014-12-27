
var boxing = {

	ring_width: 800,
	ring_height: 800,

	fighter_head_size: 20,
	fighter_glove_size: 10,
	fighter_arm_width: 5,
	fighter_head_glove_distance: 60,

	fighter_1_id: "fighter_1",
	fighter_2_id: "fighter_2",

	setFighterId: function(id){
		return id;
	},

	setFighterHead: function(id){
		return (id + "_head");
	},

	setFighterGloveLeft: function(id){
		return (id + "_glove_left");
	},

	setFighterGloveRight: function(id){
		return (id + "_glove_right");
	},

	getFighterId: function(id){
		return ("#" + id);
	},

	getFighterHead: function(id){
		return ("#" + id + "_head");
	},

	getFighterGloveLeft: function(id){
		return ("#" + id + "_glove_left");
	},

	getFighterGloveRight: function(id){
		return ("#" + id + "_glove_right");
	},


	initRing: function(){

		d3.select("#ring")
			.attr("width",boxing.ring_width)
			.attr("height",boxing.ring_height);


	// 	Poles
		var poles = [
			{x1: .01,			y1: .01,			x2: .05,			y2: .05 },
			{x1: (1 - .01),		y1: .01,			x2: (1 - .05),		y2: .05 },
			{x1: .01,			y1: (1 - .01),		x2: .05,			y2: (1 - .05) },
			{x1: (1 - .01),		y1: (1 - .01),		x2: (1 - .05),		y2: (1 - .05) },
		];

		d3.select("#ring")
			.selectAll(".ring_pole")
			.data(poles)
			.enter()
				.append("line")
					.attr("x1",function(d,i){ return boxing.ring_width * d.x1 })
					.attr("y1",function(d,i){ return boxing.ring_height * d.y1 })
					.attr("x2",function(d,i){ return boxing.ring_width * d.x2 })
					.attr("y2",function(d,i){ return boxing.ring_height * d.y2 })
					.classed("ring_pole", true);

		// Strings

		var strings = [

		// Left strings
			{x1: .02,			y1: .02,			x2: .02,			y2: (1 - .02) },
			{x1: .03,			y1: .03,			x2: .03,			y2: (1 - .03) },
			{x1: .04,			y1: .04,			x2: .04,			y2: (1 - .04) },

		// Top strings
			{x1: .02,			y1: .02,			x2: (1 - .02),		y2: .02 },
			{x1: .03,			y1: .03,			x2: (1 - .03),		y2: .03 },
			{x1: .04,			y1: .04,			x2: (1 - .04),		y2: .04 },


		// Right strings
			{x1: (1 - .02),		y1: .02,			x2: (1 - .02),		y2: (1 - .02) },
			{x1: (1 - .03),		y1: .03,			x2: (1 - .03),		y2: (1 - .03) },
			{x1: (1 - .04),		y1: .04,			x2: (1 - .04),		y2: (1 - .04) },


		// Bottom strings
			{x1: .02,		y1: (1 - .02),			x2: (1 - .02),		y2: (1 - .02) },
			{x1: .03,		y1: (1 - .03),			x2: (1 - .03),		y2: (1 - .03) },
			{x1: .04,		y1: (1 - .04),			x2: (1 - .04),		y2: (1 - .04) },

		];

		d3.select("#ring")
			.selectAll(".ring_string")
			.data(strings)
			.enter()
				.append("line")
					.attr("x1",function(d,i){ return boxing.ring_height	* d.x1;	})
					.attr("y1",function(d,i){ return boxing.ring_width 	* d.y1;	})
					.attr("x2",function(d,i){ return boxing.ring_height	* d.x2;	})
					.attr("y2",function(d,i){ return boxing.ring_width 	* d.y2;	})
					.classed("ring_string", true);

		// Text
		d3.select("#ring")
			.append("text")
				.attr("id", "ring_text")
				.attr("x", boxing.ring_width / 2)
				.attr("y", boxing.ring_height / 2)
				.text("D3 Boxing");

	},



	initFighters: function(){

		this.drawFighter(
			boxing.fighter_1_id,
			(boxing.ring_width / 4),
			(boxing.ring_height / 2)
			);

		this.drawFighter(
			boxing.fighter_2_id,
			(boxing.ring_width / 4 * 3),
			(boxing.ring_height / 2)
			);
	},

	drawFighter: function (id, cx, cy){


		var fighter_id = boxing.getFighterId(id);

		var new_fighter = d3.select("svg")
							.append("g")
								.attr("id", id)
								.attr("cx", cx)
								.attr("cy", cy)
								.classed("fighter",true);

		var fighter_position_cx = +d3.select(boxing.getFighterId(id)).attr("cx");
		var fighter_position_cy = +d3.select(boxing.getFighterId(id)).attr("cy");

		var fighter_position_glove_left_cx = +(fighter_position_cx + 10);
		var fighter_position_glove_left_cy = +(fighter_position_cy - boxing.fighter_head_glove_distance);

		var fighter_position_glove_right_cx = +(fighter_position_cx + 10);
		var fighter_position_glove_right_cy = +(fighter_position_cy + boxing.fighter_head_glove_distance);


	// Arms			
		new_fighter
			.append("line")
				.attr("x1",fighter_position_cx )
				.attr("y1",fighter_position_cy)
				.attr("x2",fighter_position_glove_left_cx)
				.attr("y2",fighter_position_glove_left_cy)
				.classed("fighter_arm",true);

		new_fighter
			.append("line")
				.attr("x1",fighter_position_cx)
				.attr("y1",fighter_position_cy)
				.attr("x2",fighter_position_glove_right_cx)
				.attr("y2",fighter_position_glove_right_cy)
				.classed("fighter_arm",true);

	// Gloves	
		new_fighter				
			.append("circle")
				.attr("id", boxing.setFighterGloveLeft(id))
				.attr("cx", fighter_position_glove_left_cx)
				.attr("cy", fighter_position_glove_left_cy)
				.attr("r", boxing.fighter_glove_size)
				.classed("fighter_glove", true);
		
		new_fighter				
			.append("circle")
				.attr("id", boxing.setFighterGloveLeft(id))
				.attr("cx", fighter_position_glove_right_cx)
				.attr("cy", fighter_position_glove_right_cy)
				.attr("r", boxing.fighter_glove_size)
				.classed("fighter_glove", true);

	// Head
		new_fighter				
			.append("circle")
				.attr("id", boxing.setFighterHead(id))
				.attr("cx", fighter_position_cx)
				.attr("cy", fighter_position_cy)
				.attr("r", boxing.fighter_head_size)
				.classed("fighter_head", true);

	},



	moveFighter: function(fighter,direction){

		function parseTransformIntoObject(a){ // http://stackoverflow.com/a/17838403/968144
		    var b={};
		    for (var i in a = a.match(/(\w+\((\-?\d+\.?\d*,?)+\))+/g))
		    {
		        var c = a[i].match(/[\w\.\-]+/g);
		        b[c.shift()] = c;
		    }
		    return b;
		};


		var current_tranlate_x = 0;
		var current_tranlate_y = 0;

		var fighter_current_transform = d3.select(this.getFighterId(fighter)).attr("transform");

		if (fighter_current_transform) {
			var transform_obj = parseTransformIntoObject(fighter_current_transform);
			current_tranlate_x = +transform_obj.translate[0]; // x
			current_tranlate_y = +transform_obj.translate[1]; // y
		} 
		
		
		var new_position = 0;

		switch(direction){
			case "Up":
				new_position =  current_tranlate_y - 5;
				d3.select(this.getFighterId(fighter))
					.attr("transform", "translate(" + current_tranlate_x + "," + new_position +  ")");
				break;

			case "Down":
				new_position =  current_tranlate_y + 5;
				d3.select(this.getFighterId(fighter))
					.attr("transform", "translate(" + current_tranlate_x + "," + new_position +  ")");
				break;

			case "Left":
				new_position =  current_tranlate_x - 5;
				d3.select(this.getFighterId(fighter))
					.attr("transform", "translate(" + new_position + "," + current_tranlate_y +  ")");
				break;

			case "Right":
				new_position =  current_tranlate_x + 5;
				d3.select(this.getFighterId(fighter))
					.attr("transform", "translate(" + new_position + "," + current_tranlate_y +  ")");
				break;
		}
				
	},

	

	parseKeyToAction: function(keyIdentifier){
		switch(direction){
			case "Up" || "U+0057":
				return "Up";
			case "Down" || "U+0053":
				return "Down";
			case "Left" || "U+0041":
				return "Left";
			case "Right" || "U+0044":
				return "Right";
		};
	},

	map: [],

	key_event: function(e,fighter,up,down,left,right,jab){

	    this.map[e.keyCode] = [];
	    this.map[e.keyCode].push(e.type == 'keydown');
	    this.map[e.keyCode].push(e.keyIdentifier);

	    /*insert conditional here*/
	    // console.log(this.map);
	    // for (var i = 0; i < this.map.length; i++) {
	    // 	if (this.map[0]) {
	    // 		console.log(this.map[0][1]);
	    // 	};
	    // };

	    for (var i = 0; i < this.map.length; i++) {
	    	// debugger;
	    	if (this.map[i]) {

		    	if (this.map[i][0]) { // if key pressed
		    		switch(this.map[i][1]){
						case up:
	    					boxing.moveFighter(fighter,"Up");
	    					break;
	    				case down:
	    					boxing.moveFighter(fighter,"Down");
							break;
						case left:
	    					boxing.moveFighter(fighter,"Left");
							break;
						case right:
	    					boxing.moveFighter(fighter,"Right");
							break;
						case jab:
							// TODO
							break;	
	    			}
		    	};

	    	};

	    };
			
	},


}


d3.select("body").on('onload',
	function(){
		boxing.initRing();
		boxing.initFighters();

	}()
);

d3.select("body")
	.on('keydown.foo2',
		function(){
			boxing.key_event(
				d3.event, 
				boxing.fighter_2_id, 
				"Up", 
				"Down", 
				"Left", 
				"Right", 
				"U+0020"// Spacebar
			);
		}	
	);

d3.select("body")
	.on('keydown.foo1',
		function(){
			boxing.key_event(
				d3.event, 
				boxing.fighter_1_id, 
				"U+0057", 
				"U+0053", 
				"U+0041", 
				"U+0044", 
				"U+0021"// ???
			);	
		}
	);

d3.select("body")
	.on('keyup.foo2',
		function(){
			boxing.key_event(
				d3.event, 
				boxing.fighter_2_id, 
				"Up", 
				"Down", 
				"Left", 
				"Right", 
				"U+0020"// Spacebar
			);
		}	
	);

d3.select("body")
	.on('keyup.foo1',
		function(){
			boxing.key_event(
				d3.event, 
				boxing.fighter_1_id, 
				"U+0057", 
				"U+0053", 
				"U+0041", 
				"U+0044", 
				"U+0021"// ???
			);	
		}
	);

