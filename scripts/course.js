// course.js — course cards and filtering

const courses = [
  { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, certificate: 'Web and Computer Programming', description: 'Introduction to programming fundamentals.', technologies: ['Python'], completed: true },
  { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, certificate: 'Web and Computer Programming', description: 'HTML, CSS, and foundational web design.', technologies: ['HTML', 'CSS'], completed: true },
  { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, certificate: 'Web and Computer Programming', description: 'Functions, testing, and modular programming.', technologies: ['Python'], completed: true },
  { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, certificate: 'Web and Computer Programming', description: 'Object-oriented programming principles.', technologies: ['C#'], completed: true },
  { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, certificate: 'Web and Computer Programming', description: 'JavaScript and dynamic web development.', technologies: ['HTML', 'CSS', 'JavaScript'], completed: true },
  { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, certificate: 'Web and Computer Programming', description: 'Advanced frontend frameworks and tooling.', technologies: ['HTML', 'CSS', 'JavaScript'], completed: true },
];

const cardContainer = document.getElementById('course-cards');
const creditDisplay = document.getElementById('credit-count');
const filterButtons = document.querySelectorAll('.filter-btn');

function renderCourses(filter) {
  const filtered = filter === 'all'
    ? courses
    : courses.filter(c => c.subject === filter);

  cardContainer.innerHTML = '';

  filtered.forEach(course => {
    const card = document.createElement('div');
    card.classList.add('course-card');
    if (course.completed) card.classList.add('completed');

    card.innerHTML = `
      <span class="course-code">${course.subject} ${course.number}</span>
    `;

    card.setAttribute('title', course.title);
    cardContainer.appendChild(card);
  });

  creditDisplay.textContent = filtered.reduce((sum, c) => sum + c.credits, 0);
}

// Filter button listeners
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderCourses(btn.dataset.filter);
  });
});

// Initial render
renderCourses('all');