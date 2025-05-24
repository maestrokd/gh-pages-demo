export const createApiUrlBase = (path, params = {}) => {
    const host = process.env.REACT_APP_BE_REST_HOST;
    return createApiUrl(host, path, params);
};

export const createApiUrl = (host, path, params = {}) => {
    const url = new URL(path, host);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    return url.toString();
};

export const fetchApi = async (url, options = {}) => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response;
        console.log("Received Data: " + data);
        return data;
    } catch (error) {
        console.log("Error in API call. message: " + error.message);
        console.log("Error in API call. error: " + error.stack);
        throw error;
    }
};

export const fetchDataFromAPI = async (userId) => {
    const url = createApiUrlBase("/budget/categories", { userId });
    return fetchApi(url).then(response => response.json());
};

export const fetchDataFromAPI2 = async (host, userId) => {
    const url = createApiUrl(host, "/budget/categories", { userId: userId });
    return fetchApi(url).then(response => response.json());
};

export const fetchDataFromAPI3 = async () => {
    const url = "https://api.restful-api.dev/objects/7";
    return fetchApi(url).then(response => response.json());
};

export const fetchDataFromAPI4 = async () => {
    const url = "https://194.26.232.35/budget/categories2";
    return fetchApi(url).then(response => response.json());
};

export const fetchBeStatus = async () => {
    const url = "https://prdev.be.familybudgetbot.xyz/health";
    return fetchApi(url).then(response => response.json());
};

export const fetchMessage = async (message="") => {
    const url = createApiUrlBase("/health/message", { message: message });
    return fetchApi(url).then(response => response.text());
};