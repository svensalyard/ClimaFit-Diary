$(document).ready(function() {
    var cumulativeCalories = 0;
    var recentEntries = [];  
    var lastSearchedItem = null;

    function checkIfUserLoggedIn() {
        return $.ajax({
            url: '/api/users/isloggedin',
            method: 'GET'
        });
    }

    // Check if the user is logged in before fetching saved calorie data
    checkIfUserLoggedIn().then(response => {
        if (response.loggedIn) {
            fetchSavedCalorieData(); // User is logged in, proceed to fetch saved data
        } else {
            console.log("User is not logged in.");
            // Handle the scenario when user is not logged in
        }
    });
    
    // Fetch saved calorie data when the page load
    $('#fetchCalories').click(function() {
        var query = $('#foodInput').val();
        if (query) {
            fetchCalorieData(query);
        } else {
            alert('Please enter a food item');
        }
    });

    $('#calculateTotal').click(function() {
        if (lastSearchedItem) {
            cumulativeCalories += lastSearchedItem.totalCalories;
            recentEntries.push(lastSearchedItem);
            $('#totalCalories').text(`Total Calories: ${cumulativeCalories.toFixed(2)}`);
            updateRecentEntriesDisplay();
            lastSearchedItem = null; 
        }
    });


    function fetchSavedCalorieData() {
        $.ajax({
            method: 'GET',
            url: '/api/calories/get',
            success: function(response) {
                cumulativeCalories = response.calories || 0;
                $('#totalCalories').text(`Total Calories: ${cumulativeCalories.toFixed(2)}`);
            },
            error: function(jqXHR) {
                console.error('Error fetching saved calories:', jqXHR.responseText);
            }
        });
    }

    function fetchCalorieData(query) {
        $.ajax({
            method: 'GET',
            url: 'https://api.calorieninjas.com/v1/nutrition?query=' + query,
            headers: { 'X-Api-Key': 'Vjt4N7q3/sBL8sXQmWA7uw==C45rFsaEgvfzitJp'}, // Replace with your actual API key
            contentType: 'application/json',
            success: function(result) {
                if (result.items && result.items.length > 0) {
                displayNutritionInfo(result.items[0], query);
            } else {
                alert("No nutritional data found for this item.");
            }
            },
            error: function ajaxError(jqXHR) {
                console.error('Error: ', jqXHR.responseText);
            }
        });
    }

    function displayNutritionInfo(item, query) {
        // Update the last searched item
        lastSearchedItem = {
            query: query,
            totalCalories: item.calories
        };

        // Display the nutritional information of the current query
        $('#calories').text(item.calories.toFixed(2));
        $('#protein').text(item.protein_g.toFixed(2));
        $('#fat').text(item.fat_total_g.toFixed(2));
        $('#carbs').text(item.carbohydrates_total_g.toFixed(2));
    }

    function updateRecentEntriesDisplay() {
        var entriesHtml = recentEntries.map((entry, index) => 
            `<li><strong>${entry.query}: ${entry.totalCalories.toFixed(2)} calories 
             <button onclick="removeEntry(${index})">Remove</button></li>`
        ).join('');
        $('#recentEntries').html(entriesHtml);
    }

    window.removeEntry = function(index) {
        if (recentEntries[index]) {
            cumulativeCalories -= recentEntries[index].totalCalories;
            recentEntries.splice(index, 1);
            $('#totalCalories').text(`Total Calories: ${cumulativeCalories.toFixed(2)}`);
            updateRecentEntriesDisplay();
        }
    }

    function saveCalorieData(calories) {
        $.ajax({
            method: 'POST',
            url: '/api/calories',
            data: JSON.stringify({ calories }),
            contentType: 'application/json',
            success: function(response) {
                console.log('Calories saved:', response.message);
            },
            error: function(jqXHR) {
                console.error('Error saving calories:', jqXHR.responseText);
            }
        });
    }
});