function PricingModule(state, gallonsRequested) {
    var ppg = 0;
    var margin = 0;
    var total = 0;
    if (state !== 'TX') {
        margin += .04;
    }
    else {
        margin += .02;
    }
    //rate history
    if (gallonsRequested > 1000) {
        margin += .02;
    }
    else {
        margin += .03;
    }
    margin += .10;
    margin *= 1.50;
    ppg = margin + 1.50;
    total = gallonsRequested * ppg;
    return [ppg, total];
}

export default PricingModule