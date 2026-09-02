here we will have the plan for the extentoin stay 
when a user want to extend there stay he first need to tell the admin and the admin will do the follwoing 
open the booking id and in it he will extened the stay vai the endpoind 
POST
/api/bookings/{bookingId}/extensions
Create booking extension with PayPal payment Only Admin and SuperAdmin can create extensions


Parameters
Cancel
Reset
Name	Description
bookingId *
string($uuid)
(path)
7a59f004-d470-44d8-8a88-165a06368ff6
Request body

application/json
{
  "newCheckOut": "2026-09-26",
  "notes": "test"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/bookings/7a59f004-d470-44d8-8a88-165a06368ff6/extensions' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsInVzZXJOYW1lIjoicG9sYSIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4NzQyMDcwNCwiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.W8AGntbgnS0D6WZ8Q37GN3zjp7wbSZS3gDUg9r-lf40' \
  -H 'Content-Type: application/json' \
  -d '{
  "newCheckOut": "2026-09-26",
  "notes": "test"
}'
Request URL
https://rentaltech.premiumasp.net/api/bookings/7a59f004-d470-44d8-8a88-165a06368ff6/extensions
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "extensionId": "af304e30-6c20-49fd-b5ea-e9b5b93841fd",
    "bookingId": "7a59f004-d470-44d8-8a88-165a06368ff6",
    "bookingNumber": "BK-000008",
    "oldCheckOut": "2026-09-24",
    "newCheckOut": "2026-09-26",
    "additionalNights": 2,
    "additionalAmount": 200,
    "currency": "USD",
    "bookingStatus": "PendingPayment",
    "paymentStatus": "Pending"
  },
  "isSuccess": true,
  "message": "Booking extension created successfully. Please complete payment.",
  "errors": [],
  "type": 200
}
we will get the bookingId , extensionId and call the follwoing 
POST
/api/payments/paypal/create-order
Create PayPal order for a booking or booking extension


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "bookingId": "7a59f004-d470-44d8-8a88-165a06368ff6",
  "bookingExtensionId": "af304e30-6c20-49fd-b5ea-e9b5b93841fd"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/payments/paypal/create-order' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsInVzZXJOYW1lIjoicG9sYSIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4NzQyMDcwNCwiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.W8AGntbgnS0D6WZ8Q37GN3zjp7wbSZS3gDUg9r-lf40' \
  -H 'Content-Type: application/json' \
  -d '{
  "bookingId": "7a59f004-d470-44d8-8a88-165a06368ff6",
  "bookingExtensionId": "af304e30-6c20-49fd-b5ea-e9b5b93841fd"
}'
Request URL
https://rentaltech.premiumasp.net/api/payments/paypal/create-order
Server response
Code	Details
200	
Response body
Download
{
  "orderId": "5SD93158DM906720S",
  "approvalUrl": "https://www.sandbox.paypal.com/checkoutnow?token=5SD93158DM906720S"
}
we will show the approvalUrl for the admin so that he will ask the client to follow the link so we want to have a copy button to the clip board next to the link aftet that the clinet will follow the link and the transtoin will be done and we will know that as the rest of the app it works right but we need to make sure the front show the right data 
also here are some endoints to get more info 
GET
/api/payments/booking/{bookingId}
Get all payments for a booking


Parameters
Cancel
Name	Description
bookingId *
string($uuid)
(path)
Booking ID

7a59f004-d470-44d8-8a88-165a06368ff6
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/payments/booking/7a59f004-d470-44d8-8a88-165a06368ff6' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsInVzZXJOYW1lIjoicG9sYSIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4NzQyMDcwNCwiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.W8AGntbgnS0D6WZ8Q37GN3zjp7wbSZS3gDUg9r-lf40'
Request URL
https://rentaltech.premiumasp.net/api/payments/booking/7a59f004-d470-44d8-8a88-165a06368ff6
Server response
Code	Details
200	
Response body
Download
{
  "data": [
    {
      "id": "2dd545f6-143f-447f-87bc-fe79ae951c05",
      "bookingId": "7a59f004-d470-44d8-8a88-165a06368ff6",
      "bookingExtensionId": "af304e30-6c20-49fd-b5ea-e9b5b93841fd",
      "amount": 200,
      "currency": "USD",
      "provider": 1,
      "providerName": "PayPal",
      "paymentType": 2,
      "paymentTypeName": "Extension",
      "payPalOrderId": "5SD93158DM906720S",
      "payPalCaptureId": "3X367775X13530336",
      "transactionId": "3X367775X13530336",
      "payerEmail": "sb-xcwrt52458068@personal.example.com",
      "status": 3,
      "statusName": "Paid",
      "failureReason": null,
      "createdAtUtc": "2026-08-22T16:46:22.7597066",
      "paidAt": "2026-08-22T16:46:40.2594867",
      "refundedAt": null
    },
    {
      "id": "fd819287-5410-4eed-812b-d73b7b2a204f",
      "bookingId": "7a59f004-d470-44d8-8a88-165a06368ff6",
      "bookingExtensionId": "af304e30-6c20-49fd-b5ea-e9b5b93841fd",
      "amount": 200,
      "currency": "USD",
      "provider": 1,
      "providerName": "PayPal",
      "paymentType": 2,
      "paymentTypeName": "Extension",
      "payPalOrderId": "3F205838LD9649407",
      "payPalCaptureId": null,
      "transactionId": null,
      "payerEmail": null,
      "status": 1,
      "statusName": "Pending",
      "failureReason": null,
      "createdAtUtc": "2026-08-22T16:45:18.8658237",
      "paidAt": null,
      "refundedAt": null
    },
    {
      "id": "934ed492-4f1d-4e10-8e6d-453b58551234",
      "bookingId": "7a59f004-d470-44d8-8a88-165a06368ff6",
      "bookingExtensionId": null,
      "amount": 200,
      "currency": "USD",
      "provider": 1,
      "providerName": "PayPal",
      "paymentType": 1,
      "paymentTypeName": "Booking",
      "payPalOrderId": "92L79894Y5869352X",
      "payPalCaptureId": "9WB54332YL398901R",
      "transactionId": "9WB54332YL398901R",
      "payerEmail": "sb-xcwrt52458068@personal.example.com",
      "status": 3,
      "statusName": "Paid",
      "failureReason": null,
      "createdAtUtc": "2026-08-22T16:43:22.0816993",
      "paidAt": "2026-08-22T16:43:45.9742117",
      "refundedAt": null
    }
  ],
  "isSuccess": true,
  "message": null,
  "errors": [],
  "type": 200
}
could you create a plan so those endpoints are called in the right place and follow the function we have so far
also note that we before said that we will have another way to call an endpoint for the prop buying to buy it well we will not have it so if there any code for it we will not use it okay ?
create a plan so that everything works right 