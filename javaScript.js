const supabaseUrl = 'https://tcobuzjvyosomsgksmlr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjb2J1emp2eW9zb21zZ2tzbWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMzNTg5NzUsImV4cCI6MjAyODkzNDk3NX0.70kPyp7QAIoEQH0Ji2GkPRFYPfkBpIApriZcKKNmjRg'; // Replace with your Supabase key
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', async function () {
    const searchResults = document.getElementById('searchResults');

    // Initialize user information box with an empty state
    searchResults.innerHTML = `
        <div class="user-info-box">
            <h2>User Information</h2>
            <p>No user found.</p>
        </div>
    `;

    const submitBtn = document.getElementById('submitBtn');
    const searchNameInput = document.getElementById('searchName');
    const searchLicenseInput = document.getElementById('searchLicense');

    submitBtn.addEventListener('click', async function () {
        const name = searchNameInput.value.trim();
        const licenseNumber = searchLicenseInput.value.trim();

        // Query Supabase for user data from the "persons" table
        const { data, error } = await supabase
            .from('persons')
            .select('*')
            .eq('name', name)
            .eq('licensenumber', licenseNumber);

        if (error) {
            console.error('Error fetching user data:', error.message);
            return;
        }

        if (data && data.length > 0) {
            const user = data[0];
            // Update user information box
            searchResults.innerHTML = `
                <div class="user-info-box">
                    <h2>User Information</h2>
                    <p>Name: ${user.name}</p>
                    <p>Address: ${user.address}</p>
                    <p>Date of Birth: ${user.dob}</p>
                    <p>License Number: ${user.licensenumber}</p>
                    <p>Expiry Date: ${user.expirydate}</p>
                </div>
            `;
        } else {
            // If no user found, display appropriate message
            searchResults.innerHTML = `
                <div class="user-info-box">
                    <h2>User Information</h2>
                    <p>No user found.</p>
                </div>
            `;
        }
    });
});
