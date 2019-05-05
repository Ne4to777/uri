const CustomEvent = (event, params = {}) => {
	const {
		bubbles = false,
			cancelable = false,
			detail = null
	} = params;
	const evt = document.createEvent('CustomEvent');
	evt.initCustomEvent(event, bubbles, cancelable, detail);
	return evt;
}

export default (event, params) => window.CustomEvent ? new window.CustomEvent(event, params) : CustomEvent(event, params)