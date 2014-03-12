(function() {
	module('Handlers');

	var obj, handler1, handler2;

	QUnit.testStart(function() {
		var method = function() {
			method.callCount += 1;
		}
		method.callCount = 0;
		obj = {
			method: method
		};
		handler1 = function() {
			handler1.callCount += 1;
		}
		handler1.callCount = 0;
		handler2 = function() {
			handler2.callCount += 1;
		}
		handler2.callCount = 0;
	});

	test('should have an addHandler function', function() {
		equal(typeof Handlers.addHandler, 'function');
	});

	test('should be able to add handlers to an object method', function() {
		Handlers.addHandler(obj, 'method', handler1);
		Handlers.addHandler(obj, 'method', handler2);
		ok(obj.method.handlers.length == 2, 'two handlers were added');
	});

	test('should fire added handlers when method is called', function() {
		Handlers.addHandler(obj, 'method', handler1);
		Handlers.addHandler(obj, 'method', handler2);
		obj.method();
		ok(handler1.callCount == 1, 'handler1 was called');
		ok(handler2.callCount == 1, 'handler2 was called');
	});

	test('should call original function when method is called', function() {
		var original = obj.method;
		Handlers.addHandler(obj, 'method', handler1);
		Handlers.addHandler(obj, 'method', handler2);
		obj.method();
		ok(original.callCount == 1, 'original method was called');
	});

	test('should be able to restore original method', function() {
		var original = obj.method;
		Handlers.addHandler(obj, 'method', handler1);
		Handlers.addHandler(obj, 'method', handler2);
		ok(obj.method !== original, 'method was modified when handlers were added');
		obj.method.restore();
		ok(obj.method === original, 'method was correctly restored');
	});
}());
