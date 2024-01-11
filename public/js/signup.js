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
            // Retrieve error message from response body
            const errorData = await response.json();
            const errorMessage = errorData.message || 'An error occured please try again.';
            
            // Display error message using modal
            $('#errorMessage').text(errorMessage);
            $('#errorModal').modal('show');
        }
    } else {
        $('#errorMessage').text('Password must be 8 characters or more. Please try again.')
        $('#errorModal').modal('show')
    }
}

document.querySelector('#modalRegisterForm').addEventListener('submit', signupFormHandler);
