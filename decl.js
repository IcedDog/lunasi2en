/**
 * 
 * 
 * @param {String} word 
 * @param {String} gender 
 */
function determineDecl(word, gender){
    let res
    if (gender == "F") {
        if (/\w+[aeiouáé]/gm.test(word)){
            res = (/\w+[i]/gm.test(word)) ? "1S" : "1" 
        } else {
            res = (/\w+[i]/gm.test(word)) ? "2S" : "2" 
        }
    } else if (gender == "M") {
        if (/\w+[aeiouáé]/gm.test(word)){
            res = (/\w+[i]/gm.test(word)) ? "3S" : "3" 
        } else {
            res = (/\w+[i]/gm.test(word)) ? "4S" : "4" 
        }
    } else {
    }
    return res
}
/**
 * 
 * @param {String} word 
 * @param {String} decl 
 */
const declensionList = {
    // nom acc dat gen inst all abl ine voc 
    "1" : [["", "i", "s", "se", "si", "cé", "té", "sé", "a"],
        ["s", "si", "se", "sei", "ssi", "sce", "ste", "sse", "sa"]],
    "1S": [["", "é", "s", "se", "si", "cé", "té", "sé", "a"],
        ["s", "si", "se", "sei", "ssi", "sce", "ste", "sse", "sa"]],
    "2" : [["", "im", "is", "e", "si", "cé", "eté", "esé", "a"],
        ["is", "isi", "ise", "isei", "issi", "isce", "iste", "isse", "isa"]],
    "2S": [["", "ém", "is", "e", "si", "cé", "eté", "esé", "a"],
        ["is", "isi", "ise", "isei", "issi", "isce", "iste", "isse", "isa"]],
    "3" : [["", "vi", "vis", "ve", "si", "cá", "tá", "sá", "va"],
        ["ves", "visi", "veis", "ves", "vesi", "vecá", "vetá", "vesá", "sa"]],
    "3S": [["", "vé", "vis", "ve", "si", "cá", "tá", "sá", "va"],
        []],
    "4" : [["", "i", "ei", "e", "si", "cá", "etá", "esá", "a"],
        []],
    "4S": [["", "é", "ei", "e", "si", "cá", "etá", "esá", "a"],
        ["es", "isi", "eis", "es", "esi", "ecá", "etá", "esá", "esa"]],
}

function listInflection(word, decl){
    let declArr = declensionList[decl]
    return {
        "sing": {
            "nom":`${word}${declArr[0][0]}`,
            "acc":`${word}${declArr[0][1]}`,
            "dat":`${word}${declArr[0][2]}`,
            "gen":`${word}${declArr[0][3]}`,
            "inst":`${word}${declArr[0][4]}`,
            "all":`${word}${declArr[0][5]}`,
            "abl":`${word}${declArr[0][6]}`,
            "ine":`${word}${declArr[0][7]}`,
            "voc":`${word}${declArr[0][8]}`,
        },
        "plu": {
            "nom":`${word}${declArr[1][0]}`,
            "acc":`${word}${declArr[1][1]}`,
            "dat":`${word}${declArr[1][2]}`,
            "gen":`${word}${declArr[1][3]}`,
            "inst":`${word}${declArr[1][4]}`,
            "all":`${word}${declArr[1][5]}`,
            "abl":`${word}${declArr[1][6]}`,
            "ine":`${word}${declArr[1][7]}`,
            "voc":`${word}${declArr[1][8]}`,
        }
    }
}
console.log(listInflection("raski", determineDecl("raski", "F")))