"use strict";

// TODO: optimize for size:
// - unroll this class, only one will be used at a given time
// - replace buttons with an array
// - replace states and events with arrays

class Input
{
	constructor()
	{
		this.controls = {
			"up": { "state": false, "changed": false, "events": [ "arrowup", "w", " " ] },
			"left": { "state": false, "changed": false, "events": [ "arrowleft", "a" ] },
			"right": { "state": false, "changed": false, "events": [ "arrowright", "d" ] },
			"down": { "state": false, "changed": false, "events": [ "arrowdown", "s" ] },
			"action1": { "state": false, "changed": false, "events": [ "1" ] },
			"action2": { "state": false, "changed": false, "events": [ "2" ] }
		};
		
		bindEvent(window, "keydown", this.handleKeyDown.bind(this));
		bindEvent(window, "keyup", this.handleKeyUp.bind(this));
	}
	
	acknowledge()
	{
		let a;
		
		for (a of Object.keys(this.controls))
		{
			this.controls[a].changed = false;
		}
	}
	
	handleEvent(eventName, state)
	{
		let a;
		
		// TODO: clean up this
		
		for (a of Object.keys(this.controls))
		{
			if (this.controls[a].events.indexOf(eventName) != -1)
			{
				this.controls[a].changed = this.controls[a].state != state;
				
				this.controls[a].state = state;
				return true;
			}
		}
		
		console.log("unknown event: \"" + eventName + "\"");
		
		return false;
	}
	
	handleKeyDown(event)
	{
		if (this.handleEvent(event.key.toLowerCase(), true))
		{
			event.preventDefault();
		}
	}
	
	handleKeyUp(event)
	{
		if (this.handleEvent(event.key.toLowerCase(), false))
		{
			event.preventDefault();
		}
	}
}
