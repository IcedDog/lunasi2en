var dropdownLabel = document.getElementById("dropdownLabel");
var textareaLabel = document.getElementById("textareaLabel");
var dropdown = document.getElementById("dropdown");
var textarea = document.getElementById("textarea");
var button = document.getElementById("button");
var log = document.getElementById("log");

var meta;

fetch("./meta.csv").then(response => response.text()).then(data => { 
    meta = Papa.parse(data, { header: true, dynamicTyping: true, skipEmptyLines: true }).data;
    console.log(meta);
}).catch(err => console.log(err));

dropdown.onchange = function () { 
    var value = dropdown.value;
    if (value == "en") { 
        dropdownLabel.innerHTML = "Language";
        textareaLabel.innerHTML = "Enter some text;";
        button.innerHTML = "Submit";
    }
    if (value == "ja") { 
        dropdownLabel.innerHTML = "言語";
        textareaLabel.innerHTML = "テキストを入力してください";
        button.innerHTML = "確認";        
    }
}

function processWord(word) {
    var wordP = word.trim().toLowerCase();
    const characterList = "eiaéoáusfkpcrntdvbml";
    const punct = ".,;:!?()[]{}<>\"'“”‘’….";
    var newWord = "";
    for (var i = 0; i < wordP.length; i++) { 
        var character = wordP[i];
        if (characterList.includes(character)) newWord += character;
        else if (punct.includes(character)) newWord += "";
        else return false;
    }
    return newWord;
}

function verbProcess(wordd) {
    var word = wordd;
    var possibleStem = [];

    possibleStem.push({ w: word, t: [] });
    
    // OPT
    possibleStem.forEach(stem => {
        if (stem.t.includes("OPT")) {  }
        else{
            var wordstem = stem.w;
            var te = stem.t;
            var prefix = wordstem.slice(0, 2);
            if (prefix == "el") { 
                te.push("OPT")
                possibleStem.push({ w: wordstem.slice(2), t: te });
            }
        }
    })

    // Modality
    possibleStem.forEach(stem => {
        if (stem.t.includes("CONT") || stem.t.includes("NEG-SP") || stem.t.includes("PASS")) { }
        else {
            var wordstem = stem.w;
            var te = stem.t;
            var prefix = wordstem.slice(0, 2);
            if (prefix == "es") {
                te.push("CONT")
                possibleStem.push({ w: wordstem.slice(2), t: te });
            }
            if (prefix == "ne" || prefix == "né") {
                te.push("NEG-SP")
                possibleStem.push({ w: wordstem.slice(2), t: te });
                possibleStem.push({ w: "e" + wordstem.slice(2), t: te });
                possibleStem.push({ w: "é" + wordstem.slice(2), t: te });
            }
            if (prefix == "pe" || prefix == "pé") {
                te.push("PASS")
                possibleStem.push({ w: wordstem.slice(2), t: te });
                possibleStem.push({ w: "e" + wordstem.slice(2), t: te });
                possibleStem.push({ w: "é" + wordstem.slice(2), t: te });
            }
        }
    })    

    // Negatation & can
    possibleStem.forEach(stem => {
        if (stem.t.includes("NEG")) { }
        else {
            var wordstem = stem.w;
            var te = stem.t;
            var suffix = wordstem.slice(-2);
            if (suffix == "ne") {
                te.push("NEG");
                possibleStem.push({ w: wordstem.slice(0, -2), t: te });
            }
        }
    })

    // IMP
    possibleStem.forEach(stem => {
        if (stem.t.includes("IMP1") || stem.t.includes("IMP2") || stem.t.includes("IMP3")) { }
        else {
            var wordstem = stem.w;
            var te = stem.t;
            var suffix = wordstem.slice(-2);
            if (suffix == "sa") {
                te.push("IMP1");
                possibleStem.push({ w: wordstem.slice(0, -2), t: te });
                if (wordstem.slice(-3).slice(0, 1) == 'e') {
                    possibleStem.push({ w: wordstem.slice(0, -3), t: te });
                }
            }
            if (suffix == "ta") {
                te.push("IMP2");
                possibleStem.push({ w: wordstem.slice(0, -2), t: te });
                if (wordstem.slice(-3).slice(0, 1) == 'e') {
                    possibleStem.push({ w: wordstem.slice(0, -3), t: te });
                }
            }
            if (suffix == "la") {
                te.push("IMP3");
                possibleStem.push({ w: wordstem.slice(0, -2), t: te });
                if (wordstem.slice(-3).slice(0, 1) == 'e') {
                    possibleStem.push({ w: wordstem.slice(0, -3), t: te });
                }
            }
        }
    })

    // can
    possibleStem.forEach(stem => {
        if (stem.t.includes("CAN")) { }
        else {
            var wordstem = stem.w;
            var te = stem.t;
            var suffix = wordstem.slice(-3);
            if (suffix == "ine") {
                te.push("CAN");
                possibleStem.push({ w: wordstem.slice(0, -3), t: te });
            }
        }
    })

    // NOM
    possibleStem.forEach(stem => {
        if (stem.t.includes("NOM")) { }
        else {
            var wordstem = stem.w;
            var te = stem.t;
            var suffix = wordstem.slice(-3);
            if (suffix == "sei") {
                te.push("NOM");
                possibleStem.push({ w: wordstem.slice(0, -3), t: te });
            }
        }
    })

    // Attrubutive
    possibleStem.forEach(stem => {
        if (stem.t.includes("ATTR")) { }
        else {
            var wordstem = stem.w;
            var te = stem.t;
            var suffix = wordstem.slice(-2);
            if (suffix == "si") {
                te.push("ATTR");
                possibleStem.push({ w: wordstem.slice(0, -2), t: te });
            }
        }
    })

    // Subjunctive
    possibleStem.forEach(stem => {
        if (stem.t.includes("SBJV")) { }
        else {
            var wordstem = stem.w;
            var te = stem.t;
            var suffix = wordstem.slice(-2);
            if (suffix == "re") {
                te.push("SBJV");
                possibleStem.push({ w: wordstem.slice(0, -2), t: te });
            }
        }
    })

    // Past
    possibleStem.forEach(stem => {
        if (stem.t.includes("PST")) { }
        else {
            var wordstem = stem.w;
            var te = stem.t;
            var suffix = wordstem.slice(-1);
            if (suffix == "t") {
                te.push("PST");
                possibleStem.push({ w: wordstem.slice(0, -1), t: te });
            }
        }
    })

    // Collect the results
    var endResults = [];
    var found = false;
    possibleStem.forEach(stem => {
        var fnd = meta.find(row => row.Lunasi == stem.w);
        if (fnd && fnd.Type == "V") { 
            endResults.push({ w: stem.w, t: stem.t, m: fnd.Meaning });
            found = true;
        }
    })
    console.log(endResults);
    if (!found) return false;
    else {
        var max = 0;
        var maxIndex = 0;
        endResults.forEach((result, index) => {
            if (result.t.length > max) { 
                max = result.t.length;
                maxIndex = index;
            }
        })
    }
    return endResults[maxIndex];

}

function submit() {
    var selectedOption = dropdown.value;
    var enteredText = textarea.value;
    log.innerHTML += "<p>Option chosen: " + selectedOption + "<br>Text entered: " + enteredText + "</p>";
    var words = enteredText.split(" ");
    var translated = [];

    words.forEach(word => {
        if (word == "\n") translated.push("<br>");
        else {
            var wordProcessed = processWord(word);
            if (wordProcessed) {
                translated.push(wordProcessed + " => ");
                var basic = meta.find(row => row.Lunasi == wordProcessed);
                if (basic) {
                    translated.push("<span>" + basic.Meaning + "</span>");
                }
                else {
                    var verb = verbProcess(wordProcessed);
                    if (verb) {
                        translated.push("<span>" + verb.m + "</span> (" + verb.t.join(", ") + "), <span>Stem: " + verb.w + "</span>");
                    }
                }
            }
            else translated.push(word, " => <span>Invalid word</span>");
        }
        translated.push("<br>");
    });

    log.innerHTML += "<p>";
    translated.forEach(word => { 
        log.innerHTML += word;
    })
    log.innerHTML += "</p>";
}
