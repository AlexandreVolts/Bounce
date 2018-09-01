var Game = function(canvas)
{
	let self = this;
	let context = canvas.getContext("2d");
	let paddle = new Paddle(canvas);
	let balls = [new Ball(canvas.width)];
	let lifebar = new Lifebar(canvas.width / 2);
	let restartButton = new Button(canvas.width);
	let score = 0;
	let interval;

	context.font = "25px Arial";
	interval = window.setInterval(function() {
		balls.push(new Ball(canvas.width));
	}, 20000);
	
	let restart = function()
	{
		score = 0;
		lifebar.life = 3;
		balls = [new Ball(canvas.width)];
		interval = setInterval(function() {
			balls.push(new Ball(canvas.width));
		}, 20000);
		restartButton.clearEvents();
	}
	let onBallLost = function(index)
	{
		balls.splice(index, 1);
		lifebar.life--;
		if (lifebar.life <= 0) {
			window.clearInterval(interval);
			restartButton.onClick(restart);
		}
	}
	let drawGame = function()
	{
		for (let i = 0, len = balls.length; i < len; i++) {
			if (balls[i].y > canvas.height) {
				onBallLost(i);
				len--;
				continue;
			}
			balls[i].move();
			if (paddle.collides(balls[i])) {
				paddle.color = balls[i].color;
				score += balls[i].bounce(paddle.getVectorX(balls[i]));
			}
			balls[i].draw(context);
		}
		lifebar.draw(context);
		context.fillStyle = paddle.color;
		context.fillText(score + "pts", 300, 25);
	}
	let drawEnd = function()
	{
		let gameOverWidth;
		let scoreWidth = context.measureText("Score: " + score + "pts").width;

		context.fillStyle = "white";
		context.font = "40px Arial";
		gameOverWidth = context.measureText("Game Over").width;
		context.fillText("Game Over", (canvas.width - gameOverWidth) / 2, 150);
		context.font = "25px Arial";
		context.fillText("Score: " + score + "pts", (canvas.width - scoreWidth) / 2, 200);
		restartButton.draw(context, paddle.getMousePosition());
	}
	
	this.render = function()
	{
		context.fillStyle = "rgba(0, 0, 0, 0.1)";
		context.fillRect(0, 0, canvas.width, canvas.height);
		if (lifebar.life > 0)
			drawGame();
		else {
			drawEnd();
		}
		paddle.render();
		window.requestAnimationFrame(self.render);
	}
}