function rand(n, floored = true)
{
	if (floored)
		return (Math.floor(Math.random() * n));
	return (Math.random() * n);
}
function getRandomColor()
{
	return ("rgb(" + rand(255) + "," + rand(255) + "," + rand(255) + ")");
}