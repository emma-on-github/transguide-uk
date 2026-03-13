// Simple "Is this still current?" checker for TransGuide UK

(function () {
  const lastUpdated = new Date("2026-03-13"); // Change this per page
  const today = new Date();

  const diffDays = Math.floor((today - lastUpdated) / (1000 * 60 * 60 * 24));

  let message = "";

  if (diffDays < 90) {
    message = "This page is likely still current.";
  } else if (diffDays < 180) {
    message = "This page may need review soon.";
  } else {
    message = "This page is over 6 months old and may be outdated.";
  }

  const container = document.getElementById("checker");

  if (container) {
    container.innerHTML = `
      <p><strong>Last updated:</strong> ${lastUpdated.toDateString()}</p>
      <p>${message}</p>
    `;
  }
})();
