function initOnboarding(onboardSteps) {
    console.log("onboarding doneskies", onboardSteps)
        // Import and initiate onboarding steps
        //var onboardSteps = [];

    // $.getJSON(filepath, function (result) {
    //     $.each(result, function (i, step) {
    //         onboardSteps.push(step);
    //     });

    var intro = introJs();
    intro.setOptions({
        'steps': onboardSteps,
        'doneLabel': 'Finish',
        'showProgress': false,
        'showBullets': true,
        'disableInteraction': true
    });
    intro.onbeforechange(function() {
        var func = this._introItems[this._currentStep].onbeforechange;
        if (func) {
            //if so, execute it.
            var f = new Function(func.args, func.body);
            f();
        }
    });
    intro.onchange(function() {
        var func = this._introItems[this._currentStep].onchange;
        if (func) {
            //if so, execute it.
            var f = new Function(func.args, func.body);
            f();
        }
    });
    intro.onafterchange(function() {
        var func = this._introItems[this._currentStep].onafterchange;
        if (func) {
            //if so, execute it.
            var f = new Function(func.args, func.body);
            f();
        }
    });

    intro.start();
}

function dismissIntroJs(cookieName) {
    // dimiss and disable the Intro JS walkthrough for X amount of time
    var dateNow = new Date(),
        dateNow_year = dateNow.getFullYear(),
        dateNow_month = dateNow.getMonth(),
        dateNow_day = dateNow.getDate(),
        dateNow_time = dateNow.getTime();

    var cookieExpiryDate = new Date(dateNow_year + 1, dateNow_month, dateNow_day).toUTCString();
    document.cookie = cookieName + "=" + true + "; expires=" + cookieExpiryDate;
    $('.introjs-donebutton').click();
}