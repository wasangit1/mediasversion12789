 
// Function to get users from localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Function to update the user list in the dashboard
function updateUserList() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    const users = getUsers();
    users.forEach(user => {
        const li = document.createElement('li');
        li.className = 'user-item';
        
        // Determine user status
        const isActive = !user.suspensionDate || new Date(user.suspensionDate) > new Date();
        const statusClass = isActive ? 'active' : 'suspended';
        
        li.innerHTML = `
            <div>
                <strong>${user.username}</strong> - ${user.password} 
                ${user.suspensionDate ? `- Suspension Date: ${user.suspensionDate}` : ''}
            </div>
            <div>
                <span class="status ${statusClass}"></span>
                <button class="delete-btn" onclick="deleteUser('${user.username}')">Delete</button>
            </div>
        `;
        userList.appendChild(li);
    });
}

// Function to add a new user
function addUser() {
    const username = document.getElementById('newUsername').value.trim();
    const password = document.getElementById('newPassword').value.trim();
    const suspensionDate = document.getElementById('suspensionDate').value;

    if (username && password) {
        let users = getUsers();

        // Check if the username already exists
        if (users.some(user => user.username === username)) {
            alert('Username already exists.');
            return;
        }

        // Add the new user
        users.push({ username, password, suspensionDate });
        localStorage.setItem('users', JSON.stringify(users));
        updateUserList();
        document.getElementById('addUserForm').reset();
    } else {
        alert('Please fill out all fields.');
    }
}

// Function to delete a user
function deleteUser(username) {
    let users = getUsers();
    users = users.filter(user => user.username !== username);
    localStorage.setItem('users', JSON.stringify(users));
    updateUserList();
}

// Function to search users
function searchUser() {
    const query = document.getElementById('searchUser').value.toLowerCase();
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    const users = getUsers().filter(user => user.username.toLowerCase().includes(query));
    users.forEach(user => {
        const li = document.createElement('li');
        li.className = 'user-item';

        // Determine user status
        const isActive = !user.suspensionDate || new Date(user.suspensionDate) > new Date();
        const statusClass = isActive ? 'active' : 'suspended';

        li.innerHTML = `
            <div>
                <strong>${user.username}</strong> - ${user.password} 
                ${user.suspensionDate ? `- Suspension Date: ${user.suspensionDate}` : ''}
            </div>
            <div>
                <span class="status ${statusClass}"></span>
                <button class="delete-btn" onclick="deleteUser('${user.username}')">Delete</button>
            </div>
        `;
        userList.appendChild(li);
    });
}

// Initial user list update
updateUserList();

// Attach search function to input event
document.getElementById('searchUser').addEventListener('keyup', searchUser);
