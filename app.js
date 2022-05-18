// ------------------------------MODULES------------------------------

var myApp = angular.module("myApp", ['ngRoute']);

// I AM JUST TRYING TO PULL A REQUEST
// ------------------------------ROUTES------------------------------

myApp.config(['$routeProvider', function($routeProvider) {
	
	$routeProvider
	
	.when("/", {
		templateUrl: 'pages/home.html',
		controller: 'homeController'
	})
	.when("/add", {
		templateUrl: 'pages/add.html',
		controller: 'addController'
	})
	.when("/edit", {
		templateUrl: 'pages/edit.html',
		controller: 'editController'
	})
	
	
}]);

myApp.service("dataBase", function($location) {
	
	this.url = "/";
	
	this.people = [ 
	{
		id: 1,
		name: "Julio",
		surname: "Valde",
		age: 32,
		occupation: "Coder"
		
	},{
		id: 2,
		name: "Miguel",
		surname: "Mariquita",
		age: 49,
		occupation: "Unknown"
		
	},{
		id: 3,
		name: "Jorge",
		surname: "Antunez",
		age: 56,
		occupation: "Gamer Developer and TERRA investor"
		
	},{
		id: 4,
		name: "Alba",
		surname: "Valde",
		age: 34,
		occupation: "Midwife"
		
	},{
		id: 5,
		name: "Mama",
		surname: "Martinez",
		age: 59,
		occupation: "Retired"
		
	}]

	
});


// ------------------------------CONTROLLERS------------------------------

//Controller to interact with the header
myApp.controller("myHeader", ["$scope", "$location", "dataBase", function($scope, $location, dataBase) {
	
	// Variable to set the active LINK in the nav class
	$scope.url = dataBase.url;
	
	$scope.$watch("url", function() {
		
		dataBase.url = $scope.url;
		console.log("WATCH")
		
	});
	

}]);

myApp.controller("homeController", ["$scope", "$location", "dataBase", function($scope, $location, dataBase) { 

	$scope.people = dataBase.people;
	$scope.prueba = 2;
	$scope.getDetails = function(index) {
		let person = $scope.people[index];
		alert(`Id: ${person.id}\nName: ${person.name}\nSurname: ${person.surname}\nAge: ${person.age}\nOccupation: ${person.occupation}\n`)
		
	}
	

}]);

myApp.controller("addController", ["$scope", "$location", "dataBase", function($scope, $location, dataBase) { 

	$scope.people = dataBase.people;
	$scope.newPerson = {};
	
	$scope.add = function() {

		let leng = $scope.people.length + 1;
		$scope.newPerson.id = leng;
		$scope.people.push($scope.newPerson);
		alert(`Person ${$scope.newPerson.name} with Id: ${$scope.newPerson.id} added to the Data Base`)
	};
	

}]);

myApp.controller("editController", ["$scope", "$location", "dataBase", function($scope, $location, dataBase) { 

	$scope.people = dataBase.people;
	$scope.id;
	$scope.personToEdit = {};
	
	$scope.edit = function() {
		var personInfo = "";		
		for (let key in $scope.personToEdit) {		
			console.log(key)	
			let person = $scope.people[$scope.id - 1];
			// "KEY" comes as string that is why we have to call inside []. When we assign it to a variable then we could do .key
			person[key] = $scope.personToEdit[key];
			personInfo += `${key} from person with Id: ${person["id"]} changed to ${$scope.personToEdit[key]}.\n`;
			}
		if (!personInfo) {
			alert("Nothing has beed edited")
		}else {
			alert(personInfo)
		}
	}

}]);
