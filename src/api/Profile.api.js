const baseURL = "https://fuel.college:3001/";

export const updateInfo = async (ID, itemBody) => {
    try {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(itemBody)
        }
        const response = await fetch(baseURL+`api/clientinfo/${ID}`, requestOptions);
        if (response.status === 200) {                                                      
          const data = await response.json();
          return data.results;
        } else if (response.status === 401) {
          console.log("Invalid update");
          return null;
        } else {
          throw new Error(`Fetch error: ${response.status}`);
        }
    } catch (error) {
        console.error('Error updating:', error);
        throw error;
    }
};

export const getInfo = async (ID) => {
    try {
        const response = await fetch(baseURL+`api/clientinfo/${ID}`);
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