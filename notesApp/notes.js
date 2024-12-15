import fs from 'fs';
import chalk from 'chalk';


const addNote = (title, body) => {
    const notes = loadNotes();

    //filters for duplicates but only the first one and returns it
    const duplicateNote = notes.find((note) => note.title === title);

    //if there are no duplicates push the note to the array
    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body,
        })
    } else {
        console.log(chalk.red('Cannot add duplicate note, try editing instead'));
        return;
    }

    saveNote(notes)

    console.log(chalk.green('New note added'));
}


const saveNote = (notesArr) => {
    //converting all the notes to a string then writing them to the json file
    const dataJSON = JSON.stringify(notesArr);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    //if you can read the json file, convert it to a string, then parse and return that string
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = String(dataBuffer);
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }

}

const listNotes = () => {
    const notes = loadNotes();
    let eachTitle = '';

    for (const note of notes) {
        eachTitle += note.title + '\n';
    }

    console.log(chalk.magenta('Your notes:' + '\n' + eachTitle));
};

const readNotes = (title) => {
    let notes = loadNotes();
    let foundNote = notes.find((note) => note.title === title);

    if(foundNote) {
        console.log(chalk.magenta(foundNote.title) + '\n' + foundNote.body);
    } else {
        console.log(chalk.red('No note found'));
    }
}

const editNote = (userTitle, userBody) => {
    let notes = loadNotes();

        if (notes.map((eachNote) => eachNote.title).indexOf(userTitle) === -1) {      //for all the json notes title if the userTitle is not in that array throw a message
            console.log(chalk.yellow('Note title does not exist, try adding the note first'));
        } else {
            notes[notes.findIndex((eachNote) => eachNote.title === userTitle)].body = userBody; //updating the specific user's note's body
            saveNote(notes);
            console.log(chalk.green('Note edited'));
        }


}



const removeNote = (title) => {
    let notes = loadNotes();

    for(let i = 0; i < notes.length; i++) {
        if(notes[i].title !== title) {
            console.log(chalk.red('Could not find note to remove'));
        } else {
            notes.splice(notes.indexOf(notes[i]), 1);
            saveNote(notes);
        }
    }
}



//es5 syntax
// module.exports = getNotes;



//es6 syntax
export default {
    addNote,
    editNote,
    listNotes,
    removeNote,
    readNotes,
};