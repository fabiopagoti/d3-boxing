function Fighter(id,corner){

	// Fighter attributes
	this.id = id;
	this.corner = corner;

	this.head_size = d3Boxing.ring.width / 30;
	this.glove_size = this.head_size / 2;
	this.arm_width = this.glove_size / 2;
	this.head_glove_distance_cx = this.head_size * 0;
	this.head_glove_distance_cy = this.head_size * 3;

	this.fighter = this.draw();

	this.transform();

}

Fighter.prototype.draw = function(){

	var id 						= this.id,
		corner					= this.corner,
		head_glove_distance_cx 	= this.head_glove_distance_cx,
		head_glove_distance_cy 	= this.head_glove_distance_cy,
		head_size 				= this.head_size,
		glove_size				= this.glove_size,
		arm_width 				= this.arm_width;

	// A fighter is a g element
	var new_fighter = d3.select("svg")
						.append("g")
							.attr("id", id)
							.attr("cx", 0)
							.attr("cy", 0)
							.classed("fighter",true);

	var fighter_position_cx = +new_fighter.attr("cx");
	var fighter_position_cy = +new_fighter.attr("cy");

	var fighter_position_glove_left_cx = +(fighter_position_cx + head_glove_distance_cx);
	var fighter_position_glove_left_cy = +(fighter_position_cy - head_glove_distance_cy);

	var fighter_position_glove_right_cx = +(fighter_position_cx + head_glove_distance_cx);
	var fighter_position_glove_right_cy = +(fighter_position_cy + head_glove_distance_cy);

	// Draw fighter

		// Arms	

		var transform = d3.svg.transform()
			    			.translate([0,0])
						    .rotate([0,0,0])
			    			.scale(1);

		var left_arm = new_fighter
						.append("g")
							.attr("id",id + "_left_arm")
							.attr("transform", transform)
							.classed("fighter_arm",true);

		var right_arm = new_fighter
						.append("g")
							.attr("id",id + "_right_arm")
							.attr("transform", transform)
							.classed("fighter_arm",true);
		
			left_arm
				.append("line")
					.attr("x1",fighter_position_cx )
					.attr("y1",fighter_position_cy)
					.attr("x2",fighter_position_glove_left_cx)
					.attr("y2",fighter_position_glove_left_cy)
					.style("stroke-width",arm_width);
				

			right_arm
				.append("line")
					.attr("x1",fighter_position_cx)
					.attr("y1",fighter_position_cy)
					.attr("x2",fighter_position_glove_right_cx)
					.attr("y2",fighter_position_glove_right_cy)
					.style("stroke-width",arm_width)
					.classed("fighter_arm",true);

		// Gloves	
			left_arm				
				.append("circle")
					.attr("cx", fighter_position_glove_left_cx)
					.attr("cy", fighter_position_glove_left_cy)
					.attr("r", glove_size)
					.classed("fighter_glove", true);
		
			right_arm				
				.append("circle")
					.attr("cx", fighter_position_glove_right_cx)
					.attr("cy", fighter_position_glove_right_cy)
					.attr("r", glove_size)
					.classed("fighter_glove", true);

			// Head
			new_fighter
				.append("circle")
					.attr("cx", fighter_position_cx)
					.attr("cy", fighter_position_cy)
					.attr("r", head_size)
					.classed("fighter_head", true);

	return new_fighter;
}

Fighter.prototype.transform = function(){
		
	var transform;
	var fighter_cx = this.fighter.attr("cx");
	var fighter_cy = this.fighter.attr("cy");

	if (this.corner === "left") {
	transform = d3.svg.transform()
	    			.translate(
	    				function(d) { 
	    					return [d3Boxing.ring.width/6, d3Boxing.ring.height/6];  // TODO: use scales
	    				})
				    .rotate(function(d,i){
				    	return [0,0,0]
				    });
	    			// .scale(function(d) { 
	    			// 	return d.size + 2 
	    			// });

	} else{
	transform = d3.svg.transform()
	    			.translate(
	    				function(d) { 
	    					return [d3Boxing.ring.width/6*5, d3Boxing.ring.height/6*5]; 
	    				})
				    .rotate(function(d,i){
				    	return [180, fighter_cx,fighter_cy]
				    });
	    			// .scale(function(d) { 
	    			// 	return d.size + 2 
	    			// });

	};

	this.fighter.attr("transform", transform);

}

Fighter.prototype.parseTransformIntoObject = function (a){ // http://stackoverflow.com/a/17838403/968144
	    var b={};
	    for (var i in a = a.match(/(\w+\((\-?\d+\.?\d*,?)+\))+/g))
	    {
	        var c = a[i].match(/[\w\.\-]+/g);
	        b[c.shift()] = c;
	    }
	    return b;
}

Fighter.prototype.move = function(direction){

	var transform_obj = this.parseTransformIntoObject(this.fighter.attr("transform"));

	var new_position = 0;
	
	switch(direction){
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
	}

	var transform = d3.svg.transform()
		    		.translate(transform_obj.translate) 
				    .rotate(transform_obj.rotate )
				    .scale(1);

	this.fighter.attr("transform", transform);		
			
}

Fighter.prototype.jab = function(){
	console.log(id + " jabs!");

	var id = this.id;

	var fighter_cx = this.fighter.attr("cx");
	var fighter_cy = this.fighter.attr("cy");
	var transform;

	var jab_arm;
	if (Math.random()<.5) {
		jab_arm = d3.select("#" + id + "_left_arm"); // TODO: verify which arm is the best to jab
		transform = d3.svg.transform()
						    .rotate([90,0,0]);
	} else{
		jab_arm = d3.select("#" + id + "_right_arm"); // TODO: verify which arm is the best to jab
		transform = d3.svg.transform()
						    .rotate([-90,0,0]);
	};
	

	d3.select("#ring").
		append("circle")
		.attr("cx", fighter_cx)
		.attr("cy", fighter_cy)
		.attr("r", 5)
		.attr("fill", "pink");

	jab_arm
		.transition()
			.duration(500)
			.attr("transform", transform)
		.transition()
			.attr("transform", "");


}