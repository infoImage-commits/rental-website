here we will create a plan for the flow of the payment for the app and this is for the transfer payment 
first of all we need to create a new booking by the endpoint 
/api/bookings/transfer

after calling the endpoint you will get the following data 
"bookingId": "397aaf6c-d695-4b01-917c-5605fb86a72c",
we will use the booking id to create an order for the payment 

we will need to call the following endpoint 

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
  "bookingId": "cb2df52b-3d40-4943-b939-902bceeda763",
  "bookingExtensionId": null
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/payments/paypal/create-order' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImE3YjE3YjE5LTZhNDQtNGVkNi05ZDhiLTA4ZGVmYWFlZGYyNiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6ImE3YjE3YjE5LTZhNDQtNGVkNi05ZDhiLTA4ZGVmYWFlZGYyNiIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg2NzkwNzU2LCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.aLVsQ4aqwQDLybwctrihgTYyzZ9AlWbBtZ1gGQIjXzo' \
  -H 'Content-Type: application/json' \
  -d '{
  "bookingId": "cb2df52b-3d40-4943-b939-902bceeda763",
  "bookingExtensionId": null
}'
Request URL
https://rentaltech.premiumasp.net/api/payments/paypal/create-order
Server response
Code	Details
200	
Response body
Download
{
  "orderId": "1XR85607J0759802A",
  "approvalUrl": "https://www.sandbox.paypal.com/checkoutnow?token=1XR85607J0759802A"
}
we will set the bookingExtensionId to be null for both paying a new proprites or boooking a transer and it will be only used later 
when we call that endpoint we will need to redired the user to the url probided here 
after the backend will redire us to the /success?token=7NK06485V6807005Y&PayerID=6LDUU3EF8XWCW to our page and we have to create 2 pages or even 3 I'll tell you how this gonna work 
we will be int he sucess page and we will be in a loading statue until we call the
POST
/api/payments/paypal/capture
Capture PayPal payment (User Experience endpoint - does NOT execute business logic)


Parameters
Cancel
Name	Description
orderId
string
(query)
PayPal Order ID

1XR85607J0759802A
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/payments/paypal/capture?orderId=1XR85607J0759802A' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImE3YjE3YjE5LTZhNDQtNGVkNi05ZDhiLTA4ZGVmYWFlZGYyNiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6ImE3YjE3YjE5LTZhNDQtNGVkNi05ZDhiLTA4ZGVmYWFlZGYyNiIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg2NzkwNzU2LCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.aLVsQ4aqwQDLybwctrihgTYyzZ9AlWbBtZ1gGQIjXzo' \
  -d ''
Request URL
https://rentaltech.premiumasp.net/api/payments/paypal/capture?orderId=1XR85607J0759802A
Server response
Code	Details
400
Undocumented
Error: response status is 400

Response body
Download
{
  "data": null,
  "isSuccess": false,
  "message": null,
  "errors": [
    "Failed to capture order: PayPal Capture failed: 422 UnprocessableEntity. DebugId: f324413381b28. Response: {\"name\":\"UNPROCESSABLE_ENTITY\",\"details\":[{\"issue\":\"ORDER_NOT_APPROVED\",\"description\":\"Payer has not yet approved the Order for payment. Please redirect the payer to the 'rel':'approve' url returned as part of the HATEOAS links within the Create Order call or provide a valid payment_source in the request.\"}],\"message\":\"The requested action could not be performed, semantically incorrect, or failed business validation.\",\"debug_id\":\"f324413381b28\",\"links\":[{\"href\":\"https://developer.paypal.com/api/rest/reference/orders/v2/errors/#ORDER_NOT_APPROVED\",\"rel\":\"information_link\",\"method\":\"GET\"}]}"
  ],
  "type": 400
}
we could get an error so we well be redire to the failer page and tell the error we got 
or we will have a scuess message 
success?token=92P59851K18647020&PayerID=6LDUU3EF8XWCW we will use the token here 92P59851K18647020 and put it in the 
POST
/api/payments/paypal/capture
Capture PayPal payment (User Experience endpoint - does NOT execute business logic)


Parameters
Cancel
Name	Description
orderId
string
(query)
PayPal Order ID

92P59851K18647020
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/payments/paypal/capture?orderId=92P59851K18647020' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImE3YjE3YjE5LTZhNDQtNGVkNi05ZDhiLTA4ZGVmYWFlZGYyNiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6ImE3YjE3YjE5LTZhNDQtNGVkNi05ZDhiLTA4ZGVmYWFlZGYyNiIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg2NzkwNzU2LCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.aLVsQ4aqwQDLybwctrihgTYyzZ9AlWbBtZ1gGQIjXzo' \
  -d ''
Request URL
https://rentaltech.premiumasp.net/api/payments/paypal/capture?orderId=92P59851K18647020
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "bookingNumber": "TR-000004",
    "paymentStatus": 3,
    "paymentStatusName": "Paid",
    "amount": 50,
    "currency": "USD",
    "transactionId": "2K544158N89494018",
    "message": "Payment captured and booking confirmed successfully."
  },
  "isSuccess": true,
  "message": "Payment captured and booking confirmed successfully",
  "errors": [],
  "type": 200
}
and now we are all set and it now works right 
please now create a plan so that we have a full image on what we should do and what i need to tell the backend to do so that we are all set and done 
remember we can't show success or failer until we are sure that the endpoint POST
/api/payments/paypal/capture is called right 
and if for some reaseon the customer did not pay and we got a falider we need to call the 
Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "orderId": "65Y47697X6998915U"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/payments/cancel' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImE3YjE3YjE5LTZhNDQtNGVkNi05ZDhiLTA4ZGVmYWFlZGYyNiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6ImE3YjE3YjE5LTZhNDQtNGVkNi05ZDhiLTA4ZGVmYWFlZGYyNiIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg2NzkwNzU2LCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.aLVsQ4aqwQDLybwctrihgTYyzZ9AlWbBtZ1gGQIjXzo' \
  -H 'Content-Type: application/json' \
  -d '{
  "orderId": "65Y47697X6998915U"
}'
Request URL
https://rentaltech.premiumasp.net/api/payments/cancel
Server response
Code	Details
200	
Response headers
 access-control-allow-origin: * 
 date: Sat,15 Aug 2026 10:29:54 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description
cancel endpoint so that we tell the backend we have cancled the order 
please review all of this and create aplan for it for both fornt and back to know what we should be doing 

Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "journeyId": "8e897c7f-a588-4bd8-abee-d9abf7f7bb11",
  "tripType": 1,
  "passengers": 2,
  "pickupDate": "2026-08-15",
  "pickupTime": "09:00",
  "returnDate": null,
  "returnTime": null,
  "flightNumber": "MS911",
  "pickupNotes": "Please pick up directly from the residential building entrance.",
  "dropOffNotes": "Cairo International Airport Terminal 2.",
  "fullName": "Mona Ibrahim",
  "email": "mona.ibrahim@example.com",
  "phone": "+201234567890"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/bookings/transfer' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImE3YjE3YjE5LTZhNDQtNGVkNi05ZDhiLTA4ZGVmYWFlZGYyNiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6ImE3YjE3YjE5LTZhNDQtNGVkNi05ZDhiLTA4ZGVmYWFlZGYyNiIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg2NzkwNzU2LCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.aLVsQ4aqwQDLybwctrihgTYyzZ9AlWbBtZ1gGQIjXzo' \
  -H 'Content-Type: application/json' \
  -d '{
  "journeyId": "8e897c7f-a588-4bd8-abee-d9abf7f7bb11",
  "tripType": 1,
  "passengers": 2,
  "pickupDate": "2026-08-15",
  "pickupTime": "09:00",
  "returnDate": null,
  "returnTime": null,
  "flightNumber": "MS911",
  "pickupNotes": "Please pick up directly from the residential building entrance.",
  "dropOffNotes": "Cairo International Airport Terminal 2.",
  "fullName": "Mona Ibrahim",
  "email": "mona.ibrahim@example.com",
  "phone": "+201234567890"
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
    "bookingId": "397aaf6c-d695-4b01-917c-5605fb86a72c",
    "bookingNumber": "TR-000001",
    "amount": 50,
    "currency": "USD",
    "bookingStatus": "PendingPayment"
  },
  "isSuccess": true,
  "message": "Transfer booking created successfully. Please complete payment.",
  "errors": [],
  "type": 200
}

POST
/api/payments/paypal/capture
Capture PayPal payment (User Experience endpoint - does NOT execute business logic)


Parameters
Cancel
Name	Description
orderId
string
(query)
PayPal Order ID

7NK06485V6807005Y
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/payments/paypal/capture?orderId=7NK06485V6807005Y' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImE3YjE3YjE5LTZhNDQtNGVkNi05ZDhiLTA4ZGVmYWFlZGYyNiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6ImE3YjE3YjE5LTZhNDQtNGVkNi05ZDhiLTA4ZGVmYWFlZGYyNiIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg2NzkwNzU2LCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.aLVsQ4aqwQDLybwctrihgTYyzZ9AlWbBtZ1gGQIjXzo' \
  -d ''
Request URL
https://rentaltech.premiumasp.net/api/payments/paypal/capture?orderId=7NK06485V6807005Y
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "bookingNumber": "TR-000001",
    "paymentStatus": 3,
    "paymentStatusName": "Paid",
    "amount": 50,
    "currency": "USD",
    "transactionId": "0FW99063LS9229545",
    "message": "Payment captured and booking confirmed successfully."
  },
  "isSuccess": true,
  "message": "Payment captured and booking confirmed successfully",
  "errors": [],
  "type": 200
}

