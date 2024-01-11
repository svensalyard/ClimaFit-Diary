function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    const workoutData = {
        type: document.getElementById('workoutType').value,
        date: document.getElementById('workoutDate').value,
        duration: document.getElementById('workoutDuration').value
    };

    addWorkout(workoutData);
}

function loadWorkouts() {
    fetch('/api/workouts')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(workouts => {
        console.log('Workout List Element:', document.getElementById('workoutList'));
        const workoutList = document.getElementById('workoutList');
        if (workoutList) {
            workoutList.innerHTML = '';

        if (workouts.length === 0) {
            const noWorkoutElement = document.createElement('div');
            noWorkoutElement.classList.add('workout-item', 'no-workout');
            noWorkoutElement.textContent = 'Add Workouts for Today!';
            workoutList.appendChild(noWorkoutElement);
        } else {
            workouts.forEach(workout => {
                const workoutElement = document.createElement('div');
                workoutElement.classList.add('workout-item');
                // Format the date for readability
                const workoutDate = new Date(workout.date).toLocaleDateString();
                
                 // Create a checkbox input
                 const checkbox = document.createElement('input');
                 checkbox.type = 'checkbox';
                 checkbox.id = `workout-${workout.id}`;
                 checkbox.classList.add('workout-checkbox');
                 
                 const detailsSpan = document.createElement('span');
                 detailsSpan.innerHTML = `
                     <strong>Type:</strong> ${workout.type}
                     <strong>Date:</strong> ${workoutDate}
                     <strong>Duration:</strong> ${workout.duration} minutes
                 `;
 
                 // Append elements to workoutElement
                 workoutElement.appendChild(checkbox);
                 workoutElement.appendChild(detailsSpan);
                 workoutElement.innerHTML += `
                     <button onclick="editWorkout(${workout.id})">Edit</button>
                     <button onclick="deleteWorkout(${workout.id})">Delete</button>
                 `;

                workoutList.appendChild(workoutElement);
            });

        }

        }
      })
      
    .catch(error => {
        console.error('Error loading workouts:', error);
    });
}

// Add new workout
function addWorkout(workoutData) {
    fetch('/api/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workoutData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        loadWorkouts(); // Refresh the workout list
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function editWorkout(workoutId) {
    console.log('Edit workout with ID:', workoutId);

    // Fetch the workout details from the server or use locally stored data
    fetch(`/api/workouts/${workoutId}`)
        .then(response => response.json())
        .then(workout => {
            document.getElementById('editWorkoutId').value = workoutId;
            document.getElementById('editWorkoutType').value = workout.type;
            document.getElementById('editWorkoutDate').value = workout.date.split('T')[0]; // Format date for input
            document.getElementById('editWorkoutDuration').value = workout.duration;
            
            document.getElementById('editForm').style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching workout:', error);
        });
}

function submitEdit() {
    const workoutId = document.getElementById('editWorkoutId').value;
    const updatedWorkout = {
        type: document.getElementById('editWorkoutType').value,
        date: document.getElementById('editWorkoutDate').value,
        duration: parseInt(document.getElementById('editWorkoutDuration').value)
    };

    fetch(`/api/workouts/${workoutId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedWorkout)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        document.getElementById('editForm').style.display = 'none';
        loadWorkouts(); // Refresh the workout list
    })
    .catch(error => {
        console.error('Error updating workout:', error);
    });
}

function cancelEdit() {
    document.getElementById('editForm').style.display = 'none';
}

function deleteWorkout(workoutId) {
    fetch(`/api/workouts/${workoutId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        loadWorkouts(); // Refresh the workout list
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadWorkouts();
});

window.loadWorkouts = loadWorkouts;