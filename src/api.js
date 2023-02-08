    
    import axios from 'axios';
    const apiBaseURL = 'http://localhost:3000';

    // Getting the pastries data from the API (using fetch)
    // for reference : https://betterprogramming.pub/how-to-fetch-data-from-an-api-with-react-hooks-9e7202b8afcd
    
    //using axios
    export const GET = url =>{
        return axios.get(`${apiBaseURL}/${url}`);
    }

    export const POST = (url,data) =>{
        return axios(`${apiBaseURL}/${url}`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            data
        })
    }
