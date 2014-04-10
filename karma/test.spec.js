describe("A test suite", function() {
	var sandbox

	beforeEach(function() {
		sandbox = sinon.sandbox.create();
	});

	afterEach(function() {
		sandbox.restore();
	});

	it('should not fail', function() {
		expect(true).to.be.true;
	});
});
