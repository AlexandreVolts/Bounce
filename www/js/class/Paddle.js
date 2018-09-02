var Paddle = function(canvas, margin = 100)
{
	let self = this;
	let mousePosition = {x: 0, y: 0};
	let ctx = canvas.getContext("2d");
	let bounds = {
		x: 0, 
		width: canvas.width / 4,
	};
	bounds.height = bounds.width / 8;
	bounds.y = canvas.height - bounds.height - margin;
	
	this.color = "white";

	let getMousePosition = function(event)
	{
		mousePosition.x = event.pageX - window.innerWidth / 2 + canvas.width / 2;
		mousePosition.y = event.pageY;
		bounds.x = mousePosition.x - bounds.width / 2;
	}
	let getTouchPosition = function(event)
	{
		let e = {};

		if (event.touches.length <= 0)
			return;
		e.pageX = event.touches[0].pageX;
		e.pageY = event.touches[0].pageY;
		getMousePosition(e);
	}
	
	this.collides = function(ball)
	{
		if (ball.x >= bounds.x - ball.rad
			&& ball.x <= bounds.x + ball.rad + bounds.width
			&& ball.y + ball.rad >= bounds.y 
			&& ball.y + ball.rad <= bounds.y + bounds.height)
			return (true);
		return (false);
	}
	this.getVectorX = function(ball)
	{
		let mid = bounds.x + bounds.width / 2;
		let relativeX = ball.x - mid;
		let angle = (relativeX / (bounds.width / 2)) * Math.PI;

		return (Math.cos(angle - Math.PI / 2));
	}
	this.render = function()
	{
		ctx.fillStyle = self.color;
		ctx.beginPath();
		ctx.arc(mousePosition.x, mousePosition.y, 2, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);
	}
	this.getMousePosition = function()
	{
		return (mousePosition);
	}
	window.addEventListener("mousemove", getMousePosition);
	window.addEventListener("touchmove", getTouchPosition);
}