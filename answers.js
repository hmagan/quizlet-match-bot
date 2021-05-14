let terms = document.getElementsByClassName("TermText");
let list = "[";

for(let i = 0; i < terms.length; i++){
    let term = terms[i].innerHTML;
    for(let j = 0; j < term.length; j++){
        if(term.substring(j, j+1) === "\"") {
            term = term.substring(0, j) + "\\" + term.substring(j);
            j++;
        }
    }
    console.log(term);
    list += "\"" + term + "\", ";
}

list = list.substring(0, list.length-2);
list += "]";

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

console.log("\nCOPY THIS ARRAY:");
console.log(list);
console.log("PASTE INTO bot.js IN THE flashcards VARIABLE");
