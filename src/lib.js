"use strict";

var _raf = window.requestAnimationFrame;

function _copy(obj)
{
	return JSON.parse(JSON.stringify(obj));
}

function bindEvent(obj, event, callback)
{
	// TODO: optimize for size: remove else {} as it is for pre-IE9 only
	if (obj.addEventListener)
	{
		obj.addEventListener(event, callback);
	}
	else
	{
		obj.attachEvent("on" + event, callback);
	}
}
