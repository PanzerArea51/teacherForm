//localStorage.clear();
const savedData = JSON.parse(localStorage.getItem("studentSubmissions")) || [];
console.log(savedData); // Displays the array of saved form data

const submissionsKey = "studentSubmissions";

// Fetch and render submissions
const renderSubmissions = () => {
  const submissions = JSON.parse(localStorage.getItem(submissionsKey)) || [];
  console.log("got it");
  const list = document.getElementById("submission-list");
  list.innerHTML = "";

  submissions.forEach((submission, index) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <p><strong>${submission.firstName} (${submission.lastName})</strong> - ${submission.category}</p>
      <p>File: ${submission.fileName}</p>
      <button class="approve" data-index="${index}" data-category="${submission.category}">Approve</button>
      <button class="reject" data-index="${index}" data-category="${submission.category}">Reject</button>
    `;
    list.appendChild(item);
  });
};

// Update submission status
const updateSubmissionStatus = (index, status) => {
  const submissions = JSON.parse(localStorage.getItem(submissionsKey)) || [];
  const submission = submissions[index];

  if (!submission) return;

  submission.status = status;
  localStorage.setItem(submissionsKey, JSON.stringify(submissions));

  // Notify student
  if (status === "Approved") {
    alert(`${submission.name}'s task approved! 10 XP awarded.`);
    // Add XP logic here if needed
  } else {
    alert(`${submission.name}'s task rejected.`);
  }

  renderSubmissions();
};

// Add event listeners for buttons
document.getElementById("submission-list").addEventListener("click", (event) => {
  const button = event.target;
  const index = button.dataset.index;  // Index of the submission
  const category = button.dataset.category;  // Category of the submission

  if (button.classList.contains("approve")) {
    updateSubmissionStatus(index, "Approved");

    // Add XP for the category
    const xp = 12;
    const currentXP = parseInt(localStorage.getItem(`${category}-xp`)) || 0;
    localStorage.setItem(`${category}-xp`, currentXP + xp);
    localStorage.setItem("something", category);
    localStorage.setItem("xp",10);
    console.log(localStorage.getItem("xp"));
    console.log(category);

    console.log(`${category} XP updated to:`, currentXP + xp);
  } else if (button.classList.contains("reject")) {
    updateSubmissionStatus(index, "Rejected");
    console.log(`Submission for category ${category} was rejected.`);
  }
});

// Initialize teacher portal
document.addEventListener("DOMContentLoaded", renderSubmissions);
