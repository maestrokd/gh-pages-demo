export const fetchDataFromAPI = async (userId) => {
    try {
        //const url = `http://localhost:8080/budget/categories?userId=${userId}`;
        //const url = `http://194.26.232.35:8083/budget/categories?userId=158602720`;
        const host = process.env.REACT_APP_BE_REST_HOST;
        console.log("host: " + host);
        // const url = `http://194.26.232.35:8083/budget/categories?userId=${userId}`;
        const url = `https://` + host + `/budget/categories?userId=${userId}`;
        console.log("URL: " + url);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data; // Return the entire response containing categories and subcategories map
    } catch (error) {
        throw error;
    }
};