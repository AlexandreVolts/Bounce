function main()
{
	let canvas = document.getElementsByTagName("canvas")[0];
	let game;

	canvas.width = 400;//window.innerWidth;
	canvas.height = 700;//window.innerHeight;
	game = new Game(canvas);

	game.render();
}
main();