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
3. Create a src directory, and within it, create an index.ts file
4. Write some code. 
5. Compile that code into JS using the ```tsc``` command from the root directory.

Congratulations! You've written your first TypeScript code!

Alternatively, using VSCode, you can add ```// @ts-check``` to the top of any JS file to enable TypeScript checking for that file.

It's important to note that any TS code you write will be compiled into JS, as browsers cannot understand TS directly.


## Typing Variables
The most powerful feature of TypeScript is the ability to strongly type variables. This can be implicit (TS is smart enough to infer the type of a variable when assigned), but it's typically good practice to explicitly declare types.

Here's an example of types in action:


TypeScript will implicitly set the type to number.
let houseNo = 221; 

If you then try to reassign the variable to a string: 

houseNo = "Baker Street"; 

TS will throw an error: "Type 'string' is not assignable to type 'number'."

At first, having to force a type conformity onto loosely-typed JS seems like a royal pain. Everything was working fine before, right? 

Well, TS is actually doing you a huge favour here. Being certain that a variable is of a certain type, or that a function returns a specific type ensures that your output will always be what you expect it to be. 

Here's an example:

function addFive(num){
  return num + 5;
}

The above function is super simple, you'd expect that the output would be the input plus 5.

addFive(50) // --> 55

Looks good, but what if the input isn't a number?

addFive("50") // --> "505" 

Not quite what we wanted. 

