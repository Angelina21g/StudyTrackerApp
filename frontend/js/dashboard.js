// FRONTEND/js/dashboard.js

// Helper to GET with auth
function getData(url, callback) {
  const token = localStorage.getItem('token');
  fetch(url, {
    headers: { 'Authorization': 'Bearer ' + token }
  })
    .then(res => res.json())
    .then(callback)
    .catch(err => showFormMessage('Network error', 'error'));
}

// Helper to POST/PUT/DELETE with auth
function sendData(method, url, data, callback) {
  const token = localStorage.getItem('token');
  fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: data ? JSON.stringify(data) : null
  })
    .then(res => res.json())
    .then(callback)
    .catch(err => showFormMessage('Network error', 'error'));
}

// Show inline form message
function showFormMessage(msg, type = 'error') {
  const el = document.getElementById('form-message');
  el.textContent = msg;
  el.className = `form-message ${type}`;
}

// Clear inline message
function clearFormMessage() {
  const el = document.getElementById('form-message');
  el.textContent = '';
  el.className = 'form-message';
}

// Populate form for editing
function populateForm(t) {
  const form = document.getElementById('task-form');
  form['task-id'].value        = t._id;
  form['task-title'].value     = t.title;
  form['task-subject'].value   = t.subject;
  form['task-dueDate'].value   = t.dueDate ? t.dueDate.split('T')[0] : '';
  form['task-startTime'].value = t.startTime ? t.startTime.slice(0,16) : '';
  form['task-endTime'].value   = t.endTime ? t.endTime.slice(0,16) : '';
  form['task-priority'].value  = t.priority;
  showFormMessage('Edit mode: update fields and save.', 'success');
}

// Render tasks into the page
function showTasks(result) {
  if (!result.success) {
    showFormMessage('Failed to load tasks', 'error');
    return;
  }

  const list = document.getElementById('task-list');
  list.innerHTML = '';

  result.data.forEach(t => {
    const due   = t.dueDate      ? new Date(t.dueDate).toLocaleDateString()   : '—';
    const start = t.startTime    ? new Date(t.startTime).toLocaleString()     : '—';
    const end   = t.endTime      ? new Date(t.endTime).toLocaleString()       : '—';

    const div = document.createElement('div');
    div.className = 'task-card';
    div.innerHTML = `
      <h3>${t.title}</h3>
      <p><strong>Subject:</strong> ${t.subject}</p>
      <p><strong>Due:</strong> ${due}</p>
      <p><strong>Start:</strong> ${start}</p>
      <p><strong>End:</strong> ${end}</p>
      <p><strong>Priority:</strong> ${t.priority}</p>
      <div class="card-buttons">
        <button class="edit-btn" data-id="${t._id}">Edit</button>
        <button class="del-btn"  data-id="${t._id}">Delete</button>
      </div>
    `;
    list.appendChild(div);

    // Edit handler
    div.querySelector('.edit-btn').onclick = () => populateForm(t);

    // Delete handler
    div.querySelector('.del-btn').onclick = () => {
      if (!confirm('Delete this task?')) return;
      sendData('DELETE', `/api/tasks/${t._id}`, null, res => {
        if (res.success) loadTasks();
        else showFormMessage('Delete failed', 'error');
      });
    };
  });
}

// Load tasks on page load (and after any change)
function loadTasks() {
  clearFormMessage();
  document.getElementById('task-form').reset();
  getData('/api/tasks', showTasks);
}

// Handle create/update form submission
document.getElementById('task-form').addEventListener('submit', function(e) {
  e.preventDefault();
  clearFormMessage();

  const id        = this['task-id'].value;
  const title     = this['task-title'].value.trim();
  const subject   = this['task-subject'].value.trim();
  const dueDate   = this['task-dueDate'].value || null;
  const startTime = this['task-startTime'].value || null;
  const endTime   = this['task-endTime'].value || null;
  const priority  = this['task-priority'].value;

  if (!title || !subject || !priority) {
    return showFormMessage('Title, subject & priority are required.', 'error');
  }

  const payload = { title, subject, dueDate, startTime, endTime, priority };
  const method  = id ? 'PUT' : 'POST';
  const url     = id ? `/api/tasks/${id}` : '/api/tasks';

  sendData(method, url, payload, res => {
    if (res.success) {
      loadTasks();
      showFormMessage(id ? 'Task updated.' : 'Task added.', 'success');
    } else {
      showFormMessage(res.message || 'Save failed.', 'error');
    }
  });
});

// Initialize
loadTasks();
