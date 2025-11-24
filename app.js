document.addEventListener("DOMContentLoaded", () => {
    const stakeBtn = document.getElementById("stakeBtn");
    const withdrawBtn = document.getElementById("withdrawBtn");
    const statusDiv = document.getElementById("status");

    function checkStakeAvailability() {
        const now = new Date();

        // Convert user local time → HKT (UTC+8)
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const hkt = new Date(utc + 8 * 60 * 60000);

        const hour = hkt.getHours();

        // Allowed hours: 11:00–11:59 and 23:00–23:59
        const isOpen =
            (hour === 11) ||
            (hour === 23);

        if (isOpen) {
        
            stakeBtn.disabled = true;
            statusDiv.textContent = "Closed (Only 11AM–12NN & 11PM–12MN)";
            statusDiv.style.color = "red";
        }
    }

    // Withdraw button – Always open
    withdrawBtn.addEventListener("click", () => {
        window.location.href = "https://www.stake.com/?tab=overview&currency=usdt&modal=wallet";
    });

    // Stake button – Time restricted
    stakeBtn.addEventListener("click", () => {
        window.location.href = "https://stake.com/casino/games/evolution-baccarat-lobby/play?mode=real";
    });

    checkStakeAvailability();
    setInterval(checkStakeAvailability, 30000); // refresh every 30s
});
