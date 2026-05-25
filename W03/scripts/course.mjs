const byuiCourse = {
  name: "Web Frontend Development I",
  code: "WDD 131",
  sections: [
    { sectionNum: 1, enrolled: 12, maxEnrollment: 20 },
    { sectionNum: 2, enrolled: 20, maxEnrollment: 20 },
    { sectionNum: 3, enrolled: 5, maxEnrollment: 20 },
    { sectionNum: 4, enrolled: 18, maxEnrollment: 20 },
    { sectionNum: 5, enrolled: 0, maxEnrollment: 20 },
  ],
  changeEnrollment(sectionNum, enroll = true) {
    const section = this.sections.find((s) => s.sectionNum === sectionNum);
    if (!section) {
      alert(`Section ${sectionNum} not found.`);
      return;
    }
    if (enroll) {
      if (section.enrolled < section.maxEnrollment) {
        section.enrolled++;
      } else {
        alert(`Section ${sectionNum} is full.`);
      }
    } else {
      if (section.enrolled > 0) {
        section.enrolled--;
      } else {
        alert(`Section ${sectionNum} has no enrolled students.`);
      }
    }
  },
};

export default byuiCourse;
