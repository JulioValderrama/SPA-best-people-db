
// IIFE that takes 3 arguments
(function (global, globalObj, globalArr, globalFunc) {
	
	// Creating our Library Function
	const myL = function(){};
	
	// This variables are private
	var arrNumber = [1, 2, 3, 4, 5];
	
	// --------------------------------------------Methods assigned to the Global Object ARRAY --------------------------------------------
	
	// Takes element as an argument and finds it in the array that is calling the method and return its Index. If not found returns -1. We create the method in .prototype because otherwise the method will be only callable from Array.indexOf2() not from the array that calls the method.
	globalArr.prototype.indexOf2 = function(element) {
		
		let index = 0;		
		for (let value of this) {
			
			if (element === value) {
				
				return index;
			}
			index++;
		}
		return -1;
	};
	
	// Method in Array.prototype that takes any number of arguments and add them into the array that invoked the function. It returns the new length
	globalArr.prototype.push1 = function(...arguments) {
		
		self = this;
		let leng = self.length;
		for (let arg of arguments) {
			
			self[leng] = arg;
			leng++;
		}
		return leng;
	};
	
	//Method that creates a new array with all elements that pass the test implemented by the provided function as an argument.
	globalArr.prototype.filter1 = function (fun) {
		
		self = this;
		let result = [];
		// We iterate through every element of the array
		for (let value of self) {
			
			// We set up a condition with the function provided to add the element in the new array
			if (fun(value) == true) {
				
				result.push1(value);
			}
		}
		return result;
	};
	
	// Method that invokes a function, provided as an argument, for each item of the array that calls the method
	globalArr.prototype.forEach1 = function (fun) {
		
		self = this;
		for (let value of self) {
			fun(value);
		}
	};
	
	//--------------------------------------------Methods assigned to our Function.prototype OBJECT --------------------------------------------
	
	
	// Method that takes context and ...arguments and bind them to the function is calling. In object cases, sets THIS to the object (context)
	globalFunc.prototype.bind2 = function(context, ...a) {
		// Here we use the ARROW function in order to set THIS with the parent context (the function is calling in this case .bind2). If we were to use Regular function, THIS, in case of nested functions the THIS resets and points back to Windows Object.
		return (...b) => this.call(context, ...a, ...b);
	};
	
	globalFunc.prototype.bindObject = function(context, ...a) {
		return (...b) => {
			if (typeof context != "object") {throw Error("First argument must be an OBJECT")}
			const temporaryKey = Symbol(); // We create new key for our object passed
			context[temporaryKey] = this; // We set the value of the new KEY created to THIS, in this case (and because of the arrow function), THIS is pointing to whatever function is calling .bindObject().With regular function, this nested functions, THIS would point windows
			const result = context[temporaryKey](...a, ...b); //Now we call the new method (inside our Object CONTEXT) and THIS will automatically point to the object that is calling the method. object[key](function(...a, ...b)).
			delete context[temporaryKey]; //We delete the temporary pair KEY-VALUE created in order to call the Functions and set THIS.
			return result;
		}
	};
	
	//Allows a method from another Object or a function to be called from another Object and set THIS to itself. Returns teh result.
	globalFunc.prototype.call2 = function(context, ...a) {
		// When context is an Object, we create temporary pair Key-Value to set the passed Function as a value
		if (typeof context === "object") {
			let bound = Symbol();
			context[bound] = this;
			console.log(this);
			// Here we can invoke the function from the new and temporary Method created in our Object so THIS will be set there
			let result = context[bound](...a);
			delete context[bound];
			return result;
		};
		//In case we don´t pass any Object, we just call the function and Pass the ...rest arguments passed previously
		return this(...a);
	};
	
	
	//--------------------------------------------Methods assigned to our LIBRARY OBJECT --------------------------------------------
	
	// Takes Object as an argument and finds all the Keys that the Object owns. It passes ONLY keys properties created via a simple assignment or a property initializer. It will return an Array [].
	myL.keys1 = function(obj) {
		
		let keys = [];
		
		for (let key in obj) {
			//We use propertyIsEnumerable in order to to Loop through keys associated in the Object´s properties.
			if (obj.propertyIsEnumerable(key)) {
				keys.push(key);
			}
		}
		return keys;
	};
	
	// Return an Array with all the values, as strings, of the properties of an Object.
	myL.values1 = function(obj) {
		let values = [];
		let keys = myL.keys1(obj);
		for (let key of keys) {
			values.push1(obj[key]);
		}
		return values;
	};

	// Return 
	myL.instanceOf1 = function(obj, target) {
		return obj.constructor == target.prototype.constructor;
	};
	
	myL.about = function(obj) {
		let keys = M$.keys1(obj);
		let values = M$.values1(obj);
		let prot = obj.__proto__;
		let constr = obj.constructor;
		
		console.log(obj);
		
		for (i=0; i < keys.length; i++) {
			console.log(`Property ${i+1} and value:\n${keys[i]}: ${values[i]}.`);
		};
		
		console.log(`Object prototype is: ${prot}.`)
		console.log(`Object constructor is: ${constr}.`)
		
	};
	
	// Return the index of the element in the provided array. If not found, return -1
	myL.indexOf1 = function(array, element) {
    	let index = 0;
    	for (let value of array) {
        	if (element === value) {
            	return index;
        	}index ++;
        	return -1;
    	}
	};
	
	/*
	var sources = [{a: "A"}, {b: "B"}, {c: "C"}];
			
	cloneRest = Object.assign({}, ...sources);

    console.log("clone with Rest Arguments: ", cloneRest);
    */
	//{a: 'A', b: 'B', c: 'C'}
	
	myL.assign2 = function(...a) {
		//We get the KEYS from the first argument and get the lenght of them
		let contextKeys = myL.keys1(a[0]);
		console.log(contextKeys.length);
		// If the lenght is greater than 0 it means that is not empty, so in this case we RETURN the Object by reference. So it is the same.
		if (contextKeys.length > 0 && typeof a[0] === "object") {return a[0]};
		// In case the first argument it is empty...
		const cloneObject = {};
		for (let key in a[1]) {
			console.log(key);
			cloneObject[key] = a[1][key];
			console.log(a[1][key])
		}
		return cloneObject;
	};
	
	
	global.myL = global.M$ = myL;

	return myL;
	

}(window, Object, Array, Function));


