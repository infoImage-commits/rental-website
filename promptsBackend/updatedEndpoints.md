we have updated some set of endpoints here are them
POST
/api/payments/paypal/create-order
Create PayPal order for a booking or booking extension


Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "bookingId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
now booking takes only bookingId the other filed will not be send at all in the app and there will be no way to extend the booking for someone so please remove the UI componetes and make sure it works right 