# DSS_3_Assignment
Contact Book 2022

## Heroku instanse: https://miros-contactbook-2022.herokuapp.com

- npm run debug (connection to db)


##  USERS

### 1) Register: https://miros-contactbook-2022.herokuapp.com/users (Post)
*Example:*
```
{
    "username": "Ford@gmail.com",
    "name": "Ford Hollow",
    "_id": "62e92555eb290b0081a28f26",
    "createdAt": "2022-08-02T13:23:33.750Z",
    "updatedAt": "2022-08-02T13:23:33.750Z"
}
```
### 2) Login: https://miros-contactbook-2022.herokuapp.com/users/login (Post) 
Barear token for auth

*Example:*
```
{
    "username": "Ford@gmail.com",
    "password": "newpassword"
}
```
### 3) List of users: http://localhost:3002/users (Get)


## CONTACTS
### 0) List of contacts for current user: https://miros-contactbook-2022.herokuapp.com/contacts (Get)

### 1) Add new contact: https://miros-contactbook-2022.herokuapp.com/contacts (Post)
*Example:*
```
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
```
### 2) Edit contact: https://miros-contactbook-2022.herokuapp.com/contacts/contact_id (Put)
*Example:*
```
{
    "firstName": "Daniela",
    "lastName": "Neceda"
}
```
### 3) Delete contact: https://miros-contactbook-2022.herokuapp.com/contacts/contact_id (Delete)

### 4) Add avatar to contact: https://miros-contactbook-2022.herokuapp.com/contacts/contact_id/avatar (Post)
file ("file") value

### 5) Get avatar to contact: https://miros-contactbook-2022.herokuapp.com/contacts/contact_id/avatar (Get)
