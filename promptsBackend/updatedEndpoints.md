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
GET
/api/reports/arrival
Get Arrival Report in JSON format for UI display Returns bookings where check-in date matches the specified date


Parameters
Cancel
Name	Description
date
string($date)
(query)
The check-in date to filter by

2026-8-8
pageNumber
integer($int32)
(query)
Optional page number for pagination

1
pageSize
integer($int32)
(query)
Optional page size for pagination

50
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/reports/arrival?date=2026-8-8' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsInVzZXJOYW1lIjoicG9sYSIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4ODg3NDYxMiwiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.8F4YGIoAaHHdFyLVa0bBMJn2vvgXo-0Bf2Va7y4GgHY'
Request URL
https://rentaltech.premiumasp.net/api/reports/arrival?date=2026-8-8
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "date": "2026-08-08",
    "summary": {
      "totalRecords": 0,
      "totalNights": 0,
      "totalPrice": 0
    },
    "items": [],
    "pageNumber": null,
    "pageSize": null,
    "totalCount": 0,
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
 date: Tue,08 Sep 2026 12:39:41 GMT 
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
  "date": "2026-09-08",
  "summary": {
    "totalRecords": 0,
    "totalNights": 0,
    "totalPrice": 0
  },
  "items": [
    {
      "bookingId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "customerName": "string",
      "apartmentCode": "string",
      "nights": 0,
      "checkIn": "2026-09-08",
      "checkOut": "2026-09-08",
      "price": 0,
      "source": "string",
      "area": "string"
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
/api/reports/departure
Get Departure Report in JSON format for UI display Returns bookings where check-out date matches the specified date


Parameters
Cancel
Name	Description
date
string($date)
(query)
The check-out date to filter by

2026-8-8
pageNumber
integer($int32)
(query)
Optional page number for pagination

1
pageSize
integer($int32)
(query)
Optional page size for pagination

50
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/reports/departure?date=2026-8-8&pageNumber=1&pageSize=50' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsInVzZXJOYW1lIjoicG9sYSIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4ODg3NDYxMiwiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.8F4YGIoAaHHdFyLVa0bBMJn2vvgXo-0Bf2Va7y4GgHY'
Request URL
https://rentaltech.premiumasp.net/api/reports/departure?date=2026-8-8&pageNumber=1&pageSize=50
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "date": "2026-08-08",
    "summary": {
      "totalRecords": 0,
      "totalNights": 0,
      "totalPrice": 0
    },
    "items": [],
    "pageNumber": 1,
    "pageSize": 50,
    "totalCount": 0,
    "totalPages": 0,
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
 date: Tue,08 Sep 2026 12:39:58 GMT 
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
  "date": "2026-09-08",
  "summary": {
    "totalRecords": 0,
    "totalNights": 0,
    "totalPrice": 0
  },
  "items": [
    {
      "bookingId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "customerName": "string",
      "apartmentCode": "string",
      "nights": 0,
      "checkIn": "2026-09-08",
      "checkOut": "2026-09-08",
      "price": 0,
      "source": "string",
      "area": "string"
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
/api/reports/in-house
Get In-House Report in JSON format for UI display Returns bookings where guests have ACTUALLY checked in and NOT checked out within the date range


Parameters
Cancel
Name	Description
from
string($date)
(query)
Start date of the range (inclusive)

2026-8-01
to
string($date)
(query)
End date of the range (exclusive boundary)

2026-8-31
pageNumber
integer($int32)
(query)
Optional page number for pagination

1
pageSize
integer($int32)
(query)
Optional page size for pagination

50
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/reports/in-house?from=2026-8-01&to=2026-8-31&pageNumber=1&pageSize=50' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsInVzZXJOYW1lIjoicG9sYSIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4ODg3NDYxMiwiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.8F4YGIoAaHHdFyLVa0bBMJn2vvgXo-0Bf2Va7y4GgHY'
Request URL
https://rentaltech.premiumasp.net/api/reports/in-house?from=2026-8-01&to=2026-8-31&pageNumber=1&pageSize=50
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "from": "2026-08-01",
    "to": "2026-08-31",
    "summary": {
      "totalRecords": 0,
      "totalNights": 0,
      "totalPrice": 0
    },
    "items": [],
    "pageNumber": 1,
    "pageSize": 50,
    "totalCount": 0,
    "totalPages": 0,
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
 date: Tue,08 Sep 2026 12:40:13 GMT 
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
  "from": "2026-09-08",
  "to": "2026-09-08",
  "summary": {
    "totalRecords": 0,
    "totalNights": 0,
    "totalPrice": 0
  },
  "items": [
    {
      "bookingId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "customerName": "string",
      "apartmentCode": "string",
      "nights": 0,
      "checkIn": "2026-09-08",
      "checkOut": "2026-09-08",
      "price": 0,
      "source": "string",
      "area": "string"
    }
  ],
  "pageNumber": 0,
  "pageSize": 0,
  "totalCount": 0,
  "totalPages": 0,
  "hasPreviousPage": true,
  "hasNextPage": true
}
we have updated the booking id 
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

73a1d9a2-1279-4bfb-8724-1e252c2bc2b0
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/property-bookings/73a1d9a2-1279-4bfb-8724-1e252c2bc2b0' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsInVzZXJOYW1lIjoicG9sYSIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4ODg3NDYxMiwiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.8F4YGIoAaHHdFyLVa0bBMJn2vvgXo-0Bf2Va7y4GgHY'
Request URL
https://rentaltech.premiumasp.net/api/property-bookings/73a1d9a2-1279-4bfb-8724-1e252c2bc2b0
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "id": "73a1d9a2-1279-4bfb-8724-1e252c2bc2b0",
    "bookingId": "73a1d9a2-1279-4bfb-8724-1e252c2bc2b0",
    "bookingNumber": "BK-000016",
    "status": 2,
    "statusName": "Confirmed",
    "bookingSource": "Website",
    "bookingSourceName": "Website",
    "paymentStatus": 3,
    "paymentStatusName": "Paid",
    "totalPrice": 100,
    "requiredPaymentAmount": 10,
    "paidAmount": 100,
    "remainingAmount": 0,
    "createdAtUtc": "2026-09-08T12:46:52.8654826",
    "confirmedAt": "2026-09-08T12:48:47.3287631",
    "completedAt": null,
    "property": {
      "propertyId": "7b769750-a629-4b87-8a5c-cd2366a414bf",
      "propertyNumber": "PR-000034",
      "propertyName": "Regency - Apartment - Unit 406",
      "address": "NA, Hurghada, Egypt"
    },
    "guest": {
      "fullName": "test",
      "email": "test@test.asdf",
      "phone": "123123",
      "person": 1
    },
    "stay": {
      "checkIn": "2026-09-08",
      "checkOut": "2026-09-09",
      "numberOfNights": 1
    },
    "price": {
      "totalPrice": 100,
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
 date: Tue,08 Sep 2026 12:50:56 GMT 
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
  "bookingNumber": "string",
  "status": 1,
  "statusName": "string",
  "bookingSource": "Website",
  "bookingSourceName": "string",
  "paymentStatus": 1,
  "paymentStatusName": "string",
  "totalPrice": 0,
  "requiredPaymentAmount": 0,
  "paidAmount": 0,
  "remainingAmount": 0,
  "createdAtUtc": "2026-09-08T12:50:56.940Z",
  "confirmedAt": "2026-09-08T12:50:56.940Z",
  "completedAt": "2026-09-08T12:50:56.940Z",
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
    "checkIn": "2026-09-08",
    "checkOut": "2026-09-08",
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
and we have also added the confrime 
POST
/api/property-bookings/{bookingId}/mark-as-paid-all
Administrative endpoint to mark the remaining Property Booking balance as fully paid


Parameters
Cancel
Name	Description
bookingId *
string($uuid)
(path)
Booking ID

73a1d9a2-1279-4bfb-8724-1e252c2bc2b0
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/property-bookings/73a1d9a2-1279-4bfb-8724-1e252c2bc2b0/mark-as-paid-all' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsInVzZXJOYW1lIjoicG9sYSIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4ODg3NDYxMiwiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.8F4YGIoAaHHdFyLVa0bBMJn2vvgXo-0Bf2Va7y4GgHY' \
  -d ''
Request URL
https://rentaltech.premiumasp.net/api/property-bookings/73a1d9a2-1279-4bfb-8724-1e252c2bc2b0/mark-as-paid-all
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "id": "73a1d9a2-1279-4bfb-8724-1e252c2bc2b0",
    "bookingId": "73a1d9a2-1279-4bfb-8724-1e252c2bc2b0",
    "bookingNumber": "BK-000016",
    "status": 2,
    "statusName": "Confirmed",
    "bookingSource": "Website",
    "bookingSourceName": "Website",
    "paymentStatus": 3,
    "paymentStatusName": "Paid",
    "totalPrice": 100,
    "requiredPaymentAmount": 10,
    "paidAmount": 190,
    "remainingAmount": 0,
    "createdAtUtc": "2026-09-08T12:46:52.8654826",
    "confirmedAt": "2026-09-08T12:48:47.3287631",
    "completedAt": null,
    "property": {
      "propertyId": "7b769750-a629-4b87-8a5c-cd2366a414bf",
      "propertyNumber": "PR-000034",
      "propertyName": "Regency - Apartment - Unit 406",
      "address": "NA, Hurghada, Egypt"
    },
    "guest": {
      "fullName": "test",
      "email": "test@test.asdf",
      "phone": "123123",
      "person": 1
    },
    "stay": {
      "checkIn": "2026-09-08",
      "checkOut": "2026-09-09",
      "numberOfNights": 1
    },
    "price": {
      "totalPrice": 100,
      "pricePerNight": 100
    }
  },
  "isSuccess": true,
  "message": "Booking marked as fully paid successfully.",
  "errors": [],
  "type": 200
}
we also need to make sure we show the right data in the booking all 
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
BookingSource
string
(query)

--
PaymentStatus
integer($int32)
(query)

--
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
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsInVzZXJOYW1lIjoicG9sYSIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4ODg3NDYxMiwiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.8F4YGIoAaHHdFyLVa0bBMJn2vvgXo-0Bf2Va7y4GgHY'
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
        "id": "73a1d9a2-1279-4bfb-8724-1e252c2bc2b0",
        "bookingNumber": "BK-000016",
        "bookingType": 1,
        "bookingTypeName": "Property",
        "bookingSource": "Website",
        "bookingSourceName": "Website",
        "fullName": "test",
        "checkIn": "2026-09-08",
        "checkOut": "2026-09-09",
        "totalPrice": 100,
        "requiredPaymentAmount": 10,
        "paidAmount": 100,
        "remainingAmount": 0,
        "status": 2,
        "statusName": "Confirmed",
        "paymentStatus": 3,
        "paymentStatusName": "Paid",
        "createdAtUtc": "2026-09-08T12:46:52.8654826"
      },
  }
}
as now we have the status of parilty paied and we need to show the data all right could you create a plan so that we implment all of those right tell me what you gonna do 