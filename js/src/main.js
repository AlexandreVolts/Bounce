function main()
{
	let canvas = document.getElementsByTagName("canvas")[0];
	let game;

	canvas.width = 400;
	canvas.height = 700;
	game = new Game(canvas);

	game.render();
}
main();