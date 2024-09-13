function generateResume() {
    // Collect form data
    var profilePictureInput = document.getElementById('profilePicture');
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var education = document.getElementById('education').value.trim();
    var experience = document.getElementById('experience').value.trim();
    var skills = document.getElementById('skills').value.trim();
    // Load jsPDF library
    var jsPDF = window.jspdf.jsPDF;
    // Create a new jsPDF document
    var doc = new jsPDF();
    // Add profile picture if available
    var profilePictureURL = '';
    if (profilePictureInput.files && profilePictureInput.files[0]) {
        var file = profilePictureInput.files[0];
        var reader = new FileReader();
        reader.onload = function (event) {
            profilePictureURL = event.target.result;
            // Add profile picture to PDF
            doc.addImage(profilePictureURL, 'JPEG', 10, 10, 50, 50);
            // Add text content to the PDF
            addTextToPDF(doc);
        };
        reader.readAsDataURL(file); // Convert image file to data URL
    }
    else {
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
