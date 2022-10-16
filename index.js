const express = require('express');
const cors = require('cors')
const app = express();
const dotenv = require("dotenv")

const PaymentController = require("./Controllers/PaymentsController")
const PaymentService = require("./Services/PaymentsService");
const { response } = require('express');
const PaymentInstance = new PaymentController(new PaymentService());

dotenv.config()

app.use(express.static("public/cliente/dist"))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const PORT = process.env.PORT || 444;
app.listen(PORT, () => {
    console.log(`El servidor está levantado en el puerto ${PORT}`)
})


app.get('/', async function (req, res) {
    response.send("Hola")
})


/* ---------------------------- */
/* -----------PAY------------- */
/* --------------------------- */

app.post('/payment', async function (req, res) {

    let link
    link = await PaymentInstance.getPaymentLink(req, res)
    link = link.init_point
    res.status(201).json({data: link})

})
