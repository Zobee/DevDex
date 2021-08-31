# TypeScript Notes

TypeScript is a superset language of JavaScript. TS isn't a language in itself, but an addition to JS, that enhances JS' usefulness and capabilities. TS does so by adding 'strong types' to JS. 

JS is a dynamically-typed language, meaning we can play fast and loose with variable declarations, and variables can be reassigned to other variables all willy-nilly like. Which is great for flexibility, but comes with the caveat of being hard to manage. Further, type errors may make it to runtime with JS, while TS will catch them for you before you even compile your code. This saves you a TON of time in the long-run.

TS' primary draw is its ability to help us avoid errors during the development process. Some TS code doesn't even get compiled into JS at all! This isn't wasted code, as writing TS inherently makes your code less error-prone.

Finally, TypeScript is JavaScript. Any valid JavaScript code will be valid in TypeScript. This makes the barrier to entry low for learning TypeScript.

## Yeah, But What's The Point?
TS' popularity also stems from how it enhances the developer experience, as it allows code editors to be more efficient through Intelligent Code Completion, which provides auto-complete popups for functions, objects, and query hints for syntax errors. Basically, TS works like a word-processor, informing you of common mistakes as you make them, and auto-completing words based on context. This, in turn, is going to save you a bunch of time and (Google Searches!) when writing code. Also, it's completely open source!

## Setup

1. Install typescript ```npm install -g typescript```
2. Create a tsconfig.json file and insert the following: 
```
{
  "compilerOptions": {
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist"
  },
  "exclude": [
    "node_modules"
  ]
}
```
Alternatively, use tsc --init to generate a tsconfig file
3. Create a src directory, and within it, create an index.ts file
4. Write some code. 
5. Compile that code into JS using the ```tsc``` command from the root directory.

Congratulations! You've written your first TypeScript code!

Alternatively, using VSCode, you can add ```// @ts-check``` to the top of any JS file to enable TypeScript checking for that file.

It's important to note that any TS code you write will be compiled into JS, as browsers cannot understand TS directly.


## Typing Variables
The most powerful feature of TypeScript is the ability to strongly type variables. This can be implicit (TS is smart enough to infer the type of a variable when assigned), but it's typically good practice to explicitly declare types.

Here are the basic types: 

let num: number = 5;
let str: string = "Hello";
let isTrue: boolean = false;
let x:any = "Whatever you want";

When using 'any' as a type, the variable can be reassigned without TS getting mad at you. This is just how JS works naturally.

You can also use a pipe '|' to assign a variable to multiple types.

let age: string | number;

the age variable can now be assigned (and reassigned) to either a string, or a number.

When declaring a constant, it's type will be of whatever the associated value is.
const dog = 'fido'; ```//const dog is of type 'fido', rather than type string```.

Objects Can Also Have Types:

You can specify the values within an array;

let nums: number[] = [1,2,3,4,5];

number[] indicates that this is an array of numbers.

You can also create tuples in JS with the power of typing:

const myTuple :[number, string][] = [[1, "Max"], [2, "Jim"], [3, "Cathy"]]

### Objects and Interfaces
You can type objects in the same way:

const myCat: {name:string, age:number} = {
  name: "Mittens",
  age: 6
}

You can also use an interface to create a resusable template for object types. Interfaces are a cleaner way to specify the structure of objects.

interface Cat {
  name:string,
  age:number
}

const ourCat: Cat = {
  name:"Smiley",
  age: 2
};

### Here's an example of types in action:

TypeScript will implicitly set the type to number.

let houseNo = 221; 

If you then try to reassign the variable to a string: 

houseNo = "Baker Street"; 

TS will throw an error: "Type 'string' is not assignable to type 'number'." Note that running tsc, even when TS is complaining, will still generate a JS file. Technically, nothing's stopping you from ignoring all of those errors (other than your burning conscience, of course).

At first, having to force a type conformity onto loosely-typed JS seems like a royal pain. Everything was working fine before, right? 

Well, TS is actually doing you a huge favour here. Being certain that a variable is of a certain type, or that a function returns a specific type ensures that your output will always be what you expect it to be. 

Here's an example:

```
function addFive(num){
  return num + 5;
}
```

The above function is super simple, you'd expect that the output would be the input plus 5.

addFive(50) // --> 55

Looks good, but what if the input isn't a number?

addFive("50") // --> "505" 

Not quite what we wanted. 

Ensuring that our variables are what we expect them to be prevents errors like this from occurring. It may seem trivial, but for secure operations, like financial transactions, you want to make sure that what you're doing is EXACTLY what you want it to be. Trust me, people get spicy over their finances.

We can go even further and use type-checking for function arguments and output.

```
function addFive(input: number): number{
  return input + 5;
}
```

By explicitly listing both the expected input and output types, you can be certain that your code won't be spitting out anything funky without you knowing about it. Pretty dang sweet, right? 

But wait? What if you don't know what your expected output should be? Then it's a good idea to re-evaluate what you're trying to accomplish with the code you're writing. Generally, you'd want your code to return the exact same result given the same input. This is a fundamental aspect of functional programming. Regardless, this is one of benefits of using TS, it'll make you more aware of the internal structure of your programs. You can catch these errors before release, rather than scramble to fix a bug that really didn't need to be there in the first place.

### Optional Arguments and Returns:

Oftentimes, you'll find yourself with a function with an argument that isn't explicitly required:

const adoptCat = (name: string, breed: string, age?: number):string => {
  return `Name: ${name}\nBreed: ${breed}\nAge: ${age ? age : "unknown"}\nWelcome home!`
}

The function works whether you pass it an age parameter, or not, and so TS won't yell at you if you don't provide one, whereas it will if you omit the name or breed params.

A function can either return a value, or void. When a function doesn't return an explicit value (using the return keyword, or an arrow function's implicit return), it will return void.

const greeting = (name: string):void => {
  console.log(`What's poppin' ${name}?`)
}

Again, we don't need to explicitly declare the return type, but it is good practice.

TS allows us to be even more granular with our function definitions