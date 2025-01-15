const calendarResults = document.getElementById('calendar-results');
const calendarSeason = document.getElementById('calendar-season');

(async () => {
    const season = '2024';
    const apiUrl = `https://ergast.com/api/f1/current.json`;
    calendarSeason.textContent = season;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const races = data.MRData.RaceTable.Races;

        races.forEach(race => {
            const raceElement = document.createElement('div');
            raceElement.innerHTML = `
                <p><strong>${race.raceName}</strong></p>
                <p>Date: ${race.date}</p>
                <p>Location: ${race.Circuit.circuitName}</p>
                <hr>
            `;
            calendarResults.appendChild(raceElement);
        });
    } catch (error) {
        console.error('Error fetching race calendar:', error);
        calendarResults.innerHTML = '<p>Failed to load race calendar.</p>';
    }
})();
