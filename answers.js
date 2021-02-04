//find all of the terms and their definitions
let terms = document.getElementsByClassName("TermText");
let list = "[";

for(let i = 0; i < terms.length; i++){
    let term = terms[i].innerHTML;
    //if a term has double quotes, escape them
    for(let j = 0; j < term.length; j++){
        if(term.substring(j, j+1) === "\"") {
            term = term.substring(0, j) + "\\" + term.substring(j);
            j++;
        }
    }
    console.log(term);
    //add term to list in quotes
    list += "\"" + term + "\", ";
}

//eliminate the extra comma and space and add a closing bracket
list = list.substring(0, list.length-2);
list += "]";

//remove formatting that messes with the terms
for(let i = 0; i < list.length; i++){
    if(list.substring(i, i+1) === "<"){
        //removes <div>, <span>, <p> and closing tags i.e. </p>
        if(i != list.length-1 && (list.substring(i+1, i+2) === "/" || list.substring(i+1, i+2) === "d" || list.substring(i+1, i+2) === "s" || list.substring(i+1, i+2) === "p" || list.substring(i+1, i+2) === "b")){
            while(list.substring(i, i+1) !== ">"){
                list = list.substring(0, i) + list.substring(i + 1);
            }
            list = list.substring(0, i) + list.substring(i + 1);
            i--;
        }
    }
}

//print the array for the user to copy
console.log("\nCOPY THIS ARRAY:");
console.log(list);
console.log("PASTE INTO bot.js IN THE flashcards VARIABLE");