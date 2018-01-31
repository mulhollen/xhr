
"use strict"; //a strict version of js that is basically picky

console.log("test");

let startTime = Date.now(); // date is already definied by js look up date for other intrinsic methods/objects
                            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

console.log("startTime", startTime);

for (let i = 0; i < 2000000; i++){
    let x = i + i/2 * 6;
};

console.log("new time", Date.now());

let bigDataRequest = new XMLHttpRequest(); // https://www.w3schools.com/xml/xml_http.asp

bigDataRequest.addEventListener("load", bigDataComplete);
bigDataRequest.addEventListener("error", bigDataFailed);

function bigDataComplete(event){
    console.log("event", event);
    //200 is a sucessful call from a server
    if (event.target.status === 200){
        // going down in this event (think what you'd see in console.log) looking at our event - then the target the specific thing - viewing the responseText
        let bigData = JSON.parse(event.target.responseText);
        console.log("Time of Big Data", Date.now() - startTime); // how long did it take? ( in milliseconds)
        console.log("data", bigData);

    } else {
        console.log("check the spelling of your file")
    }
}

function bigDataFailed(event){
    console.log("something went wrong");
}

bigDataRequest.open("GET", "JEOPARDY_QUESTIONS1.json"); //this just opens it up you're not going to get it until you send (line below)
bigDataRequest.send();

// same idea but with color data

let dataRequest = new XMLHttpRequest();

dataRequest.addEventListener("load", dataRequestComplete);
dataRequest.addEventListener("error", dataRequestFailed);

function dataRequestComplete(event){
    console.log("colors have loaded");
    let colorData = JSON.parse(event.target.responseText);
    console.log("colorData", colorData);
    showData(colorData);
}

function showData(taco){
    let colorDiv = document.getElementById("all-my-colors");
    let colorData = "";

    for(let item in taco){
        let colorItem = taco[item];
        colorData += `<div><h2>${colorItem.color}: ${colorItem.value}</h2></div>`
    }
    colorDiv.innerHTML = colorData;
    console.log("the colors are done", Date.now() - startTime);
}

function dataRequestFailed(event) {
    console.log("the data failed to load", event);
}

dataRequest.open("GET", "color.json");
dataRequest.send();