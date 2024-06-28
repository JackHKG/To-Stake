document.addEventListener("DOMContentLoaded", () => {
    const visitButton = document.getElementById('visit-button');
    const messageDiv = document.getElementById('message');
    const counterDiv = document.getElementById('counter');
    const countdownDiv = document.getElementById('countdown');

    const resetTime = new Date();
    resetTime.setUTCHours(23, 0, 0, 0); // 7 AM HKT is 23:00 UTC of the previous day

    let visitCount = localStorage.getItem('visitCount') ? parseInt(localStorage.getItem('visitCount')) : 0;
    let lastVisit = localStorage.getItem('lastVisit') ? new Date(localStorage.getItem('lastVisit')) : new Date(0);

    if (new Date() >= resetTime) {
        visitCount = 0;
        localStorage.setItem('visitCount', visitCount);
        localStorage.setItem('lastVisit', new Date().toISOString());
    }

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
        const minute = now.getMinutes();

        if (visitCount >= 5) {
            messageDiv.textContent = "已夠數";
            visitButton.style.display = "none";
        } else if (hour >= 7 && hour < 11 && now.getTimezoneOffset() === -480) { // HKT is UTC+8 (480 minutes)
            messageDiv.textContent = "";
            startCountdown();
        } else {
            messageDiv.textContent = "Outside Time";
            visitButton.style.display = "none";
            countdownDiv.style.display = 'none';
        }
    };

    visitButton.addEventListener('click', () => {
        visitCount += 1;
        localStorage.setItem('visitCount', visitCount);
        localStorage.setItem('lastVisit', new Date().toISOString());
        updateCounter();
        window.location.href = 'https://stake.com/casino/games/limbo
        ';
    });

    updateCounter();
    checkButtonVisibility();
    setInterval(checkButtonVisibility, 60000); // Check every minute
});
