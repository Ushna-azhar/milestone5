function generateResume() {
    // Collect form data
    const profilePictureInput = document.getElementById('profilePicture');
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const education = document.getElementById('education').value.trim();
    const experience = document.getElementById('experience').value.trim();
    const skills = document.getElementById('skills').value.trim();

    // Handle profile picture
    let profilePictureURL = '';
    if (profilePictureInput.files && profilePictureInput.files[0]) {
        const file = profilePictureInput.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            profilePictureURL = event.target.result; // Data URL of the image
            updateResumePreview(); // Call function to update preview with the image
        };

        reader.readAsDataURL(file); // Convert image file to data URL
    } else {
        updateResumePreview(); // Update preview if no profile picture is selected
    }

    // Function to update resume preview and handle download link
    function updateResumePreview() {
        // Create HTML for the resume preview
        const resumeHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Resume</title>
                <style>
                    .resume-header {
                        display: flex;
                        align-items: center;
                    }
                    .profile-picture {
                        width: 100px;
                        height: 100px;
                        border-radius: 50%;
                        margin-right: 15px;
                    }
                    .resume-body {
                        margin-top: 20px;
                    }
                    .editable {
                        border: 1px dashed #ccc;
                        padding: 5px;
                        margin: 5px 0;
                    }
                </style>
            </head>
            <body>
                <div class="resume-header">
                    ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profile-picture">` : ''}
                    <h2 contenteditable="true" class="editable">${name || 'Your Name'}</h2>
                    <p contenteditable="true" class="editable">${email || 'Your Email'}</p>
                    <p contenteditable="true" class="editable">${phone || 'Your Phone'}</p>
                </div>
                <div class="resume-body">
                    <h3 contenteditable="true" class="editable">Education</h3>
                    <p contenteditable="true" class="editable">${education || 'Your Education'}</p>
                    <h3 contenteditable="true" class="editable">Professional Experience</h3>
                    <p contenteditable="true" class="editable">${experience || 'Your Professional Experience'}</p>
                    <h3 contenteditable="true" class="editable">Skills</h3>
                    <p contenteditable="true" class="editable">${skills || 'Your Skills'}</p>
                </div>
            </body>
            </html>
        `;

        // Create a Blob from the resume HTML content
        const blob = new Blob([resumeHTML], { type: 'text/html' });
        const downloadURL = URL.createObjectURL(blob);

        // Create a download link for the resume
        const downloadLink = document.createElement('a');
        downloadLink.href = downloadURL;
        downloadLink.download = 'resume.html'; // Suggested filename for the download
        downloadLink.textContent = 'Download Resume';
        downloadLink.style.display = 'block';
        downloadLink.style.marginTop = '20px';

        // Add the download link to the page
        const linkContainer = document.getElementById('downloadLinkContainer');
        linkContainer.innerHTML = ''; // Clear any existing download links
        linkContainer.appendChild(downloadLink);

        // Cleanup to free up memory
        URL.revokeObjectURL(downloadURL);
    }
}


