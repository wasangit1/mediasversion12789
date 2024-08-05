 
// Function to get users from localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Function to get a user by username from localStorage
function getUserByUsername(username) {
    const users = getUsers();
    return users.find(user => user.username === username);
}

// Function to check if the user's account is suspended
function isSuspended(suspensionDate) {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    return today > suspensionDate;
}

// Function to handle user login
function startlog() {
    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();

    const user = getUserByUsername(username);

    if (user) {
        if (user.password === password) {
            if (isSuspended(user.suspensionDate)) {
                document.querySelector("#akses").innerHTML = "Your account is suspended. Please contact support.";
                clearLoginStatus(); // Clear login status
            } else {
                document.querySelector(".wendyloginwrap").classList.add("hidden");
                localStorage.setItem("login", "true");
                window.location.href = "form.html"; // Redirect to home.html on successful login
            }
        } else {
            document.querySelector("#akses").innerHTML = "Incorrect password. Please try again.";
        }
    } else {
        document.querySelector("#akses").innerHTML = "Incorrect username. Please try again.";
    }
}

// Function to clear login status
function clearLoginStatus() {
    localStorage.removeItem("login");
    console.log("Login status cleared.");
}

// Function to display the list of users directly in the code
function displayUserList() {
    const users = getUsers();
    document.querySelector('#userList').innerHTML = users.map(user => 
        `<li>Username: ${user.username}, Suspended until: ${user.suspensionDate}</li>`
    ).join('');
}

// Clean up suspended users on a regular interval (for static data)
setInterval(removeSuspendedUsers, 10000); // Check every 10 seconds

// Display the user list when the page loads
document.addEventListener('DOMContentLoaded', () => {
    displayUserList(); // Display user list on page load
});
 