async function loadAdminDashboard() {

    try {

        const response = await fetch("/api/admin/users");

        const data = await response.json();

        if (!response.ok || !data.success) {
            alert(data.message || "Admin access denied.");
            window.location.href = "login.html";
            return;
        }

        const users = data.users;

        // Total users
        document.getElementById("totalUsers").textContent = users.length;

        // Reports abhi backend me nahi hain
        document.getElementById("totalReports").textContent = "0";

        const tableBody = document.getElementById("usersTableBody");

        tableBody.innerHTML = "";

        if (users.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="6">
                        No registered users found.
                    </td>
                </tr>
            `;

            return;
        }

        users.forEach(function (user) {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${user.full_name}</td>
                <td>${user.email}</td>
                <td>${user.mobile}</td>
                <td>${user.role}</td>
                <td>${user.created_at}</td>
                <td>${user.last_login || "Never"}</td>
            `;

            tableBody.appendChild(row);
        });

    } catch (error) {

        console.error(error);

        alert("Server connection failed.");

        window.location.href = "login.html";
    }
}


/* LOGOUT */

document.getElementById("logoutButton").addEventListener("click", async function () {

    try {

        const response = await fetch("/api/logout", {
            method: "POST"
        });

        const data = await response.json();

        if (data.success) {
            window.location.href = "login.html";
        }

    } catch (error) {

        console.error(error);

        alert("Logout failed.");
    }

});


/* LOAD DASHBOARD */

loadAdminDashboard();