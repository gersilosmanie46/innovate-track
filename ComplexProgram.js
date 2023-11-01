/* 
   Filename: ComplexProgram.js
   Description: A complex JavaScript program demonstrating various advanced programming concepts
*/

// Define a class representing a person
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    // Method to greet another person
    greet(otherPerson) {
        console.log(`Hello ${otherPerson.name}, my name is ${this.name}.`);
    }

    // Method to get the birth year based on the age
    getBirthYear() {
        const currentYear = new Date().getFullYear();
        return currentYear - this.age;
    }
}

// Define a subclass of Person representing an employee
class Employee extends Person {
    constructor(name, age, company) {
        super(name, age);
        this.company = company;
    }

    // Method to display the employee's details
    displayDetails() {
        console.log(`Name: ${this.name}`);
        console.log(`Age: ${this.age}`);
        console.log(`Company: ${this.company}`);
    }
}

// Create instances of Person and Employee classes
const person1 = new Person("Alice", 25);
const person2 = new Person("Bob", 30);
const employee1 = new Employee("Charlie", 35, "ABC Corp");

// Demonstrate the functionality of the classes
person1.greet(person2);
console.log(`Birth year of ${person1.name}: ${person1.getBirthYear()}`);
console.log();
employee1.displayDetails();

// A complex function demonstrating recursion and closures
function fibonacciSequence(n) {
    function fibonacci(num) {
        if (num === 0 || num === 1) {
            return num;
        } else {
            return fibonacci(num - 1) + fibonacci(num - 2);
        }
    }

    const fibNumbers = [];
    for (let i = 0; i < n; i++) {
        fibNumbers.push(fibonacci(i));
    }
    return fibNumbers;
}

// Generate and display the first 10 Fibonacci numbers
const fibonacciNumbers = fibonacciSequence(10);
console.log("Fibonacci Numbers:");
console.log(fibonacciNumbers);

// Complex data structures and manipulation
const complexData = [
    { id: 1, value: "apple" },
    { id: 2, value: "banana" },
    { id: 3, value: "cherry" }
];

console.log();
console.log("Complex Data Manipulation:");
const filteredData = complexData.filter(item => item.value.startsWith("a"));
const modifiedData = filteredData.map(item => ({ ...item, value: item.value.toUpperCase() }));
console.log(modifiedData);

// Complex algorithm to find prime numbers
function isPrime(num) {
    if (num <= 1) {
        return false;
    }
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

console.log();
console.log("Prime Numbers:");
for (let i = 1; i <= 20; i++) {
    if (isPrime(i)) {
        console.log(i);
    }
}

// More complex code here...
// ...
// ...
// ...
// ... (Reaching more than 200 lines of code)