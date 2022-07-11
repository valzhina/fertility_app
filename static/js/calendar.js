// Create Date object via Date object constructor function
// it will return the current date and time + specifies the browser timezone as a fulltext string
const date = new Date();
// date.setMonth(8);
// const month = date.getMonth();
// date.setDate(7);
// console.log(date);


// #########################################################################
//            Main function to render the Calendar                                       
// #########################################################################
const fertilityCalendar = () => {

    const monthDays = document.querySelector(".days");

    // Create new Date object and this time define current year and current month. 0 will specify the last day of previous month, +1, 0: end day of this month
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    // console.log(lastDay);

    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    // console.log(date.getDay());

    //getDay returns the index number of the days of the week. Sun index number  = 0
    // Get index of first day of month
    const firstDayIndex = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    // console.log(firstDayIndex)

    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

    //console.log(lastDayIndex());

    const nextDays = 7 - lastDayIndex - 1;

    const months = [
        "January",
        "February",
        "March",
        "April", 
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November", 
        "December",
    ];

    // Select h1(month) element in date class and change it property, by using Data object method .getMonth 
    document.querySelector('.date h1').innerHTML = months[date.getMonth()];
    document.querySelector('.date p').innerHTML = new Date().toDateString();

// #########################################################################
//           rendering not-active Days of last month                                    
// #########################################################################
    let days = "";

    // x will be the counter, then define the number of iterations, and on each iteration create a new div 
    // on each iteration a new div element will be created for the previouse month day. Define the condition where x > 0
    for(let x = firstDayIndex; x > 0; x--){
        days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
    }

// #########################################################################
//           rendering active Days with Notes and Period data                                    
// #########################################################################
    for(let i = 1; i <= lastDay; i++){

        if(i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
            days += `<div id="${i}" class="today day selected_date">${i} <i id='icon${i}'></i></div>`;
        }
        else{
            // create a div element and pass i vairable  
            days += `<div class="day" id="${i}" >${i}<i id='icon${i}'></i></div>`;
        }

    }

// #########################################################################
//           rendering not-active Days of next month                                    
// #########################################################################
    for(let j = 1; j <= nextDays; j++){
        days += `<div class="next-date">${j}</div>`;
    }


    monthDays.innerHTML = days;

 

    const start_date = new Date(date.getFullYear(), date.getMonth());
    const end_date = new Date(date.getFullYear(), date.getMonth()+1);
    const formInputs = {
        "start_date": start_date,
        "end_date": end_date,
    };
    console.log(start_date)
    fetch('/req_calendar', {
        "method": 'POST',
        "body": JSON.stringify(formInputs),
        "headers": {
        'Content-Type':'application/json',
        },
    })
    .then(response => response.json())
    .then(responseJson => {
        console.log(responseJson)
        for (i of responseJson.periods) {
            document.getElementById(`${i}`).classList.add("period");
        }
        for (i of responseJson.notes) {
            document.getElementById(`icon${i}`).classList.add("bi");
            document.getElementById(`icon${i}`).classList.add("bi-chat-heart");
        }
    });


// #########################################################################
//           Rendering the day that was selected                                  
// #########################################################################
    const dayElements = document.querySelectorAll('.day'); 

    for (let day of dayElements) {
        day.addEventListener('click',() => {

            if (document.querySelector(".selected_date") !== null) {
                document.querySelector(".selected_date").classList.remove("selected_date");
            }

            day.classList.add("selected_date");

        // #########################################################################
        //           Sending request on selected day to Server                                 
        // #########################################################################

            let note_date = new Date(date.getFullYear(), date.getMonth(), day.id); 

            const formInputs = {
                "note_date":note_date,
            };
            // console.log(formInputs);
            fetch('/read_note.json', {
                "method": 'POST',
                "body": JSON.stringify(formInputs),
                "headers": {
                  'Content-Type':'application/json',
                },
            })
            .then(response => response.json())
            .then(responseJson => {
                document.querySelector("#box-for-note").innerHTML="";
                for(let res of responseJson.notes) {
                    document.querySelector("#box-for-note").insertAdjacentHTML('afterbegin',`<p>${res}</p>`);
                }
            });


        });
    }

}

// #########################################################################
//           Navigation through Months                                
// #########################################################################
document.querySelector('.prev').addEventListener('click',() => {
    date.setMonth(date.getMonth() -1);
    fertilityCalendar();
});

document.querySelector('.next').addEventListener('click',() => {
    date.setMonth(date.getMonth() + 1);
    fertilityCalendar();
});

fertilityCalendar();


// #########################################################################
//                          Period to Server                              
// #########################################################################

function addPeriod(evt) {
    evt.preventDefault();

    if (document.querySelector(".selected_date").id !== null) {
        let day = document.querySelector(".selected_date").id; // selects only int aka day of a month
        const dtt = new Date(date.getFullYear(), date.getMonth(), day); //adds year + month + day. Now it is Date

        let periode = document.querySelector("#period_length").value;

        const formInputs = {
            "date_time": dtt,
            "period_length": document.querySelector('#period_length').value,
        };
        console.log(formInputs);
        fetch('/add_period.json', {
            "method": 'POST',
            "body": JSON.stringify(formInputs),
            "headers": {
            'Content-Type':'application/json',
            },
        });
        }
    else {
        console.log("select day");
    }
}

document.querySelector("#reg-modal-period-form").addEventListener("click", addPeriod); //Once Add Period activated


// #########################################################################
//                          Notes to Server                              
// #########################################################################
function addNote(evt) {
    evt.preventDefault();
    
    if (document.querySelector(".selected_date").id !== null) {
        let day = document.querySelector(".selected_date").id; // selects only int aka day of a month
        const dtt = new Date(date.getFullYear(), date.getMonth(), day); //adds year + month + day. Now it is Date

        let note = document.querySelector("#note_text").value;

        const formInputs = {
            "date_time": dtt,
            "note_text": document.querySelector('#note_text').value,
        };

        fetch('/add_note.json', {
            "method": 'POST',
            "body": JSON.stringify(formInputs),
            "headers": {
            'Content-Type':'application/json',
            },
        });

    }
    else {
        console.log("select day");
    }
}

document.querySelector("#reg-modal-note-form").addEventListener("click", addNote);//Once Add Note activated

