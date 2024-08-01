// Slider Functionality
let currentIndex = 0;
const slides = document.querySelector('.slides');
const slideCount = document.querySelectorAll('.slide').length;

function updateSlidePosition() {
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function showNextSlide() {
    if (currentIndex < slideCount - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateSlidePosition();
}

// Automatically change slides every 3 seconds
setInterval(showNextSlide, 3000);

document.querySelector('.next').addEventListener('click', () => {
    if (currentIndex < slideCount - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateSlidePosition();
});

document.querySelector('.prev').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = slideCount - 1;
    }
    updateSlidePosition();
});

// Phone Number Toggle Functionality
function togglePhone(id) {
    const phoneElement = document.getElementById(id);
    phoneElement.style.display = phoneElement.style.display === 'none' ? 'block' : 'none';
}

// Filtering Functionality
document.getElementById('filter-location').addEventListener('change', filterFarmers);
document.getElementById('filter-crop').addEventListener('change', filterFarmers);

function filterFarmers() {
    const locationFilter = document.getElementById('filter-location').value;
    const cropFilter = document.getElementById('filter-crop').value;

    document.querySelectorAll('.farmer-item').forEach(item => {
        const location = item.getAttribute('data-location');
        const crops = item.getAttribute('data-crop').split(', ');

        const locationMatch = locationFilter === '' || location === locationFilter;
        const cropMatch = cropFilter === '' || crops.includes(cropFilter);

        if (locationMatch && cropMatch) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

// Initialize the filter to display all farmers initially
filterFarmers();
