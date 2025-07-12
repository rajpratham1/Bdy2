document.addEventListener('DOMContentLoaded', () => {
    // --- Universal Music Control ---
    const backgroundMusic = document.getElementById('backgroundMusic');
    const playPauseBtn = document.getElementById('playPauseBtn');
    let isPlaying = false;

    if (backgroundMusic && playPauseBtn) {
        backgroundMusic.volume = 0.5;
        
        // Autoplay attempt (most browsers block this unless user interacts)
        backgroundMusic.play().then(() => {
            isPlaying = true;
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }).catch(error => {
            console.log("Autoplay prevented:", error);
        });

        // Play/Pause Button Functionality
        playPauseBtn.addEventListener('click', () => {
            if (isPlaying) {
                backgroundMusic.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            } else {
                backgroundMusic.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }
            isPlaying = !isPlaying;
        });
    }

    // --- Page 1 (Landing Page) logic ---
    const surpriseText = document.getElementById('surpriseText');
    const continueBtn1 = document.getElementById('continueBtn1');
    
    if (document.querySelector('.page-1')) {
        
        if (continueBtn1) {
            // Ensure the button is initially hidden via JavaScript
            continueBtn1.style.display = 'none'; 

            // Show "Being in surprise..." after 2 seconds
            setTimeout(() => {
                if (surpriseText) surpriseText.style.opacity = '1';
                // Show "Continue" button after 1 more second
                setTimeout(() => {
                    continueBtn1.style.display = 'inline-block';
                }, 1000);
            }, 2000);

            // Add navigation functionality to the button
            continueBtn1.addEventListener('click', () => {
                window.location.href = 'memories.html';
            });
        }
    }

    // --- Page 2 (Memories) Curved Gallery Logic ---
    const gallery = document.getElementById('curvedGallery');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const memoryCards = document.querySelectorAll('.memory-card');
    
    if (gallery && memoryCards.length > 0) {
        let currentRotation = 0;
        let cardCount = memoryCards.length;
        let rotateAngle = 360 / cardCount;
        // Calculated distance for curved effect (adjust if needed for your image count)
        let translateZ = 300 / Math.tan(Math.PI / cardCount) * 1.5;

        // Position the cards in the 3D space
        memoryCards.forEach((card, index) => {
            let angle = index * rotateAngle;
            card.style.transform = `rotateY(${angle}deg) translateZ(${translateZ}px)`;
        });

        // Rotate the gallery
        function rotateGallery(direction) {
            if (direction === 'next') {
                currentRotation -= rotateAngle;
            } else if (direction === 'prev') {
                currentRotation += rotateAngle;
            }
            gallery.style.transform = `rotateY(${currentRotation}deg)`;
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => rotateGallery('prev'));
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => rotateGallery('next'));
        }
    }

    // --- Page 3 (Celebration) Dynamic Animations ---
    if (document.querySelector('.page-3')) {
        const confettiColors = ['#e91e63', '#ffc107', '#9c27b0', '#2196f3', '#00bcd4', '#4caf50'];
        const balloonColors = ['#ff6f61', '#f06292', '#ce93d8', '#42a5f5'];
        const confettiContainer = document.querySelector('.confetti-container');
        const balloonContainer = document.querySelector('.balloon-container');

        function createConfetti() {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            confetti.style.width = `${Math.random() * 8 + 4}px`;
            confetti.style.height = `${Math.random() * 12 + 6}px`;
            confetti.style.animationDuration = `${Math.random() * 5 + 3}s`;
            confetti.style.opacity = Math.random() + 0.3;
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

            if (confettiContainer) {
                confettiContainer.appendChild(confetti);
                setTimeout(() => confetti.remove(), 8000);
            }
        }
        
        function createBalloon() {
            const balloon = document.createElement('div');
            balloon.classList.add('balloon');
            balloon.style.left = `${Math.random() * 100}vw`;
            balloon.style.backgroundColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];
            balloon.style.animationDuration = `${Math.random() * 6 + 4}s`;
            
            if (balloonContainer) {
                balloonContainer.appendChild(balloon);
                setTimeout(() => balloon.remove(), 10000);
            }
        }

        // Start animation creation
        setInterval(createConfetti, 100);
        setInterval(createBalloon, 1500);
    }

    // --- Page 6 (Final Tribute) Heart Animations ---
    const heartContainer = document.querySelector('.heart-animation-container');

    if (document.querySelector('.page-6')) {
        function createAnimatedHeart() {
            const heart = document.createElement('div');
            heart.classList.add('animated-heart');
            heart.innerHTML = '❤️'; 
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.animationDuration = `${Math.random() * 8 + 6}s`;
            heart.style.animationDelay = `${Math.random() * 2}s`;
            
            if (heartContainer) {
                heartContainer.appendChild(heart);
                // Remove heart once it goes off screen
                setTimeout(() => heart.remove(), (parseFloat(heart.style.animationDuration) * 1000) + (parseFloat(heart.style.animationDelay) * 1000));
            }
        }

        // Create a new heart every 500ms
        setInterval(createAnimatedHeart, 500); 
    }
});
