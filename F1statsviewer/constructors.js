// DOM Elements
const seasonInput = document.getElementById('season-input');
const fetchConstructorsButton = document.getElementById('fetch-constructors');
const constructorsResults = document.getElementById('constructors-results');

fetchConstructorsButton.addEventListener('click', async () => {
    const season = seasonInput.value.trim(); 

    if (!season || isNaN(season)) {
        constructorsResults.innerHTML = '<p>Please enter a valid year (e.g., 2023).</p>';
        return;
    }

    const apiUrl = `https://ergast.com/api/f1/${season}/constructorStandings.json`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const standingsList = data.MRData.StandingsTable.StandingsLists;
        if (standingsList.length === 0) {
            constructorsResults.innerHTML = `<p>No data found for the season ${season}. Please try another year.</p>`;
            return;
        }

        const standings = standingsList[0].ConstructorStandings;

        constructorsResults.innerHTML = '';

        standings.forEach(constructor => {
            const teamName = constructor.Constructor.name;
            const points = constructor.points;
            const position = constructor.position;

            const constructorElement = document.createElement('div');
            constructorElement.innerHTML = `
                <p><strong>${position}. ${teamName}</strong></p>
                <p>Points: ${points}</p>
                <hr>
            `;
            constructorsResults.appendChild(constructorElement);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        constructorsResults.innerHTML = '<p>Failed to load constructors\' standings. Please try again later.</p>';
    }
});
