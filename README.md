# Fertility App
Fertility App is, a place where you can build your own fertility profile combining all 
your fertility tracking elements in one place. The project is about fertility management tools 
that are tailored to maximize chances of pregnancy especially later in life.  

## Contents

- [Features](https://github.com/valzhina/fertility_app/new/master?readme=1#features)
- [Technologies and Stack](https://github.com/valzhina/fertility_app/new/master?readme=1#technologies-and-stack)
- [Set-up & Installation](https://github.com/valzhina/fertility_app/new/master?readme=1#set-up--installation)
- [About the Developer](https://github.com/valzhina/fertility_app/new/master?readme=1#about-the-developer)

## Features
User registration and log-in
   
![Alt text](/static/gifs/fertillity_app_SignUp.gif "SignUp")
   
##      
User-friendly landing page
 
    

![Alt text](/static/gifs/fertillity_app_HomePage.gif "HomePage")

## Temperature Feature
In the temperature feature users can track their basal body temperature daily and see a summary of their past data in a chart.
ChartJS is used to build this page. 
   
![Alt text](/static/gifs/fertillity_app_temperature.gif "Temperature")

## Meal Journal Feature
   
The meals feature allows you to keep track of what you ate by uploading a photo and 
adding a description using the ingredients field. The feature of photo uploading is implemented using the Cloudinary API.
   
![Alt text](/static/gifs/fertillity_app_MealJournal.gif "MealJournal")

## Supplements Feature
If you are using a lot of supplements to boost your fertility, you can record the necessary dosage information including 
frequency and duration. The data is rendered in the form of a table.
   
![Alt text](/static/gifs/fertillity_app_supplements.gif "Supplements")

## Calendar Feature
On the calendar, users can add relevant notes like their mood, intercourse activity, and cervical fluids. 
This data is entered and displayed using Bootstrap Modal. The calendar then is updated accordingly with an icon to indicate days with notes. 
Users can also document their periods which will style the calendar entry.
   
![Alt text](/static/gifs/fertillity_app_calendar.gif "Calendar")

## Stay hydrated
With the stay hydrated feature, users can visualize their water intake and set goals they have for the future.
With their action plan in place this tool can help users to build healthy habit of drinking more water which 
is extremely important for fertility. <br />
AJAX is used here to prevent page from reloading. 
Once a new input is submitted it will be immediately displayed below by filling a virtual glass with water.
   
![Alt text](/static/gifs/fertillity_app_water.gif "Water")




## Technologies and Stack
The visual design of this site is implemented using Bootstrap, HTML and CSS. 
JavaScript and AJAX requests are used for interactivity.

**Backend:** Python, Flask, SQLAlchemy <br />
**Frontend:** Javascript, jQuery, Bootstrap, HTML5, CSS3 <br />
**Databases:** PostgreSQL
**APIs:** Cloudinary




## Set-up & Installation
Install [Python3](https://www.python.org/downloads/macos/) <br />
Install [pip](https://pip.pypa.io/en/stable/installing/)
the package installer for Python <br />
Install [PostgreSQL](https://www.postgresql.org/)
for the relational database
      
Clone repository:
```
  $ git clone https://github.com/valzhina/fertility_app.git 
```
   
Create and activate a virtual environment inside the ispeakplantish directory:   
```
  $ virtualenv env
  $ source env/bin/activate
```

Install requirements:
```
  $ pip3 install -r requirements.txt
```

Make an account with [Cloudinary](https://cloudinary.com/documentation) & get an [API key](https://cloudinary.com/users/register/free)

Store these keys in a file named 'secrets.sh'
```
  $ source secrets.sh
```
With PostgreSQL, create the fertility database
```
  $ createdb fertility_db
```



## About the Developer
Fertility App creator Olya Mateshov is an accomplished product development leader & architect in her past. 
She loves to curate complex, meaningful products from concept all the way through the final product stage.
But her passion has always been technology. By joining the Hackbright bootcamp and learning how to code she hopes 
to improve the world by blending user-focused design and old-world craftsmanship with a deep understanding of the latest technologies.
In her career she has made the most of every opportunity to study under expert craftsmen, inventors, product designers and engineers 
to hone her ability to interact effectively with diverse groups of people, to have a high level of flexibility and adaptability, enthusiasm, 
and problem-solving mindset.
