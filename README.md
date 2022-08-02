# DSS_3_Assignment
Contact Book 2022 for the Assignment
# Heroku instanse: https://miros-contactbook-2022.herokuapp.com

- npm run debug (connection to db)


--------------------------USERS--------------------------

1) Register: http://localhost:3002/users (Post)
Ex:
{
    "username": "Ford@gmail.com",
    "name": "Ford Hollow",
    "_id": "62e92555eb290b0081a28f26",
    "createdAt": "2022-08-02T13:23:33.750Z",
    "updatedAt": "2022-08-02T13:23:33.750Z"
}
2) Login: https://miros-contactbook-2022.herokuapp.com/users/login (Post) //barear token for auth
Ex:
{
    "username": "Ford@gmail.com",
    "password": "newpassword"
}
3) List of users: http://localhost:3002/users (Get)


---------------CONTACTS---------------------
0) https://miros-contactbook-2022.herokuapp.com/contacts (Get)

1) Add new contact: https://miros-contactbook-2022.herokuapp.com/contacts (Post)
Ex:
{
    "firstName": "Daniela",
    "lastName":"Lourance",
    "company": "KateTeam",
    "address":{
        "street": "Street",
        "postcode": "1234",
        "city": "Kyiv",
        "country": "Ukraine"
        },
    "phones": ["+3022497522"],  
    "emails": ["some.mail@smth.com"]
}

2) Edit contact: https://miros-contactbook-2022.herokuapp.com/contacts/62e930d2141fc58b979bc52e (Put) //contact id
Ex:
{
    "firstName": "Daniela",
    "lastName": "Neceda"
}
3) Delete contact: https://miros-contactbook-2022.herokuapp.com/contacts/62e932b5141fc58b979bc53b (Delete) //contact id

4) Add avatar to contact: https://miros-contactbook-2022.herokuapp.com/contacts/62e930d2141fc58b979bc52e/avatar (Post) //contact id
file ("file") value

5) Get avatar to contact: https://miros-contactbook-2022.herokuapp.com/contacts/62e930d2141fc58b979bc52e/avatar (Get) //contact id
