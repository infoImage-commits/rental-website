PropertyBookings
Property Bookings Controller - Manages property booking operations



POST
/api/property-bookings


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "propertyId": "edc52005-601c-424e-9f73-c55e35ad51a7",
  "fullName": "test",
  "email": "pola5samy55@gmail.com",
  "phone": "+20123165487",
  "person": 3,
  "checkIn": "2026-08-22",
  "checkOut": "2026-08-24"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/property-bookings' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "propertyId": "edc52005-601c-424e-9f73-c55e35ad51a7",
  "fullName": "test",
  "email": "pola5samy55@gmail.com",
  "phone": "+20123165487",
  "person": 3,
  "checkIn": "2026-08-22",
  "checkOut": "2026-08-24"
}'
Request URL
https://rentaltech.premiumasp.net/api/property-bookings
Server response
Code	Details
400	
Error: response status is 400

Response body
Download
{
  "data": null,
  "isSuccess": false,
  "message": null,
  "errors": [
    "Property capacity is 2 guests. You requested 3 guests."
  ],
  "type": 422
}
POST
/api/property-bookings


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "propertyId": "edc52005-601c-424e-9f73-c55e35ad51a7",
  "fullName": "test",
  "email": "pola5samy55@gmail.com",
  "phone": "+20123165487",
  "person": 2,
  "checkIn": "2026-08-22",
  "checkOut": "2026-08-24"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/property-bookings' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "propertyId": "edc52005-601c-424e-9f73-c55e35ad51a7",
  "fullName": "test",
  "email": "pola5samy55@gmail.com",
  "phone": "+20123165487",
  "person": 2,
  "checkIn": "2026-08-22",
  "checkOut": "2026-08-24"
}'
Request URL
https://rentaltech.premiumasp.net/api/property-bookings
Server response
Code	Details
201	
Response body
Download
{
  "data": {
    "bookingId": "5dabbc52-9a4a-4505-817b-aa100d818ea8",
    "bookingNumber": "BK-000001",
    "status": "PendingPayment",
    "totalPrice": 200
  },
  "isSuccess": true,
  "message": "Booking created successfully. Proceed to payment.",
  "errors": [],
  "type": 200
}
as you can see we should view the errors when we have them 
and after that we should follow the same flow we use in the trasnfer when we want to have the payment working right so could you create a plan so that it works right for the booking for the rent props also note that the Book Now does not mtach the backend in the client ui so it should match it and i think we could make it better by making it under the Availability section and also the user could select a time peroped to see if he wants to rent for the next two months or so so create a plan so that we have the flow for the booking process and the payment for it 