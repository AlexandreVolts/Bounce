var Game = function(canvas)
{
	let self = this;
	let context = canvas.getContext("2d");
	let paddle = new Paddle(canvas);
	let balls = [new Ball(canvas.width)];
	let lifebar = new Lifebar(canvas.width / 2);
	let restartButton = new Button(canvas.width, "Start");
	let firstTry = true;
	let score = 0;
	let interval;

	context.font = "25px Arial";
	interval = window.setInterval(function() {
		balls.push(new Ball(canvas.width));
	}, 20000);
	
	let saveScore = function()
	{
		if (window.localStorage.getItem("score") == undefined
			|| window.localStorage.getItem("score") < score)
			window.localStorage.setItem("score", score);
	}
	let restart = function()
	{
		if (firstTry) {
			firstTry = false;
			restartButton = new Button(canvas.width, "Restart");
		}
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
			saveScore();
			window.clearInterval(interval);
			restartButton.onClick(restart);
			return;
		}
		if (balls.length == 0)
			balls.push(new Ball(canvas.width));
	}
	let drawCenteredText = function(text, y, font = "25px Arial", color = "white")
	{
		let width;

		context.fillStyle = color;
		context.font = font;
		width = context.measureText(text).width;
		context.fillText(text, (canvas.width - width) / 2, y);
	}
	let drawGame = function()
	{
		let scoreWidth = context.measureText(score + "pts").width;
		
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
		context.fillText(score + "pts", canvas.width - scoreWidth * 2, 25);
	}
	let drawEnd = function()
	{
		drawCenteredText("Game Over", 150, "40px Arial");
		drawCenteredText("Best: " + window.localStorage.getItem("score") + "pts", 200, "25px Arial", paddle.color);
		if (!firstTry)
			drawCenteredText("Score: " + score + "pts", 250);
		restartButton.draw(context, paddle.getMousePosition(), paddle.color);
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
	onBallLost();
}