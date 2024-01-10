const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const data = await response.json();
      window.location.href = data.redirect;
    } else {
      const errorData = await response.json();
      const errorMessage = errorData.message || 'Login failed. Please try again.';
      $('#errorMessage').text(errorMessage);
      $('#errorModal').modal('show');
    }
  
  }
};

document.querySelector('#modalLoginForm').addEventListener('submit', loginFormHandler);

