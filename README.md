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
        } else { // si this.id no es undefined, significa que seleccionaron la opcion 'editar', por lo cual llama el metodo updateTask con el argumento description
            this.updateTask(description) // se llama el metodo updateTask de la clase TaskManager
        }
        this.saveTasks(); // despues de realizar la actualización o agregado se guardan los cambios en el localstorage
        this.renderTasks(); // nuevamente se actualiza la vista de las notas
    }

    deleteTask(id) { // se crea el metodo que permitira borrar notas
        this.tasks = this.tasks.filter(task => task.id !== id); // se sobreescribe tasks filtrando las notas que no contengan el id de la nota seleccionada para borrar
        this.saveTasks(); // despues de realizar el filtrado se guardan los cambios en el localstorage
        this.renderTasks(); // nuevamente se actualiza la vista de las notas
    }

    showTaskInfo(id, description) { // este metodo permite asignar a this.id el id de la nota a modificar y llevar el mensaje al input para editarlos
        this.id = id; // se asigna a la variable this.id el valor id pasado como parametro
        const preTask = document.getElementById("new-task"); // se toma el id new-task, el cual es el input
        preTask.value = description; // se le asigna el valor preexistente al input para modificarlo
    }

    updateTask(taskModified) { // este metodo permite actualizar la descripción de una tarea
        const taksFound = this.tasks.findIndex(task => task.id == this.id); // se busca el index en el cual se encujentra el id seleccionado para modificar
        console.log(taksFound); // depuracion;
        this.tasks[taksFound].description = taskModified; // se le asigna la nueva descripcion a la tarea preexistente
        this.id = undefined; // se asigna nuevamente el valor de undefined a la variable this.id
        this.saveTasks(); 
        this.renderTasks();
    }


    toggleTaskComplete(id) { // este metodo permite cambiar de el estado completed de la tarea
        const task = this.tasks.find(task => task.id === id); // Encuentra la tarea en el array de tareas que tiene el mismo id que el proporcionado.
        if (task) { // si la tarea fue encontrada
            const taskIntance = new Task(task.id, task.description, task.completed); // Crea una nueva instancia de Task usando la información de la tarea encontrada.
            taskIntance.toggleComplete();  // Llama al método toggleComplete de la nueva instancia para cambiar su estado "completed".
            this.tasks = this.tasks.map(taskTog => (taskTog.id === id ? taskIntance : taskTog)); // Actualiza el array de tasks, reemplazando la tarea correspondiente con la nueva instancia modificada.
            this.saveTasks();
            this.renderTasks();
        } else { // Si no encuentra la tarea
            alert("Tarea no encontrada") // Arroja una alerta
        }
    }

    saveTasks() { // este metodo permite guardar y actualizar tasks en el localstorage
        localStorage.setItem('tasks', JSON.stringify(this.tasks)); // guarda como string en el localstorage tasks
    }

    loadTasks() {// Este método carga las tareas desde el localStorage y las renderiza
        this.renderTasks(); // Llama al método renderTasks para mostrar las tareas en la interfaz de usuario, no entiendo muy bien porque hace doble llamado
    }

    renderTasks() { // Este método muestra las tareas en la interfaz de usuario
        const taskList = document.getElementById('task-list'); // Obtiene el id 'task-list'.
        taskList.innerHTML = ''; // limpia el contenido que haya en taskList
        this.tasks.forEach(task => { // itera sobre cada tarea
            const item = document.createElement('li'); // crea un elemento li para cada task
            item.textContent = task.description; // Establece el texto del li con la descripción de la tarea
            item.className = task.completed ? 'completed' : ''; // Añade la clase completed si la tarea está completada, si no lo deja vacio
            item.addEventListener('click', () => this.toggleTaskComplete(task.id)); // Añade un evento click para cambiar el estado completado de la tarea

            const deleteButton = document.createElement('button'); // crea un elemento button en el documento HTML
            deleteButton.textContent = 'Eliminar'; // Agrega el texto 'Eliminar' al boton
            deleteButton.addEventListener('click', (e) => { // Añade un evento click al botón de eliminación
                e.stopPropagation(); // Evitar que el evento se propague al elemento padre, ¿Por qué? Porque el evento click en el botón también se propaga al elemento li.
                this.deleteTask(task.id); // Llama al método deleteTask para eliminar la tarea
            });

            const updateButton = document.createElement('button'); // crea un elemento button en el documento HTML
            updateButton.textContent = 'Editar'; // Agrega el texto 'Editar' al boton
            updateButton.addEventListener('click', (e) => { // Añade un evento click al botón de edicion
                e.stopPropagation(); // Evitar que el evento se propague al elemento padre, ¿Por qué? Porque el evento click en el botón también se propaga al elemento li.
                this.showTaskInfo(task.id, task.description); // Llama al método showTaskInfo para modificar la tarea
            });

            item.appendChild(updateButton); // Añade el boton de actualizacion al li
            item.appendChild(deleteButton); // Añade el boton de eliminar al li
            taskList.appendChild(item); // Añade el li al task-list
        });
    }
}

document.addEventListener('DOMContentLoaded', () => { // Este código se ejecuta cuando el documento HTML ha sido completamente cargado y analizado.
    const taskManager = new TaskManager(); // Crea una instancia de TaskManager

    document.getElementById('add-task').addEventListener('click', () => { // Añade un evento click al botón con el id 'add-task'
        const newTask = document.getElementById('new-task').value; // Obtiene el valor del campo de entrada con el id 'new-task'
        if (newTask) { // si el campo no esta vacio
            taskManager.addTask(newTask); // Llama al método addTask para añadir una nueva tarea
            document.getElementById('new-task').value = ''; // Limpia el campo de entrada
        }
    });
});

```


## Punto 2

```javascript
class Note {
    constructor(id, description, itsImportant = false) { // Constructor de la clase Note
        this.id = id; // Inicialización del ID de la nota
        this.description = description; // Inicialización de la descripción de la nota
        this.itsImportant = itsImportant; // Inicialización de la propiedad que indica si la nota es importante
    }

    toggleComplete() { // Método para cambiar el estado de importancia de la nota
        this.itsImportant = !this.itsImportant; // Cambia el estado de importancia de la nota
    }
}

class NoteManager {
    constructor() { // Constructor de la clase NoteManager
        this.notes = JSON.parse(localStorage.getItem('notes')) || []; // Inicialización de las notas recuperadas del localStorage o una lista vacía
        this.loadNotes(); // Carga inicial de las notas
        this.id = undefined; // Inicialización del ID en undefined para distinguir entre agregar y actualizar notas
    }

    addNote(description) { // Método para agregar una nueva nota
        if (this.id == undefined) { // Verifica si no hay una nota seleccionada para actualizar
            const id = this.notes.length ? this.notes[this.notes.length - 1].id + 1 : 1; // Genera un nuevo ID para la nota
            const note = new Note(id, description); // Crea una nueva instancia de Note
            this.notes.push(note); // Agrega la nueva nota al arreglo de notas
        } else { // Si hay una nota seleccionada para actualizar, llama al método updateNote con la descripción modificada
            this.updateNote(description);
        }
        this.saveNotes(); // Guarda las notas en el localStorage
        this.renderNotes(); // Actualiza la vista de las notas en la interfaz de usuario
    }

    deleteNote(id) { // Método para eliminar una nota
        this.notes = this.notes.filter(note => note.id !== id); // Filtra las notas para eliminar la nota con el ID proporcionado
        this.saveNotes(); // Guarda las notas actualizadas en el localStorage
        this.renderNotes(); // Actualiza la vista de las notas en la interfaz de usuario
    }

    showNoteInfo(id, description) { // Método para mostrar la información de una nota seleccionada
        this.id = id; // Almacena el ID de la nota seleccionada para editar
        const preNote = document.getElementById("new-note"); // Obtiene el elemento input para editar la nota
        preNote.value = description; // Asigna la descripción de la nota seleccionada al input
    }

    updateNote(noteModified) { // Método para actualizar una nota
        const noteFound = this.notes.findIndex(note => note.id == this.id); // Encuentra el índice de la nota a actualizar
        this.notes[noteFound].description = noteModified; // Actualiza la descripción de la nota encontrada
        this.id = undefined; // Reinicia el ID para futuras operaciones
        this.saveNotes(); // Guarda las notas actualizadas en el localStorage
        this.renderNotes(); // Actualiza la vista de las notas en la interfaz de usuario
    }

    toggleNoteComplete(id) { // Método para cambiar el estado de importancia de una nota
        const note = this.notes.find(note => note.id === id); // Encuentra la nota con el ID proporcionado
        if (note) { // Si la nota existe
            const noteInstance = new Note(note.id, note.description, note.itsImportant); // Crea una nueva instancia de la nota encontrada
            noteInstance.toggleComplete(); // Cambia el estado de importancia de la nota
            this.notes = this.notes.map(noteTog => (noteTog.id === id ? noteInstance : noteTog)); // Actualiza el arreglo de notas con la nueva instancia modificada
            this.saveNotes(); // Guarda las notas actualizadas en el localStorage
            this.renderNotes(); // Actualiza la vista de las notas en la interfaz de usuario
        } else { // Si la nota no existe
            alert("Nota no encontrada"); // Muestra una alerta
        }
    }

    saveNotes() { // Método para guardar las notas en el localStorage
        localStorage.setItem('notes', JSON.stringify(this.notes)); // Convierte las notas a formato JSON y las guarda en el localStorage
    }

    loadNotes() { // Método para cargar las notas desde el localStorage
        this.renderNotes(); // Llama al método renderNotes para mostrar las notas en la interfaz de usuario
    }

    renderNotes() { // Método para mostrar las notas en la interfaz de usuario
        const noteList = document.getElementById('notes-list'); // Obtiene el elemento ul donde se mostrarán las notas
        noteList.innerHTML = ''; // Limpia el contenido actual de la lista de notas

        this.notes.forEach(note => { // Itera sobre cada nota en el arreglo de notas
            const item = document.createElement('li'); // Crea un elemento li para cada nota

            if (note.itsImportant) { // Si la nota es importante
                const strongText = document.createElement('strong'); // Crea un elemento strong para resaltar la descripción
                strongText.textContent = note.description; // Asigna la descripción de la nota al elemento strong
                item.appendChild(strongText); // Añade el elemento strong como hijo del li
            } else { // Si la nota no es importante
                item.textContent = note.description; // Asigna la descripción de la nota directamente al li
            }

            item.className = note.itsImportant ? 'itsImportant' : ''; // Agrega la clase 'itsImportant' si la nota es importante
            item.addEventListener('click', () => this.toggleNoteComplete(note.id)); // Añade un evento click para cambiar el estado de importancia de la nota

            const deleteButton = document.createElement('button'); // Crea un botón para eliminar la nota
            deleteButton.textContent = 'Eliminar'; // Establece el texto del botón como 'Eliminar'
            deleteButton.addEventListener('click', (e) => { // Añade un evento click al botón de eliminación
                this.deleteNote(note.id); // Llama al método deleteNote para eliminar la nota
            });

            const updateButton = document.createElement('button'); // Crea un botón para editar la nota
            updateButton.textContent = 'Editar'; // Establece el texto del botón como 'Editar'
            updateButton.addEventListener('click', (e) => { // Añade un evento click al botón de edición
                e.stopPropagation(); // Evita que el evento se propague al elemento padre (li)
                this.showNoteInfo(note.id, note.description); // Llama al método showNoteInfo para mostrar la información de la nota seleccionada para editar
            });

            item.appendChild(updateButton); // Añade el botón de edición como hijo del li
            item.appendChild(deleteButton); // Añade el botón de eliminación como hijo del li
            noteList.appendChild(item); // Añade el li a la lista de notas (ul)
        });
    }
}

document.addEventListener('DOMContentLoaded', () => { // Ejecuta el siguiente código cuando el documento HTML ha sido completamente cargado y analizado
    const noteManager = new NoteManager(); // Crea una instancia de NoteManager para gestionar las notas

    document.getElementById('add-note').addEventListener('click', () => { // Añade un evento click al botón con el id 'add-note'
        const newNote = document.getElementById('new-note').value; // Obtiene el valor del campo de entrada con el id 'new-note'
        if (newNote) { // Si el campo de entrada no está vacío
            noteManager.addNote(newNote); // Llama al método addNote para agregar una nueva nota
            document.getElementById('new-note').value = ''; // Limpia el campo de entrada después de agregar la nota
        }
    });
});

```


## Punto 3

```javascript
document.getElementById('fetch-posts').addEventListener('click', () => { // Añade un evento click al elemento con id 'fetch-posts'
    fetchPosts(); // Cuando se hace click, llama a la función fetchPosts para obtener los posts
});

const fetchPosts = () => { // Define la función fetchPosts como una función de flecha
    fetch('https://jsonplaceholder.typicode.com/posts') // Realiza una solicitud fetch para obtener los posts desde JSONPlaceholder
        .then(response => { // Maneja la respuesta de la solicitud fetch
            if (!response.ok) { // Verifica si la respuesta no fue exitosa
                throw new Error('Network response was not ok ' + response.statusText); // Lanza un error con el mensaje personalizado y el estado del texto de la respuesta
            }
            return response.json(); // Convierte la respuesta a formato JSON y devuelve una promesa
        })
        .then(posts => { // Maneja los posts obtenidos correctamente
            console.log(posts); // Muestra los posts en la consola
            displayPosts(posts); // Llama a la función displayPosts para mostrar los posts en la interfaz
        })
        .catch(error => { // Captura cualquier error que ocurra durante el proceso
            displayError(error); // Llama a la función displayError para mostrar el mensaje de error
        });
};

const displayPosts = (posts) => { // Define la función displayPosts para mostrar los posts
    const postList = document.getElementById('post-list'); // Obtiene el elemento con id 'post-list' donde se mostrarán los posts
    postList.innerHTML = ''; // Limpia cualquier contenido previo del post-list
    posts.forEach(post => { // Itera sobre cada post en la lista de posts
        const listItem = document.createElement('li'); // Crea un elemento <li> para cada post
        const textItem = document.createElement('p'); // Crea un elemento <p> para el texto del post
        listItem.textContent = `Title: ${post.title}`; // Establece el texto del <li> con el título del post
        textItem.textContent = `Post: ${post.body}`; // Establece el texto del <p> con el cuerpo del post
        postList.appendChild(listItem); // Añade el <li> al post-list
        postList.appendChild(textItem); // Añade el <p> al post-list
    });
};

const displayError = (error) => { // Define la función displayError para mostrar mensajes de error
    const errorMessage = document.getElementById('error-message'); // Obtiene el elemento con id 'error-message' donde se mostrará el mensaje de error
    errorMessage.textContent = `Error: ${error.message}`; // Establece el texto del elemento con el mensaje de error capturado
};

```


## Punto 4

```javascript
let data; // Declara una variable global para almacenar los datos de los productos

const fetchPosts = () => { // Define la función fetchPosts como una función de flecha para obtener los productos
    fetch('https://api.escuelajs.co/api/v1/products') // Realiza una solicitud fetch para obtener los productos desde la API
        .then(response => { // Maneja la respuesta de la solicitud fetch
            if (!response.ok) { // Verifica si la respuesta no fue exitosa
                throw new Error('Network response was not ok ' + response.statusText); // Lanza un error con el mensaje personalizado y el estado del texto de la respuesta
            }
            return response.json(); // Convierte la respuesta a formato JSON y devuelve una promesa
        })
        .then(posts => { // Maneja los productos obtenidos correctamente
            data = posts; // Asigna los productos obtenidos a la variable global data
            console.log(posts); // Muestra los productos en la consola
            displayPosts(posts); // Llama a la función displayPosts para mostrar los productos en la interfaz
        })
        .catch(error => { // Captura cualquier error que ocurra durante el proceso
            displayError(error); // Llama a la función displayError para mostrar el mensaje de error
        });
};

const displayPosts = (posts) => { // Define la función displayPosts para mostrar los productos en la interfaz
    const tbody = document.getElementById('tbodyt'); // Obtiene el elemento con id 'tbodyt' donde se mostrarán los productos en forma de tabla
    tbody.innerHTML = ''; // Limpia cualquier contenido previo en tbody
    posts.forEach(post => { // Itera sobre cada producto en la lista de productos
        tbody.innerHTML += ` // Añade una fila de tabla para cada producto
        <tr>
            <td scope="col">${post.id}</td> // Crea una celda de tabla con el id del producto
            <td scope="col">${post.category.name}</td> // Crea una celda de tabla con el nombre de la categoría del producto
            <td scope="col">${post.title}</td> // Crea una celda de tabla con el título del producto
            <td scope="col">$${post.price}</td> // Crea una celda de tabla con el precio del producto
            <td scope="col"><img src=${post.images[0]} width="100px" alt="${post.title}"></td> // Crea una celda de tabla con la primera imagen del producto
            <td scope="col">${post.description}</td> // Crea una celda de tabla con la descripción del producto
        </tr>
        `;
    });
};

const InfoFiltered = (word) => { // Define la función InfoFiltered para filtrar los productos por categoría
    console.log(word); // Muestra la palabra clave (categoría) en la consola
    const resultsFiltered = data.filter((post) => post.category.name === word); // Filtra los productos según la categoría seleccionada
    console.log(resultsFiltered); // Muestra los productos filtrados en la consola
    displayPosts(resultsFiltered); // Llama a la función displayPosts para mostrar los productos filtrados en la interfaz
};

const InfoFound = (wordToSearch) => { // Define la función InfoFound para buscar productos por palabra clave en el título
    if (wordToSearch) { // Verifica si hay una palabra clave para buscar
        resultsFound = data.filter((post) => post.title.includes(wordToSearch)); // Filtra los productos cuyo título incluye la palabra clave de búsqueda
        console.log(resultsFound); // Muestra los productos encontrados en la consola
        displayPosts(resultsFound); // Llama a la función displayPosts para mostrar los productos encontrados en la interfaz
    }
};

const displayError = (error) => { // Define la función displayError para mostrar mensajes de error
    const errorMessage = document.getElementById('error-message'); // Obtiene el elemento con id 'error-message' donde se mostrará el mensaje de error
    errorMessage.textContent = `Error: ${error.message}`; // Establece el texto del elemento con el mensaje de error capturado
};

const filterOption = document.getElementById('filter-option'); // Obtiene el elemento con id 'filter-option' que permite seleccionar una categoría para filtrar productos
filterOption.addEventListener('change', async () => { // Añade un evento change al elemento de filtro de categoría
    const category = filterOption.value; // Obtiene el valor seleccionado (categoría)
    InfoFiltered(category); // Llama a la función InfoFiltered para filtrar productos por la categoría seleccionada
});

document.getElementById('search-product').addEventListener('click', () => { // Añade un evento click al botón con id 'search-product'
    const wordToSearch = document.getElementById('search-by').value; // Obtiene el valor del campo de búsqueda por palabra clave
    InfoFound(wordToSearch); // Llama a la función InfoFound para buscar productos por la palabra clave ingresada
});

fetchPosts(); // Llama a la función fetchPosts para cargar y mostrar inicialmente los productos al cargar la página

```


## Punto 5

```javascript
const products = [ // Define un array de objetos que representan productos
    { id: 1, name: 'Laptop', category: 'Electronics', price: 1500, stock: 10 }, // Producto 1
    { id: 2, name: 'Smartphone', category: 'Electronics', price: 800, stock: 20 }, // Producto 2
    { id: 3, name: 'Headphones', category: 'Electronics', price: 100, stock: 30 }, // Producto 3
    { id: 4, name: 'T-shirt', category: 'Clothing', price: 20, stock: 50 }, // Producto 4
    { id: 5, name: 'Jeans', category: 'Clothing', price: 50, stock: 40 }, // Producto 5
    { id: 6, name: 'Sneakers', category: 'Clothing', price: 80, stock: 30 }, // Producto 6
    { id: 7, name: 'Backpack', category: 'Accessories', price: 40, stock: 25 }, // Producto 7
    { id: 8, name: 'Watch', category: 'Accessories', price: 60, stock: 20 }, // Producto 8
    { id: 9, name: 'Sunglasses', category: 'Accessories', price: 30, stock: 35 } // Producto 9
];

const tbody = document.getElementById('tbody'); // Obtiene el elemento con id 'tbody' donde se mostrarán los resultados

document.getElementById('load-products').addEventListener('click', () => { // Añade un evento click al botón con id 'load-products'
    displayPosts(products); // Llama a la función displayPosts para mostrar todos los productos
});

document.getElementById('sum-products').addEventListener('click', () => { // Añade un evento click al botón con id 'sum-products'
    totalPrice(products); // Llama a la función totalPrice para calcular y mostrar el precio total de todos los productos
});

document.getElementById('verify-av').addEventListener('click', () => { // Añade un evento click al botón con id 'verify-av'
    verifyAvailable(products); // Llama a la función verifyAvailable para verificar si todos los productos están disponibles
});

document.getElementById('load-list').addEventListener('click', () => { // Añade un evento click al botón con id 'load-list'
    createList(products); // Llama a la función createList para crear y mostrar una lista de nombres de productos
});

const filterOption = document.getElementById('filter-option'); // Obtiene el elemento con id 'filter-option' que permite seleccionar una categoría para filtrar productos
filterOption.addEventListener('change', async () => { // Añade un evento change al elemento de filtro de categoría
    const category = filterOption.value; // Obtiene el valor seleccionado (categoría)
    InfoFiltered(category); // Llama a la función InfoFiltered para filtrar productos por la categoría seleccionada
});

document.getElementById('search-product').addEventListener('click', () => { // Añade un evento click al botón con id 'search-product'
    const wordToSearch = document.getElementById('search-by').value; // Obtiene el valor del campo de búsqueda por palabra clave
    InfoFound(wordToSearch); // Llama a la función InfoFound para buscar productos por la palabra clave ingresada
});

const displayPosts = (products) => { // Define la función displayPosts para mostrar los productos en la tabla
    tbody.innerHTML = ''; // Limpia cualquier contenido previo en tbody
    products.forEach(product => { // Itera sobre cada producto en la lista de productos
        tbody.innerHTML += ` // Añade una fila de tabla para cada producto
        <tr>
            <td scope="col">${product.id}</td> // Crea una celda de tabla con el id del producto
            <td scope="col">${product.category}</td> // Crea una celda de tabla con la categoría del producto
            <td scope="col">${product.name}</td> // Crea una celda de tabla con el nombre del producto
            <td scope="col">$${product.price}</td> // Crea una celda de tabla con el precio del producto
            <td scope="col">${product.stock}</td> // Crea una celda de tabla con el stock del producto
        </tr>
        `;
    });
};

const totalPrice = (products) => { // Define la función totalPrice para calcular y mostrar el precio total de todos los productos
    tbody.innerHTML = ''; // Limpia cualquier contenido previo en tbody
    const total = products.reduce((accumulator, product) => accumulator + product.price, 0); // Calcula el precio total sumando el precio de cada producto
    console.log('Precio total de todos los productos:', total); // Muestra el precio total en la consola
    const totalView = document.createElement('p'); // Crea un elemento de párrafo para mostrar el precio total en la interfaz
    totalView.textContent = `Precio total de todos los productos: $${total}`; // Establece el texto del elemento con el precio total
    tbody.appendChild(totalView); // Agrega el elemento de párrafo al tbody
};

const InfoFiltered = (word) => { // Define la función InfoFiltered para filtrar los productos por categoría
    console.log(word); // Muestra la palabra clave (categoría) en la consola
    const resultsFiltered = products.filter((product) => product.category === word); // Filtra los productos según la categoría seleccionada
    console.log(resultsFiltered); // Muestra los productos filtrados en la consola
    displayPosts(resultsFiltered); // Llama a la función displayPosts para mostrar los productos filtrados en la interfaz
};

const InfoFound = (wordToSearch) => { // Define la función InfoFound para buscar productos por palabra clave en el nombre
    if (wordToSearch) { // Verifica si hay una palabra clave para buscar
        resultsFound = products.filter((product) => product.name.includes(wordToSearch)); // Filtra los productos cuyo nombre incluye la palabra clave de búsqueda
        console.log(resultsFound); // Muestra los productos encontrados en la consola
        displayPosts(resultsFound); // Llama a la función displayPosts para mostrar los productos encontrados en la interfaz
    }
};

const verifyAvailable = (products) => { // Define la función verifyAvailable para verificar si todos los productos están disponibles
    const allAvailable = products.every(product => product.stock > 0); // Verifica si todos los productos tienen stock mayor que cero
    if (allAvailable) { // Si todos los productos están disponibles
        const Available = document.createElement('p'); // Crea un elemento de párrafo para indicar que todos los productos están disponibles
        Available.textContent = 'Todos los productos están disponibles.'; // Establece el texto del elemento
        tbody.appendChild(Available); // Agrega el elemento de párrafo al tbody
        console.log('Todos los productos están disponibles.'); // Muestra un mensaje en la consola
    } else { // Si no todos los productos están disponibles
        const Available = document.createElement('p'); // Crea un elemento de párrafo para indicar que no todos los productos están disponibles
        Available.textContent = 'No todos los productos están disponibles.'; // Establece el texto del elemento
        tbody.appendChild(Available); // Agrega el elemento de párrafo al tbody
        console.log('No todos los productos están disponibles.'); // Muestra un mensaje en la consola
    }
};

const createList = (products) => { // Define la función createList para crear y mostrar una lista de nombres de productos
    const productNames = products.map(product => product.name); // Crea un array con los nombres de todos los productos
    const list = document.createElement('p'); // Crea un elemento de párrafo para mostrar la lista de nombres de productos
    list.textContent = `Lista de nombres de productos: ${productNames.join(', ')}`; // Establece el texto del elemento con la lista de nombres de productos
    tbody.appendChild(list); // Agrega el elemento de párrafo al tbody
    console.log('Lista de nombres de productos:', productNames); // Muestra la lista de nombres de productos en la consola
};



```