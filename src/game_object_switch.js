"use strict";

class GameObjectSwitch extends GameObject
{
	constructor(x, y, activationGroup, sticky, inverted, room)
	{
		super(x, y + 0.5, 1, 0.2, room);
		
		this.active = false;
		this.collisionTarget = false;
		this.activationGroup = activationGroup;
		
		this.svgIndex = SVG_SWITCH_OFF;
		this.sticky = sticky;
		this.inverted = inverted;
		
		this.stickyHandled = false;
	}
	
	reset()
	{
		// default
		this.active = this.inverted;
		
		this.defaultReset();
	}
	
	tick()
	{
		let a, playerOnThis;
		
		playerOnThis = false;
		
		// check if player is standing on this
		for (a of _game.objects)
		{
			if (a instanceof GameObjectPlayer && a.overlappedObjects.indexOf(this) !== -1)
			{
				playerOnThis = true;
				// break;
			}
		}
		
		if (this.sticky)
		{
			// just stepped on
			if (!this.stickyHandled && playerOnThis)
			{
				// toggle
				this.active = !this.active;
				this.stickyHandled = true;
			}
			
			// just stepped off
			if (this.stickyHandled && !playerOnThis)
			{
				this.stickyHandled = false;
			}
		}
		else
		{
			this.active = this.inverted;
			
			if (playerOnThis)
			{
				this.active = !this.active;
			}
		}
		
		this.color = "#151";
		this.svgIndex = SVG_SWITCH_OFF;
		
		if (this.active)
		{
			this.svgIndex = SVG_SWITCH_ON;
			this.color = "#3c3";
		}
	}
}
