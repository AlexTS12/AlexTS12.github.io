import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tcobuzjvyosomsgksmlr.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

document.addEventListener('DOMContentLoaded', function () {
    const submitBtn = document.getElementById('submitBtn');
    const searchNameInput = document.getElementById('searchName');
    const searchLicenseInput = document.getElementById('searchLicense');
    const searchResultsDiv = document.getElementById('searchResults');

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
            searchResultsDiv.innerHTML = '<p>Error fetching user data. Please try again later.</p>';
            return;
        }

        if (data && data.length > 0) {
            const user = data[0];
            // Display user information in searchResultsDiv
            searchResultsDiv.innerHTML = `
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
            searchResultsDiv.innerHTML = '<p>No user found.</p>';
        }
    });
});
