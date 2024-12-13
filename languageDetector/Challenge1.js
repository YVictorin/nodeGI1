import LanguageDetect from "languagedetect";

const findLanguage = (promptArr) => {

    //instantiating a new LanguageDectect object to use later
    const detector = new LanguageDetect();
    let result = [];


    //looping through the entire promptArr param
    for(let index = 0; index < promptArr.length; index++) {
        result.push(detector.detect(promptArr[index])[0][0]); //pushing the translation results the detector finds at index 0,0 because the name of the language is nested inside two arrays
    }

    return result;
}

console.log(findLanguage(['Es macht gut', 'Dobrá práce', 'Gwaith da”']));