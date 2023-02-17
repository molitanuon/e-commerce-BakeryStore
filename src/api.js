    
    import axios from 'axios';
    const apiBaseURL = 'http://localhost:300';

    // Getting the pastries data from the API (using fetch)
    // for reference : https://betterprogramming.pub/how-to-fetch-data-from-an-api-with-react-hooks-9e7202b8afcd
    
    //using axios
    export const GET = (url, port) =>{
        return axios.get(`${apiBaseURL+port}/${url}`);
    }

    export const POST = (url, data, port) =>{
        return axios(`${apiBaseURL+port}/${url}`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            data
        })
    }
