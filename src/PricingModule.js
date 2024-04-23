const baseURL = "https://fuel.college:3001/";

async function PricingModule(state, gallonsRequested, ID) {
    var ppg = 0;
    var margin = 0;
    var total = 0;
    try {
        console.log(ID)
        const response = await fetch(baseURL + `api/hasFuelQuotes/${ID}`);
        const data = await response.json();
        const hasHistory = data.hasHistory;
        console.log(hasHistory);

        if (state !== 'TX') {
            margin += .04;
        }
        else {
            margin += .02;
        }
        console.log(margin)
        if (hasHistory) {
            margin -= .01;  // Reduce margin if no history
        }
        console.log(margin)
        if (gallonsRequested > 1000) {
            margin += .02;
        }
        else {
            margin += .03;
        }
        console.log(margin)
        margin += .10;
        console.log(margin)
        margin *= 1.50;
        console.log(margin)
        ppg = margin + 1.50;
        total = gallonsRequested * ppg;
        return [ppg, total];
    } catch (error) {
        console.error('Error in PricingModule:', error);
        throw error;
    }
}

export default PricingModule