const FRICTION = 0.99;
const GRAVITY = 9.88;
var Ball = function(width)
{
	const D_RAD = 15 + rand(5);
	let self = this;
	
	this.color = getRandomColor();
	this.x = rand(width);
	this.y = 0;
	this.rad = D_RAD;
	this.vx = 0;
	this.vy = rand(-5, false);

	this.bounce = function(angleX)
	{
		if (self.rad > 3)
			self.rad--;
		self.vx = angleX * (1 + 5 * (1 - (self.rad / 20)));
		self.vy -= (GRAVITY + GRAVITY * (0.5 + rand(0.5, false)));
		return (D_RAD - self.rad);
	};
	this.move = function()
	{
		if (self.x < self.rad || self.x > width - self.rad)
			self.vx *= -1;
		self.vy *= FRICTION;
		self.x += self.vx;
		self.y += (GRAVITY + self.vy);
	}
}
Ball.prototype.draw = function(ctx)
{
	ctx.fillStyle = this.color;
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2);
	ctx.fill();
};