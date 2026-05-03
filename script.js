/**
 * Election Guide Pro - Advanced Interactive Civic Website
 */

const chatMessages = document.getElementById('chat-messages');
const actionOptions = document.getElementById('action-options');
const chatViewport = document.getElementById('chat-viewport');
const progressFill = document.getElementById('progress-fill');
const progressPercent = document.getElementById('progress-percent');

// --- CONVERSATION ARCHITECTURE ---
const CONTENT = {
    welcome: {
        text: "Namaste 🙏 I'm here as your **Election Guide**, ready to walk you through voting and help you prepare for participating in democracy. 🗳️",
        subtext: "I've structured everything into easy-to-follow modules. What should we explore first?",
        options: [
            { text: "Election Timeline 📅", next: "timeline_start" },
            { text: "Registration (Form 6) 📝", next: "reg_intro" },
            { text: "Voting Day Guide 🗳️", next: "vote_step1" },
            { text: "Myth Buster 🛡️", next: "myth_start" },
            { text: "Glossary & Simulation 🎮", next: "extra_menu" }
        ],
        progress: 5
    },
    timeline_start: {
        text: "An election isn't just one day! It's a journey with several key milestones that ensure a fair process.",
        subtext: "Would you like to see the **Full Timeline** or focus on **Important Deadlines**?",
        options: [
            { text: "Full Lifecycle 📅", next: "timeline_full" },
            { text: "Critical Deadlines ⏰", next: "timeline_deadlines" },
            { text: "Back to Menu", next: "welcome" }
        ],
        progress: 20
    },
    timeline_full: {
        text: "🚀 **The Life of an Election**:\n\n1. **Notification**: The official call to election.\n2. **Nominations**: Candidates file their candidacy.\n3. **Scrutiny**: Election Commission verifies candidates.\n4. **Campaigning**: Parties share their manifestos.\n5. **Poll Day**: The day you make your choice!\n6. **Counting**: The final tally and results.",
        subtext: "Every step is monitored to ensure complete transparency.",
        options: [{ text: "Check Deadlines ⏰", next: "timeline_deadlines" }],
        progress: 30
    },
    timeline_deadlines: {
        text: "⏰ **Don't Miss Your Chance!**\n\n- **Registration**: You must apply at least **10 days before** nominations close in your area.\n- **Verify Name**: Check your details in the list **2 weeks before** polling day.",
        subtext: "Early action prevents last-minute hurdles!",
        options: [{ text: "Register Now 📝", next: "reg_intro" }, { text: "Main Menu", next: "welcome" }],
        progress: 40
    },
    reg_intro: {
        text: "Registration is your entry ticket to democracy! If you are **18 or older**, you are eligible to apply via **Form 6**.",
        subtext: "What information do you need regarding registration?",
        options: [
            { text: "Document Checklist 📋", next: "reg_docs" },
            { text: "How to Apply Online", next: "reg_online" },
            { text: "Main Menu", next: "welcome" }
        ],
        progress: 50
    },
    reg_docs: {
        text: "📑 **Document Checklist**:\n\n1. **Photo**: Recent passport-sized color photograph.\n2. **Age Proof**: Aadhaar Card, Birth Certificate, or Passport.\n3. **Address Proof**: Utility Bill, Bank Passbook, or Ration Card.",
        subtext: "Digital copies are required for online registration.",
        options: [{ text: "How to Apply", next: "reg_online" }, { text: "Main Menu", next: "welcome" }],
        progress: 60
    },
    reg_online: {
        text: "🌐 **Applying is Simple**:\n\n1. Visit **voters.eci.gov.in** or use the **Voter Helpline App**.\n2. Create an account and select 'New Registration'.\n3. Fill Form 6 and upload your documents.\n4. Save your **Reference ID** to track status.",
        subtext: "The ECI portal is the fastest way to register.",
        options: [{ text: "Main Menu", next: "welcome" }],
        progress: 70
    },
    vote_step1: {
        text: "On Polling Day, your first task is to reach your assigned booth. You can find your exact booth location on the **Voter Helpline App**.",
        subtext: "Carry your **Voter ID (EPIC)** or any of the 12 alternate photo IDs.",
        options: [{ text: "Next: The Process", next: "vote_process" }, { text: "Main Menu", next: "welcome" }],
        progress: 80
    },
    vote_process: {
        text: "🚶 **Inside the Booth**:\n\n1. **Verification**: Officials check your name and ID.\n2. **The Mark**: Your left forefinger is marked with ink.\n3. **The Vote**: You enter the booth and press the button on the **EVM**.\n4. **Verification**: The **VVPAT** shows a slip for 7 seconds to confirm your choice.",
        subtext: "Your vote is secret and secure.",
        options: [{ text: "Simulation 🎮", next: "extra_menu" }, { text: "Main Menu", next: "welcome" }],
        progress: 90
    },
    extra_menu: {
        text: "Ready to test your knowledge or explore deeper?",
        options: [
            { text: "Voting Simulation 🎮", next: "sim_start" },
            { text: "Myth Buster 🛡️", next: "myth_start" },
            { text: "Back to Menu", next: "welcome" }
        ]
    },
    sim_start: {
        text: "🚀 **Scenario**: You are at the polling station. An official asks for your identification.",
        subtext: "What do you show them?",
        options: [
            { text: "Show my EPIC (Voter ID)", next: "sim_success" },
            { text: "Show my Gym Membership", next: "sim_fail" }
        ]
    },
    sim_success: {
        text: "✅ **Correct!** You are verified. You move to the next official for the ink mark and signature.",
        options: [{ text: "Continue Sim", next: "welcome" }]
    },
    sim_fail: {
        text: "❌ **Wait!** Gym cards are not valid for voting. You need EPIC, Aadhaar, Passport, or other official IDs.",
        options: [{ text: "Try Again", next: "sim_start" }]
    },
    myth_start: {
        text: "🛡️ **Myth vs Fact**\n\nMyth: 'I can't vote if I lost my physical Voter ID card.'",
        subtext: "Is this True or False?",
        options: [
            { text: "True", next: "myth_wrong" },
            { text: "False", next: "myth_right" }
        ]
    },
    myth_right: {
        text: "✅ **Fact!** If your name is in the Electoral Roll, you can vote using any of the 12 alternative photo IDs like Aadhaar or Passport.",
        options: [{ text: "Finish", next: "welcome" }],
        progress: 100
    },
    myth_wrong: {
        text: "❌ **Actually, it's False!** Your name in the list is what matters. You can use other IDs like Aadhaar to vote.",
        options: [{ text: "Try Another", next: "welcome" }]
    }
};

// --- CORE ENGINE ---

async function addMessage(text, sender = 'bot', subtext = null) {
    if (sender === 'bot') {
        const typingDiv = showTyping();
        await sleep(800);
        typingDiv.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    let html = `<div class="message-content"><p>${formatText(text)}</p>`;
    if (subtext) html += `<p style="margin-top: 0.75rem; font-size: 0.85rem; color: var(--text-muted); font-style: italic;">${formatText(subtext)}</p>`;
    html += `</div>`;
    messageDiv.innerHTML = html;
    chatMessages.appendChild(messageDiv);
    scrollChat();
}

function formatText(text) {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
}

function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot';
    typingDiv.innerHTML = '<div class="typing"><span></span><span></span><span></span></div>';
    chatMessages.appendChild(typingDiv);
    scrollChat();
    return typingDiv;
}

function scrollChat() {
    chatViewport.scrollTo({ top: chatViewport.scrollHeight, behavior: 'smooth' });
}

function updateProgress(progress) {
    if (progress) {
        progressFill.style.width = `${progress}%`;
        progressPercent.innerText = `${progress}%`;
    }
}

function renderOptions(options) {
    actionOptions.innerHTML = '';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.classList.add(opt.next === 'welcome' || opt.text.includes('Back') ? 'secondary' : 'primary');
        btn.innerText = opt.text;
        btn.onclick = () => handleChoice(opt);
        actionOptions.appendChild(btn);
    });
}

async function handleChoice(option) {
    actionOptions.innerHTML = '';
    const userMsg = document.createElement('div');
    userMsg.className = 'message user';
    userMsg.innerHTML = `<div class="message-content"><p>${option.text}</p></div>`;
    chatMessages.appendChild(userMsg);
    scrollChat();

    await sleep(400);
    const state = CONTENT[option.next] || CONTENT['welcome'];
    updateProgress(state.progress);
    await addMessage(state.text, 'bot', state.subtext);
    renderOptions(state.options);
}

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

// --- INITIALIZATION ---
(async () => {
    await sleep(500);
    const welcome = CONTENT.welcome;
    updateProgress(welcome.progress);
    await addMessage(welcome.text, 'bot', welcome.subtext);
    renderOptions(welcome.options);
})();

// Sidebar Interaction
document.querySelectorAll('.nav-item-s').forEach(item => {
    item.onclick = () => {
        document.querySelectorAll('.nav-item-s').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const tool = item.getAttribute('data-tool');
        const nextState = tool === 'checklist' ? 'reg_docs' : tool === 'faq' ? 'myth_start' : 'welcome';
        handleChoice({ text: `Tool: ${tool}`, next: nextState });
    };
});

// Smooth Scroll for Website Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});
