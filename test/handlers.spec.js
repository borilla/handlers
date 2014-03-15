(function() {
	module('Handlers');

	var obj, method, handler1, handler2;

	QUnit.testStart(function() {
		var callOrder = 0;
		method = function() {
			method.callCount += 1;
			method.callOrder = callOrder++;
		};
		method.callCount = 0;
		obj = {
			method: method
		};
		handler1 = function() {
			handler1.callCount += 1;
			handler1.callOrder = callOrder++;
		};
		handler1.callCount = 0;
		handler2 = function() {
			handler2.callCount += 1;
			handler2.callOrder = callOrder++;
		};
		handler2.callCount = 0;
	});

	test('should have a before function', function() {
		equal(typeof Handlers.before, 'function');
	});

	test('should have an after function', function() {
		equal(typeof Handlers.after, 'function');
	});

	test('should fire "before" handlers before method is called', function() {
		Handlers.before(obj, 'method', handler1);
		Handlers.before(obj, 'method', handler2);
		obj.method();
		ok(method.callCount == 1, 'original method was called');
		ok(handler1.callCount == 1, 'handler1 was called');
		ok(handler2.callCount == 1, 'handler2 was called');
		ok(handler1.callOrder < method.callOrder, 'handler1 was called before method');
		ok(handler2.callOrder < method.callOrder, 'handler2 was called before method');
	});

	test('should fire "after" handlers after method is called', function() {
		Handlers.after(obj, 'method', handler1);
		Handlers.after(obj, 'method', handler2);
		obj.method();
		ok(method.callCount == 1, 'original method was called');
		ok(handler1.callCount == 1, 'handler1 was called');
		ok(handler2.callCount == 1, 'handler2 was called');
		ok(handler1.callOrder > method.callOrder, 'handler1 was called after method');
		ok(handler2.callOrder > method.callOrder, 'handler2 was called after method');
	});

	test('should add before, after and restore methods to function', function() {
		Handlers.after(obj, 'method', handler1);
		ok(typeof obj.method.before == 'function', 'added before method');
		ok(typeof obj.method.after == 'function', 'added after method');
		ok(typeof obj.method.restore == 'function', 'added restore method');
	});

	test('should be able to restore original method', function() {
		var original = obj.method;
		Handlers.before(obj, 'method', handler1);
		Handlers.after(obj, 'method', handler2);
		ok(obj.method !== original, 'method was modified when handlers were added');
		obj.method.restore();
		ok(obj.method === original, 'method was correctly restored');
		obj.method();
		ok(method.callCount == 1, 'original method was called');
		ok(handler1.callCount == 0, 'handler1 was not called');
		ok(handler2.callCount == 0, 'handler2 was not called');
	});
}());
