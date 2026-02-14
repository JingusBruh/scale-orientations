//const possibleScales = ["C", "G", "D", "A", "E", "F", "Bb", "Eb", "Ab"];
function onLoad(){
    const customCheck = document.getElementById("custom");
    const customText = document.getElementById("customInput"); 
    //console.log(customCheck, customText);
    customCheck.addEventListener("change", function(){
        if(this.checked){customText.style.display = "block";}
        else{customText.style.display = "none";}
        console.log("function ran");
    });
}

function Generate(){
    const customCheck = document.getElementById("custom");
    const customText = document.getElementById("customInput"); 
    var possibleScales = ["C", "G", "D", "A", "E", "F", "Bb", "Eb", "Ab"];
    if(customCheck.checked){
        possibleScales = customText.value.split(",");
    }
    const variations = ["S2T2", "T", "S4", "S", "T1S2T1", "T2S2", "S2T2T2S2", "T2S2S2T2", "S3T1", "T1S3"];
    const tripletVariations = ["S2T1", "T1S2", "S", "T"];
    const allVariations = [];

    let finalOrientation = [];
    let finalString = "";
    let randomIndex = Math.floor(Math.random()*possibleScales.length);
    let finalLength = possibleScales.length;
    let cleared = false;

    const displayText = document.getElementById("displayText");

    if(document.getElementById("chromatic").checked){
        possibleScales.push("<span style = 'color:green'>Chroma</span>");
        //console.log(allVariations);
        finalLength = possibleScales.length;
    }

    for(i = 0; i < finalLength; i++){
        randomIndex = Math.floor(Math.random()*possibleScales.length);
        finalOrientation.push(possibleScales[randomIndex]);
        possibleScales.splice(randomIndex, 1);
    }

    if(document.getElementById("variations").checked){
        allVariations.push(...variations);
        //console.log(allVariations);
    }

    if(document.getElementById("triplet variations").checked){
        for(i = 0; i < tripletVariations.length; i++){
            tripletVariations[i] = tripletVariations[i] + "<span style = color:blue>(3)</span>"
        }
        
        allVariations.push(...tripletVariations);
        //console.log(allVariations);
    }

    //console.log(finalOrientation);

    /*for(i = 0; i < finalOrientation.length; i++){
        finalString += "<span>";
        finalString += finalOrientation[i];

        if(allVariations.length > 0){
            finalString += "<span style = color:red>" +"[" + allVariations[Math.floor(Math.random() * allVariations.length)] + "]" + "</span>";
        }

        finalString += "<span>";
        finalString += "<br>";
    }*/

    
    for(i=0; i<finalOrientation.length;i++){
        const displayDiv = document.getElementById("display");
        if(!cleared){
            displayDiv.innerHTML = "";
            cleared = true;
        }

        const newScale = document.createElement("span");
        newScale.style.animationFillMode = "forwards";
        newScale.style.fontSize = "30px";
        newScale.style.opacity = 0;
        newScale.style.animationDelay = i * 0.05 + "s";
        
        displayDiv.appendChild(newScale);
        newScale.classList.add("fade-in-text");

        newScale.innerHTML = finalOrientation[i];
        if(allVariations.length > 0){
            newScale.innerHTML += "<span style = color:red>" +"[" + allVariations[Math.floor(Math.random() * allVariations.length)] + "]" + "</span>";
        }
        newScale.innerHTML += "<br>";

        //console.log("element created");
    }

    //displayText.innerHTML = finalString;
}

//document.getElementById("display").addEventListener("click", Generate);

function Clear(){
    const checkBoxes = document.getElementsByClassName("check-box");
    const customText = document.getElementById("customInput");
    customText.style.display = "none";
    /*Array.from(checkBoxes).foreach(function(currentValue){
        currentValue.firstChild.checked = false;
    });*/
    for (const checkBox of checkBoxes){
        checkBox.children[0].checked = false;
        //firstChild not working?
    }
}