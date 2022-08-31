const axios = require("axios")

class PaymentService {
    async createPayment(items, payer) {
        const url = "https://api.mercadopago.com/checkout/preferences"
        const body = {
            items: items,
            back_urls: {
                failure: "http://localhost:8080/failure",
                pending: "http://localhost:8080/pending",
                success: "http://localhost:8080/success"
            },
            payer: payer,
            payment_methods: {
                excluded_payment_methods: [
                    {
                        id: "visa"
                    }
                ],
                excluded_payment_types: [
                    {
                        id: "ticket"
                    }
                ],
                installments: 6
            },
            notification_url: "https://hookb.in/1gZ2w90wMRUdW2ndyx3L",
            statement_descriptor: "MINEGOCIO",
            external_reference: "manupinasco@yahoo.com.ar",
        }

        const payment = await axios.post(url, body, {
            headers: {
                "cache-control": "no-cache",
                "Content-Type": "application/json",
                "x-integrator-id": process.env.INTEGRATOR_ID,
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        })

        

        return payment.data


    }

    async createSubscription() {
        const url = "https://api.mercadopago.com/preapproval"

        const body = {
            reason: "Subscription",
            auto_recurring: {
                frequency: 1,
                frequency_type: "months",
                transaction_amount: 10,
                currency_id: "ARS"
            },
            back_url: "https://google.com.ar",
            payer_email: "test_user_49116386@testuser.com",
            
        }

        const payment = await axios.post(url, body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        })

        return payment.data
    }
}

module.exports = PaymentService