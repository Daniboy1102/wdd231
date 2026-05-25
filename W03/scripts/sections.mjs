export function setSectionSelection(sections) {
  const select = document.querySelector("#sectionNumber");
  select.innerHTML = "";
  sections.forEach((section) => {
    const option = document.createElement("option");
    option.value = section.sectionNum;
    option.textContent = `Section ${section.sectionNum}`;
    select.appendChild(option);
  });
}
