function generateResume() {
    // Collect form data
    const profilePictureInput = document.getElementById('profilePicture');
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const education = document.getElementById('education').value.trim();
    const experience = document.getElementById('experience').value.trim();
    const skills = document.getElementById('skills').value.trim();

    // Load jsPDF library
    const { jsPDF } = window.jspdf;

    // Create a new jsPDF document
    const doc = new jsPDF();

    // Add profile picture if available
    let profilePictureURL = '';
    if (profilePictureInput.files && profilePictureInput.files[0]) {
        const file = profilePictureInput.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            profilePictureURL = event.target.result;

            // Add profile picture to PDF
            doc.addImage(profilePictureURL, 'JPEG', 10, 10, 50, 50);

            // Add text content to the PDF
            addTextToPDF(doc);
        };

        reader.readAsDataURL(file); // Convert image file to data URL
    } else {
        // Add text content to the PDF if no image
        addTextToPDF(doc);
    }

    function addTextToPDF(doc) {
        doc.setFontSize(16);
        doc.text(name || 'Your Name', 70, 20);
        doc.text(email || 'Your Email', 70, 30);
        doc.text(phone || 'Your Phone', 70, 40);

        doc.setFontSize(14);
        doc.text('Education', 10, 70);
        doc.setFontSize(12);
        doc.text(education || 'Your Education', 10, 80);

        doc.setFontSize(14);
        doc.text('Professional Experience', 10, 100);
        doc.setFontSize(12);
        doc.text(experience || 'Your Professional Experience', 10, 110);

        doc.setFontSize(14);
        doc.text('Skills', 10, 130);
        doc.setFontSize(12);
        doc.text(skills || 'Your Skills', 10, 140);

        // Save the PDF
        doc.save('resume.pdf');
    }
}
