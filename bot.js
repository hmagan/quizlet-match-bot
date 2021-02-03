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

function solve(){
    console.log("SCRIPT INITIALIZED");
    //529ms delay; varies by set, so modify to your needs; anything less and Quizlet typically will always automatically rejects your score
    let delay = 529;
    setTimeout(function(){
        let tiles = Array.from(document.getElementsByClassName("MatchModeQuestionGridTile-text"));
        //filter through each pair of tiles while there are still any left
        while(tiles.length > 0){
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
}

function inject(){
    let fadeOut = setInterval(function(){
        if(opacity > 0){
            opacity -= 0.01;
            //for(let i = 0; i < ui.length; i++){
                ui[0].style.opacity = opacity;
            //}
        } else {
            clearInterval(fadeOut);
        }
    }, 10);

    ui[0].textContent = "Script loaded.";
    ui[1].textContent = "Click the button below to get started."
    ui[2] = oldButton;
    ui[3].textContent = "Inject script";

    let fadeIn = setInterval(function(){
        if(opacity < 1.00){
            opacity += 0.01;
            for(let i = 0; i < ui.length; i++){
                ui[i].style.opacity = opacity;
            }
        } else {
            clearInterval(fadeIn);
        }
    }, 10);

    ui[2].onclick = solve;
}

let oldButton = document.getElementsByClassName("UIButton--hero")[0];
let newButton = oldButton.cloneNode(true);
oldButton.parentNode.replaceChild(newButton, oldButton);

//header, text content, button, button label
let ui = [document.getElementsByClassName("UIHeading--three")[2], document.getElementsByClassName("UIParagraph")[0], newButton, document.getElementsByClassName("UIButton-wrapper")[0]];
let opacity = 1.00;

newButton.onclick = inject;