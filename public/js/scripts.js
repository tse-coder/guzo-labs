document.getElementById("themeToggle").addEventListener("change", () => {
    const theme = document.getElementById("themeToggle").value;
    const body = document.getElementById("themeBody");
    if (theme === "dark") {
        body.classList.add("dark");
    } else {
        body.classList.remove("dark");
    }
    if (window.pointsBarChart) {
        pointsBarChart.options.scales.y.ticks.color = theme === "dark" ? "#fff" : "#000";
        pointsBarChart.options.scales.x.ticks.color = theme === "dark" ? "#fff" : "#000";
        pointsBarChart.options.plugins.legend.labels.color = theme === "dark" ? "#fff" : "#000";
        pointsBarChart.update();
    }
    if (window.pointsLineChart) {
        pointsLineChart.options.scales.y.ticks.color = theme === "dark" ? "#fff" : "#000";
        pointsLineChart.options.scales.x.ticks.color = theme === "dark" ? "#fff" : "#000";
        pointsLineChart.options.plugins.legend.labels.color = theme === "dark" ? "#fff" : "#000";
        pointsLineChart.update();
    }
});

if (document.getElementById("pointsBarChart")) {
    fetch('/api/users')
        .then(response => response.json())
        .then(users => {
            const totalUsers = users.length;
            const totalPoints = users.reduce((sum, user) => sum + user.points, 0);
            const avgPoints = totalUsers ? (totalPoints / totalUsers).toFixed(1) : 0;

            document.getElementById("totalUsers").textContent = totalUsers;
            document.getElementById("totalPoints").textContent = totalPoints;
            document.getElementById("avgPoints").textContent = avgPoints;

            const barCtx = document.getElementById("pointsBarChart").getContext("2d");
            window.pointsBarChart = new Chart(barCtx, {
                type: "bar",
                data: {
                    labels: users.map(user => user.name),
                    datasets: [{
                        label: "Loyalty Points",
                        data: users.map(user => user.points),
                        backgroundColor: "rgba(59, 130, 246, 0.5)",
                        borderColor: "rgba(59, 130, 246, 1)",
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: { beginAtZero: true, ticks: { color: document.body.classList.contains("dark") ? "#fff" : "#000" } },
                        x: { ticks: { color: document.body.classList.contains("dark") ? "#fff" : "#000" } }
                    },
                    plugins: {
                        legend: { labels: { color: document.body.classList.contains("dark") ? "#fff" : "#000" } }
                    }
                }
            });

            const lineCtx = document.getElementById("pointsLineChart").getContext("2d");
            window.pointsLineChart = new Chart(lineCtx, {
                type: "line",
                data: {
                    labels: ["2025-04-01", "2025-04-02", "2025-04-03", "2025-04-04", "2025-04-05"],
                    datasets: [{
                        label: "Total Points Over Time",
                        data: [500, 700, 600, 900, 800],
                        borderColor: "rgba(236, 72, 153, 1)",
                        backgroundColor: "rgba(236, 72, 153, 0.2)",
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    scales: {
                        y: { beginAtZero: true, ticks: { color: document.body.classList.contains("dark") ? "#fff" : "#000" } },
                        x: { ticks: { color: document.body.classList.contains("dark") ? "#fff" : "#000" } }
                    },
                    plugins: {
                        legend: { labels: { color: document.body.classList.contains("dark") ? "#fff" : "#000" } }
                    }
                }
            });
        });
}