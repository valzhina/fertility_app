
// #########################################################################
//                          Period to Server                              
// #########################################################################

function initial_water() {
    // evt.preventDefault();

    fetch('/get_water')
    .then(response => response.json())
    .then(responseJson => draw_glasses(responseJson.sum, responseJson.water_goal));
}


// #########################################################################
//                          ADDING WATER AMOUNT                             
// #########################################################################

function enter_water(evt) {
    evt.preventDefault();

    //getting input from radio buttons on updated water amount
    let hydration_level = document.querySelector("input[name=level_of_hydration]:checked").value;

    const formInputs = {
        "hydration_level": hydration_level,
    };

    //sending updated hydration level through server to DB
    fetch('/enter_water', {
        "method": 'POST',
        "body": JSON.stringify(formInputs),
        "headers": {
        'Content-Type':'application/json',
        },
    })
    .then(response => response.json())
    //getting response on water_level_sum and set water goal in order to update images on screen
    .then(responseJson => draw_glasses(responseJson.sum, responseJson.water_goal));

}

// #########################################################################
//                          SETS DAILY GOAL                              
// #########################################################################

function update_goal(evt) {
    evt.preventDefault();
    
    //getting number of desired amount of water per day from a user
    const water_goal = document.querySelector("#water_goal").value;

    const queryString = new URLSearchParams({"water_goal": water_goal}).toString();
    console.log(queryString);

    const url = `/set_goal?${queryString}`;

    //sending updated hydration goal through server to DB
    fetch(url)
    .then(response => response.json())
    //getting response on water_level_sum and set water goal in order to update images on screen
    .then(responseJson => draw_glasses(responseJson.sum, responseJson.water_goal));

}


// #########################################################################
//                          RENDERED GLASSES                              
// #########################################################################

function draw_glasses(sum, goal) {
    // console.log(sum, goal);
    document.querySelector("#image-container").innerHTML="";
    for (let glass=0; glass<goal; glass++) {
        if (sum>= 1) {
            document.querySelector("#image-container").insertAdjacentHTML('afterbegin','<div class="col-3"><img src="/static/img/water/full.jpeg" style="width:100%"></div>');
        }
        else if (sum >=0.5) {
            document.querySelector("#image-container").insertAdjacentHTML('afterbegin','<div class="col-3"><img src="/static/img/water/half.jpeg" style="width:100%"></div>');
        }
        else {
            document.querySelector("#image-container").insertAdjacentHTML('afterbegin','<div class="col-3"><img src="/static/img/water/empty.jpeg" style="width:100%"></div>');
        }
        sum--;

    }
}

// gets today's date from class Date and turns it into a string
const date = new Date().toISOString().split("T")[0];
// adds today's date to Water Page
document.querySelector("#todays_date").insertAdjacentHTML('afterbegin',`<p>${date}</p>`);
// initiates water entry
document.querySelector("#submit").addEventListener("click", enter_water)
//initiates water goal amount for a day
document.querySelector("#reg-modal-water-form").addEventListener("click", update_goal)

//initiates water function 
initial_water()