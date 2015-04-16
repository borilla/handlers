describe('Handlers', function() {

	var sandbox, obj, method, returnValue, handler1, handler2, handler3;

	beforeEach(function() {
		sandbox = sinon.sandbox.create();
		returnValue = {};
		method = sandbox.spy(function() {
			return returnValue;
		});
		handler1 = sandbox.stub();
		handler2 = sandbox.stub();
		handler3 = sandbox.stub();
		obj = {
			method: method
		};
	});

	afterEach(function() {
		sandbox.restore();
	});

	it('should have a before function', function() {
		expect(Handlers.before).is.a('function');
	});

	it('should have an after function', function() {
		expect(Handlers.after).is.a('function');
	});

	it('should fire "before" handlers before method is called', function() {
		Handlers.before(obj, 'method', handler1);
		Handlers.before(obj, 'method', handler2);
		obj.method();
		assert(method.callCount == 1, 'original method was called');
		assert(handler1.callCount == 1, 'handler1 was called');
		assert(handler2.callCount == 1, 'handler2 was called');
		assert(handler1.calledBefore(method), 'handler1 was called before method');
		assert(handler2.calledBefore(method), 'handler2 was called before method');
	});

	it('should fire "after" handlers after method is called', function() {
		Handlers.after(obj, 'method', handler1);
		Handlers.after(obj, 'method', handler2);
		obj.method();
		assert(method.callCount == 1, 'original method was called');
		assert(handler1.callCount == 1, 'handler1 was called');
		assert(handler2.callCount == 1, 'handler2 was called');
		assert(handler1.calledAfter(method), 'handler1 was called after method');
		assert(handler2.calledAfter(method), 'handler2 was called after method');
	});

	it('should add before, after and restore methods to function', function() {
		Handlers.after(obj, 'method', handler1);
		assert(typeof obj.method.before == 'function', 'added before method');
		assert(typeof obj.method.after == 'function', 'added after method');
		assert(typeof obj.method.restore == 'function', 'added restore method');
	});

	it('should return original return value from function', function() {
		Handlers.after(obj, 'method', handler1);
		Handlers.after(obj, 'method', handler2);
		expect(obj.method()).to.equal(returnValue, 'return value was as expected');
	});

	it('should be able to chain "before" methods', function() {
		Handlers.before(obj, 'method', handler1).before(handler2).before(handler3);
		obj.method();
		assert(method.callCount == 1, 'original method was called');
		assert(handler1.callCount == 1, 'handler1 was called');
		assert(handler2.callCount == 1, 'handler2 was called');
		assert(handler3.callCount == 1, 'handler3 was called');
	});

	it('should be able to chain "after" methods', function() {
		Handlers.after(obj, 'method', handler1).after(handler2).after(handler3);
		obj.method();
		assert(method.callCount == 1, 'original method was called');
		assert(handler1.callCount == 1, 'handler1 was called');
		assert(handler2.callCount == 1, 'handler2 was called');
		assert(handler3.callCount == 1, 'handler3 was called');
	});

	it('should be able to restore original method', function() {
		var original = obj.method;
		Handlers.before(obj, 'method', handler1);
		Handlers.after(obj, 'method', handler2);
		assert(obj.method !== original, 'method was modified when handlers were added');
		obj.method.restore();
		assert(obj.method === original, 'method was correctly restored');
		obj.method();
		assert(method.callCount == 1, 'original method was called');
		assert(handler1.callCount == 0, 'handler1 was not called');
		assert(handler2.callCount == 0, 'handler2 was not called');
	});
});
