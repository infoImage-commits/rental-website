here we will create a plan for the new admin booking for the first thing first now the email , phone are opitional the second thing the booking socurse could be anything from the list i give you but it can't be Website okay 

also note that we have payAmount that the admin should put the thing the customer paied it could be 0
POST
/api/property-bookings/admin
Admin booking creation (confirms immediately and blocks unit)


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "unitId": "7b769750-a629-4b87-8a5c-cd2366a414bf",
  "propertyId": "7b769750-a629-4b87-8a5c-cd2366a414bf",
  "checkIn": "2026-10-02",
  "checkOut": "2026-10-03",
  "bookingSource": "Other",
  "fullName": "resr",
  "email": null,
  "phone": null,
  "person": 1,
  "payAmount": 15
}

Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/property-bookings/admin' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjkzNjE0MjY2LTFlN2QtNGRjZi1hMzBkLTA4ZGVmZGQ1ODQ5NCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6IjkzNjE0MjY2LTFlN2QtNGRjZi1hMzBkLTA4ZGVmZGQ1ODQ5NCIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg5NDgxNTUyLCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.E_l30HFoyIudVUkww8y5msOHUJu4AvWTKfJ5d_69Yq4' \
  -H 'Content-Type: application/json' \
  -d '{
  "unitId": "7b769750-a629-4b87-8a5c-cd2366a414bf",
  "propertyId": "7b769750-a629-4b87-8a5c-cd2366a414bf",
  "checkIn": "2026-10-02",
  "checkOut": "2026-10-03",
  "bookingSource": "Other",
  "fullName": "resr",
  "email": null,
  "phone": null,
  "person": 1,
  "payAmount": 15
}
'
Request URL
https://rentaltech.premiumasp.net/api/property-bookings/admin
Server response
Code	Details
201	
Response body
Download
{
  "data": {
    "bookingId": "5b70598e-438f-43f5-8bae-0d3c29b73d7f",
    "bookingNumber": "BK-000044",
    "status": "Confirmed",
    "totalPrice": 35
  },
  "isSuccess": true,
  "message": "Booking created and confirmed successfully.",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Tue,15 Sep 2026 13:39:50 GMT 
 location: https://rentaltech.premiumasp.net/api/property-bookings/5b70598e-438f-43f5-8bae-0d3c29b73d7f 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
201	
Created

Media type

application/json
Controls Accept header.
Example Value
Schema

GET
/api/property-bookings/{id}
Get property booking by ID with complete details


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
Booking ID

5b70598e-438f-43f5-8bae-0d3c29b73d7f
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/property-bookings/5b70598e-438f-43f5-8bae-0d3c29b73d7f' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjkzNjE0MjY2LTFlN2QtNGRjZi1hMzBkLTA4ZGVmZGQ1ODQ5NCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6IjkzNjE0MjY2LTFlN2QtNGRjZi1hMzBkLTA4ZGVmZGQ1ODQ5NCIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg5NDgxNTUyLCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.E_l30HFoyIudVUkww8y5msOHUJu4AvWTKfJ5d_69Yq4'
Request URL
https://rentaltech.premiumasp.net/api/property-bookings/5b70598e-438f-43f5-8bae-0d3c29b73d7f
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "id": "5b70598e-438f-43f5-8bae-0d3c29b73d7f",
    "bookingId": "5b70598e-438f-43f5-8bae-0d3c29b73d7f",
    "bookingNumber": "BK-000044",
    "status": 2,
    "statusName": "Confirmed",
    "bookingSource": "Other",
    "bookingSourceName": "Other",
    "paymentStatus": 11,
    "paymentStatusName": "PartiallyPaid",
    "calculatedPrice": 0,
    "actualPrice": null,
    "effectivePrice": 0,
    "totalPrice": 35,
    "requiredPaymentAmount": 35,
    "paidAmount": 15,
    "remainingAmount": 20,
    "createdAtUtc": "2026-09-15T13:39:50.1766228",
    "confirmedAt": "2026-09-15T13:39:50.1363299",
    "completedAt": null,
    "property": {
      "propertyId": "7b769750-a629-4b87-8a5c-cd2366a414bf",
      "propertyNumber": "PR-000034",
      "propertyName": "Regency - Apartment - Unit 406",
      "address": "NA, Hurghada, Egypt"
    },
    "guest": {
      "fullName": "resr",
      "email": null,
      "phone": null,
      "person": 1
    },
    "stay": {
      "checkIn": "2026-10-02",
      "checkOut": "2026-10-03",
      "numberOfNights": 1
    },
    "price": {
      "totalPrice": 35,
      "pricePerNight": 35
    }
  },
  "isSuccess": true,
  "message": null,
  "errors": [],
  "type": 200
}

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

5b70598e-438f-43f5-8bae-0d3c29b73d7f
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/payments/booking/5b70598e-438f-43f5-8bae-0d3c29b73d7f' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjkzNjE0MjY2LTFlN2QtNGRjZi1hMzBkLTA4ZGVmZGQ1ODQ5NCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6IjkzNjE0MjY2LTFlN2QtNGRjZi1hMzBkLTA4ZGVmZGQ1ODQ5NCIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg5NDgxNTUyLCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.E_l30HFoyIudVUkww8y5msOHUJu4AvWTKfJ5d_69Yq4'
Request URL
https://rentaltech.premiumasp.net/api/payments/booking/5b70598e-438f-43f5-8bae-0d3c29b73d7f
Server response
Code	Details
200	
Response body
Download
{
  "data": [
    {
      "id": "1136895b-99b6-4403-ae99-931e7f9380de",
      "bookingId": "5b70598e-438f-43f5-8bae-0d3c29b73d7f",
      "bookingExtensionId": null,
      "amount": 15,
      "currency": "USD",
      "provider": 3,
      "providerName": "Cash",
      "paymentType": 1,
      "paymentTypeName": "Booking",
      "payPalOrderId": null,
      "payPalCaptureId": null,
      "transactionId": null,
      "payerEmail": null,
      "status": 3,
      "statusName": "Paid",
      "failureReason": null,
      "createdAtUtc": "2026-09-15T13:39:50.1766351",
      "paidAt": "2026-09-15T13:39:50.1363299",
      "refundedAt": null
    }
  ],
  "isSuccess": true,
  "message": null,
  "errors": [],
  "type": 200
}
PUT
/api/admin/payments/{paymentId}
Admin edits a payment amount. Auto-updates booking payment status and validates no overpayment. Website bookings cannot have payments edited via this endpoint.


Parameters
Cancel
Reset
Name	Description
paymentId *
string($uuid)
(path)
1136895b-99b6-4403-ae99-931e7f9380de
Request body

application/json
{
  "bookingId": "5b70598e-438f-43f5-8bae-0d3c29b73d7f",
  "payAmount": 10,
  "paidAmount": 10
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://rentaltech.premiumasp.net/api/admin/payments/1136895b-99b6-4403-ae99-931e7f9380de' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjkzNjE0MjY2LTFlN2QtNGRjZi1hMzBkLTA4ZGVmZGQ1ODQ5NCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6IjkzNjE0MjY2LTFlN2QtNGRjZi1hMzBkLTA4ZGVmZGQ1ODQ5NCIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg5NDgxNTUyLCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.E_l30HFoyIudVUkww8y5msOHUJu4AvWTKfJ5d_69Yq4' \
  -H 'Content-Type: application/json' \
  -d '{
  "bookingId": "5b70598e-438f-43f5-8bae-0d3c29b73d7f",
  "payAmount": 10,
  "paidAmount": 10
}'
Request URL
https://rentaltech.premiumasp.net/api/admin/payments/1136895b-99b6-4403-ae99-931e7f9380de
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "id": "1136895b-99b6-4403-ae99-931e7f9380de",
    "bookingId": "5b70598e-438f-43f5-8bae-0d3c29b73d7f",
    "bookingExtensionId": null,
    "amount": 10,
    "currency": "USD",
    "provider": 3,
    "providerName": "Cash",
    "paymentType": 1,
    "paymentTypeName": "Booking",
    "payPalOrderId": null,
    "payPalCaptureId": null,
    "transactionId": null,
    "payerEmail": null,
    "status": 3,
    "statusName": "Paid",
    "failureReason": null,
    "createdAtUtc": "2026-09-15T13:39:50.1766351",
    "paidAt": "2026-09-15T13:39:50.1363299",
    "refundedAt": null
  },
  "isSuccess": true,
  "message": "Payment updated successfully.",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Tue,15 Sep 2026 13:43:21 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "bookingId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "bookingExtensionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "amount": 0,
  "currency": "string",
  "provider": 1,
  "providerName": "string",
  "paymentType": 1,
  "paymentTypeName": "string",
  "payPalOrderId": "string",
  "payPalCaptureId": "string",
  "transactionId": "string",
  "payerEmail": "string",
  "status": 1,
  "statusName": "string",
  "failureReason": "string",
  "createdAtUtc": "2026-09-15T13:43:21.370Z",
  "paidAt": "2026-09-15T13:43:21.370Z",
  "refundedAt": "2026-09-15T13:43:21.370Z"
}
now when we edit a booking that is other that website we have this optoin to pay as the admin will do that open the booking and add the things the clinet did
could you create a plan so that we update all of the endpoitsn so that it work right
