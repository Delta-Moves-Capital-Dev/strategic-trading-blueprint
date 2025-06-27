// script.js
// Dynamically load market reports from reports.json and inject into the report-feed section

document.addEventListener("DOMContentLoaded", function () {
  fetch("reports.json")
    .then((response) => response.json())
    .then((reports) => {
      const reportFeed = document.getElementById("report-feed");
      reports.forEach((report) => {
        const article = document.createElement("article");
        article.className = "report-preview";

        const title = document.createElement("h2");
        const link = document.createElement("a");
        link.href = report.url;
        link.textContent = report.title;
        link.setAttribute("aria-label", `Read full report: ${report.title}`);
        title.appendChild(link);

        const date = document.createElement("p");
        date.className = "report-date";
        date.textContent = report.date;

        const summary = document.createElement("p");
        summary.className = "report-summary";
        summary.textContent = report.snippet || "No summary available.";

        article.appendChild(title);
        article.appendChild(date);
        article.appendChild(summary);

        reportFeed.appendChild(article);
      });
    })
    .catch((error) => {
      console.error("Error loading reports:", error);
      const fallback = document.createElement("p");
      fallback.textContent = "Unable to load reports at this time.";
      document.getElementById("report-feed").appendChild(fallback);
    });
});
