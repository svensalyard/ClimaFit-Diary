function loadWorkouts() {
    fetch('/api/workouts')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(workouts => {
        const workoutList = document.getElementById('workoutList');
        workoutList.innerHTML = ''; // Clear current list
        workouts.forEach(workout => {
            const workoutElement = document.createElement('div');
            workoutElement.textContent = `Type: ${workout.type}, Date: ${workout.date}, Duration: ${workout.duration}`;
            workoutList.appendChild(workoutElement);
        });
    })
    .catch(error => {
        console.error('Error loading workouts:', error);
    });
}

// Add a new workout
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

document.addEventListener('DOMContentLoaded', () => {
    loadWorkouts();
});