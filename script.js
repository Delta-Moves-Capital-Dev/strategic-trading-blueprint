# script.js
document.addEventListener("DOMContentLoaded", () => {
  fetch("reports.json")
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then(data => {
      const reportFeed = document.getElementById("report-feed");

      if (!Array.isArray(data) || data.length === 0) {
        reportFeed.innerHTML = "<p>No market reports available at this time.</p>";
        return;
      }

      data.forEach(report => {
        const article = document.createElement("article");
        article.classList.add("report");

        const title = document.createElement("h2");
        title.textContent = report.title || "Untitled Report";

        const date = document.createElement("p");
        date.classList.add("report-date");
        date.textContent = report.date || "Unknown date";

        const snippet = document.createElement("p");
        snippet.classList.add("report-snippet");
        snippet.textContent = report.snippet || "";

        const tags = document.createElement("p");
        tags.classList.add("report-tags");
        if (Array.isArray(report.tags)) {
          tags.textContent = "Tags: " + report.tags.join(", ");
        }

        const link = document.createElement("a");
        link.href = report.link || "#";
        link.textContent = "Read Report";
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        article.appendChild(title);
        article.appendChild(date);
        if (snippet.textContent) article.appendChild(snippet);
        if (tags.textContent) article.appendChild(tags);
        article.appendChild(link);

        reportFeed.appendChild(article);
      });
    })
    .catch(error => {
      console.error("Error loading reports:", error);
      const reportFeed = document.getElementById("report-feed");
      reportFeed.innerHTML = "<p>Unable to load reports at this time.</p>";
    });
});
