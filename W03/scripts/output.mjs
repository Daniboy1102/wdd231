export function setTitle(course) {
  document.querySelector("#courseTitle").textContent =
    `${course.code}: ${course.name}`;
}

export function renderSections(sections) {
  const container = document.querySelector("#sections");
  container.innerHTML = "";
  sections.forEach((section) => {
    const card = document.createElement("div");
    card.classList.add("section-card");

    const isFull = section.enrolled >= section.maxEnrollment;
    const statusClass = isFull ? "full" : "enrolled";
    const statusText = isFull ? "Full" : "Open";

    card.innerHTML = `
      <span>Section ${section.sectionNum}</span>
      <span>Enrolled: ${section.enrolled} / ${section.maxEnrollment}</span>
      <span class="${statusClass}">${statusText}</span>
    `;
    container.appendChild(card);
  });
}
