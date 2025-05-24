
   // Countdown timer
        let secondsLeft = 30;
        const countdownElement = document.getElementById('countdown');
        
        const countdownTimer = setInterval(() => {
            secondsLeft--;
            countdownElement.textContent = secondsLeft;
            
            if (secondsLeft <= 0) {
                clearInterval(countdownTimer);
                window.location.href = 'index.html';
            }
        }, 1000);
        
        // Fun facts rotation
        const funFacts = document.querySelectorAll('.fun-fact');
        let currentFactIndex = 0;
        
        setInterval(() => {
            // Hide current fact
            funFacts[currentFactIndex].classList.remove('active');
            
            // Move to next fact
            currentFactIndex = (currentFactIndex + 1) % funFacts.length;
            
            // Show next fact
            funFacts[currentFactIndex].classList.add('active');
        }, 8000);
        
        // Confetti animation
        function triggerConfetti() {
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
            
            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }
            
            const interval = setInterval(function() {
                const timeLeft = animationEnd - Date.now();
                
                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }
                
                const particleCount = 50 * (timeLeft / duration);
                
                // Since particles fall down, start a bit higher than random
                confetti(Object.assign({}, defaults, { 
                    particleCount, 
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                    colors: ['#FF8C00', '#FFB700', '#0F1E4C', '#2E3A68']
                }));
                confetti(Object.assign({}, defaults, { 
                    particleCount, 
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                    colors: ['#FF8C00', '#FFB700', '#0F1E4C', '#2E3A68']
                }));
            }, 250);
        }
        
        // Trigger confetti on load
        window.addEventListener('load', function() {
            setTimeout(triggerConfetti, 2000);
        });
        
        // Easter egg - click logo to trigger confetti
        document.querySelector('.logo-container').addEventListener('click', triggerConfetti);
        
        // Interactive elements event listeners for mobile
        document.querySelectorAll('.interactive-element').forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(1.05)';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
        
        // Pause countdown on social media clicks
        document.querySelectorAll('.social-icon').forEach(icon => {
            icon.addEventListener('click', function(e) {
                // Prevent the default link behavior
                e.preventDefault();
                
                // Pause the countdown temporarily
                clearInterval(countdownTimer);
                countdownElement.textContent = "paused";
                
                // Resume countdown after 2 seconds
                setTimeout(() => {
                    countdownTimer = setInterval(() => {
                        secondsLeft--;
                        countdownElement.textContent = secondsLeft;
                        
                        if (secondsLeft <= 0) {
                            clearInterval(countdownTimer);
                            window.location.href = 'index.html';
                        }
                    }, 1000);
                }, 2000);
                
                // Open social link in new tab
                window.open(this.href, '_blank');
            });
        });