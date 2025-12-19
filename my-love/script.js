document.addEventListener('DOMContentLoaded', () => {

    // Quotes list
    const quotes = [
        "You are my today and all of my tomorrows.",
        "Every love story is beautiful, but ours is my favorite.",
        "In you, I found my home.",
        "Forever isn’t long enough with you.",
        "You are my answered prayer."
    ];

    // DOM Elements
    const galleryContainer = document.getElementById('gallery-container');
    const heroSection = document.getElementById('hero');
    const quoteSection = document.querySelector('.quote-section .romantic-quote');

    // Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

    // Load Images from data.js
    if (typeof galleryImages !== 'undefined' && galleryImages.length > 0) {
        // Shuffle images for variety
        const images = galleryImages;
        images.sort(() => Math.random() - 0.5);

        // Start Hero Slideshow with random images
        startHeroSlideshow(images, 5); // Use 5 images for the slideshow

        // Render Gallery
        renderGallery(images);
    } else {
        console.error("Gallery images not found. Check data.js");
    }


    function startHeroSlideshow(allImages, count) {
        const slideshowContainer = document.getElementById('hero-slideshow');
        // effective random selection
        const shuffled = [...allImages].sort(() => 0.5 - Math.random());
        const selectedImages = shuffled.slice(0, count);

        // Create slide elements
        selectedImages.forEach((img, index) => {
            const slide = document.createElement('div');
            slide.className = index === 0 ? 'slide active' : 'slide';
            slide.style.backgroundImage = `url('${img.src}')`;
            slideshowContainer.appendChild(slide);
        });

        // Cycle through slides
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');

        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000); // Change every 5 seconds
    }



    function renderGallery(images) {
        // We will split images into different layout types

        // 1. Masonry Grid (First 8 images)
        const masonryChunk = images.slice(0, 8);
        const masonryHtml = createMasonryGrid(masonryChunk);
        galleryContainer.appendChild(masonryHtml);

        // 2. Quote Break
        const quoteDiv = document.createElement('div');
        quoteDiv.className = 'quote-section scroll-reveal';
        quoteDiv.innerHTML = `<p class="romantic-quote">"${getRandomQuote()}"</p>`;
        observer.observe(quoteDiv);
        galleryContainer.appendChild(quoteDiv);

        // 3. Horizontal Carousel (Next 10 images)
        const carouselChunk = images.slice(8, 18);
        if (carouselChunk.length > 0) {
            const carouselHtml = createCarousel(carouselChunk);
            galleryContainer.appendChild(carouselHtml);
        }

        // 4. Another Grid for remainder
        const remainingChunk = images.slice(18);
        if (remainingChunk.length > 0) {
            const finalGrid = createMasonryGrid(remainingChunk);
            galleryContainer.appendChild(finalGrid);
        }
    }

    function createMasonryGrid(images) {
        const wrapper = document.createElement('div');
        wrapper.className = 'masonry-grid scroll-reveal';

        images.forEach(img => {
            const item = document.createElement('div');
            item.className = 'masonry-item';
            item.innerHTML = `<img src="${img.src}" loading="lazy" alt="Love Memory">`;
            wrapper.appendChild(item);
        });

        observer.observe(wrapper);
        return wrapper;
    }

    function createCarousel(images) {
        const wrapper = document.createElement('div');
        wrapper.className = 'carousel-container scroll-reveal';

        images.forEach(img => {
            const item = document.createElement('div');
            item.className = 'carousel-item';
            item.innerHTML = `<img src="${img.src}" loading="lazy" alt="Love Memory">`;
            wrapper.appendChild(item);
        });

        observer.observe(wrapper);
        return wrapper;
    }

    function getRandomQuote() {
        return quotes[Math.floor(Math.random() * quotes.length)];
    }

    // Music Toggle (Placeholder functionality)
    const musicBtn = document.getElementById('music-toggle');
    let isPlaying = false;
    musicBtn.addEventListener('click', () => {
        const audio = document.getElementById('bg-music');
        if (audio) {
            if (isPlaying) {
                audio.pause();
                musicBtn.textContent = '🎵';
            } else {
                audio.play();
                musicBtn.textContent = '🔇';
            }
            isPlaying = !isPlaying;
        } else {
            alert("Background music would play here if a file was provided!");
        }
    });

});
