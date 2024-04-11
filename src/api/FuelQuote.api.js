const baseURL = "https://fuel.college:3001/";

export const getQuotes = async (ID) => {
    try {
        const response = await fetch(baseURL+`api/fuelquotes/${ID}`);
        if (response.status === 200) {                                                      
          const data = await response.json();
          return data.data;
        } else if (response.status === 401) {
          console.log("Invalid info request?");
          return null;
        } else {
          throw new Error(`Fetch error: ${response.status}`);
        }
    } catch (error) {
        console.error('Error getting info:', error);
        throw error;
    }
};