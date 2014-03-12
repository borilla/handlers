var Handlers = (function() {

	function addHandler(obj, method, handler) {
		var f = obj[method];
		if (f.handlers) {
			return f.handlers.push(handler);
		}
		else {
			var handlers = [handler];
			var g = obj[method] = function() {
				var result = f.apply(this, arguments);
				triggerHandlers(handlers, result);
			};
			g.handlers = handlers;
			g.restore = function() {
				obj[method] = f;
			}
		}
	}

	function triggerHandlers(handlers, result) {
		for (var i = 0, l = handlers.length; i < l; ++i) {
			handlers[i](result);
		}
	}

	return {
		addHandler: addHandler
	};
}());
