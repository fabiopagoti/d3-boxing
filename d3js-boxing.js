
var boxing = {

	// Ring attributes
	ring_width: 500,
	ring_height: 500,

	// Fighter attributes
	fighter_head_size: 20,
	fighter_glove_size: 10,
	fighter_arm_width: 5,
	fighter_head_glove_distance_cx: 30,
	fighter_head_glove_distance_cy: 50,


	// Fighter DOM
	fighter_1_id: "fighter_1",
	fighter_2_id: "fighter_2",

	fighter_1: null,
	fighter_2: null,

	// setFighterId: function(id){
	// 	return id;
	// },

	setFighterHead: function(id){
		return (id + "_head");
	},

	setFighterGloveLeft: function(id){
		return (id + "_glove_left");
	},

	setFighterGloveRight: function(id){
		return (id + "_glove_right");
	},

	// getFighterId: function(id){
	// 	return ("#" + id);
	// },

	// getFighterHead: function(id){
	// 	return ("#" + id + "_head");
	// },

	// getFighterGloveLeft: function(id){
	// 	return ("#" + id + "_glove_left");
	// },

	// getFighterGloveRight: function(id){
	// 	return ("#" + id + "_glove_right");
	// },


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
			.append("g")
				.classed("ring_pole", true)
				.selectAll(".ring_pole")
				.data(poles)
				.enter()
					.append("line")
						.attr("x1",function(d,i){ return boxing.ring_width * d.x1 })
						.attr("y1",function(d,i){ return boxing.ring_height * d.y1 })
						.attr("x2",function(d,i){ return boxing.ring_width * d.x2 })
						.attr("y2",function(d,i){ return boxing.ring_height * d.y2 });
							

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
			.append("g")
				.classed("ring_string", true)
				.selectAll(".ring_string")
				.data(strings)
				.enter()
					.append("line")
						.attr("x1",function(d,i){ return boxing.ring_width	* d.x1;	})
						.attr("y1",function(d,i){ return boxing.ring_height * d.y1;	})
						.attr("x2",function(d,i){ return boxing.ring_width	* d.x2;	})
						.attr("y2",function(d,i){ return boxing.ring_height * d.y2;	});
					

		// Text
		d3.select("#ring")
			.append("text")
				.attr("id", "ring_text")
				.attr("x", boxing.ring_width / 2)
				.attr("y", boxing.ring_height / 2)
				.text("D3 Boxing");

	},



	initFighters: function(){

		this.fighter_1 = this.drawFighter(
							boxing.fighter_1_id,
							"left");

		this.fighter_2 = this.drawFighter(
							boxing.fighter_2_id,
							"right");
	},

	initFighterTransform: function(fighter,corner){
		
		var transform;
		var fighter_cx = fighter.attr("cx");
		var fighter_cy = fighter.attr("cy");

		if (corner === "left") {
		transform = d3.svg.transform()
		    			.translate(
		    				function(d) { 
		    					return [-200, 0];  // TODO: use scales
		    				})
					    .rotate(function(d,i){
					    	return [0, fighter_cx,fighter_cy]
					    });
		    			// .scale(function(d) { 
		    			// 	return d.size + 2 
		    			// });

		} else{
		transform = d3.svg.transform()
		    			.translate(
		    				function(d) { 
		    					return [+200, 0]; 
		    				})
					    .rotate(function(d,i){
					    	return [180, fighter_cx,fighter_cy]
					    });
		    			// .scale(function(d) { 
		    			// 	return d.size + 2 
		    			// });

		};

		fighter.attr("transform", transform);

	},

	drawFighter: function (id, corner){


		// A fighter is a g element
		var new_fighter = d3.select("svg")
							.append("g")
								.attr("id", id)
								.attr("cx", boxing.ring_width / 2)
								.attr("cy", boxing.ring_height / 2)
								.classed("fighter",true);

		var fighter_position_cx = +new_fighter.attr("cx");
		var fighter_position_cy = +new_fighter.attr("cy");

		var fighter_position_glove_left_cx = +(fighter_position_cx + boxing.fighter_head_glove_distance_cx);
		var fighter_position_glove_left_cy = +(fighter_position_cy - boxing.fighter_head_glove_distance_cy);

		var fighter_position_glove_right_cx = +(fighter_position_cx + boxing.fighter_head_glove_distance_cx);
		var fighter_position_glove_right_cy = +(fighter_position_cy + boxing.fighter_head_glove_distance_cy);

		// Draw fighter
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

		this.initFighterTransform(new_fighter,corner);

		return new_fighter;
	},


	jab: function(fighter){

	
	},


 	parseTransformIntoObject: function(a){ // http://stackoverflow.com/a/17838403/968144
		    var b={};
		    for (var i in a = a.match(/(\w+\((\-?\d+\.?\d*,?)+\))+/g))
		    {
		        var c = a[i].match(/[\w\.\-]+/g);
		        b[c.shift()] = c;
		    }
		    return b;
	},

	moveFighter: function(fighter,move){

		var transform_obj = this.parseTransformIntoObject(fighter.attr("transform"));

		var new_position = 0;
		// debugger;
		switch(move){
			case "Up":
				transform_obj.translate[1] = +transform_obj.translate[1] - 5;
				break;

			case "Down":
				transform_obj.translate[1] = +transform_obj.translate[1] + 5;
				break;

			case "Left":
				transform_obj.translate[0] = +transform_obj.translate[0] - 5;
				break;

			case "Right":
				transform_obj.translate[0] = +transform_obj.translate[0] + 5;
				break;

			case "Jab":
				console.log("Jab!");
				break;
		}

		var transform = d3.svg.transform()
			    		.translate(transform_obj.translate) 
					    .rotate(transform_obj.rotate );

		fighter.attr("transform", transform);		
				
	},

	parseKeyToAction: function(keyIdentifier){
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
	},

	map: [],

	parseKeyToFighter: function(keyIdentifier){
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
	},

	key_event: function(e,fighter){
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
			
	},


}


d3.select("body").on('onload',
	function(){
		boxing.initRing();
		boxing.initFighters();
	}()
);


d3.select("body")
	.on('keydown.fighter_1',
		function(){
			boxing.key_event(
				d3.event, 
				boxing.fighter_1
			);	
		}
	);

d3.select("body")
	.on('keydown.fighter_2',
		function(){
			boxing.key_event(
				d3.event, 
				boxing.fighter_2
			);
		}	
	);


d3.select("body")
	.on('keyup.fighter_1',
		function(){
			boxing.key_event(
				d3.event, 
				boxing.fighter_1
			);	
		}
	);

d3.select("body")
	.on('keyup.fighter_2',
		function(){
			boxing.key_event(
				d3.event, 
				boxing.fighter_2
				// "U+0020"// Spacebar
			);
		}	
	);
