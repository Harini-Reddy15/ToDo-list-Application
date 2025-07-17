const apiUrl = "http://127.0.0.1:5000/tasks";

// Fetch all tasks on load
document.addEventListener("DOMContentLoaded", fetchTasks);

function fetchTasks() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            updateTable(data);
        });
}

function updateTable(tasks) {
    const tableBody = document.getElementById("tableBody");
    let str = "";
    tasks.forEach((task, index) => {
        const checked = task.completed ? "checked" : "";
        const textStyle = task.completed ? "text-decoration: line-through;" : "";
        str += `
            <tr>
                <td><input type="checkbox" onclick="toggleTask(${task.id}, ${task.completed})" ${checked}></td>
                <th>${index + 1}</th>
                <td style="${textStyle}">${task.title}</td>
                <td style="${textStyle}">${task.description}</td>
                <td style="${textStyle}">${task.deadline}</td>
                <td>
                    <button class="btn btn-primary" onclick="deleteTask(${task.id})">Delete</button>
                    <button class="btn btn-secondary" onclick="editTask(${task.id}, '${task.title}', '${task.description}', '${task.deadline}')">Edit</button>
                </td>
            </tr>
        `;
    });
    tableBody.innerHTML = str;
}

function addTask() {
    const title = document.getElementById("task").value.trim();
    const description = document.getElementById("description").value.trim();
    const deadline = document.getElementById("deadline").value;
    if (!title || !description || !deadline) {
        alert("Please fill all fields!");
        return;
    }

    fetch(apiUrl, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({title, description, deadline})
    }).then(() => fetchTasks());

    document.getElementById("task").value = "";
    document.getElementById("description").value = "";
    document.getElementById("deadline").value = "";
}

function deleteTask(id) {
    fetch(`${apiUrl}/${id}`, { method: "DELETE" })
        .then(() => fetchTasks());
}

function toggleTask(id, completed) {
    // First, get the task details before updating
    fetch(`${apiUrl}`)
        .then(res => res.json())
        .then(tasks => {
            const task = tasks.find(t => t.id === id);
            if (task) {
                fetch(`${apiUrl}/${id}`, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        title: task.title,
                        description: task.description,
                        deadline: task.deadline,
                        completed: !completed
                    })
                }).then(() => fetchTasks());
            }
        });
}

function editTask(id, title, description, deadline) {
    document.getElementById("task").value = title;
    document.getElementById("description").value = description;
    document.getElementById("deadline").value = deadline;

    const addBtn = document.querySelector("button[onclick='addTask()']");
    addBtn.textContent = "Update Task";

    addBtn.onclick = function () {
        const newTitle = document.getElementById("task").value.trim();
        const newDescription = document.getElementById("description").value.trim();
        const newDeadline = document.getElementById("deadline").value;

        fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                title: newTitle,
                description: newDescription,
                deadline: newDeadline,
                completed: false
            })
        }).then(() => {
            addBtn.textContent = "Add Task";
            addBtn.setAttribute("onclick", "addTask()");
            document.getElementById("task").value = "";
            document.getElementById("description").value = "";
            document.getElementById("deadline").value = "";
            fetchTasks();
        });
    };
}
