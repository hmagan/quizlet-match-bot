//find all of the terms and their definitions
let terms = document.getElementsByClassName("TermText");
let arrayOfTerms = [];

for(let i = 0; i < terms.length; i++){
    //push them to an array
    arrayOfTerms.push(terms[i].innerHTML);
    console.log(terms[i].innerHTML);
}

//print the array for the user to copy
console.log("\nCOPY THIS VALUE (without the number in parentheses):");
console.log(arrayOfTerms);
console.log("PASTE ABOVE bot.js");