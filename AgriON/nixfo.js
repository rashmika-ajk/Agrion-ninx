function filterPosts(category) {
    const posts = document.querySelectorAll('.post-card');
    const categories = document.querySelectorAll('.category-item');

    // Remove selected class from all category items
    categories.forEach(item => item.classList.remove('selected'));

    // Set selected class to the clicked category item
    if (category !== 'All') {
        const selectedCategory = Array.from(categories).find(item => item.textContent.trim() === category);
        if (selectedCategory) {
            selectedCategory.classList.add('selected');
        }
    }

    // Show or hide posts based on the selected category
    posts.forEach(post => {
        if (category === 'All' || post.getAttribute('data-category') === category) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}

function likePost(button) {
    const messageContainer = document.getElementById('message-container');
    const message = document.createElement('div');
    message.className = 'message show';
    message.textContent = 'You liked this post';

    // Append the message to the message container
    messageContainer.appendChild(message);

    // Remove the message after 3 seconds
    setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => {
            messageContainer.removeChild(message);
        }, 500); // Time for fade-out transition
    }, 3000); // Time to display the message
}

// Example usage to show all posts initially
window.onload = () => {
    filterPosts('All');
};
