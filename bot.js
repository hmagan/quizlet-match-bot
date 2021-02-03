//paste values obtained from answers.js here
let flashcards = [];

let terms = [];
let definitions = [];

//separate terms and definitions into two different arrays
for(let i = 0; i < flashcards.length; i+=2){
    terms.push(flashcards[i]);
    definitions.push(flashcards[i+1]);
}

//finds target's matching term and returns its index in the array arr
function findMatch(target, arr){
    let other;
    for(let i = 0; i < terms.length; i++){
        if(terms[i] === target){
            other = definitions[i];
            break;
        }
        if(definitions[i] === target){
            other = terms[i];
            break;
        }
    }
    for(let i = 1; i < arr.length; i++){
        if(arr[i].childNodes[0].childNodes[0].textContent === other){
            return i;
        }
    }
    return -1;
}

//executes an event etype on an element el
function eventFire(el, etype){
    if(el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        let evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}

//execute the script when the game is started
document.getElementsByClassName("UIButton--hero")[0].onclick = function(){
    console.log("SCRIPT INITIALIZED");
    //529ms delay; varies by set, so modify to your needs; anything less and Quizlet typically will always automatically rejects your score
    let delay = 529;
    setTimeout(function(){
        //get all tiles and put them into an array
        let tiles = Array.from(document.getElementsByClassName("MatchModeQuestionGridTile-text"));
        //filter through each pair of tiles while there are still any left
        while(tiles.length > 0){
            //find the index of the match for the tile at index 0
            let idx = findMatch(tiles[0].childNodes[0].childNodes[0].textContent, tiles);
            console.log("MATCH FOUND: " + tiles[0].childNodes[0].childNodes[0].textContent + " AND " + tiles[idx].childNodes[0].childNodes[0].textContent);
            //execute a click on both tiles in the match
            eventFire(tiles[0].childNodes[0].childNodes[0], "pointerdown");
            eventFire(tiles[idx].childNodes[0].childNodes[0], "pointerdown");
            //remove both tiles from the array
            tiles.splice(idx, 1);
            tiles.splice(0, 1);
        }
        console.log("SCRIPT TERMINATED");
    }, delay);
};