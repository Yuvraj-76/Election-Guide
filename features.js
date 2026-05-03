/**
 * Election Guide Assistant - Features (Countdown, Myth Buster, etc.)
 */

// 1. Election Countdown
function initCountdown() {
    const countdownEl = document.getElementById('timer-display');
    if (!countdownEl) return;

    // Target date: Next major election (Mock date: 1 year from now for demo)
    const targetDate = new Date();
    targetDate.setFullYear(targetDate.getFullYear() + 1);
    targetDate.setMonth(3); // April
    targetDate.setDate(15);

    function updateTimer() {
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
            countdownEl.innerHTML = "Election Day is Here!";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        countdownEl.innerText = `${days}d ${hours}h ${minutes}m`;
    }

    updateTimer();
    setInterval(updateTimer, 60000); // Update every minute
}

// 2. Myth Buster (Interactive interaction)
function showMythFeedback(isCorrect) {
    console.log(isCorrect ? "Fact Checked!" : "Myth Busted!");
}

// 3. Checklist Export/Download (Mock)
function downloadChecklist() {
    const checklist = `
VOTING DAY CHECKLIST
--------------------
1. Voter ID Card (EPIC)
2. Know your Polling Booth
3. Check name in Electoral Roll
4. Follow Queue discipline
5. Verify VVPAT slip (7 seconds)
    `;
    const blob = new Blob([checklist], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Voting_Day_Checklist.txt';
    a.click();
}

// Initialize features
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
});

// Expose functions globally for script.js to call if needed
window.ElectionFeatures = {
    downloadChecklist,
    showMythFeedback
};
