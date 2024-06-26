import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient('https://tcobuzjvyosomsgksmlr.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjb2J1emp2eW9zb21zZ2tzbWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMzNTg5NzUsImV4cCI6MjAyODkzNDk3NX0.70kPyp7QAIoEQH0Ji2GkPRFYPfkBpIApriZcKKNmjRg');

document.getElementById('submitBtn').addEventListener('click', async () => 
{
    const addPlate = document.getElementById('addPlate').value.trim().toUpperCase();
    const addMake = document.getElementById('addMake').value.trim();
    const addModel = document.getElementById('addModel').value.trim();
    const addColour = document.getElementById('addColour').value.trim();
    const addID = document.getElementById('addID').value.trim();

    const resultDiv = document.querySelector('main > div.result');

    // Check if any field is empty
    if (!addPlate || !addMake || !addModel || !addColour || !addID) 
    {
        resultDiv.innerText = 'Please fill in all of the boxs.';
        return;
    }

    // Construct the data object to be inserted into the database
    const vehicleData = 
    {
        vehicleid: addPlate,
        make: addMake,
        model: addModel,
        colour: addColour,
        ownerid: addID
    };

    try 
    {
        // Insert the data into the database
        const { data, error } = await supabase.from('vehicles').insert([vehicleData]);
        

        if (error) 
        {
            resultDiv.innerText = 'Error';
            console.error(error);
        } 
        else 
        {
            resultDiv.innerText = 'Vehicle added successfully!';
            // Clear the input fields after successful addition
            document.getElementById('addPlate').value = '';
            document.getElementById('addMake').value = '';
            document.getElementById('addModel').value = '';
            document.getElementById('addColour').value = '';
            document.getElementById('addID').value = '';
        }
    } 
    catch (error) 
    {
        console.error('Error adding vehicle:', error.message);
    }
});

