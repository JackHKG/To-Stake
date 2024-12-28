document.addEventListener("DOMContentLoaded", () => {
    const visitButton = document.getElementById('visit-button');
    const messageDiv = document.getElementById('message');
    const counterDiv = document.getElementById('counter');
    const countdownDiv = document.getElementById('countdown');

    const updateCounter = () => {
        counterDiv.textContent = `Visit Count Today: ${visitCount}`;
    };

    const startCountdown = () => {
        let countdown = 10;
        countdownDiv.style.display = 'block';
        countdownDiv.textContent = `Countdown: ${countdown}`;
        
        const countdownInterval = setInterval(() => {
            countdown -= 1;
            countdownDiv.textContent = `Countdown: ${countdown}`;
            
            if (countdown <= 0) {
                clearInterval(countdownInterval);
                countdownDiv.style.display = 'none';
                if (visitCount < 5) {
                    visitButton.style.display = 'block';
                }
            }
        }, 1000);
    };

    const checkButtonVisibility = () => {
        const now = new Date();
        const hour = now.getHours();

        if (visitCount >= 3) {
            messageDiv.textContent = "已夠數";
            visitButton.style.display = "none";
        } else if (hour >= 7 && hour < 12) { // Local time (adjusted for HKT)
            messageDiv.textContent = "";
            startCountdown();
        } else {
            messageDiv.textContent = "Outside Time";
            visitButton.style.display = "none";
            countdownDiv.style.display = 'none';
        }
    };

    const resetVisitCount = () => {
        const now = new Date();
        const lastReset = new Date(localStorage.getItem('lastReset') || 0);
        const hktOffset = 8 * 60; // HKT is UTC+8
        const resetHour = 6; // 7 AM HKT

        const nowUTCMinutes = now.getUTCMinutes() + now.getUTCHours() * 60;
        const resetUTCMinutes = resetHour * 60;

        if (nowUTCMinutes >= resetUTCMinutes && (lastReset.getUTCDate() !== now.getUTCDate() || nowUTCMinutes - lastReset.getUTCMinutes() >= 1440)) {
            localStorage.setItem('visitCount', 0);
            localStorage.setItem('lastReset', now.toISOString());
        }
    };

    resetVisitCount();

    let visitCount = parseInt(localStorage.getItem('visitCount')) || 0;

    visitButton.addEventListener('click', () => {
        visitCount += 1;
        localStorage.setItem('visitCount', visitCount);
        updateCounter();
        window.location.href = 'https://stake.com/casino/games/evolution-stake-exclusive-speed-baccarat-1';
    });

    updateCounter();
    checkButtonVisibility();
    setInterval(checkButtonVisibility, 60000); // Check every minute
});

 
