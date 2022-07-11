'use strict';


// #########################################################################
//    Collects data from meal form and sents to BD + starts redrawTable fun                          
// #########################################################################

function enterMeal(evt) {
    evt.preventDefault();

    const formData = new FormData();
    formData.append('ingredients', document.querySelector('#ingredients').value)
    formData.append('meal_type', document.querySelector('#meal_type').value)
    formData.append('my_file', document.querySelector('#my_file').files[0]);


    
    fetch('/meal_journal_input', {
        method: 'POST',
        body: formData,
        })
    .then(response => response.json())
    .then(responseJson => redrawTable(responseJson));

}

// #########################################################################
//        Changes defaulte/old info to a new date from user                           
// #########################################################################

function redrawTable(response) {
    let print_date = Object.keys(response)[0];
    let responseJson= response[print_date];

    if (responseJson.breakfast) {
        document.getElementById(`${print_date} breakfast img`).innerHTML= `<img class="card-img-top img-circle" src="${responseJson.breakfast[1]}">`
        document.getElementById(`${print_date} breakfast ing`).innerHTML= `${responseJson.breakfast[0]}`
    }
    if (responseJson.lunch) {
        document.getElementById(`${print_date} lunch img`).innerHTML= `<img class="card-img-top img-circle" src="${responseJson.lunch[1]}">`
        document.getElementById(`${print_date} lunch ing`).innerHTML= `${responseJson.lunch[0]}`
    }
    if (responseJson.dinner) {
        document.getElementById(`${print_date} dinner img`).innerHTML= `<img class="card-img-top img-circle" src="${responseJson.dinner[1]}">`
        document.getElementById(`${print_date} dinner ing`).innerHTML= `${responseJson.dinner[0]}`
    }

}

// #########################################################################
//        Renders data from DB to html for a specific date                            
// #########################################################################

function drawTable(response) {

    for (let i = 6; i!=0;i--) {    
        let print_date = Object.keys(response)[i];
        let responseJson= response[print_date];


        let entry = `<div class="row">${print_date}</div>`;
        entry += `<div class="row"><label class="col-md-4">Breakfast</label><label class="col-md-4">Lunch</label><label class="col-md-4">Dinner</label></div>`;
        let imgs = '<div class="row">';
        let ingreds = '<div class="row">';

        if (responseJson.breakfast) {
            imgs +=  `<label id="${print_date} breakfast img" class="col-md-4"><img class="card-img-top img-circle" src="${responseJson.breakfast[1]}"></label>`;
        }
        else {
            imgs +=  `<label id="${print_date} breakfast img" class="col-md-4"><img class="card-img-top img-circle" src="/static/img/default_food_line_img.png"></label>`;
        }
        if (responseJson.lunch) {
            imgs +=  `<label id="${print_date} lunch img" class="col-md-4"><img class="card-img-top img-circle" src="${responseJson.lunch[1]}"></label>`;
        }
        else {
            imgs +=  `<label id="${print_date} lunch img" class="col-md-4"><img class="card-img-top img-circle" src="/static/img/default_food_line_img.png"></label>`;
        }
        if (responseJson.dinner) {
            imgs +=  `<label id="${print_date} dinner img" class="col-md-4"><img class="card-img-top img-circle" src="${responseJson.dinner[1]}"></label>`;
        }
        else {
            imgs +=  `<label id="${print_date} dinner img" class="col-md-4"><img class="card-img-top img-circle" src="/static/img/default_food_line_img.png"></label>`;
        }
        imgs+='</div>';

        if (responseJson.breakfast) {
            ingreds +=  `<div id="${print_date} breakfast ing" class="col-md-4">${responseJson.breakfast[0]}</div>`;
        }
        else {
            ingreds +=  `<div id="${print_date} breakfast ing" class="col-md-4">Breakfast Ingredients</div>`;
        }
        if (responseJson.lunch) {
            ingreds +=  `<div id="${print_date} lunch ing" class="col-md-4">${responseJson.lunch[0]}</div>`;
        }
        else {
            ingreds +=  `<div id="${print_date} lunch ing" class="col-md-4">Lunch Ingredients</div>`;
        }
        if (responseJson.dinner) {
            ingreds +=  `<div id="${print_date} dinner ing" class="col-md-4">${responseJson.dinner[0]}</div>`;
        }
        else {
            ingreds +=  `<div id="${print_date} dinner ing" class="col-md-4">Dinner Ingredients</div>`;
        }
        ingreds+='</div>';

        document.querySelector("#container").insertAdjacentHTML('beforeend', entry+imgs+ingreds);}

}

// #########################################################################
//        Getting info from BD about Meals from a specific date                            
// #########################################################################

function getMealsInfo() {

    const formInputs = {
        "date":td,
    };

    fetch("/meal_info_day", {
        "method": 'POST',
        "body": JSON.stringify(formInputs),
        "headers": {
          'Content-Type':'application/json',
        },
    })
    .then(response => response.json())
    .then(responseJson => drawTable(responseJson));
    
    td.setDate(td.getDate()-6)

}

// #########################################################################
//        Starts the process of rendering of meals                            
// #########################################################################

const td = new Date()

getMealsInfo();


document.querySelector('#meal_form').addEventListener('submit', enterMeal);

// #########################################################################
//                       Infinite scroll                           
// #########################################################################

window.addEventListener('scroll', () => {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

	if(clientHeight + scrollTop >= scrollHeight - 5) {
		getMealsInfo();
	}
});