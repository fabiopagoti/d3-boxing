function Ring(){
	// Ring attributes
	this.width = 800,
	this.height = 800,

	this.draw();
}

Ring.prototype.draw = function(){

	var width = this.width,
		height = this.height;

	d3.select("#ring")
		.attr("width",width)
		.attr("height",height);


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
					.attr("x1",function(d,i){ return width		* d.x1 })
					.attr("y1",function(d,i){ return height 	* d.y1 })
					.attr("x2",function(d,i){ return width 		* d.x2 })
					.attr("y2",function(d,i){ return height 	* d.y2 });
						

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
					.attr("x1",function(d,i){ return width		* d.x1;	})
					.attr("y1",function(d,i){ return height 	* d.y1;	})
					.attr("x2",function(d,i){ return width		* d.x2;	})
					.attr("y2",function(d,i){ return height 	* d.y2;	});
				

	// Text
	d3.select("#ring")
		.append("text")
			.attr("id", "ring_text")
			.attr("x", width / 2)
			.attr("y", height / 2)
			.text("D3 Boxing");

}
