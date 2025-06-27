document.addEventListener("DOMContentLoaded", function () {
  const reportFeed = document.getElementById("report-feed");

  fetch("reports.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((reports) => {
      if (!Array.isArray(reports) || reports.length === 0) {
        reportFeed.innerHTML = "<p>No reports found.</p>";
        return;
      }

      reports.forEach((report) => {
        const card = document.createElement("article");
        card.classList.add("report-card");

        const title = document.createElement("h2");
        title.textContent = report.title;

        const date = document.createElement("p");
        date.classList.add("report-date");
        date.textContent = report.date;

        const snippet = document.createElement("p");
        snippet.classList.add("report-snippet");
        snippet.textContent = report.snippet;

        const link = document.createElement("a");
        link.href = report.link;
        link.classList.add("report-link");
        link.textContent = "Read Full Report →";
        link.setAttribute("target", "_blank");

        card.appendChild(title);
        card.appendChild(date);
        card.appendChild(snippet);
        card.appendChild(link);

        reportFeed.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error loading reports:", error);
      reportFeed.innerHTML = "<p>Error loading reports. Please try again later.</p>";
    });
});
