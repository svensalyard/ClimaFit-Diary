document.getElementById('openai-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    const question = document.getElementById('openai-question').value;
    
    const response = await fetch('/api/openai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
    });
    
    const data = await response.json();
    console.log(data); // Log the data to see what you receive
    
    document.getElementById('openai-answer').innerText = data.answer;
    
    // Optional: Clear the question input after getting the answer
    //document.getElementById('openai-question').value = '';
});
