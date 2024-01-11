document.getElementById('openai-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const question = document.getElementById('openai-question').value;
    
    const response = await fetch('/api/openai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
    });
    
    const data = await response.json();
    console.log(data);
    
    document.getElementById('openai-answer').innerText = data.answer;
    
});
