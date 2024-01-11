async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users/signup', {
            method: 'post',
            body: JSON.stringify({
                username,  
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            window.location.href = '/'; // Redirect to the root route
        } else {
            const errorData = await response.json();
            let errorMessage = errorData.message;

            if (errorMessage && typeof errorMessage === 'string' && errorMessage.toLowerCase().includes('password length')) {
                errorMessage = 'Password must be at least 8 characters long.';
            } else {
                errorMessage = errorMessage || 'An error occurred. Please try again.';
            }
            // Display error message using modal
            $('#errorMessage').text(errorMessage);
            $('#errorModal').modal('show');
        }
    }
}

document.querySelector('#modalRegisterForm').addEventListener('submit', signupFormHandler);
