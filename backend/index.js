const express = require('express')
const app = express()
const port = process.env.PORT || 5000 

app.use(express.json())

const DUMMY_MEALS = [
    {
        id: 'm1',
        name: 'Sushi',
        description: 'Finest fish and veggies',
        price: 22.99
    },
    {
        id: 'm2',
        name: 'Schnitzel',
        description: 'A German speciality',
        price: 16.5
    },
    {
        id: 'm3',
        name: 'Barbecue Burger',
        description: 'American, raw, meaty',
        price: 12.99
    },
    {
        id: 'm4',
        name: 'Green Bowl',
        description: 'Healthy... and green...',
        price: 18.99
    },
]

app.get('/meals', (req, res) => {
    res.send(DUMMY_MEALS)
})

app.listen(port, () => {console.log(`Server listening on port ${port}`)})