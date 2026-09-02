GET
/api/property-bookings
Get paginated list of property bookings with filtering and sorting


Parameters
Cancel
Name	Description
Status
integer($int32)
(query)

--
BookingNumber
string
(query)
BookingNumber
PropertyNumber
string
(query)
PropertyNumber
CustomerName
string
(query)
CustomerName
CustomerEmail
string
(query)
CustomerEmail
SearchTerm
string
(query)
SearchTerm
PageNumber
integer($int32)
(query)
PageNumber
PageSize
integer($int32)
(query)
PageSize
SortBy
string
(query)
SortBy
IsDescending
boolean
(query)

--
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/property-bookings' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsInVzZXJOYW1lIjoicG9sYSIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4NzQwNDk4MiwiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.K_tXT7sNMw-e329oDKDqicQuKLy6eV-fNbbMMo04Blc'
Request URL
https://rentaltech.premiumasp.net/api/property-bookings
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "items": [
      {
        "id": "3db91d5f-ab2d-4231-a5bf-dfe53a23df3f",
        "bookingNumber": "BK-000003",
        "bookingType": 1,
        "bookingTypeName": "Property",
        "fullName": "test",
        "checkIn": "2026-08-22",
        "checkOut": "2026-08-27",
        "totalPrice": 500,
        "status": 2,
        "statusName": "Confirmed",
        "createdAtUtc": "2026-08-22T12:11:34.2293903"
      },
      {
        "id": "d6ca5d4b-42ae-4bd5-824a-451f9456017b",
        "bookingNumber": "BK-000002",
        "bookingType": 1,
        "bookingTypeName": "Property",
        "fullName": "pola",
        "checkIn": "2026-08-22",
        "checkOut": "2026-08-25",
        "totalPrice": 300,
        "status": 1,
        "statusName": "PendingPayment",
        "createdAtUtc": "2026-08-22T12:08:22.3602929"
      },
      {
        "id": "5dabbc52-9a4a-4505-817b-aa100d818ea8",
        "bookingNumber": "BK-000001",
        "bookingType": 1,
        "bookingTypeName": "Property",
        "fullName": "test",
        "checkIn": "2026-08-22",
        "checkOut": "2026-08-24",
        "totalPrice": 200,
        "status": 1,
        "statusName": "PendingPayment",
        "createdAtUtc": "2026-08-22T11:54:24.6902162"
      }
    ],
    "pageNumber": 1,
    "pageSize": 10,
    "totalCount": 3,
    "totalPages": 1,
    "hasPreviousPage": false,
    "hasNextPage": false
  },
  "isSuccess": true,
  "message": null,
  "errors": [],
  "type": 200
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,22 Aug 2026 12:23:19 GMT 
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
  "items": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "bookingNumber": "string",
      "bookingType": 1,
      "bookingTypeName": "string",
      "fullName": "string",
      "checkIn": "2026-08-22",
      "checkOut": "2026-08-22",
      "totalPrice": 0,
      "status": 1,
      "statusName": "string",
      "createdAtUtc": "2026-08-22T12:23:32.513Z"
    }
  ],
  "pageNumber": 0,
  "pageSize": 0,
  "totalCount": 0,
  "totalPages": 0,
  "hasPreviousPage": true,
  "hasNextPage": true
}
No links

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

3db91d5f-ab2d-4231-a5bf-dfe53a23df3f
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/property-bookings/3db91d5f-ab2d-4231-a5bf-dfe53a23df3f' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsInVzZXJOYW1lIjoicG9sYSIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4NzQwNDk4MiwiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.K_tXT7sNMw-e329oDKDqicQuKLy6eV-fNbbMMo04Blc'
Request URL
https://rentaltech.premiumasp.net/api/property-bookings/3db91d5f-ab2d-4231-a5bf-dfe53a23df3f
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "id": "3db91d5f-ab2d-4231-a5bf-dfe53a23df3f",
    "bookingNumber": "BK-000003",
    "status": 2,
    "statusName": "Confirmed",
    "paymentStatus": 3,
    "paymentStatusName": "Paid",
    "createdAtUtc": "2026-08-22T12:11:34.2293903",
    "confirmedAt": "2026-08-22T12:11:43.1915626",
    "completedAt": null,
    "property": {
      "propertyId": "edc52005-601c-424e-9f73-c55e35ad51a7",
      "propertyNumber": "PR-000001",
      "propertyName": "123123",
      "address": "123123, 312312, 12312"
    },
    "guest": {
      "fullName": "test",
      "email": "test@test.com",
      "phone": "01032465498",
      "person": 1
    },
    "stay": {
      "checkIn": "2026-08-22",
      "checkOut": "2026-08-27",
      "numberOfNights": 5
    },
    "price": {
      "totalPrice": 500,
      "pricePerNight": 100
    }
  },
  "isSuccess": true,
  "message": null,
  "errors": [],
  "type": 200
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,22 Aug 2026 12:23:30 GMT 
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
  "bookingNumber": "string",
  "status": 1,
  "statusName": "string",
  "paymentStatus": 1,
  "paymentStatusName": "string",
  "createdAtUtc": "2026-08-22T12:23:32.519Z",
  "confirmedAt": "2026-08-22T12:23:32.519Z",
  "completedAt": "2026-08-22T12:23:32.519Z",
  "property": {
    "propertyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "propertyNumber": "string",
    "propertyName": "string",
    "address": "string"
  },
  "guest": {
    "fullName": "string",
    "email": "string",
    "phone": "string",
    "person": 0
  },
  "stay": {
    "checkIn": "2026-08-22",
    "checkOut": "2026-08-22",
    "numberOfNights": 0
  },
  "price": {
    "totalPrice": 0,
    "pricePerNight": 0
  }
}
No links
404	
Not Found

Media type

application/json
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
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
d6ca5d4b-42ae-4bd5-824a-451f9456017b
Request body

application/json
{
  "newCheckOut": "2026-08-30",
  "notes": "test"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/bookings/d6ca5d4b-42ae-4bd5-824a-451f9456017b/extensions' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsInVzZXJOYW1lIjoicG9sYSIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4NzQwNDk4MiwiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.K_tXT7sNMw-e329oDKDqicQuKLy6eV-fNbbMMo04Blc' \
  -H 'Content-Type: application/json' \
  -d '{
  "newCheckOut": "2026-08-30",
  "notes": "test"
}'
Request URL
https://rentaltech.premiumasp.net/api/bookings/d6ca5d4b-42ae-4bd5-824a-451f9456017b/extensions
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
    "Only confirmed bookings can be extended"
  ],
  "type": 422
}

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
de9933d2-8348-415b-86a9-b919c0c58aa6
Request body

application/json
{
  "newCheckOut": "2026-08-30",
  "notes": "test"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/bookings/de9933d2-8348-415b-86a9-b919c0c58aa6/extensions' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsInVzZXJOYW1lIjoicG9sYSIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4NzQwNDk4MiwiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.K_tXT7sNMw-e329oDKDqicQuKLy6eV-fNbbMMo04Blc' \
  -H 'Content-Type: application/json' \
  -d '{
  "newCheckOut": "2026-08-30",
  "notes": "test"
}'
Request URL
https://rentaltech.premiumasp.net/api/bookings/de9933d2-8348-415b-86a9-b919c0c58aa6/extensions
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "extensionId": "d210d9ec-b381-4fa0-a4c6-c1ebd5239d51",
    "bookingId": "de9933d2-8348-415b-86a9-b919c0c58aa6",
    "bookingNumber": "BK-000004",
    "oldCheckOut": "2026-08-23",
    "newCheckOut": "2026-08-30",
    "additionalNights": 7,
    "additionalAmount": 700,
    "currency": "USD",
    "bookingStatus": "PendingPayment",
    "paymentStatus": "Pending"
  },
  "isSuccess": true,
  "message": "Booking extension created successfully. Please complete payment.",
  "errors": [],
  "type": 200
}
also note that we can only extend by the admin and the only way he can do that is that by making the status paid and that is only when we send the last endpoint we worked on that is POST /api/payments/paypal/capture?orderId=PAYPAL_ORDER_ID
okay ?
could you create plan for it so that the admin can view the booking and exteened for some users if they asked for it ?

we should use those endpoints so that we use them in the admin dashbaord could you create a plan for them ?