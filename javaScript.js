import { createClient } from '../@supabase/supabase-js'

const supabaseUrl = 'https://tcobuzjvyosomsgksmlr.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function search()
{
    let query = supabase.from("persons").select("*");


    const { data,error } = await query;

    if (error)
    {
        console.log('error', error);
    }
    else
    {
        console.log('data', data);
    }

}

search();