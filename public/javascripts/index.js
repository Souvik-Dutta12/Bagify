// Hide the message after 2 seconds with slide-out animation
const messageElement = document.getElementById('message');
if (messageElement) {
    setTimeout(() => {
        messageElement.classList.remove('slide-in'); // Remove slide-in animation
        messageElement.classList.add('slide-out'); // Add slide-out animation

        // Remove the message from the DOM after the animation completes
        setTimeout(() => {
            messageElement.remove();
        }, 500); // Wait for the slide-out animation to complete
    }, 2000); // 2 seconds delay
}