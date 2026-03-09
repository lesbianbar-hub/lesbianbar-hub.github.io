// script.js
document.addEventListener("DOMContentLoaded", async () => {
  const postContainer = document.getElementById("post-container");

  try {
    // Lade die Liste der Markdown-Dateien aus dem GitHub-Repository
    const response = await fetch(
      "https://api.github.com/repos/lesbianbar-hub.github.io/contents/posts"
    );

    if (!response.ok) {
      throw new Error("Beiträge konnten nicht geladen werden.");
    }

    const files = await response.json();

    // Filtere nur Markdown-Dateien
    const markdownFiles = files.filter(file => file.name.endsWith(".md"));

    // Sortiere nach Name (alphabetisch oder nach Datum, wenn du das später einbaust)
    markdownFiles.sort((a, b) => b.name.localeCompare(a.name));

    // Erstelle HTML für jede Datei
    markdownFiles.forEach(file => {
      const postDate = file.name.split("_")[0]; // Annahme: Dateiname: 2025-04-05_ein-Beitrag.md
      const title = file.name.replace(/^[0-9]{4}-[0-9]{2}-[0-9]{2}_/, "").replace(/\.md$/, "");

      const postCard = document.createElement("div");
      postCard.className = "post-card";

      postCard.innerHTML = `
        <h3>${title}</h3>
        <p class="date">Beitrag vom ${postDate}</p>
        <p><a href="posts/${file.name}" target="_blank">Beitrag ansehen</a></p>
      `;

      postContainer.appendChild(postCard);
    });

  } catch (error) {
    console.error("Fehler beim Laden der Beiträge:", error);
    postContainer.innerHTML = `
      <p style="color: red; text-align: center;">
        ❌ Beiträge konnten nicht geladen werden. Stelle sicher, dass das Repository öffentlich ist und die Dateien im Ordner <code>posts/</code> liegen.
      </p>
    `;
  }
});
