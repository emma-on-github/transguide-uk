// Simple RSS update tracker for TransGuide UK

async function fetchUpdates() {
  const feeds = [
    {
      name: "NHS England",
      url: "https://www.england.nhs.uk/feed/"
    },
    {
      name: "Government Consultations",
      url: "https://www.gov.uk/government/consultations.atom"
    },
    {
      name: "UK Parliament Bills",
      url: "https://bills.parliament.uk/rss/allbills"
    }
  ];

  const container = document.getElementById("auto-updates");

  if (!container) return;

  for (const feed of feeds) {
    try {
      const response = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(feed.url)}`
      );
      const data = await response.json();

      const parser = new DOMParser();
      const xml = parser.parseFromString(data.contents, "text/xml");

      const item = xml.querySelector("item, entry");
      if (!item) continue;

      const title =
        item.querySelector("title")?.textContent || "No title available";

      const link =
        item.querySelector("link")?.textContent ||
        item.querySelector("link")?.getAttribute("href") ||
        "#";

      const block = document.createElement("div");
      block.innerHTML = `
        <p><strong>${feed.name}:</strong><br>
        ${title}<br>
        <a href="${link}" target="_blank" rel="noopener">Read more</a></p>
      `;

      container.appendChild(block);
    } catch (error) {
      console.error("Error fetching feed:", feed.url);
    }
  }
}

fetchUpdates();
