document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");

  fetch("nav.html")
    .then(response => response.text())
    .then(data => {
      navbar.innerHTML = data;

      // normalize current page; root requests have no filename, so default to index.html
      const currentPage = window.location.pathname.split("/").pop() || "index.html";
      const links = navbar.querySelectorAll("a");

      links.forEach(link => {
        const href = link.getAttribute("href");
        if (!href) return;

        // strip a leading "./" so internal links compare correctly against the current filename
        const linkPage = href.replace(/^\.\//, "");

        if (linkPage === currentPage) {
          link.classList.add("active");
          link.setAttribute("aria-current", "page");
        }
      });
    });

  const currentFile = window.location.pathname.split("/").pop();

  // Load resume.pdf when current file is resume.html
  if (currentFile === "resume.html") {
    window.location.replace("resume.pdf");
  }

  // load projects.json when current file is projects.html
  if (currentFile === "projects.html") {
    const main = document.querySelector("main");

    fetch("projects.json")
      .then(response => response.json())
      .then(projects => {
        projects.forEach(project => {
          const card = document.createElement("article");
          card.className = "project-card";

          const title = document.createElement("h2");
          title.textContent = project.title;

          const desc = document.createElement("p");
          desc.textContent = project.desc;

          card.append(title, desc);

          const hasLanguages = project.languages.length && project.languages[0] !== "None";
          if (hasLanguages) {
            const languagesLabel = document.createElement("h3");
            languagesLabel.textContent = "Sprachen";

            const languagesList = document.createElement("ul");
            languagesList.className = "tag-list";
            project.languages.forEach(lang => {
              const li = document.createElement("li");
              li.className = "tag";
              li.textContent = lang;
              languagesList.append(li);
            });

            card.append(languagesLabel, languagesList);
          }

          const hasPrograms = project.usedPrograms.length && project.usedPrograms[0] !== "None";
          if (hasPrograms) {
            const programsLabel = document.createElement("h3");
            programsLabel.textContent = "Verwendete Programme";

            const programsList = document.createElement("ul");
            programsList.className = "tag-list";
            project.usedPrograms.forEach(prog => {
              const li = document.createElement("li");
              li.className = "tag";
              li.textContent = prog;
              programsList.append(li);
            });

            card.append(programsLabel, programsList);
          }

          main.append(card);
        });
      });
  }
});
