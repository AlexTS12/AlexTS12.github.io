import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient('https://tcobuzjvyosomsgksmlr.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjb2J1emp2eW9zb21zZ2tzbWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMzNTg5NzUsImV4cCI6MjAyODkzNDk3NX0.70kPyp7QAIoEQH0Ji2GkPRFYPfkBpIApriZcKKNmjRg');

document.getElementById('submitBtn').addEventListener('click', async () => 
{
    const searchName = document.getElementById('searchName').value.trim().toLowerCase(); 
    const searchLicense = document.getElementById('searchLicense').value.trim().toUpperCase(); 

    let query = supabase.from('persons').select('*');
    if (searchName !== '') 
    {
        query = query.or(`name.ilike.*${searchName}*`); 
    }
    if (searchLicense !== '') 
    {
        query = query.or(`licensenumber.eq.${searchLicense}`);
    }

    const { data, error } = await query;

    const resultDiv = document.querySelector('main > div.result'); // Select the result container using the class
    if (error) 
    {
        resultDiv.innerText = 'Error';
        console.error(error);
    } 
    else 
    {
        if (data.length === 0) 
        {
            resultDiv.innerText = 'No results';
        } 
        else 
        {
            // Concatenate the information of each person into one string
            let resultHTML = '';
            data.forEach(person => 
                {
                resultHTML += `
                    <div class="person-info">
                        <p>Name: ${person.name}</p>
                        <p>Address: ${person.address}</p>
                        <p>Date of Birth: ${person.dob}</p>
                        <p>License Number: ${person.licensenumber}</p>
                        <p>Expiry Date: ${person.expirydate}</p>
                    </div>
                `;
            });
            resultDiv.innerHTML = resultHTML; // Set the concatenated string as innerHTML
        }
    }
});