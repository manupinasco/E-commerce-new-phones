class PaymentsController {
    constructor(subscriptionService) {
        this.subscriptionService = subscriptionService
    }

    async getPaymentLink(req, res) {
        try {
            const payment = await this.subscriptionService.createPayment(req.body.items, req.body.payer);

            return payment

        }
        catch (err) {
            console.log(err)

            return res.status(500).json({error: true, msg: "Failed to create payment"})
        }
    }

    async getSubscriptionLink(req, res) {
        try {
            const payment = await this.subscriptionService.createSubscription();

            return res.json(payment)

        }
        catch (err) {
            console.log(err)

            return res.status(500).json({error: true, msg: "Failed to create subscription"})
        }
    }
}
module.exports = PaymentsController