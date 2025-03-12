// Add these new functions to your existing JavaScript

// Voice Input Support
class VoiceInput {
    constructor() {
        this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        this.setupRecognition();
        this.isListening = false;
    }

    setupRecognition() {
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'vi-VN';

        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            document.getElementById('user-input').value = transcript;
        };

        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            this.stopListening();
        };

        this.recognition.onend = () => {
            this.stopListening();
        };
    }

    toggleListening() {
        if (this.isListening) {
            this.stopListening();
        } else {
            this.startListening();
        }
    }

    startListening() {
        this.recognition.start();
        this.isListening = true;
        document.querySelector('.voice-input-btn').classList.add('voice-input-active');
    }

    stopListening() {
        this.recognition.stop();
        this.isListening = false;
        document.querySelector('.voice-input-btn').classList.remove('voice-input-active');
    }
}

// Message Search
function setupSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'search-input';
    searchInput.placeholder = 'Tìm kiếm tin nhắn';

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const messages = document.querySelectorAll('.message');

        messages.forEach(message => {
            const text = message.textContent.toLowerCase();
            message.style.display = text.includes(searchTerm) ? 'flex' : 'none';
        });
    });

    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.appendChild(searchInput);

    document.querySelector('.chat-container').insertAdjacentElement('beforebegin', searchContainer);
}

// Message Categories
function addMessageCategory(message, category) {
    const categorySpan = document.createElement('span');
    categorySpan.className = 'message-category';
    categorySpan.textContent = category;
    message.querySelector('.message-content').insertAdjacentElement('afterbegin', categorySpan);
}

// Code Playground
class CodePlayground {
    constructor(container) {
        this.container = container;
        this.setup();
    }

    setup() {
        this.container.innerHTML = `
            <div class="code-playground-header">
                <select class="language-select">
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="html">HTML</option>
                </select>
                <button class="run-btn">Run</button>
            </div>
            <div class="code-playground-content">
                <textarea class="code-editor"></textarea>
                <div class="code-output"></div>
            </div>
        `;

        this.setupEventListeners();
    }

    setupEventListeners() {
        const runBtn = this.container.querySelector('.run-btn');
        runBtn.addEventListener('click', () => this.runCode());
    }

    async runCode() {
        const code = this.container.querySelector('.code-editor').value;
        const output = this.container.querySelector('.code-output');
        
        try {
            // For demonstration, only running JavaScript
            const result = eval(code);
            output.textContent = result;
        } catch (error) {
            output.innerHTML = `<div class="error-message">${error.message}</div>`;
        }
    }
}

// Initialize new features
document.addEventListener('DOMContentLoaded', () => {
    // Add voice input button
    const voiceBtn = document.createElement('button');
    voiceBtn.className = 'voice-input-btn';
    voiceBtn.innerHTML = '<span class="material-icons">mic</span>';
    document.querySelector('.input-container').insertBefore(voiceBtn, document.getElementById('user-input'));

    const voiceInput = new VoiceInput();
    voiceBtn.addEventListener('click', () => voiceInput.toggleListening());

    // Setup search
    setupSearch();

    // Initialize code playground for code messages
    document.querySelectorAll('.code-block').forEach(block => {
        new CodePlayground(block);
    });
});
