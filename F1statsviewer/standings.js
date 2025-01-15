const seasonInput = document.getElementById('season-input');
const fetchStandingsButton = document.getElementById('fetch-standings');
const standingsResults = document.getElementById('standings-results');

-fetchStandingsButton.addEventListener('click', async () => {
    const season = seasonInput.value.trim(); 

    if (!season || isNaN(season)) {
        standingsResults.innerHTML = '<p>Please enter a valid year (e.g., 2023).</p>';
        return;
    }

    const apiUrl = `https://ergast.com/api/f1/${season}/driverStandings.json`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const standingsList = data.MRData.StandingsTable.StandingsLists;
        if (standingsList.length === 0) {
            standingsResults.innerHTML = `<p>No data found for the season ${season}. Please try another year.</p>`;
            return;
        }

        const standings = standingsList[0].DriverStandings;

        standingsResults.innerHTML = '';

        standings.forEach(driver => {
            const driverName = `${driver.Driver.givenName} ${driver.Driver.familyName}`;
            const teamName = driver.Constructors[0].name;
            const points = driver.points;

            const driverElement = document.createElement('div');
            driverElement.innerHTML = `
                <p><strong>${driverName}</strong></p>
                <p>Team: ${teamName}</p>
                <p>Points: ${points}</p>
                <hr>
            `;
            standingsResults.appendChild(driverElement);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        standingsResults.innerHTML = '<p>Failed to load standings. Please try again later.</p>';
    }
});
