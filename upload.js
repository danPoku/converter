const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('fileInput');
const message = document.getElementById('message');

const customButton = document.getElementById('customFileButton');
customButton.addEventListener('click', () => {
    fileInput.click(); // Trigger the hidden file input click event
});

async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/upload', {
        method: 'POST',
        body: formData
    });

    const data = await response.json();
    message.textContent = data.message; // Update message based on response
}

// Highlight the drop area when dragging a file
dropArea.addEventListener('dragover', (evt) => {
    evt.preventDefault();
    dropArea.classList.add('highlight');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('highlight');
});

// Handle dropped files
dropArea.addEventListener('drop', (evt) => {
    evt.preventDefault();
    dropArea.classList.remove('highlight');

    const droppedFile = evt.dataTransfer.files[0];
    // Check if it's a PDF file
    if (droppedFile.type === "application/pdf") {
        // Handle the uploaded file (e.g., display filename or send to server)
        message.textContent = `Selected file: ${droppedFile.name}`;
        uploadFile(droppedFile);
    } else {
        message.textContent = 'Please upload a PDF file.';
    }
});

// Handle file selection from input field
fileInput.addEventListener('change', () => {
    const selectedFile = fileInput.files[0];
    if (selectedFile.type === "application/pdf") {
        // Handle the uploaded file (e.g., display filename or send to server)
        message.textContent = `Selected file: ${selectedFile.name}`;
        uploadFile(selectedFile);
    } else {
        message.textContent = 'Please upload a PDF file.';
        // Clear file selection (optional)
        fileInput.value = null;
    }
});
