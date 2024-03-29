const baseURL = "https://fuel.college:3001/";

//register
export const userRegistration = async (itemBody) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(itemBody)
        }
        const response = await fetch(baseURL+"api/usercredentials", requestOptions);
        console.log(response);
        if (response.status === 200) {
          return true;
        } else if (response.status === 409) {
          console.log("Error creating user");
          return false;
        } else {
          throw new Error(`Fetch error: ${response.status}`);
        }
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
  };

  //login
  export const userLogin = async (itemBody) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(itemBody)
        }
        const response = await fetch(baseURL+"api/usercredentials/login", requestOptions);
        if (response.status === 200) {
          const data = await response.json();
          return data.results;
        } else if (response.status === 401) {
          console.log("Invalid login credentials");
          return null;
        } else {
          throw new Error(`Fetch error: ${response.status}`);
        }
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

