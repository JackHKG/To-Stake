document.addEventListener("DOMContentLoaded", () => {
    const visitButton = document.getElementById('visit-button');
    const messageDiv = document.getElementById('message');

    const resetTime = new Date();
    resetTime.setUTCHours(23, 0, 0, 0); // 7 AM HKT is 23:00 UTC of the previous day

    let visitCount = localStorage.getItem('visitCount') ? parseInt(localStorage.getItem('visitCount')) : 0;
    let lastVisit = localStorage.getItem('lastVisit') ? new Date(localStorage.getItem('lastVisit')) : new Date(0);

    if (new Date() >= resetTime) {
        visitCount = 0;
        localStorage.setItem('visitCount', visitCount);
        localStorage.setItem('lastVisit', new Date().toISOString());
    }

    const checkButtonVisibility = () => {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();

        if (visitCount >= 5) {
            messageDiv.textContent = "已夠數";
            visitButton.style.display = "none";
        } else if (hour >= 7 && hour < 11 && now.getTimezoneOffset() === -480) { // HKT is UTC+8 (480 minutes)
            visitButton.style.display = "block";
            messageDiv.textContent = "";
            visitButton.addEventListener('click', () => {
                visitCount += 1;
                localStorage.setItem('visitCount', visitCount);
                localStorage.setItem('lastVisit', new Date().toISOString());
            });
        } else {
            messageDiv.textContent = "Outside Time";
            visitButton.style.display = "none";
        }
    };

    checkButtonVisibility();
    setInterval(checkButtonVisibility, 60000); // Check every minute
});