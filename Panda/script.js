// Prevent zooming on the webpage
window.addEventListener("wheel", (e) => {
  const isPinching = e.ctrlKey;
  if(isPinching) e.preventDefault();
}, { passive: false });

document.addEventListener('DOMContentLoaded', function() {
  // Quiz functionality
  const checkAnswersBtn = document.getElementById('check-answers');
  const quizContainer = document.getElementById('quiz-container');
  const quizResults = document.getElementById('quiz-results');
  
  if (checkAnswersBtn) {
    checkAnswersBtn.addEventListener('click', function() {
      // Correct answers
      const correctAnswers = {
        q1: 'b', // Bamboo
        q2: 'c', // China
        q3: 'b'  // 10-16 hours
      };
      
      // Get all questions
      const questions = quizContainer.querySelectorAll('.quiz-question');
      let score = 0;
      
      // Check each question
      questions.forEach((question, index) => {
        const questionName = `q${index + 1}`;
        const selectedOption = question.querySelector(`input[name="${questionName}"]:checked`);
        
        // Reset previous styles
        question.querySelectorAll('label').forEach(label => {
          label.classList.remove('correct-answer', 'wrong-answer');
        });
        
        if (selectedOption) {
          const selectedLabel = selectedOption.parentElement;
          const correctOption = question.querySelector(`input[name="${questionName}"][value="${correctAnswers[questionName]}"]`);
          const correctLabel = correctOption.parentElement;
          
          // Highlight correct answer
          correctLabel.classList.add('correct-answer');
          
          // Check if selected answer is correct
          if (selectedOption.value === correctAnswers[questionName]) {
            score++;
          } else {
            // Highlight wrong answer
            selectedLabel.classList.add('wrong-answer');
          }
        } else {
          // If no answer was selected, highlight the correct one
          const correctOption = question.querySelector(`input[name="${questionName}"][value="${correctAnswers[questionName]}"]`);
          const correctLabel = correctOption.parentElement;
          correctLabel.classList.add('correct-answer');
        }
      });
      
      // Show results
      quizResults.innerHTML = `
        <div class="${score === 3 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'} p-4 rounded-lg">
          <p class="font-bold text-lg">You scored ${score} out of 3!</p>
          <p>${score === 3 ? 'Amazing! You are a panda expert!' : 'Good try! Keep learning about pandas.'}</p>
        </div>
      `;
      quizResults.classList.remove('hidden');
      
      // Scroll to results
      quizResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
  
  // Make all external links open in new tab
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
});
