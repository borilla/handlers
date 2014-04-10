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
		var original = obj[method];
		var before = [];
		var after = [];
		var replacement = function() {
			before.length && triggerHandlers(before);
			var result = original.apply(this, arguments);
			after.length && triggerHandlers(after, result);
		};
		replacement.before = function(handler) {
			before.push(handler);
			return replacement;
		};
		replacement.after = function(handler) {
			after.push(handler);
			return replacement;
		};
		replacement.restore = function() {
			obj[method] = original;
			return original;
		};
		obj[method] = replacement;
		return replacement;
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
