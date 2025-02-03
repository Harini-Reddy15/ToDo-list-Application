# ToDo-list-Application

## Overview
The **To-Do List Application** is a task management tool built using **HTML, Bootstrap, and JavaScript**. This application allows users to efficiently manage their tasks by adding, editing, marking them as completed, and deleting them. The app also features search functionality, deadline tracking, and a dark/light mode toggle.

## Features

### 1. Add Tasks to the List
- Users can enter **Task Title, Task Description, and Deadline**.
- Once the "**Add to Tasks**" button is clicked, the task is added to the list in a structured table format.
- If any of the three fields (title, description, or deadline) is left empty, the user is notified to fill in all fields.

### 2. Mark Tasks as Completed ✅
- Each task has a checkbox.
- When the checkbox is checked, the **task title, description, and deadline** get a **strikethrough** effect.
- Once marked as completed:
  - The **Edit** and **Delete** options for that task are disabled to prevent further modifications.
  - The task is visually distinguished from incomplete tasks.

### 3. Delete Tasks ❌
- Every task has a **Delete** button.
- Clicking the **Delete** button removes only that specific task from the list.
- A **Clear Tasks** button is available to delete all tasks at once.
- Before clearing all tasks, the user is asked for **confirmation via an alert message**.

### 4. Edit Tasks ✏️
- Every task has an **Edit** button.
- Clicking **Edit** allows users to modify the **Task Title, Description, and Deadline**.
- Once modifications are made, clicking **Save Changes** updates the task details in the list.

### 5. Deadline Tracker ⏳
- The entered **deadline** is displayed in the tasks list.
- When hovering over the **deadline**, the app dynamically shows how many **days are left** to complete the task.

### 6. Task Search 🔍
- A **search bar** in the navigation allows users to find tasks quickly.
- As the user types, the **matching letters in the task title are highlighted** to make searching easier.

### 7. Dark Mode & Light Mode 🌙☀️
- Users can switch between **dark mode and light mode** as per their preference.
- This enhances the UI experience and provides better readability in different lighting conditions.

## Technologies Used
- **HTML** for structuring the app.
- **Bootstrap** for styling and responsiveness.
- **JavaScript** for dynamic interactions and functionality.

## How to Use
1. Clone or download the repository.
2. Open `index.html` in any modern browser.
3. Start adding, editing, completing, or deleting tasks as needed.

## Contributing
Feel free to fork this repository and contribute by adding new features or improving existing ones. Pull requests are welcome!

## License
This project is open-source and available under the **MIT License**.

---
🚀 **Stay organized with this To-Do List Application!** Happy task managing! 🎯

