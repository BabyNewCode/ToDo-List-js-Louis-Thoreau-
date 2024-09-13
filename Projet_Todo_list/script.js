// Ajouter une nouvelle tâche
document.getElementById('task-form')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const color = document.getElementById('color').value;

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const newTask = {
        id: Date.now(),
        title,
        description,
        color
    };

    // Ajoute la nouvelle tâche
    tasks.push(newTask);
    // Enregistre les tâches en local
    localStorage.setItem('tasks', JSON.stringify(tasks));

    window.location.href = 'mes-taches.html';
});

// Afficher les tâches
function displayTasks() {
    const taskList = document.getElementById('task-list');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    taskList.innerHTML = ''; // Clear previous content

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        taskElement.style.backgroundColor = task.color;
        taskElement.innerHTML = `
            <span>${task.title}</span>
            <button id="b2" onclick="viewTask(${task.id})">Détail</button>
        `;
        taskList.appendChild(taskElement);
    });
}

// Afficher la fenêtre de confirmation personnalisée
function showConfirmation() {
    const dialog = document.getElementById('confirmation-dialog');
    dialog.classList.remove('hidden');
}

// Fermer la fenêtre de confirmation
function closeConfirmation() {
    const dialog = document.getElementById('confirmation-dialog');
    dialog.classList.add('hidden');
}

// Fonction pour confirmer et supprimer toutes les tâches
function confirmClearAll() {
    localStorage.removeItem('tasks');  // Supprime toutes les tâches du localStorage
    displayTasks();  // Met à jour l'affichage pour vider la liste des tâches
    closeConfirmation();  // Ferme la fenêtre de confirmation après la suppression
}

// Voir une tâche
function viewTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(t => t.id === taskId);

    if (task) {
        const details = `
            <h2>Détails de la tâche</h2>
            <form>
                <p><strong>Titre:</strong> ${task.title}</p>
                <p><strong>Description:</strong> ${task.description}</p>
                <p><strong>Couleur:</strong> ${task.color}</p>
                <button id="b0" onclick="editTask(${task.id})">Modifier</button>
                <button id="b0" onclick="deleteTask(${task.id})">Terminer</button>
            </form>
            <button id="b1" onclick="window.location.href='mes-taches.html'">Retour</button>
        `;

        const taskDetails = document.createElement('div');
        taskDetails.innerHTML = details;
        document.body.innerHTML = '';
        document.body.appendChild(taskDetails);
    }
}

// Modifier une tâche
function editTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(t => t.id === taskId);

    if (task) {
        document.body.innerHTML = `
            <h1>Modifier la tâche</h1>
            <form id="edit-task-form">
                <label for="edit-title">Titre :</label>
                <input type="text" id="edit-title" value="${task.title}" required>

                <label for="edit-description">Description :</label>
                <textarea id="edit-description" required>${task.description}</textarea>

                <label for="edit-color">Couleur :</label>
                <select id="edit-color">
                    <option value="deepskyblue" ${task.color === 'deepskyblue' ? 'selected' : ''}>Bleu</option>
                    <option value="red" ${task.color === 'red' ? 'selected' : ''}>Rouge</option>
                    <option value="yellow" ${task.color === 'yellow' ? 'selected' : ''}>Jaune</option>
                    <option value="lime" ${task.color === 'lime' ? 'selected' : ''}>Vert</option>
                    <option value="violet" ${task.color === 'violet' ? 'selected' : ''}>Violet</option>
                    <option value="orange" ${task.color === 'orange' ? 'selected' : ''}>Orange</option>
                    <option value="fuchsia" ${task.color === 'fushia' ? 'selected' : ''}>Rose</option>
                    <option value="white" ${task.color === 'white' ? 'selected' : ''}>Blanc</option>
                    <option value="darkturquoise" ${task.color === 'darkturquoise' ? 'selected' : ''}>Spécial</option>
            
                </select>

                <button id="b0" type="submit">Sauvegarder les modifications</button>
                </form>
            <button id="b1" onclick="window.location.href='mes-taches.html'">Annuler</button>
        `;

        document.getElementById('edit-task-form').addEventListener('submit', function (event) {
            event.preventDefault();

            task.title = document.getElementById('edit-title').value;
            task.description = document.getElementById('edit-description').value;
            task.color = document.getElementById('edit-color').value;

            localStorage.setItem('tasks', JSON.stringify(tasks));
            window.location.href = 'mes-taches.html';
        });
    }
}

// Supprimer une tâche
function deleteTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    window.location.href = 'mes-taches.html';
}

// Fonction pour trier les tâches par couleur
function sortTasksByColor() {
    const selectedColor = document.getElementById('color-filter').value;
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    let filteredTasks = tasks;
    if (selectedColor !== 'all') {
        filteredTasks = tasks.filter(task => task.color === selectedColor);
    }

    displayFilteredTasks(filteredTasks);
}

// Filtréespar couleur
function displayFilteredTasks(filteredTasks) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    filteredTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        taskElement.style.backgroundColor = task.color;
        taskElement.innerHTML = `
            <span>${task.title}</span>
        `;
        taskList.appendChild(taskElement);
    });
}

// Initialisation des tâches
if (document.getElementById('task-list')) {
    displayTasks();
}
