//paste values obtained from answers.js here
let flashcards = [];

let terms = [];
let definitions = [];

for(let i = 0; i < flashcards.length; i+=2){
    terms.push(flashcards[i]);
    definitions.push(flashcards[i+1]);
}

function findMatch(t, arr){
    let other;
    let target = t.childNodes[0].textContent;
    if(t.childNodes.length > 1){
        for(let i = 1; i < t.childNodes.length; i++){
            target += t.childNodes[i].textContent;
        }
    }
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
        let ans = arr[i].childNodes[0].childNodes[0].textContent;
        if(arr[i].childNodes[0].childNodes.length > 1){
            for(let j = 1; j < arr[i].childNodes[0].childNodes.length; j++){
                ans += arr[i].childNodes[0].childNodes[j].textContent;
            }
        }
        if(ans === other){
            return i;
        }
    }
    return -1;
}

function eventFire(el, etype){
    if(el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        let evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}

function solve(delay){
    console.log("SCRIPT INITIALIZED");
    //600ms delay by default; varies by set, so modify to your needs; anything less and Quizlet might reject your score
    setTimeout(function(){
        let tiles = Array.from(document.getElementsByClassName("MatchModeQuestionGridTile-text"));
        while(tiles.length > 0){
            let idx = findMatch(tiles[0].childNodes[0], tiles);
            let fm, sm = "";
            if(tiles[0].childNodes[0].childNodes.length > 1) {
                for(let i = 0; i < tiles[0].childNodes[0].childNodes.length; i++){
                    fm += tiles[0].childNodes[0].childNodes[i].textContent;
                }
            } else {
                fm = tiles[0].childNodes[0].childNodes[0].textContent;
            }
            if(tiles[idx].childNodes[0].childNodes.length > 1) {
                for(let i = 0; i < tiles[idx].childNodes[0].childNodes.length; i++){
                    sm += tiles[idx].childNodes[0].childNodes[i].textContent;
                }
            } else {
                sm = tiles[idx].childNodes[0].childNodes[0].textContent;
            }
            console.log("MATCH FOUND: " + fm + " AND " + sm);
            eventFire(tiles[0].childNodes[0].childNodes[0], "pointerdown");
            eventFire(tiles[idx].childNodes[0].childNodes[0], "pointerdown");
            tiles.splice(idx, 1);
            tiles.splice(0, 1);
        }
        console.log("SCRIPT TERMINATED");
    }, delay);
}

function inject(){
    ui[2].disabled = true;
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
            ui[4].style.marginBottom = "30px";
            ui[4].style.fontSize = "18px";
            ui[4].defaultValue = 600;
            ui[4].type = "number";
            ui[4].step = 100;
            ui[4].min = 0;
            ui[5].style.marginTop = "20px";
            ui[5].style.display = "inline-block";

            let fadeIn = setInterval(function(){
                if(opacity < 1.00){
                    opacity += 0.01;
                    for(let i = 0; i < ui.length; i++){
                        ui[i].style.opacity = opacity;
                    }
                } else {
                    clearInterval(fadeIn);
                    oldButton.disabled = false;
                    ui[2].onclick = function(){
                        let delay = ui[4].value;
                        solve(delay);
                    };
                }
            }, 10);
        }
    }, 5);
}

let newButton = document.getElementsByClassName("UIButton--hero")[0].cloneNode(true);
newButton.style.marginLeft = "0";
document.getElementsByClassName("UIButton--hero")[0].style.display = "none";
let oldButton = document.getElementsByClassName("UIButton--hero")[0];
oldButton.disabled = true;

let input = document.createElement("input");
input.style.display = "none";

let name = document.createElement("p");
name.textContent = "Code by Hank Magan";
name.style.display = "none";

document.getElementsByClassName("UIButton--hero")[0].remove();
document.getElementsByClassName("MatchModeInstructionsModal")[0].appendChild(input);
document.getElementsByClassName("MatchModeInstructionsModal")[0].appendChild(oldButton);
document.getElementsByClassName("MatchModeInstructionsModal")[0].appendChild(newButton);
document.getElementsByClassName("MatchModeInstructionsModal")[0].appendChild(name);

let last = document.getElementsByClassName("UIHeading--three").length - 1;

//header, text content, button, button label, input, name
let ui = [document.getElementsByClassName("UIHeading--three")[last], document.getElementsByClassName("UIParagraph")[0], newButton, document.getElementsByClassName("UIButton-wrapper")[0], input, name];

newButton.onclick = inject;
