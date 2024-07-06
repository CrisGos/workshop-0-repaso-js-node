# workshop-0-repaso-js-node
# Workshop 0: Repasando JavaScript

## Introducción

Bienvenidos al Workshop 0, donde repasaremos conceptos fundamentales de JavaScript. Este workshop está diseñado para evaluar y reforzar tus conocimientos previos antes de comenzar con el curso de TypeScript y Node.js. A través de actividades prácticas, exploraremos temas clave y desarrollaremos aplicaciones que integren estos conceptos de manera creativa y real.

## Instrucciones de Entrega

1. Crea un nuevo repositorio en tu cuenta de GitHub llamado `workshop-0-repaso-js-node`.
2. Copia las preguntas y ejercicios de este workshop en el archivo `README.md` de tu repositorio.
3. Resuelve cada pregunta y ejercicio en su respectiva sección.
4. Realiza un commit y un push de tus respuestas y código a GitHub.
5. Subir a Moodle en el espacio habilitado de semana 1 el link del repositorio en GitHub. En caso de no estar habilitado el envío en Moodle, enviar el link del repo a `nicolas.picon@riwi.io`.

## Instrucciones Generales

1. No se aceptarán preguntas sobre ninguno de los ejercicios.

## Objetivos

1. **Conocimiento**: Identificar y describir los conceptos clave de JavaScript y Node.js.
2. **Comprensión**: Explicar y comparar diferentes estructuras y técnicas de programación en JavaScript y Node.js.
3. **Aplicación**: Implementar soluciones prácticas que utilicen estos conceptos en aplicaciones reales.

## Punto 1: Ejercicio Guiado - Creando una Aplicación de Gestión de Tareas

En este primer punto, crearás una aplicación de gestión de tareas que te permitirá añadir, editar, eliminar y marcar tareas como completadas. Durante el proceso, se evaluarán los siguientes temas:

- JavaScript Básico
- Manipulación del DOM
- Programación Orientada a Objetos (OOP)
- Eventos en JavaScript
- Variables y Tipos de Datos
- Control de Flujo
- Funciones de Flecha
- JSON
- Depuración

### Historia de Usuario

Como usuario, quiero una aplicación de gestión de tareas que me permita añadir, editar, eliminar y marcar tareas como completadas para organizar mis actividades diarias de manera eficiente.

### Criterios de Aceptación

1. **Añadir una Tarea**:
   - Debe existir un campo de entrada y un botón para añadir una nueva tarea.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Eventos en JavaScript.

2. **Editar una Tarea**:
   - Debe ser posible editar la descripción de una tarea existente.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Eventos en JavaScript.

3. **Eliminar una Tarea**:
   - Debe existir un botón para eliminar una tarea.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Eventos en JavaScript.

4. **Marcar una Tarea como Completada**:
   - Debe ser posible marcar una tarea como completada y debe visualizarse de manera diferente.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Eventos en JavaScript, Clases y Objetos.

5. **Almacenar Tareas en localStorage**:
   - Las tareas deben ser almacenadas en `localStorage` y recuperadas al recargar la página.
   - **Concepto de JavaScript aplicado**: JSON, Almacenamiento en localStorage.

6. **Interacción del Usuario**:
   - Utilizar funciones de flecha para definir manejadores de eventos.
   - **Concepto de JavaScript aplicado**: Funciones de Flecha, Eventos en JavaScript.

7. **Validación y Manejo de Errores**:
   - Implementar métodos de depuración para el manejo de errores y validación.
   - **Concepto de JavaScript aplicado**: Depuración, Manejo de Errores.


#### HTML

```html
<!DOCTYPE html> <!-- Recordemos que el DOCTYPE es la primera línea de un documento HTML y se utiliza para indicar al navegador qué tipo de documento se está utilizando. -->
<html lang="en"> <!-- La etiqueta <html> es el contenedor raíz de todo el contenido de una página web. El atributo lang se utiliza para especificar el idioma de la página. -->
<head> <!-- La etiqueta <head> contiene información sobre el documento, como metadatos, enlaces a estilos y scripts, y otros elementos que no se muestran directamente en la página. -->
    <meta charset="UTF-8"> <!-- La etiqueta <meta> se utiliza para especificar metadatos, como el juego de caracteres utilizado en el documento. -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- La etiqueta <meta> con el atributo name="viewport" se utiliza para controlar el tamaño y la escala de la página en dispositivos móviles. -->
    <title>Gestión de Tareas</title> <!-- La etiqueta <title> se utiliza para especificar el título de la página, que se muestra en la pestaña del navegador. -->
    <link rel="stylesheet" href="styles.css"> <!-- La etiqueta <link> se utiliza para enlazar una hoja de estilos externa con la página. -->
</head>
<body> <!-- La etiqueta <body> contiene todo el contenido visible de una página web, como texto, imágenes, enlaces, formularios, etc. -->
    <div id="app"> <!-- La etiqueta <div> se utiliza para agrupar elementos y crear secciones en una página web. El atributo id se utiliza para identificar un elemento de forma única. -->
        <h1>Gestión de Tareas</h1> <!-- La etiqueta <h1> se utiliza para definir un encabezado de nivel 1 en una página web. -->
        <input type="text" id="new-task" placeholder="Nueva tarea"> <!-- La etiqueta <input> se utiliza para crear campos de entrada en formularios. El atributo type se utiliza para especificar el tipo de campo (e.g., texto). El atributo id se utiliza para identificar un campo de forma única. El atributo placeholder se utiliza para mostrar un texto de ayuda en el campo. -->
        <button id="add-task">Añadir Tarea</button> <!-- La etiqueta <button> se utiliza para crear botones en una página web. El atributo id se utiliza para identificar un botón de forma única. -->
        <ul id="task-list"></ul> <!-- La etiqueta <ul> se utiliza para crear listas no ordenadas en una página web. El atributo id se utiliza para identificar una lista de forma única. -->
    </div>
    <script src="app.js"></script> <!-- La etiqueta <script> se utiliza para enlazar un archivo de script con la página. -->
</body>
</html>
```

#### JavaScript

```javascript
class Task {
    constructor(id, description, completed = false) {
        this.id = id;
        this.description = description;
        this.completed = completed;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }
}

class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.loadTasks();
    }

    addTask(description) {
        const id = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1;
        const task = new Task(id, description);
        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.renderTasks();
    }

    toggleTaskComplete(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.toggleComplete();
            this.saveTasks();
            this.renderTasks();
        }
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        this.renderTasks();
    }

    renderTasks() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        this.tasks.forEach(task => {
            const item = document.createElement('li');
            item.textContent = task.description;
            item.className = task.completed ? 'completed' : '';
            item.addEventListener('click', () => this.toggleTaskComplete(task.id));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Evitar que el evento se propague al elemento padre, ¿Por qué? Porque el evento click en el botón también se propaga al elemento li.
                this.deleteTask(task.id);
            });

            item.appendChild(deleteButton);
            taskList.appendChild(item);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const taskManager = new TaskManager();

    document.getElementById('add-task').addEventListener('click', () => {
        const newTask = document.getElementById('new-task').value;
        if (newTask) {
            taskManager.addTask(newTask);
            document.getElementById('new-task').value = '';
        }
    });
});
```
3. **Ejecución**: Probar la aplicación en un navegador y realizar las siguientes acciones:
    - Probar funcionalidad del codigo. Si encuentras errores, depurar el código, corregirlos y generar un informe de los errores encontrados y como
    los corregiste.
    - Añadir una nueva tarea.
    - Marcar una tarea como completada.
    - Eliminar una tarea.
    - Verificar que las tareas se almacenan y recuperan correctamente en `localStorage`.
4. **Analisis**: Explicar el código proporcionado linea por linea en el archivo `README.md` de tu repositorio.

## Punto 2: Ejercicio Independiente - Creando una Aplicación de Gestión de Notas

En este segundo punto, crearás una aplicación de gestión de notas que te permitirá añadir, editar, eliminar y marcar notas como importantes. Durante el proceso, se evaluarán los siguientes temas:

### Historia de Usuario

Como usuario, quiero una aplicación de gestión de notas para poder añadir, editar, eliminar y marcar notas como importantes, de manera que pueda organizar mis tareas y recordatorios de forma eficiente.

### Criterios de Aceptación

1. **Añadir una Nota**:
   - Debe existir un campo de entrada y un botón para añadir una nueva nota.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Eventos en JavaScript.

2. **Editar una Nota**:
   - Debe ser posible editar la descripción de una nota existente.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Eventos en JavaScript.

3. **Eliminar una Nota**:
   - Debe existir un botón para eliminar una nota.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Eventos en JavaScript.

4. **Marcar una Nota como Importante**:
   - Debe ser posible marcar una nota como importante y debe visualizarse de manera destacada.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Eventos en JavaScript, Clases y Objetos.

5. **Almacenar Notas en localStorage**:
   - Las notas deben ser almacenadas en `localStorage` y recuperadas al recargar la página.
   - **Concepto de JavaScript aplicado**: JSON, Almacenamiento en localStorage.

6. **Interacción del Usuario**:
   - Utilizar funciones de flecha para definir manejadores de eventos.
   - **Concepto de JavaScript aplicado**: Funciones de Flecha, Eventos en JavaScript.

7. **Validación y Manejo de Errores**:
   - Implementar métodos de depuración para el manejo de errores y validación.
   - **Concepto de JavaScript aplicado**: Depuración, Manejo de Errores.

### Ejercicio

Desarrolla la aplicación de acuerdo a los criterios de aceptación mencionados. Asegúrate de probar la aplicación en un navegador y realizar las siguientes acciones:

1. Añadir una nueva nota.
2. Editar una nota existente.
3. Marcar una nota como importante.
4. Eliminar una nota.
5. Verificar que las notas se almacenan y recuperan correctamente en `localStorage`.
6. Documentar el proceso y el código en el archivo `README.md` de tu repositorio.

## Punto 3: Ejercicio Guiado - Consumiendo una API con JSONPlaceholder

En este tercer punto, crearás una aplicación que consuma datos de una API utilizando JSONPlaceholder. Durante el proceso, se evaluarán los siguientes temas:

- Control de Flujo
- Funciones de Flecha
- JSON
- Promesas
- Depuración

### Historia de Usuario

Como usuario, quiero una aplicación que consuma datos de una API pública, para visualizar y gestionar información de manera eficiente.

### Criterios de Aceptación

1. **Consumo de API**:
   - La aplicación debe consumir datos de la API de JSONPlaceholder (https://jsonplaceholder.typicode.com/posts).
   - **Concepto de JavaScript aplicado**: Promesas, JSON.

2. **Visualización de Datos**:
   - Los datos obtenidos de la API deben visualizarse en la página de manera estructurada.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Control de Flujo.

3. **Manejo de Errores**:
   - Implementar manejo de errores para la solicitud de la API y mostrar mensajes de error adecuados al usuario.
   - **Concepto de JavaScript aplicado**: Promesas, Depuración.

4. **Interacción del Usuario**:
   - Utilizar funciones de flecha para definir manejadores de eventos y procesamiento de datos.
   - **Concepto de JavaScript aplicado**: Funciones de Flecha.

### Ejemplo de Código

#### HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consumiendo API con JSONPlaceholder</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="app">
        <h1>Listado de Posts</h1>
        <button id="fetch-posts">Cargar Posts</button>
        <ul id="post-list"></ul>
        <div id="error-message"></div>
    </div>
    <script src="app.js"></script>
</body>
</html>
```

#### JavaScript

```javascript
document.getElementById('fetch-posts').addEventListener('click', () => {
    fetchPosts();
});

const fetchPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(posts => {
            displayPosts(posts);
        })
        .catch(error => {
            displayError(error);
        });
};

const displayPosts = (posts) => {
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';
    posts.forEach(post => {
        const listItem = document.createElement('li');
        listItem.textContent = `Title: ${post.title}`;
        postList.appendChild(listItem);
    });
};

const displayError = (error) => {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = `Error: ${error.message}`;
};
```

### Ejecución

1. Añadir un botón en el HTML para iniciar la solicitud de la API.
2. Crear una función en JavaScript para consumir la API utilizando `fetch`.
3. Manejar las promesas y los posibles errores de la solicitud.
4. Mostrar los datos obtenidos de la API en la página.
5. Implementar métodos de depuración para el manejo de errores y validación.

### Análisis

Explica el código proporcionado línea por línea en el archivo `README.md` de tu repositorio. Asegúrate de describir cómo se aplican los conceptos de control de flujo, funciones de flecha, JSON, promesas y depuración.

## Punto 4: Ejercicio Independiente - Creando una Aplicación de Gestión de Productos con la API de Platzi

En este cuarto punto, crearás una aplicación que consuma datos de la API de Platzi Fake Store y muestre la información de productos de manera interactiva y visualmente atractiva. Durante el proceso, se evaluarán los siguientes temas:

- Control de Flujo
- Funciones de Flecha
- JSON
- Promesas
- Depuración

### Historia de Usuario

Como usuario, quiero una aplicación que me permita ver y gestionar productos de una tienda en línea, para explorar las opciones disponibles y tomar decisiones de compra informadas.

### Criterios de Aceptación

1. **Consumo de API**:
   - La aplicación debe consumir datos de la API de Platzi Fake Store (https://fakeapi.platzi.com/).
   - **Concepto de JavaScript aplicado**: Promesas, JSON.

2. **Visualización de Datos**:
   - Los datos obtenidos de la API deben visualizarse en la página de manera estructurada y atractiva. Puede usar una tabla, una lista o cualquier otro formato que consideres adecuado.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Control de Flujo.

3. **Interacción del Usuario**:
   - Utilizar funciones de flecha para definir manejadores de eventos y procesamiento de datos.
   - **Concepto de JavaScript aplicado**: Funciones de Flecha, Eventos en JavaScript.

4. **Filtrado y Búsqueda**:
   - Implementar funcionalidades de filtrado y búsqueda para que los usuarios puedan encontrar productos específicos.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Control de Flujo.

5. **Manejo de Errores**:
   - Implementar manejo de errores para la solicitud de la API y mostrar mensajes de error adecuados al usuario.
   - **Concepto de JavaScript aplicado**: Promesas, Depuración.

## Punto 5: Ejercicio Independiente - Métodos de Array en JavaScript

En este quinto punto, explorarás y aplicarás diversos métodos de array en JavaScript. Durante el proceso, se evaluarán los siguientes temas:

- Control de Flujo
- Funciones de Flecha
- Métodos de Array (reduce, forEach, map, filter, find, some, every)

### Historia de Usuario

Como usuario, quiero una aplicación que me permita gestionar y analizar una lista de productos utilizando diversos métodos de array, para obtener información relevante y personalizada de manera eficiente.

### Interface de Producto

```javascript

const products = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 1500, stock: 10 },
    { id: 2, name: 'Smartphone', category: 'Electronics', price: 800, stock: 20 },
    { id: 3, name: 'Headphones', category: 'Electronics', price: 100, stock: 30 },
    { id: 4, name: 'T-shirt', category: 'Clothing', price: 20, stock: 50 },
    { id: 5, name: 'Jeans', category: 'Clothing', price: 50, stock: 40 },
    { id: 6, name: 'Sneakers', category: 'Clothing', price: 80, stock: 30 },
    { id: 7, name: 'Backpack', category: 'Accessories', price: 40, stock: 25 },
    { id: 8, name: 'Watch', category: 'Accessories', price: 60, stock: 20 },
    { id: 9, name: 'Sunglasses', category: 'Accessories', price: 30, stock: 35 }
];

```

### Criterios de Aceptación

1. **Visualización de Productos**:
   - La aplicación debe mostrar una lista de productos en la página. Puedes interactuar con el DOM o con la consola del navegador.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, forEach.

2. **Calcular el Precio Total**:
   - La aplicación debe calcular y mostrar el precio total de todos los productos utilizando el método `reduce`.
   - **Concepto de JavaScript aplicado**: reduce.

3. **Filtrar Productos por Categoría**:
   - La aplicación debe permitir filtrar productos por categoría utilizando el método `filter`.
   - **Concepto de JavaScript aplicado**: filter.

4. **Buscar un Producto por Nombre**:
   - La aplicación debe permitir buscar un producto específico por su nombre utilizando el método `find`.
   - **Concepto de JavaScript aplicado**: find.

5. **Verificar Disponibilidad de Productos**:
   - La aplicación debe verificar si todos los productos están disponibles utilizando el método `every`.
   - **Concepto de JavaScript aplicado**: every.

6. **Obtener Nombres de Productos**:
   - La aplicación debe crear una lista con los nombres de todos los productos utilizando el método `map`.
   - **Concepto de JavaScript aplicado**: map.

7. **Depuración y Manejo de Errores**:
   - Implementar métodos de depuración para el manejo de errores y validación.
   - **Concepto de JavaScript aplicado**: Depuración, Manejo de Errores.


# Solucion

## Punto 1

```javascript
class Task { //Se crea la clase Taks que permitira agregar una nueva tarea y modificar el estado de esta
    constructor(id, description, completed = false) { // se crea el constructor, el cual permitira inicializar la clase
        this.id = id; // la variable global en la clase this.id sera el valor del parametro recibido id
        this.description = description; // la variable global en la clase this.description sera el valor del parametro recibido description
        this.completed = completed; // la variable global en la clase this.completed sera el valor del parametro recibido completed
    }

    toggleComplete() { // se crea el metodo toggleComplete, el cual permitira cambiar el estado de la tarea
        this.completed = !this.completed; // this.completed es igual a su contrario, es decir si es falso pasa a true y viceversa
    }
}

class TaskManager { // se crea la clase TaskManager, dentro de la cual se llevara a cabo la mayoria de procesos de este codigo
    constructor() { // nuevamente el contructor permite inicializar la clase
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || []; // recupera del localstorage la vble tasks, lo parsea como js, si no existe retorna una lista vacia y lo asgina a this.tasks
        this.loadTasks(); // llama la funcion encargada de mostrar cada tarea con sus repectivas opciones
        this.id = undefined; // vuelve a poner undefined this.id para diferenciar cuando se actualice o cuando se agregue una nueva tarea
    }

    addTask(description) { // el metodo addTask recibe tiene como parametro description, que sera el mensaje o la modificacion del mensaje de una tarea
        if (this.id == undefined) { // si this.id es undefined agregara una nueva tarea
            const id = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1; //verifica si hay elementos en la lista de tareas, si los ahi aumenta +1 al anterior id y si no lo hay asigna el id 1
            const task = new Task(id, description); // instancia la clase Task
            this.tasks.push(task); // guarda al final de la lista
        } else {
            this.updateTask(description)
        }
        this.saveTasks();
        this.renderTasks();
        
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.renderTasks();
    }

    showTaskInfo(id, description) {
        this.id = id;
        const preTask = document.getElementById("new-task");
        preTask.value = description;
    }

    updateTask(taskModified) {
        const taksFound = this.tasks.findIndex(task => task.id == this.id);
        console.log(taksFound); // prueba;
        this.tasks[taksFound].description = taskModified;
        this.id = undefined;
        this.saveTasks();
        this.renderTasks();
    }


    toggleTaskComplete(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            const taskIntance = new Task(task.id, task.description, task.completed);
            taskIntance.toggleComplete();
            this.tasks = this.tasks.map(taskTog => (taskTog.id === id ? taskIntance : taskTog));
            this.saveTasks();
            this.renderTasks();
        } else {
            alert("Tarea no encontrada")
        }
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        this.renderTasks();
    }

    renderTasks() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        this.tasks.forEach(task => {
            const item = document.createElement('li');
            item.textContent = task.description;
            item.className = task.completed ? 'completed' : '';
            item.addEventListener('click', () => this.toggleTaskComplete(task.id));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Evitar que el evento se propague al elemento padre, ¿Por qué? Porque el evento click en el botón también se propaga al elemento li.
                this.deleteTask(task.id);
            });

            const updateButton = document.createElement('button');
            updateButton.textContent = 'Editar';
            updateButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Evitar que el evento se propague al elemento padre, ¿Por qué? Porque el evento click en el botón también se propaga al elemento li.
                this.showTaskInfo(task.id, task.description);
            });

            item.appendChild(updateButton);
            item.appendChild(deleteButton);
            taskList.appendChild(item);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const taskManager = new TaskManager();

    document.getElementById('add-task').addEventListener('click', () => {
        const newTask = document.getElementById('new-task').value;
        if (newTask) {
            taskManager.addTask(newTask);
            document.getElementById('new-task').value = '';
        }
    });
});

```


## Punto 2

```javascript
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
```


## Punto 3

```javascript
document.getElementById('fetch-posts').addEventListener('click', () => {
    fetchPosts();
});

const fetchPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(posts => {
            console.log(posts)
            displayPosts(posts);
        })
        .catch(error => {
            displayError(error);
        });
};

const displayPosts = (posts) => {
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';
    posts.forEach(post => {
        const listItem = document.createElement('li');
        const textItem = document.createElement('p');
        listItem.textContent = `Title: ${post.title}`;
        textItem.textContent =`Post: ${post.body}`;
        postList.appendChild(listItem);
        postList.appendChild(textItem);
    });
};

const displayError = (error) => {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = `Error: ${error.message}`;
};
```


## Punto 4

```javascript
let data
const fetchPosts = () => {
    fetch('https://api.escuelajs.co/api/v1/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(posts => {
            data = posts
            console.log(posts)
            displayPosts(posts);
        })
        .catch(error => {
            displayError(error);
        });
};

const displayPosts = (posts) => {
    const tbody = document.getElementById('tbodyt');
    tbody.innerHTML = '';
    posts.forEach(post => {
        tbody.innerHTML += `
        <tr>
            <td scope="col">${post.id}</td>
            <td scope="col">${post.category.name}</td>
            <td scope="col">${post.title}</td>
            <td scope="col">$${post.price}</td>
            <td scope="col"><img src=${post.images[0]} width="100px" alt="${post.title}"></td>
            <td scope="col">${post.description}</td>
        </tr>
        `;
    });
}

const InfoFiltered = (word) => {
    console.log(word)
    const resultsFiltered = data.filter((post) => post.category.name === word)
    console.log(resultsFiltered)
    displayPosts(resultsFiltered)
}

const InfoFound = (wordToSearch) => {
    if (wordToSearch) {
        resultsFound = data.filter((post) => post.title.includes(wordToSearch));
        console.log(resultsFound)
        displayPosts(resultsFound)
        
    }
}


const displayError = (error) => {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = `Error: ${error.message}`;
};

const filterOption = document.getElementById('filter-option');
filterOption.addEventListener('change', async () => {
    const category = filterOption.value;
    InfoFiltered(category)
})

document.getElementById('search-product').addEventListener('click', () => {
    const wordToSearch = document.getElementById('search-by').value;
    InfoFound(wordToSearch)
})

fetchPosts()
```


## Punto 5

```javascript
const products = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 1500, stock: 10 },
    { id: 2, name: 'Smartphone', category: 'Electronics', price: 800, stock: 20 },
    { id: 3, name: 'Headphones', category: 'Electronics', price: 100, stock: 30 },
    { id: 4, name: 'T-shirt', category: 'Clothing', price: 20, stock: 50 },
    { id: 5, name: 'Jeans', category: 'Clothing', price: 50, stock: 40 },
    { id: 6, name: 'Sneakers', category: 'Clothing', price: 80, stock: 30 },
    { id: 7, name: 'Backpack', category: 'Accessories', price: 40, stock: 25 },
    { id: 8, name: 'Watch', category: 'Accessories', price: 60, stock: 20 },
    { id: 9, name: 'Sunglasses', category: 'Accessories', price: 30, stock: 35 }
];

const tbody = document.getElementById('tbody');

document.getElementById('load-products').addEventListener('click', () => {
    displayPosts(products);
});

document.getElementById('sum-products').addEventListener('click', () => {
    totalPrice(products);
});

document.getElementById('verify-av').addEventListener('click', () => {
    verifyAvailable(products);
});

document.getElementById('load-list').addEventListener('click', () => {
    createList(products);
});



const filterOption = document.getElementById('filter-option');
filterOption.addEventListener('change', async () => {
    const category = filterOption.value;
    InfoFiltered(category)
})

document.getElementById('search-product').addEventListener('click', () => {
    const wordToSearch = document.getElementById('search-by').value;
    InfoFound(wordToSearch)
})


const displayPosts = (products) => {
    tbody.innerHTML = '';
    products.forEach(product => {
        tbody.innerHTML += `
        <tr>
            <td scope="col">${product.id}</td>
            <td scope="col">${product.category}</td>
            <td scope="col">${product.name}</td>
            <td scope="col">$${product.price}</td>
            <td scope="col">${product.stock}</td>
        </tr>
        `;
    });
};


const totalPrice = (products) => {
    tbody.innerHTML = '';
    const total = products.reduce((accumulator, product) => accumulator + product.price, 0);
    console.log('Precio total de todos los productos:', total);
    const totalView = document.createElement('p');
    totalView.textContent = `Precio total de todos los productos: $${total}`;
    tbody.appendChild(totalView);
}


const InfoFiltered = (word) => {
    console.log(word)
    const resultsFiltered = products.filter((product) => product.category === word)
    console.log(resultsFiltered)
    displayPosts(resultsFiltered)
}


const InfoFound = (wordToSearch) => {
    if (wordToSearch) {
        resultsFound = products.filter((product) => product.name.includes(wordToSearch));
        console.log(resultsFound)
        displayPosts(resultsFound)
    }
}

const verifyAvailable = (products) => {
    const allAvailable = products.every(product => product.stock > 0);
    if (allAvailable) {
        const Available = document.createElement('p');
        Available.textContent = 'Todos los productos están disponibles.';
        tbody.appendChild(Available);
        console.log('Todos los productos están disponibles.');
    } else {
        const Available = document.createElement('p');
        Available.textContent = 'No todos los productos están disponibles.';
        tbody.appendChild(Available);
        console.log('No todos los productos están disponibles.');
    }
}


const createList = (products) => {
    const productNames = products.map(product => product.name);
    const list = document.createElement('p');
    list.textContent = `Lista de nombres de productos:, ${productNames}`;
    tbody.appendChild(list);
    console.log('Lista de nombres de productos:', productNames);
}


```