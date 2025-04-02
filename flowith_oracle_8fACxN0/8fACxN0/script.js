// Prevent zooming on mobile
window.addEventListener("wheel", (e) => {
    const isPinching = e.ctrlKey
    if (isPinching) e.preventDefault()
}, { passive: false });

document.addEventListener('DOMContentLoaded', function() {
    // Scroll animation
    const scrollSections = document.querySelectorAll('.scroll-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    scrollSections.forEach(section => {
        observer.observe(section);
    });
    
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const sunIcon = darkModeToggle.querySelector('i');
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            sunIcon.setAttribute('data-lucide', 'moon');
            lucide.createIcons();
        } else {
            sunIcon.setAttribute('data-lucide', 'sun');
            lucide.createIcons();
        }
    });
    
    // Start journey button
    const startJourneyBtn = document.getElementById('startJourney');
    const introSection = document.getElementById('introduction');
    
    startJourneyBtn.addEventListener('click', () => {
        introSection.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Fun fact button
    const funFactBtn = document.querySelectorAll('.fox-fact-btn');
    const funFactDisplay = document.getElementById('funFact');
    
    const funFacts = [
        "Fennec foxes can close their ear canals to keep sand out during desert storms!",
        "The word 'fennec' comes from the Arabic word 'fanak' which means fox!",
        "A fennec fox's body temperature is lower than most mammals to help conserve water!",
        "Fennec foxes are the only fox species that can be legally kept as pets in some places!",
        "Their distinctive ears can detect prey moving underground!",
        "Fennec foxes can jump up to 2 feet high and 4 feet forward in a single leap!"
    ];
    
    funFactBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
            funFactDisplay.textContent = randomFact;
            funFactDisplay.classList.remove('hidden');
        });
    });
    
    // Ear comparison slider
    const earSlider = document.querySelector('.ear-slider');
    
    if (earSlider) {
        earSlider.addEventListener('input', function() {
            const sliderContainer = this.parentElement;
            const value = this.value;
            sliderContainer.style.backgroundSize = `${value}% 100%, ${100 - value}% 100%`;
        });
    }
    
    // Quiz functionality
    const quizQuestions = [
        {
            question: "What helps the fennec fox stay cool in the desert?",
            options: [
                { text: "Their thick fur", correct: false },
                { text: "Their big ears", correct: true },
                { text: "Their long tails", correct: false },
                { text: "Their small size", correct: false }
            ]
        },
        {
            question: "Where do fennec foxes live?",
            options: [
                { text: "In the rainforest", correct: false },
                { text: "In the mountains", correct: false },
                { text: "In the North Pole", correct: false },
                { text: "In the Sahara Desert", correct: true }
            ]
        },
        {
            question: "What do fennec foxes eat?",
            options: [
                { text: "Only plants", correct: false },
                { text: "Only meat", correct: false },
                { text: "Both plants and animals", correct: true },
                { text: "Only insects", correct: false }
            ]
        },
        {
            question: "When are fennec foxes most active?",
            options: [
                { text: "During the day", correct: false },
                { text: "At night", correct: true },
                { text: "In the early morning", correct: false },
                { text: "In the afternoon", correct: false }
            ]
        }
    ];
    
    let currentQuestionIndex = 0;
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('quiz-options');
    const resultElement = document.getElementById('quiz-result');
    const nextButton = document.getElementById('next-question');
    
    function loadQuestion(index) {
        const question = quizQuestions[index];
        questionElement.textContent = question.question;
        
        // Clear previous options
        optionsContainer.innerHTML = '';
        
        // Add new options
        question.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option.text;
            button.classList.add('quiz-option');
            button.dataset.correct = option.correct;
            button.addEventListener('click', selectAnswer);
            optionsContainer.appendChild(button);
        });
        
        // Hide result and next button
        resultElement.classList.add('hidden');
        nextButton.classList.add('hidden');
    }
    
    function selectAnswer(e) {
        const selectedButton = e.target;
        const isCorrect = selectedButton.dataset.correct === 'true';
        
        // Disable all options
        document.querySelectorAll('.quiz-option').forEach(button => {
            button.disabled = true;
            
            // Show correct/incorrect for all options
            if (button.dataset.correct === 'true') {
                button.classList.add('correct');
            } else if (button === selectedButton) {
                button.classList.add('incorrect');
            }
        });
        
        // Show result
        resultElement.textContent = isCorrect ? 
            '🎉 Correct! Great job!' : 
            '❌ Oops! That\'s not right. Try again!';
        resultElement.classList.remove('hidden');
        resultElement.classList.add(isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800');
        
        // Show next button
        if (currentQuestionIndex < quizQuestions.length - 1) {
            nextButton.classList.remove('hidden');
        } else {
            nextButton.textContent = 'Finish Quiz';
            nextButton.classList.remove('hidden');
        }
    }
    
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            loadQuestion(currentQuestionIndex);
        } else {
            // Quiz finished
            questionElement.textContent = 'Quiz completed!';
            optionsContainer.innerHTML = '';
            resultElement.textContent = 'You\'re now a fennec fox expert! 🦊';
            resultElement.classList.remove('hidden', 'bg-red-100', 'text-red-800');
            resultElement.classList.add('bg-green-100', 'text-green-800');
            nextButton.classList.add('hidden');
        }
    });
    
    // Initialize the first question
    loadQuestion(0);
    
    // Pledge button functionality
    const pledgeButton = document.getElementById('takePledge');
    const pledgeConfirmation = document.getElementById('pledgeConfirmation');
    
    if (pledgeButton) {
        pledgeButton.addEventListener('click', () => {
            pledgeButton.classList.add('bg-green-500');
            pledgeButton.textContent = 'Pledge Taken! ✅';
            pledgeConfirmation.classList.remove('hidden');
        });
    }
    
    // Fox sound button
    const playSoundBtn = document.getElementById('playSound');
    
    if (playSoundBtn) {
        playSoundBtn.addEventListener('click', () => {
            const audio = new Audio('https://actions.google.com/sounds/v1/animals/animal_squeak.ogg');
            audio.play();
            
            // Change button state
            playSoundBtn.classList.add('bg-purple-200');
            playSoundBtn.innerHTML = '<span class="flex items-center"><i data-lucide="volume-x" class="w-4 h-4 mr-2"></i> Playing Sound...</span>';
            lucide.createIcons();
            
            // Reset button after sound ends
            audio.onended = function() {
                playSoundBtn.classList.remove('bg-purple-200');
                playSoundBtn.innerHTML = '<span class="flex items-center"><i data-lucide="volume-2" class="w-4 h-4 mr-2"></i> Hear a Fennec Fox!</span>';
                lucide.createIcons();
            };
        });
    }
});
