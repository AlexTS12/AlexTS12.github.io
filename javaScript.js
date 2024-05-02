import { createClient } from '@supabase/supabase-js';

// Replace 'YOUR_SUPABASE_URL' and 'YOUR_SUPABASE_KEY' with your actual Supabase URL and API Key
const supabase = createClient('https://tcobuzjvyosomsgksmlr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjb2J1emp2eW9zb21zZ2tzbWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMzNTg5NzUsImV4cCI6MjAyODkzNDk3NX0.70kPyp7QAIoEQH0Ji2GkPRFYPfkBpIApriZcKKNmjRg');
import { createClient } from '@supabase/supabase-js'

document.addEventListener('DOMContentLoaded', function () {
    const submitBtn = document.getElementById('submitBtn');
    const searchNameInput = document.getElementById('searchName');
    const searchLicenseInput = document.getElementById('searchLicense');
    const searchResultsDiv = document.getElementById('searchResults');

    submitBtn.addEventListener('click', async function () {
        const name = searchNameInput.value.trim();
        const licenseNumber = searchLicenseInput.value.trim();

        // Query Supabase for user data
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('name', name)
            .eq('licensenumber', licenseNumber);

        if (error) {
            console.error('Error fetching user data:', error.message);
            searchResultsDiv.innerHTML = '<p>Error fetching user data. Please try again later.</p>';
            return;
        }

        if (data && data.length > 0) {
            const user = data[0];
            // Display user information in searchResultsDiv
            searchResultsDiv.innerHTML = `
                <h2>User Information</h2>
                <p>Name: ${user.name}</p>
                <p>Address: ${user.address}</p>
                <p>Date of Birth: ${user.dob}</p>
                <p>License Number: ${user.licensenumber}</p>
                <p>Expiry Date: ${user.expirydate}</p>
            `;
        } else {
            searchResultsDiv.innerHTML = '<p>No user found.</p>';
        }
    });
});


