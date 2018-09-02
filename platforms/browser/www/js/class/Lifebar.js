const LIFE_SPACE = 10;
const LIFES = 3;
var Lifebar = function(width)
{
	var self = this;
	this.life = 0;
	
	this.draw = function(ctx)
	{
		ctx.fillStyle = "green";
		for (let i = 0; i < self.life; i++) {
			ctx.fillRect((width / LIFES) * i + LIFE_SPACE, LIFE_SPACE, width / LIFES - LIFE_SPACE, LIFE_SPACE * 2);
		}
	}
}