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

//solves match after a specified delay
function solve(delay){
    console.log("SCRIPT INITIALIZED");
    //600ms delay by default; varies by set, so modify to your needs; anything less and Quizlet might reject your score
    setTimeout(function(){
        let tiles = Array.from(document.getElementsByClassName("MatchModeQuestionGridTile-text"));
        while(tiles.length > 0){
            let idx = findMatch(tiles[0].childNodes[0].childNodes[0].textContent, tiles);
            console.log("MATCH FOUND: " + tiles[0].childNodes[0].childNodes[0].textContent + " AND " + tiles[idx].childNodes[0].childNodes[0].textContent);
            eventFire(tiles[0].childNodes[0].childNodes[0], "pointerdown");
            eventFire(tiles[idx].childNodes[0].childNodes[0], "pointerdown");
            tiles.splice(idx, 1);
            tiles.splice(0, 1);
        }
        console.log("SCRIPT TERMINATED");
    }, delay);
}

//loads up ui; mostly formatting
function inject(){
    let opacity = 1.00;
    let fadeOut = setInterval(function(){
        if(opacity > 0){
            opacity -= 0.01;
            for(let i = 0; i < ui.length-1; i++){
                ui[i].style.opacity = opacity;
            }
        } else {
            clearInterval(fadeOut);
            ui[0].textContent = "Script loaded.";
            ui[1].textContent = "Set the rough amount of time it takes to run the script. By default it is 600ms, which should be sufficient for a 0.5s time without going under Quizlet's minimum. Tweak at your own risk."
            ui[2].style.display = "none";
            document.getElementsByClassName("UIButton--hero")[0].style.opacity = 0.00;
            document.getElementsByClassName("UIButton--hero")[0].style.display = "inline-block";
            ui[2] = document.getElementsByClassName("UIButton--hero")[0];
            ui[3].textContent = "Inject script";
            ui[4].style.opacity = 0.00;
            ui[4].style.display = "inline-block";
            ui[4].style.marginBottom = "50px";
            ui[4].style.fontSize = "18px";
            ui[4].defaultValue = 600;
            ui[4].type = "number";
            ui[4].step = 100;
            ui[4].min = 0;

            let fadeIn = setInterval(function(){
                if(opacity < 1.00){
                    opacity += 0.01;
                    for(let i = 0; i < ui.length; i++){
                        ui[i].style.opacity = opacity;
                    }
                } else {
                    clearInterval(fadeIn);
                    ui[2].onclick = function(){
                        let delay = ui[4].value;
                        solve(delay);
                    };
                }
            }, 10);
        }
    }, 5);
}

//creates a fake button to load up the cheat, hides the old button for later, and adds an input field
let newButton = document.getElementsByClassName("UIButton--hero")[0].cloneNode(true);
newButton.style.marginLeft = "0";
document.getElementsByClassName("UIButton--hero")[0].style.display = "none";
let oldButton = document.getElementsByClassName("UIButton--hero")[0];

let input = document.createElement("input");
input.style.display = "none";

document.getElementsByClassName("UIButton--hero")[0].remove();
document.getElementsByClassName("MatchModeInstructionsModal")[0].appendChild(input);
document.getElementsByClassName("MatchModeInstructionsModal")[0].appendChild(oldButton);
document.getElementsByClassName("MatchModeInstructionsModal")[0].appendChild(newButton);

//header, text content, button, button label, input
let ui = [document.getElementsByClassName("UIHeading--three")[2], document.getElementsByClassName("UIParagraph")[0], newButton, document.getElementsByClassName("UIButton-wrapper")[0], input];

newButton.onclick = inject;