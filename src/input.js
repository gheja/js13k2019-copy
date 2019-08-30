"use strict";

// TODO: optimize for size:
// - unroll this class, only one will be used at a given time
// - replace states and events with arrays

class Input
{
	constructor()
	{
		this.controls = [
			{ "state": false, "changed": false, "events": [ "arrowup", "w", " " ] },
			{ "state": false, "changed": false, "events": [ "arrowright", "d" ] },
			{ "state": false, "changed": false, "events": [ "arrowdown", "s" ] },
			{ "state": false, "changed": false, "events": [ "arrowleft", "a" ] },
			{ "state": false, "changed": false, "events": [ "1" ] },
			{ "state": false, "changed": false, "events": [ "2" ] }
		];
		
		bindEvent(window, "keydown", this.handleKeyDown.bind(this));
		bindEvent(window, "keyup", this.handleKeyUp.bind(this));
	}
	
	acknowledge()
	{
		let a;
		
		for (a of this.controls)
		{
			a.changed = false;
		}
	}
	
	handleEvent(eventName, state)
	{
		let a;
		
		// TODO: clean up this
		
		for (a of this.controls)
		{
			if (a.events.indexOf(eventName) != -1)
			{
				a.changed = a.state != state;
				
				a.state = state;
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
