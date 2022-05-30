const express = require('express');
const contactRouter = require('./routes/contact')
const userRouter = require('./routes/user')
const error = require('./middlewares/error');

var PORT_NUMBER = process.env.PORT || 3002;
const app = express();

//Conecting to database
require('./database/mongoose');

app.use(express.json());
app.use('/contacts', contactRouter, error)
app.use('/users', userRouter, error)


app.get('*', (req, res) => {

    res.status(404).send({
        error: "Page could not be found.",
        date: new Date()

    });

});
app.listen(PORT_NUMBER, () => {
    console.log(`Server is listening on port ${PORT_NUMBER}`);
});

