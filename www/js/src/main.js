function main()
{
	let canvas = document.getElementsByTagName("canvas")[0];
	let game;

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	game = new Game(canvas);

	game.render();
}
main();