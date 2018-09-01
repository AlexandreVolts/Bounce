var Button = function(width)
{
	let rect = {
		y: 250
	};
	let callback;
	let mouse;

	rect.width = width / 4;
	rect.height = rect.width / 2;
	rect.x = (width - rect.width) / 2;
	
	let isMouseInButton = function()
	{
		if (mouse.x > rect.x && mouse.x < rect.x + rect.width
			&& mouse.y > rect.y && mouse.y < rect.y + rect.height)
			return (true);
		return (false);
	}
	this.onClick = function(innerCallback)
	{
		callback = function()
		{
			if (isMouseInButton())
				innerCallback();
		}
		window.addEventListener("click", callback);
	}
	this.clearEvents = function()
	{
		if (callback != undefined)
			window.removeEventListener("click", callback);
	}
	this.draw = function(ctx, mousePosition)
	{
		let restartWidth = ctx.measureText("restart").width;
		
		ctx.lineWidth = 5;
		mouse = mousePosition;
		if (isMouseInButton())
			ctx.strokeStyle = "lime";
		else
			ctx.strokeStyle = "white";
		ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
	}
}