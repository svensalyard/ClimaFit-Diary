document.getElementById('openai-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    const question = document.getElementById('openai-question').value;
    
    // AJAX request to your server
    const response = await fetch('/api/openai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
    });

    const data = await response.json();

    // Display the answer in the modal
    document.getElementById('openai-answer').innerText = data.answer;

    // Optional: Clear the question input after getting the answer
    //document.getElementById('openai-question').value = '';
});
