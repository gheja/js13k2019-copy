"use strict";

// array of controls, up, right, down, left, action1, action2
let _inputControls = [
	// [ state, changed, events to listen to ]
	[ false, false, [ "arrowup", "w", " " ] ],
	[ false, false, [ "arrowright", "d" ] ],
	[ false, false, [ "arrowdown", "s" ] ],
	[ false, false, [ "arrowleft", "a" ] ],
	[ false, false, [ "1" ] ],
	[ false, false, [ "2" ] ]
];

function inputAcknowledge()
{
	let a;
	
	for (a of _inputControls)
	{
		a[INPUT_KEY_CHANGED] = false;
	}
}

function inputInit()
{
	bindEvent(window, "keydown", inputKeyEvent);
	bindEvent(window, "keyup", inputKeyEvent);
}

function inputHandleEvent(eventName, state)
{
	let a;
	
	// TODO: clean up this
	
	for (a of _inputControls)
	{
		if (a[INPUT_KEY_EVENTS].indexOf(eventName.toLowerCase()) != -1)
		{
			a[INPUT_KEY_CHANGED] = a[INPUT_KEY_STATE] != state;
			
			a[INPUT_KEY_STATE] = state;
			return true;
		}
	}
	
	console.log("unknown event: \"" + eventName + "\"");
	
	return false;
}

function inputKeyEvent(event)
{
	if (inputHandleEvent(event.key, event.type == "keydown"))
	{
		event.preventDefault();
	}
}
