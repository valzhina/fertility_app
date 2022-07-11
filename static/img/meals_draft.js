'use strict';

// PART 0: Build calendar and handle clicks

let $calendar = document.getElementById("calendar");
  
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

let calendarize = new Calendarize();
let opts =  {
    showMonth: true,
    showDaysOfWeek: true,
    showYear: true,
    clickHandler: function(e) {
            let day = e.target.getAttribute("data-date");
            getMealsInfo(day);
            }
};
$calendar.appendChild(calendarize.buildMonth(currentMonth,currentYear,opts));

function getMealsInfo(day) {
    
    const input = new FormData();
    input.append('day', day)
    
    fetch("/meal_info_day", {
        method: 'POST',
        body: input,
    })
    .then(response => response.json())
    .then(document.querySelector("#img_list").innerHTML="")
    .then(responseJson => {
        for(let i in responseJson.img) {
            document.querySelector("#img_list").insertAdjacentHTML('afterbegin',`<p>${responseJson.meal_type[i]}</p><img src="${responseJson.img[i]}"><p>${responseJson.ingredient[i]}</p>`);
        }
    })

}


// PART 1: Show meals that have been uploaded right after upload

// function enterBreakfast(evt) {
//     evt.preventDefault();

//     const formData = new FormData();
//     formData.append('ingredients', document.querySelector('#ingredients').value)
//     formData.append('meal_type', document.querySelector('#meal_type').value)
//     formData.append('my_file', document.querySelector('#my_file').files[0]);

//     // const formInputs = {'ingredients':document.querySelector('#ingredients').value,
//     //                     'meal_type':document.querySelector('#meal_type').value,
//     //                     'meal_img':document.querySelector('#my_file').value}

//     // for (let entry of formData.values()) {
//     //     console.log(entry);
//     // }
    
//     fetch('/meal_journal_input', {
//         method: 'POST',
//         body: formData,
//         })
//         // .then(response => response.json())
//         // .then(responseJson => {
//         //     for(let img of responseJson.img) {
//         //         document.querySelector("#img_list").insertAdjacentHTML('afterbegin',`<img src="${img}">`);
//         //     }
//         // })
//         .then(response => response.text())
//         .then(meal_img => {

//             // for(let img of responseText.img) {
//                 document.querySelector("#img_list").insertAdjacentHTML('afterbegin',`<img src="${meal_img}">`);
//             }
//         )
// }

// document.querySelector('#meal_form').addEventListener('submit', enterBreakfast);
