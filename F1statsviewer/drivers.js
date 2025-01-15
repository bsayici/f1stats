const driversResults = document.getElementById('drivers-results');

(async () => {
    const apiUrl = 'https://ergast.com/api/f1/2024/drivers.json';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const drivers = data.MRData.DriverTable.Drivers;

        drivers.forEach(driver => {
            const driverElement = document.createElement('div');
            driverElement.innerHTML = `
                <p><strong>${driver.givenName} ${driver.familyName}</strong></p>
                <p>Nationality: ${driver.nationality}</p>
                <p>Date of Birth: ${driver.dateOfBirth}</p>
                <hr>
            `;
            driversResults.appendChild(driverElement);
        });
    } catch (error) {
        console.error('Error fetching drivers:', error);
        driversResults.innerHTML = '<p>Failed to load driver profiles.</p>';
    }
})();
