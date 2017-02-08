# Handlers

## What does it do?

Wrap any function with ```before``` and ```after``` functions that will be automatically run before and/or after the function is invoked

## Why?

I don't really remember. I think it was just an experiment after I'd been using Sinon to do some testing one day. Perhaps it could be used as a tidier way to produce callback-type behaviour (though only for synchronous functions)(?)

## Why is it called "Handlers"?

Sorry, again I don't remember. I should really go back and change the name to something more appropriate

# Example

Create a function ```myFunction``` and wrap it with ```beforeFunction``` and ```afterFunction```
```
// make our functions
function myFunction() { console.log('myFunction'); }
function beforeFunction() { console.log('beforeFunction'); }
function afterFunction() { console.log('afterFunction'); }

// wrap myFunction
Handlers.before(myFunction, beforeFunction);
Handlers.after(myFunction, afterFunction);

// invoke myFunction
myFunction();
// => "beforeFunction"
// => "myFunction"
// => "afterFunction"

// remove the wrapping functions
myFunction.restore();

// invoke myFunction
myFunction();
// => "myFunction"

```
