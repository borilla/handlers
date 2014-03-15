var Handlers = (function() {

	function after(obj, method, handler) {
		var f = obj[method];
		if (!f.after) {
			f = initHandlers(obj, method);
		}
		f.after(handler);
		return f;
	}

	function before(obj, method, handler) {
		var f = obj[method];
		if (!f.before) {
			f = initHandlers(obj, method);
		}
		f.before(handler);
		return f;
	}

	function initHandlers(obj, method) {
		var f = obj[method];
		var before = [];
		var after = [];
		var g = function() {
			before.length && triggerHandlers(before);
			var result = f.apply(this, arguments);
			after.length && triggerHandlers(after, result);
		};
		g.before = function(handler) {
			before.push(handler);
			return g;
		};
		g.after = function(handler) {
			after.push(handler);
			return g;
		};
		g.restore = function() {
			obj[method] = f;
			return f;
		};
		obj[method] = g;
		return g;
	}

	function triggerHandlers(handlers, result) {
		for (var i = 0, l = handlers.length; i < l; ++i) {
			handlers[i](result);
		}
	}

	return {
		after: after,
		before: before
	};
}());
