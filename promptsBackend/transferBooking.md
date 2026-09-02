we will create a plan for the transferBooking first of all the triptype 1 means this trip is only one way and the triptype 2 means this trip is round trip means there is return time and date 

note that all of the prices in the system is in EUR but as we are testing and paypal we are doing that in USD so that should be noted 
any ways after we create a succful transferBooking we should use this 
0cf18481-5a69-42f2-8efe-9141ad95249a and call the endpoint payment 
TransferBookings


POST
/api/bookings/transfer


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "journeyId": "46034ee1-bdb1-494c-98e4-5a7496679185",
  "tripType": 1,
  "passengers": 3,
  "pickupDate": "2026-08-16",
  "pickupTime": "14:30",
  "returnDate": null,
  "returnTime": null,
  "flightNumber": "MS778",
  "pickupNotes": "Waiting at the hotel lobby reception desk.",
  "dropOffNotes": "Terminal 3 departure gate.",
  "fullName": "Ahmed Mohamed",
  "email": "ahmed.mohamed@example.com",
  "phone": "+201012345678"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/bookings/transfer' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "journeyId": "46034ee1-bdb1-494c-98e4-5a7496679185",
  "tripType": 1,
  "passengers": 3,
  "pickupDate": "2026-08-16",
  "pickupTime": "14:30",
  "returnDate": null,
  "returnTime": null,
  "flightNumber": "MS778",
  "pickupNotes": "Waiting at the hotel lobby reception desk.",
  "dropOffNotes": "Terminal 3 departure gate.",
  "fullName": "Ahmed Mohamed",
  "email": "ahmed.mohamed@example.com",
  "phone": "+201012345678"
}'
Request URL
https://rentaltech.premiumasp.net/api/bookings/transfer
Server response
Code	Details
201	
Response body
Download
{
  "data": {
    "bookingId": "0cf18481-5a69-42f2-8efe-9141ad95249a",
    "bookingNumber": "TR-000057",
    "amount": 200,
    "currency": "USD",
    "bookingStatus": "PendingPayment"
  },
  "isSuccess": true,
  "message": "Transfer booking created successfully. Please complete payment.",
  "errors": [],
  "type": 200
}