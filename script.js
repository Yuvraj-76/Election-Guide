/**
 * Election Guide - Advanced Interactive Civic Tutor (v2)
 */

const chatContainer = document.getElementById('chat-container');
const inputArea = document.getElementById('input-area');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const chatViewport = document.getElementById('chat-viewport');

// New UI Elements
const themeToggle = document.getElementById('theme-toggle');
const checklistBtn = document.getElementById('checklist-btn');
const checklistDrawer = document.getElementById('checklist-drawer');
const closeDrawer = document.getElementById('close-drawer');
const mascot = document.getElementById('mascot');
const voiceInputBtn = document.getElementById('voice-input-btn');
const faqBtn = document.getElementById('faq-btn');
const faqDrawer = document.getElementById('faq-drawer');
const closeFaq = document.getElementById('close-faq');
const faqList = document.getElementById('faq-list');
const searchToggle = document.getElementById('search-toggle');
const searchContainer = document.getElementById('search-container');
const quickSearch = document.getElementById('quick-search');
const searchResults = document.getElementById('search-results');

const CONTENT = {
    greeting: {
        text: "Namaste 🙏 I'm here as your **Election Guide**, ready to walk you through voting and help you prepare for participating in democracy. 🗳️",
        question: "Before we dive in, would you like to explore our new **Checklist**, try the **Glossary**, or start a lesson?",
        options: [
            { text: "Start Lessons 📚", value: "basics", next: "main_menu" },
            { text: "Glossary 📖", value: "glossary", next: "glossary_start" },
            { text: "First-time Voter?", value: "first_time", next: "intro_path" }
        ]
    },
    intro_path: {
        text: "Becoming a voter is a major milestone! I'll guide you through everything from registration to the big day.",
        question: "Would you like to start with a real-life simulation of voting day, or learn the basics first?",
        options: [
            { text: "Start Simulation 🎮", value: "simulation", next: "sim_start" },
            { text: "Learn Basics 📚", value: "basics", next: "main_menu" }
        ]
    },
    main_menu: {
        text: "I've organized everything into simple modules. Where should we start our journey?",
        options: [
            { text: "1. Election Timeline 📅", value: "timeline", next: "timeline_start" },
            { text: "2. Registration (Form 6) 📝", value: "reg", next: "reg_intro" },
            { text: "3. Voting Day Guide 🗳️", value: "voting", next: "vote_step1" },
            { text: "4. Myth vs Fact 🛡️", value: "myth", next: "myth_start" },
            { text: "5. Glossary & Sim 🎮", value: "extra", next: "extra_menu" }
        ]
    },
    timeline_start: {
        text: "An election isn't just one day! It's a journey with several key milestones.",
        question: "Would you like to see the **Full Timeline** or focus on **Important Deadlines**?",
        options: [
            { text: "Full Timeline 📅", value: "full", next: "timeline_full" },
            { text: "Deadlines ⏰", value: "deadlines", next: "timeline_deadlines" },
            { text: "Back to Menu", value: "main", next: "main_menu" }
        ]
    },
    timeline_full: {
        text: "🚀 **The Life of an Election**:\n\n1. **Notification**: The official start.\n2. **Nominations**: Candidates file their papers.\n3. **Scrutiny**: Checking if candidates are eligible.\n4. **Campaigning**: Parties share their vision.\n5. **Poll Day**: You cast your vote!\n6. **Counting**: Results are announced.",
        simplified: "It starts with an announcement, follows with candidates signing up, and ends with voting and results.",
        options: [{ text: "Next: Deadlines", value: "next", next: "timeline_deadlines" }]
    },
    timeline_deadlines: {
        text: "⏰ **Don't Miss Out!**\n\n- **Registration**: You must register at least **10 days before** the last date of nomination in your area.\n- **Search Name**: Always check the electoral roll **2-3 weeks before** polling day.",
        simplified: "Register early! Don't wait until the week of the election.",
        quiz: {
            question: "When is the best time to check if your name is on the voter list?",
            options: ["On polling day", "2-3 weeks before", "After results"],
            correct: 1,
            feedback: "Exactly! Checking early gives you time to fix any issues."
        },
        options: [{ text: "Back to Menu", value: "main", next: "main_menu" }]
    },
    extra_menu: {
        text: "More tools to help you master the process.",
        options: [
            { text: "Glossary of Terms", value: "glossary", next: "glossary_start" },
            { text: "Simulation 🎮", value: "sim", next: "sim_start" },
            { text: "Back to Menu", value: "main", next: "main_menu" }
        ]
    },
    eff_start: {
        text: "Efficiency is key! Here's how to vote like a pro.",
        question: "Which efficiency tip would you like to explore?",
        options: [
            { text: "Find My Booth Fast", value: "booth", next: "eff_booth" },
            { text: "Best Time to Vote", value: "time", next: "eff_time" },
            { text: "Digital Voter Slip", value: "slip", next: "eff_slip" },
            { text: "Back to Menu", value: "main", next: "main_menu" }
        ]
    },
    eff_booth: {
        text: "📍 **Find My Booth Fast**\n\nUse the **Voter Helpline App** or SMS your EPIC number to **1950**.",
        simplified: "Send a text or use an app to get your booth details instantly.",
        example: "SMS: 'ECI <EPIC_NUMBER>' to 1950.",
        options: [{ text: "Next Tip", value: "next", next: "eff_time" }]
    },
    eff_time: {
        text: "⏰ **Best Time to Vote**\n\nTypically, early morning (7 AM - 9 AM) or mid-afternoon (2 PM - 4 PM) have shorter queues.",
        simplified: "Go early or during lunch time to save hours.",
        options: [{ text: "Next Tip", value: "next", next: "eff_slip" }]
    },
    eff_slip: {
        text: "📲 **Digital Voter Slip**\n\nYou can download a digital slip via the ECI portal. It has a QR code that officials can scan quickly.",
        simplified: "A QR code on your phone makes check-in faster.",
        options: [{ text: "Back to Menu", value: "main", next: "main_menu" }]
    },
    myth_start: {
        text: "Let's clear the air. Don't let misinformation slow you down.",
        question: "Ready for a Myth vs Fact challenge?",
        options: [
            { text: "Start Challenge", value: "go", next: "myth_1" },
            { text: "Back to Menu", value: "main", next: "main_menu" }
        ]
    },
    myth_1: {
        text: "🚩 **Myth**: 'I can't vote if I don't have my physical Voter ID card.'",
        question: "Is this True or False?",
        quiz: {
            question: "Can you vote without the physical EPIC card?",
            options: ["True (I need it)", "False (I can use other IDs)"],
            correct: 1,
            feedback: "Correct! You can use 12 alternative photo IDs like Aadhaar, Passport, or PAN card if your name is on the list."
        },
        options: [{ text: "Next Myth", value: "next", next: "myth_complete" }]
    },
    myth_complete: {
        text: "You're now more efficient at spotting lies! Remember to always verify info at **voters.eci.gov.in**.",
        options: [{ text: "Back to Menu", value: "main", next: "main_menu" }],
        progress: 100
    },
    reg_intro: {
        text: "Registration is your entry ticket to democracy! If you are **18 or older**, you can apply using **Form 6**.",
        question: "Would you like to see the **Document Checklist** or try a **Registration Practice**?",
        options: [
            { text: "Document Checklist 📋", value: "docs", next: "reg_docs" },
            { text: "Practice Form 📝", value: "practice", next: "reg_practice" },
            { text: "Back to Menu", value: "main", next: "main_menu" }
        ]
    },
    reg_docs: {
        text: "📑 **What you'll need**:\n\n1. **Passport Size Photo**\n2. **Age Proof** (Aadhaar, Birth Certificate, PAN)\n3. **Address Proof** (Ration Card, Electricity Bill, Water Bill)\n\n*Tip: Digital copies work best for online application!*",
        simplified: "You need a photo, something with your birth date, and something with your current address.",
        options: [{ text: "Now Try Practice", value: "practice", next: "reg_practice" }]
    },
    reg_practice: {
        text: "Let's try a quick practice. This mimics the official **Form 6** application.",
        question: "Fill in these details to see how it feels!",
        type: "form",
        fields: [
            { label: "Full Name", placeholder: "e.g. Rahul Sharma" },
            { label: "Date of Birth", type: "date" },
            { label: "Constituency", placeholder: "Your city/area" }
        ],
        options: [
            { text: "Submit Practice Form", value: "submit", next: "reg_complete" },
            { text: "Back", value: "back", next: "reg_intro" }
        ]
    },
    reg_complete: {
        text: "Great job! Once you submit the real form at **voters.eci.gov.in**, a Booth Level Officer (BLO) will visit you for verification.",
        quiz: {
            question: "What is the official website for voter registration in India?",
            options: ["google.com", "voters.eci.gov.in", "election.in"],
            correct: 1,
            feedback: "Correct! Always use the official ECI portal for safety."
        },
        options: [{ text: "Back to Menu", value: "main", next: "main_menu" }]
    },

    // --- GLOSSARY MODULE ---
    glossary_start: {
        text: "Civic terminology can be confusing. Which term should I explain first?",
        options: [
            { text: "Constituency", value: "const", next: "term_const" },
            { text: "Model Code of Conduct", value: "mcc", next: "term_mcc" },
            { text: "EPIC Number", value: "epic", next: "term_epic" },
            { text: "Back to Menu", value: "main", next: "main_menu" }
        ]
    },
    term_const: {
        text: "📌 **Constituency**: An area whose voters elect a representative to a legislative body.\n\nIn India, for Lok Sabha elections, the country is divided into 543 constituencies.",
        simplified: "It's like a 'neighborhood' for voting. You only vote for candidates in your specific area.",
        example: "If you live in New Delhi, your constituency might be 'New Delhi' or 'South Delhi'.",
        options: [{ text: "Back to Glossary", value: "gloss", next: "glossary_start" }]
    },
    term_mcc: {
        text: "📌 **Model Code of Conduct (MCC)**: A set of guidelines issued by the ECI for political parties and candidates during elections.\n\nIt ensures that the party in power doesn't use government resources to win.",
        simplified: "The 'fair play' rules for politicians.",
        example: "No new big government projects can be announced once the election dates are set.",
        options: [{ text: "Back to Glossary", value: "gloss", next: "glossary_start" }]
    },
    term_epic: {
        text: "📌 **EPIC Number**: Stands for **Electoral Photo Identity Card**. It's the unique 10-digit alpha-numeric number on your Voter ID card.",
        simplified: "Your unique ID number in the voter list.",
        example: "ABC1234567 - You can use this to find your name on the ECI website.",
        options: [{ text: "Back to Glossary", value: "gloss", next: "glossary_start" }]
    },

    // --- VOTING DAY GUIDE ---
    vote_step1: {
        title: "Step 1 of 6: Arrival",
        text: "On election day, you arrive at your assigned polling station. This is usually a public building like a school. You can find yours on the **Voter Helpline App**.",
        simplified: "Go to your local school or community center where people are voting. Use an app to find the exact room.",
        example: "Think of it like going to a bank, but with volunteers helping you find your way.",
        quiz: {
            question: "What is the primary document you should carry to the polling station?",
            options: ["Library Card", "Voter ID (EPIC)", "Gym Membership"],
            correct: 1,
            feedback: "Correct! EPIC is your ticket to vote, but Aadhaar also works!"
        },
        options: [
            { text: "Next: Identification", value: "next", next: "vote_step2" },
            { text: "Back to menu", value: "main", next: "main_menu" }
        ],
        progress: 16
    },
    vote_step2: {
        title: "Step 2 of 6: The First Official",
        text: "The first polling official checks your name on the electoral roll and verifies your identity card.",
        simplified: "An official makes sure you are allowed to vote at this specific location.",
        example: "Just like a ticket collector checking your train ticket.",
        quiz: {
            question: "Which of these is the MOST preferred ID for voting in India?",
            options: ["Passport", "EPIC (Voter ID)", "Ration Card"],
            correct: 1,
            feedback: "Correct! The Elector's Photo Identity Card (EPIC) is the primary document."
        },
        options: [
            { text: "Next: The Mark", value: "next", next: "vote_step3" }
        ],
        progress: 32
    },
    vote_step3: {
        title: "Step 3 of 6: Indelible Ink",
        text: "The second official marks your left forefinger with ink, takes your signature, and gives you a voter slip.",
        simplified: "They put special ink on your finger to show you've voted.",
        example: "The 'Ink of Pride'! It stays for weeks to prevent double voting.",
        options: [
            { text: "Next: The Machine", value: "next", next: "vote_step4" }
        ],
        progress: 48
    },
    vote_step4: {
        title: "Step 4 of 6: The EVM",
        text: "You go to the voting compartment. Press the blue button next to the candidate's symbol on the **Electronic Voting Machine (EVM)**.",
        simplified: "In private, you press a button for the person you want.",
        example: "It's like pressing a button on a vending machine!",
        quiz: {
            question: "What sound do you hear after pressing the button?",
            options: ["A bell", "A long beep", "No sound"],
            correct: 1,
            feedback: "Correct! A long beep confirms your vote."
        },
        options: [
            { text: "Next: Verification", value: "next", next: "vote_step5" }
        ],
        progress: 64
    },
    vote_step5: {
        title: "Step 5 of 6: VVPAT Slip",
        text: "Look at the **VVPAT machine** window. A slip will be visible for **7 seconds** showing your choice.",
        simplified: "A small window shows a paper confirming your pick before it drops into a box.",
        example: "It's a visual receipt you can see but not keep.",
        options: [
            { text: "Final Step", value: "next", next: "vote_step6" }
        ],
        progress: 80
    },
    vote_step6: {
        title: "Step 6 of 6: Done!",
        text: "You've successfully cast your vote! You can now proudly show your inked finger.",
        options: [
            { text: "Finish & Return", value: "main", next: "main_menu" }
        ],
        progress: 100
    },

    // --- SIMULATION MODE ---
    sim_start: {
        type: "scenario",
        text: "🚀 **Voting Day Simulation**\n\nYou've reached the Polling Station. It's crowded! A volunteer asks for your slip.",
        question: "What if you don't have a physical slip?",
        options: [
            { text: "Show Digital Slip on Phone", value: "digital", next: "sim_2" },
            { text: "Go home and cry", value: "cry", next: "sim_cry" }
        ],
        progress: 10
    },
    sim_cry: {
        text: "No need for tears! You can get a duplicate slip from the volunteers outside. Let's try again.",
        next_auto: "sim_start"
    },
    sim_2: {
        type: "scenario",
        text: "You're inside! The First Official is checking the list. They can't find your name.",
        question: "What's the best action?",
        options: [
            { text: "Double check my EPIC number", value: "epic", next: "sim_3" },
            { text: "Argue with the official", value: "argue", next: "sim_argue" }
        ],
        progress: 30
    },
    sim_argue: {
        text: "Arguing won't help. Officials are there to help! Let's be polite and check the EPIC number.",
        next_auto: "sim_2"
    },
    sim_3: {
        type: "scenario",
        text: "Success! Name found. Now, the Ink official is ready. They ask for your left hand.",
        options: [
            { text: "Hold out Left Forefinger", value: "left", next: "sim_4" },
            { text: "Give a high-five", value: "five", next: "sim_wrong_finger" }
        ],
        progress: 50
    },
    sim_wrong_finger: {
        text: "Haha! Save the high-fives for after you vote. **Left Forefinger** please!",
        next_auto: "sim_3"
    },
    sim_4: {
        type: "scenario",
        text: "Inked and ready! You enter the private booth. You see the EVM buttons.",
        question: "You want to vote for your favorite candidate. What do you do?",
        options: [
            { text: "Press the blue button once", value: "press", next: "sim_5" },
            { text: "Try to press multiple buttons", value: "multi", next: "sim_fail" }
        ],
        progress: 80
    },
    sim_fail: {
        text: "The machine only accepts one vote! Just press the blue button next to your choice.",
        next_auto: "sim_4"
    },
    sim_5: {
        type: "scenario",
        text: "*BEEEP!* The VVPAT shows your choice for 7 seconds. You're done!",
        question: "How do you feel about your first simulated vote?",
        options: [{ text: "Proud & Ready! 🇮🇳", value: "main", next: "main_menu" }],
        progress: 100
    }
};

let currentState = 'greeting';
let lastMessageWasControl = false;

// --- INITIALIZATION ---
function init() {
    renderState('greeting');
    setupEventListeners();
}

function setupEventListeners() {
    // Theme Toggle
    themeToggle.onclick = () => {
        document.body.classList.toggle('light-theme');
        themeToggle.innerText = document.body.classList.contains('light-theme') ? '🌙' : '🌓';
    };

    // Checklist Drawer
    checklistBtn.onclick = () => checklistDrawer.classList.add('open');
    closeDrawer.onclick = () => checklistDrawer.classList.remove('open');
    
    // Close drawer on clicking outside
    document.addEventListener('click', (e) => {
        if (!checklistDrawer.contains(e.target) && e.target !== checklistBtn && checklistDrawer.classList.contains('open')) {
            checklistDrawer.classList.remove('open');
        }
    });

    // Voice Input
    voiceInputBtn.onclick = toggleVoiceInput;

    // FAQ Drawer
    faqBtn.onclick = () => { renderFAQs(); faqDrawer.classList.add('open'); };
    closeFaq.onclick = () => faqDrawer.classList.remove('open');

    // Search
    searchToggle.onclick = () => {
        const isHidden = searchContainer.style.display === 'none';
        searchContainer.style.display = isHidden ? 'block' : 'none';
        if (isHidden) quickSearch.focus();
    };

    quickSearch.oninput = (e) => handleSearch(e.target.value);
}

const FAQS = [
    { q: "What is Form 6?", a: "Form 6 is used for new voter registration." },
    { q: "Can I vote online?", a: "No, in India, you must visit your polling station in person to vote using an EVM." },
    { q: "What is VVPAT?", a: "Voter Verifiable Paper Audit Trail - it shows a slip of your vote for 7 seconds." },
    { q: "How to check my name in the list?", a: "Visit electorsverify.eci.gov.in or use the Voter Helpline App." }
];

function renderFAQs() {
    faqList.innerHTML = '';
    FAQS.forEach(faq => {
        const div = document.createElement('div');
        div.className = 'faq-item';
        div.innerHTML = `
            <div class="faq-q">${faq.q}</div>
            <div class="faq-a">${faq.a}</div>
        `;
        div.onclick = () => div.classList.toggle('open');
        faqList.appendChild(div);
    });
}

function handleSearch(query) {
    searchResults.innerHTML = '';
    if (!query) return;

    const lower = query.toLowerCase();
    const matches = [];

    // Search through CONTENT keys and text
    for (const key in CONTENT) {
        const state = CONTENT[key];
        if (key.includes(lower) || (state.text && state.text.toLowerCase().includes(lower))) {
            matches.push({ title: state.title || key, key: key });
        }
    }

    matches.slice(0, 5).forEach(m => {
        const div = document.createElement('div');
        div.className = 'search-result-item';
        div.innerText = m.title;
        div.onclick = () => {
            renderState(m.key);
            searchContainer.style.display = 'none';
            quickSearch.value = '';
        };
        searchResults.appendChild(div);
    });
}
function setMascotState(state) {
    mascot.className = 'mascot-container ' + state;
}

// --- CELEBRATION ---
function triggerCelebration() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4f46e5', '#818cf8', '#f59e0b']
    });
    setMascotState('happy');
    setTimeout(() => setMascotState(''), 3000);
}

// --- RENDERING ---
async function renderState(stateKey, isControl = false) {
    const state = CONTENT[stateKey];
    if (!state) return;

    if (!isControl) currentState = stateKey;
    
    const typingId = showTyping();
    await sleep(lastMessageWasControl ? 300 : 600);
    removeTyping(typingId);

    if (state.progress !== undefined && !isControl) {
        progressFill.style.width = `${state.progress}%`;
        progressText.innerText = state.title || `Learning... ${state.progress}%`;
        if (state.progress === 100) triggerCelebration();
    }

    setMascotState('thinking');

    const msgDiv = document.createElement('div');
    msgDiv.className = `message bot ${state.type === 'scenario' ? 'scenario-card' : ''}`;
    
    let html = '<div class="message-content">';
    if (state.title && !isControl) html += `<span class="step-indicator">${state.title}</span>`;
    
    let textToDisplay = state.text;
    if (isControl === 'simplify') textToDisplay = `🔍 **Simplified:** ${state.simplified}`;
    if (isControl === 'example') textToDisplay = `💡 **Example:** ${state.example}`;
    
    html += `<button class="voice-btn" onclick="speakText(this)">🔊 Read</button>`;
    
    // Typing animation logic (word by word)
    const p = document.createElement('p');
    html += '</div>';
    msgDiv.innerHTML = html;
    
    // Add Reactions
    const reactionsDiv = document.createElement('div');
    reactionsDiv.className = 'reactions';
    reactionsDiv.innerHTML = `
        <button class="reaction-btn" onclick="this.classList.toggle('active')">👍</button>
        <button class="reaction-btn" onclick="this.classList.toggle('active')">👎</button>
    `;
    msgDiv.querySelector('.message-content').appendChild(p);
    msgDiv.querySelector('.message-content').appendChild(reactionsDiv);
    
    chatContainer.appendChild(msgDiv);
    scrollChat();

    // Natural word-by-word reveal (Optimized)
    const words = textToDisplay.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').split(' ');
    for (let i = 0; i < words.length; i++) {
        p.innerHTML += words[i] + ' ';
        // Only scroll every 3 words or at the end to save performance
        if (i % 3 === 0 || i === words.length - 1) scrollChat();
        await sleep(25);
    }

    if (state.question && !isControl) {
        const q = document.createElement('p');
        q.className = 'question';
        q.innerHTML = `❓ ${state.question}`;
        msgDiv.querySelector('.message-content').insertBefore(q, reactionsDiv);
        scrollChat();
    }

    // Interactive Form Handling
    if (state.type === 'form' && !isControl) {
        const formDiv = document.createElement('div');
        formDiv.className = 'interactive-form';
        state.fields.forEach(f => {
            formDiv.innerHTML += `
                <div class="form-group">
                    <label>${f.label}</label>
                    <input type="${f.type || 'text'}" placeholder="${f.placeholder || ''}">
                </div>
            `;
        });
        msgDiv.querySelector('.message-content').insertBefore(formDiv, reactionsDiv);
        scrollChat();
    }

    setMascotState('');

    if (state.quiz && isControl === 'quiz') {
        const quizDiv = document.createElement('div');
        quizDiv.className = 'quiz-card';
        quizDiv.innerHTML = `
            <p><strong>Quiz:</strong> ${state.quiz.question}</p>
            <div class="quiz-options">
                ${state.quiz.options.map((opt, i) => `
                    <button class="btn quiz-opt" onclick="handleQuiz('${stateKey}', ${i}, this)">${opt}</button>
                `).join('')}
            </div>
            <p class="quiz-feedback" style="display:none; margin-top: 10px; font-size: 0.85rem;"></p>
        `;
        msgDiv.querySelector('.message-content').insertBefore(quizDiv, reactionsDiv);
        scrollChat();
    }

    if (!isControl || isControl === 'quiz') {
        renderOptions(state.options, state);
    } else {
        renderOptions([
            { text: "Continue", value: "continue", next: state.options[0].next },
            { text: "Back to Menu", value: "main", next: "main_menu" }
        ], state);
    }
    
    lastMessageWasControl = !!isControl;
}

function renderOptions(options, state) {
    inputArea.innerHTML = '';
    const optionsRow = document.createElement('div');
    optionsRow.className = 'options-row';
    
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'btn';
        if (opt.value === 'main' || opt.value === 'continue') btn.classList.add('primary');
        btn.innerText = opt.text;
        btn.onclick = () => handleChoice(opt);
        optionsRow.appendChild(btn);
    });
    inputArea.appendChild(optionsRow);

    if (state.simplified || state.example || state.quiz) {
        const controlsRow = document.createElement('div');
        controlsRow.className = 'controls-row';
        if (state.simplified) controlsRow.appendChild(createControlBtn("✨ Simplify", () => renderState(currentState, 'simplify')));
        if (state.example) controlsRow.appendChild(createControlBtn("📖 Example", () => renderState(currentState, 'example')));
        if (state.quiz) controlsRow.appendChild(createControlBtn("🧠 Quiz Me", () => renderState(currentState, 'quiz')));
        inputArea.appendChild(controlsRow);
    }
}

function createControlBtn(text, onclick) {
    const btn = document.createElement('button');
    btn.className = 'btn control';
    btn.innerText = text;
    btn.onclick = onclick;
    return btn;
}

function handleChoice(option) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message user';
    msgDiv.innerText = option.text;
    chatContainer.appendChild(msgDiv);
    scrollChat();
    inputArea.innerHTML = '';
    setTimeout(() => renderState(option.next), 400);
}

// --- VOICE LOGIC ---
window.speakText = (btn) => {
    const text = btn.parentElement.innerText.replace('🔊 Read', '').trim();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    speechSynthesis.cancel(); // Stop any current speech
    speechSynthesis.speak(utterance);
    
    // Visual feedback
    btn.innerText = '🗣️ Speaking...';
    utterance.onend = () => btn.innerText = '🔊 Read';
};

window.handleQuiz = (stateKey, index, btn) => {
    const quiz = CONTENT[stateKey].quiz;
    const feedbackEl = btn.closest('.quiz-card').querySelector('.quiz-feedback');
    feedbackEl.style.display = 'block';
    if (index === quiz.correct) {
        feedbackEl.innerText = "✅ " + quiz.feedback;
        feedbackEl.style.color = "#4ade80";
        setMascotState('happy');
        setTimeout(() => setMascotState(''), 2000);
    } else {
        feedbackEl.innerText = "❌ Not quite. " + quiz.feedback;
        feedbackEl.style.color = "#f87171";
    }
    btn.closest('.quiz-options').querySelectorAll('.quiz-opt').forEach(b => b.disabled = true);
};

// --- VOICE RECOGNITION ---
let recognition;
function setupVoice() {
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-IN';

        recognition.onresult = (event) => {
            const text = event.results[0][0].transcript;
            handleVoiceResult(text);
        };

        recognition.onend = () => {
            voiceInputBtn.classList.remove('listening');
        };
    }
}

function toggleVoiceInput() {
    if (!recognition) {
        alert("Voice recognition not supported in this browser.");
        return;
    }
    if (voiceInputBtn.classList.contains('listening')) {
        recognition.stop();
    } else {
        voiceInputBtn.classList.add('listening');
        recognition.start();
    }
}

function handleVoiceResult(text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message user';
    msgDiv.innerText = `🎤 ${text}`;
    chatContainer.appendChild(msgDiv);
    scrollChat();
    
    // Simple keyword mapping
    const lower = text.toLowerCase();
    let found = false;
    if (lower.includes('start') || lower.includes('lesson')) { renderState('basics'); found = true; }
    else if (lower.includes('glossary')) { renderState('glossary_start'); found = true; }
    else if (lower.includes('menu')) { renderState('main_menu'); found = true; }
    
    if (!found) {
        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.className = 'message bot';
            botMsg.innerHTML = `<div class="message-content"><p>I heard "${text}". I'm still learning to understand speech! Try choosing an option below.</p></div>`;
            chatContainer.appendChild(botMsg);
            scrollChat();
        }, 600);
    }
}

setupVoice();

function showTyping() {
    const id = 'typing-' + Date.now();
    const div = document.createElement('div');
    div.id = id; div.className = 'message bot';
    div.innerHTML = '<div class="typing"><span></span><span></span><span></span></div>';
    chatContainer.appendChild(div);
    scrollChat();
    return id;
}

function removeTyping(id) { const el = document.getElementById(id); if (el) el.remove(); }
function scrollChat() { 
    // Use 'auto' behavior for better performance during rapid updates
    chatViewport.scrollTo({ 
        top: chatViewport.scrollHeight, 
        behavior: chatViewport.scrollHeight - chatViewport.scrollTop > 500 ? 'auto' : 'smooth' 
    }); 
}
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

init();
