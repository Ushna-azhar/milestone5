function generateResume() {
    // Collect form data
    var profilePictureInput = document.getElementById('profilePicture');
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var education = document.getElementById('education').value.trim();
    var experience = document.getElementById('experience').value.trim();
    var skills = document.getElementById('skills').value.trim();
    // Handle profile picture
    var profilePictureURL = '';
    if (profilePictureInput.files && profilePictureInput.files[0]) {
        var file = profilePictureInput.files[0];
        var reader = new FileReader();
        reader.onload = function (event) {
            profilePictureURL = event.target.result; // Data URL of the image
            updateResumePreview(); // Call function to update preview with the image
        };
        reader.readAsDataURL(file); // Convert image file to data URL
    }
    else {
        updateResumePreview(); // Update preview if no profile picture is selected
    }
    // Function to update resume preview and handle download link
    function updateResumePreview() {
        // Create HTML for the resume preview
        var resumeHTML = "\n            <!DOCTYPE html>\n            <html>\n            <head>\n                <meta charset=\"UTF-8\">\n                <title>Resume</title>\n                <style>\n                    .resume-header {\n                        display: flex;\n                        align-items: center;\n                    }\n                    .profile-picture {\n                        width: 100px;\n                        height: 100px;\n                        border-radius: 50%;\n                        margin-right: 15px;\n                    }\n                    .resume-body {\n                        margin-top: 20px;\n                    }\n                    .editable {\n                        border: 1px dashed #ccc;\n                        padding: 5px;\n                        margin: 5px 0;\n                    }\n                </style>\n            </head>\n            <body>\n                <div class=\"resume-header\">\n                    ".concat(profilePictureURL ? "<img src=\"".concat(profilePictureURL, "\" alt=\"Profile Picture\" class=\"profile-picture\">") : '', "\n                    <h2 contenteditable=\"true\" class=\"editable\">").concat(name || 'Your Name', "</h2>\n                    <p contenteditable=\"true\" class=\"editable\">").concat(email || 'Your Email', "</p>\n                    <p contenteditable=\"true\" class=\"editable\">").concat(phone || 'Your Phone', "</p>\n                </div>\n                <div class=\"resume-body\">\n                    <h3 contenteditable=\"true\" class=\"editable\">Education</h3>\n                    <p contenteditable=\"true\" class=\"editable\">").concat(education || 'Your Education', "</p>\n                    <h3 contenteditable=\"true\" class=\"editable\">Professional Experience</h3>\n                    <p contenteditable=\"true\" class=\"editable\">").concat(experience || 'Your Professional Experience', "</p>\n                    <h3 contenteditable=\"true\" class=\"editable\">Skills</h3>\n                    <p contenteditable=\"true\" class=\"editable\">").concat(skills || 'Your Skills', "</p>\n                </div>\n            </body>\n            </html>\n        ");
        // Create a Blob from the resume HTML content
        var blob = new Blob([resumeHTML], { type: 'text/html' });
        var downloadURL = URL.createObjectURL(blob);
        // Create a download link for the resume
        var downloadLink = document.createElement('a');
        downloadLink.href = downloadURL;
        downloadLink.download = 'resume.html'; // Suggested filename for the download
        downloadLink.textContent = 'Download Resume';
        downloadLink.style.display = 'block';
        downloadLink.style.marginTop = '20px';
        // Add the download link to the page
        var linkContainer = document.getElementById('downloadLinkContainer');
        linkContainer.innerHTML = ''; // Clear any existing download links
        linkContainer.appendChild(downloadLink);
        // Cleanup to free up memory
        URL.revokeObjectURL(downloadURL);
    }
}
