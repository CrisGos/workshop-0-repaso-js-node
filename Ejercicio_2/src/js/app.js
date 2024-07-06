class Note {
    constructor(id, description, itsImportant = false) {
        this.id = id;
        this.description = description;
        this.itsImportant = itsImportant;
    }

    toggleComplete() {
        this.itsImportant = !this.itsImportant;
    }
}

class NoteManager {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
        this.loadNotes();
        this.id = undefined;
    }

    addNote(description) {
        if (this.id == undefined) {
            const id = this.notes.length ? this.notes[this.notes.length - 1].id + 1 : 1;
            const note = new Note(id, description);
            this.notes.push(note);
        } else {
            this.updateNote(description)
        }
        this.saveNotes();
        this.renderNotes();
        
    }

    deleteNote(id) {
        this.notes = this.notes.filter(note => note.id !== id);
        this.saveNotes();
        this.renderNotes();
    }

    showNoteInfo(id, description) {
        this.id = id;
        const preNote = document.getElementById("new-note");
        preNote.value = description;
    }


    updateNote(noteModified) {
        const noteFound = this.notes.findIndex(note => note.id == this.id);
        console.log(noteFound); // prueba;
        this.notes[noteFound].description = noteModified;
        this.id = undefined;
        this.saveNotes();
        this.renderNotes();
    }


    toggleNoteComplete(id) {
        const note = this.notes.find(note => note.id === id);
        if (note) {
            const noteIntance = new Note(note.id, note.description, note.itsImportant);
            noteIntance.toggleComplete();
            this.notes = this.notes.map(noteTog => (noteTog.id === id ? noteIntance : noteTog));
            this.saveNotes();
            this.renderNotes();
        } else {
            alert("Tarea no encontrada")
        }
    }

    saveNotes() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }

    loadNotes() {
        this.renderNotes();
    }

    renderNotes() {
        const noteList = document.getElementById('notes-list');
        noteList.innerHTML = '';
        this.notes.forEach(note => {
            const item = document.createElement('li');
            // item.textContent = note.description;
            if (note.itsImportant) {
                const strongText = document.createElement('strong');
                strongText.textContent = note.description;
                item.appendChild(strongText);
            } else {
                item.textContent = note.description;
            }
            
            item.className = note.itsImportant ? 'itsImportant' : '';
            item.addEventListener('click', () => this.toggleNoteComplete(note.id));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', (e) => {
                this.deleteNote(note.id);
            });

            const updateButton = document.createElement('button');
            updateButton.textContent = 'Editar';
            updateButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Evitar que el evento se propague al elemento padre, ¿Por qué? Porque el evento click en el botón también se propaga al elemento li.
                this.showNoteInfo(note.id, note.description);
            });

            item.appendChild(updateButton);
            item.appendChild(deleteButton);
            noteList.appendChild(item);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const noteManager = new NoteManager();

    document.getElementById('add-note').addEventListener('click', () => {
        const newNote = document.getElementById('new-note').value;
        if (newNote) {
            noteManager.addNote(newNote);
            document.getElementById('new-note').value = '';
        }
    });
});