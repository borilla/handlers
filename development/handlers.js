var Handlers = (function() {

	function after(obj, method, handler) {
		return ensureHandlers(obj, method).after(handler);
	}

	function before(obj, method, handler) {
		return ensureHandlers(obj, method).before(handler);
	}

	function ensureHandlers(obj, method) {
		var original = obj[method];
		if (original.after) {
			return original;
		}
		// else
		var after = [];
		var before = [];
		var replacement = function() {
			before.length && triggerHandlers(before);
			var result = original.apply(this, arguments);
			after.length && triggerHandlers(after, result);
			return result;
		};
		replacement.after = function(handler) {
			after.push(handler);
			return replacement;
		};
		replacement.before = function(handler) {
			before.push(handler);
			return replacement;
		};
		replacement.restore = function() {
			return obj[method] = original;
		};
		return obj[method] = replacement;
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
