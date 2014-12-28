d3.select("body").on('onload',
	function(){
		d3Boxing.ring = new Ring();

		d3Boxing.fighter_1 = new Fighter(d3Boxing.fighter_1_id,"left");
		d3Boxing.fighter_2 = new Fighter(d3Boxing.fighter_2_id,"right");
	}()
);

