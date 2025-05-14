

// Basic POST helper
function postData(url, data, callback) {
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(callback)
    .catch(() => alert('Network error'));
}

// Register form handler
const regForm = document.getElementById('register-form');
if (regForm) {
  regForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = this['reg-username'].value.trim();
    const email    = this['reg-email'].value.trim();
    const password = this['reg-password'].value;
    postData('/api/auth/register', { username, email, password }, result => {
      if (result.success) {
        localStorage.setItem('token', result.data.token);
        window.location = 'task.html';
      } else {
        alert(result.message || 'Registration failed');
      }
    });
  });
}

// Login form handler
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email    = this['login-email'].value.trim();
    const password = this['login-password'].value;
    postData('/api/auth/login', { email, password }, result => {
      if (result.success) {
        localStorage.setItem('token', result.data.token);
        window.location = 'task.html';
      } else {
        alert(result.message || 'Login failed');
      }
    });
  });
}
