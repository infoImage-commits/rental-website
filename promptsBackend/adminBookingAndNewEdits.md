here we should create a plan so that we are done with the booking
first of all we have added the bookingSource 
in the normal form for the booking 
Bookings


POST
/api/bookings


Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "propertyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "fullName": "string",
  "email": "string",
  "phone": "string",
  "person": 0,
  "checkIn": "2026-09-08",
  "checkOut": "2026-09-08",
  "bookingSource": "Website"
}
by defalut we won't change anything in the UI we will only send it as Website from now one each time the clinet create a request okay ?
but using this endpoint 
POST
/api/bookings/admin
Admin booking creation (confirms immediately and blocks unit)


Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "unitId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "propertyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "checkIn": "2026-09-08",
  "checkOut": "2026-09-08",
  "bookingSource": "Website",
  "fullName": "string",
  "email": "string",
  "phone": "string",
  "person": 0
}
Responses
Code	Description	Links
201	
Created

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "bookingId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "bookingNumber": "string",
  "status": "string",
  "totalPrice": 0
}
it will be confirment at once and the admin should be choosing the booking Source [ Website, PMP, Booking, Other ] as he wishes from those enums
GET
/api/bookings/in-house
Get operational status and bookings of all units, optionally filtered by date range


UNIT STATUS DEFINITIONS:

InHouse: Guest has ACTUALLY checked in and NOT checked out

Criteria: Status = Confirmed, ConfirmedAt IS NOT NULL, CompletedAt IS NULL, CheckIn ≤ Today < CheckOut
Booked: Unit has a confirmed future booking (guest has not checked in yet)

Criteria: (Status = Confirmed OR PendingPayment OR PaymentProcessing) AND Today < CheckIn
Available: Unit has no active or upcoming confirmed bookings

IMPORTANT:

A confirmed booking before the guest arrives is "Booked", NOT "InHouse"
Only after actual check-in (ConfirmedAt timestamp set) does status become "InHouse"
After check-out (CompletedAt timestamp set), unit is no longer "InHouse"
Parameters
Cancel
Name	Description
from
string($date)
(query)
Optional start date of filter range (inclusive)

2026-08-01
to
string($date)
(query)
Optional end date of filter range (exclusive boundary)

2026-08-31
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/bookings/in-house?from=2026-08-01&to=2026-08-31' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjkzNjE0MjY2LTFlN2QtNGRjZi1hMzBkLTA4ZGVmZGQ1ODQ5NCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6IjkzNjE0MjY2LTFlN2QtNGRjZi1hMzBkLTA4ZGVmZGQ1ODQ5NCIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg4ODU3NTExLCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.BmFTmagFFNqh3k1XX6Yx1nMK6Ek9VI12glsP9WSChcE'
Request URL
https://rentaltech.premiumasp.net/api/bookings/in-house?from=2026-08-01&to=2026-08-31
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "from": "2026-08-01",
    "to": "2026-08-31",
    "totalUnits": 22,
    "inHouseCount": 0,
    "bookedCount": 0,
    "availableCount": 22,
    "units": [
      {
        "unitId": "b12462d5-ea59-42c6-9bec-7d698d54d273",
        "unitName": "Aldau - Studio - Unit 2608",
        "unitNumber": "PR-000001",
        "status": "Available",
        "statusName": "Available",
        "bookings": []
      },
      {
        "unitId": "0730fc78-14d7-4238-9ce6-cb3135a7fc80",
        "unitName": "Aldau - Studio - Unit 11716",
        "unitNumber": "PR-000002",
        "status": "Available",
        "statusName": "Available",
        "bookings": []
      },
      {
        "unitId": "1215b7c0-3ec4-4d3c-a169-47ac01b3d97e",
        "unitName": "Aldau - Studio - Unit 3316",
        "unitNumber": "PR-000003",
        "status": "Available",
        "statusName": "Available",
        "bookings": []
      },
      {
        "unitId": "a8aa2fd7-ebb3-4979-a605-f9387dcf7440",
        "unitName": "Aldau - Studio - Unit 3106",
        "unitNumber": "PR-000004",
        "status": "Available",
        "statusName": "Available",
        "bookings": []
      },
      {
        "unitId": "28ce65c1-3f80-4cc5-aebb-9f07e7d34fec",
        "unitName": "Aldau - Studio - Unit 2303",
        "unitNumber": "PR-000005",
        "status": "Available",
        "statusName": "Available",
        "bookings": []
      },
      {
        "unitId": "40617cf7-fa32-4954-9950-1f4cd3054e8a",
        "unitName": "Aldau - Studio - Unit 12209",
        "unitNumber": "PR-000006",
        "status": "Available",
        "statusName": "Available",
        "bookings": []
      },
      {
        "unitId": "c2b81f72-cfdf-4308-9ef4-ef93783f61ef",
        "unitName": "Aldau - Studio - Unit 12511",
        "unitNumber": "PR-000007",
        "status": "Available",
        "statusName": "Available",
        "bookings": []
      },
      {
        "unitId": "019ec65c-c099-4fea-a1f9-f91feb52c56b",
        "unitName": "Aldau - Studio - Unit 3315",
        "unitNumber": "PR-000008",
        "status": "Available",
        "statusName": "Available",
        "bookings": []
      },
      {
        "unitId": "e573d8e4-ebdb-430b-92ea-263baf67d2db",
        "unitName": "Aldau - Studio - Unit 3307",
        "unitNumber": "PR-000009",
        "status": "Available",
        "statusName": "Available",
        "bookings": []
      },
      {
        "unitId": "26b3827e-fd2f-4635-9756-fde5d825d2d4",
        "unitName": "Aldau - Studio - Unit 3308",
        "unitNumber": "PR-000010",
        "status": "Available",
        "statusName": "Available",
        "bookings": []
      },
      {
        "unitId": "689dd5a2-0028-4404-b1dd-798b87a94b00",
        "unitName": "Aldau - Studio - Unit 3211",
        "unitNumber": "PR-000011",
        "status": "Available",
        "statusName": "Available",
        "bookings": []
      },
      {
        "unitId": "b25d1dfd-1daa-4fa6-a162-5dea6a571c4d",
        "unitName": "Aldau - Studio - Unit 3210",
        "unitNumber": "PR-000012",
        "status": "Available",
        "statusName": "Available",
        "bookings": []
      },
      {
        "unitId": "b72fe8ef-f75e-402a-bb3a-755277dd17ec",
        "unitName": "Aldau - Studio - Unit 9205",
        "unitNumber": "PR-000013",
        "status": "Available",
        "statusName": "Available",
        "bookings": []
      },
      {
        "unitId": "19e91fb0-62ee-464f-90a1-5297d21cad3f",
        "unitName": "Aldau - Studio - Unit 12311",
        "unitNumber": "PR-000014",
        "status": "Available",
        "statusName": "Available",
        "bookings": []
      },
      {
        "unitId": "cffecfa7-f46f-41e7-a970-12b6d5f24b0a",
        "unitName": "Aldau - Studio - Unit 2604",
        "unitNumber": "PR-000015",
        "status": "Available",
        "statusName": "Available",
        "bookings": []
      },
      {
        "unitId": "ce453434-a904-43fe-a0d1-1eea2fa2d9e4",
        "unitName": "Aldau - Studio - Unit 2408",
        "unitNumber": "PR-000016",
        "status": "Available",
        "statusName": "Available",
        "bookings": []
      },
      {
        "unitId": "20e54c69-0c0c-4da8-9ced-cf3cfaeb89e3",
        "unitName": "Aldau - Studio - Unit 3203",
        "unitNumber": "PR-000017",
        "status": "Available",
        "statusName": "Available",
        "bookings": []
      },
      {
        "unitId": "aa4b3ca9-dec7-4653-8d70-1136f95580fd",
        "unitName": "Aldau - Studio - Unit 3206",
        "unitNumber": "PR-000018",
        "status": "Available",
        "statusName": "Available",
        "bookings": []
      },
      {
        "unitId": "10e5766a-8d8f-456b-ba45-af8b1cd70e5b",
        "unitName": "Aldau - Apartment - Unit 3313",
        "unitNumber": "PR-000019",
        "status": "Available",
        "statusName": "Available",
        "bookings": []
      },
      {
        "unitId": "9e69a5d6-1dbe-499e-aff4-9dc392836494",
        "unitName": "Aldau - Apartment - Unit 3309",
        "unitNumber": "PR-000020",
        "status": "Available",
        "statusName": "Available",
        "bookings": []
      },
      {
        "unitId": "592c20f7-30d5-41c1-b8ec-3ae9494e9d46",
        "unitName": "Aldau - Apartment - Unit 10201",
        "unitNumber": "PR-000021",
        "status": "Available",
        "statusName": "Available",
        "bookings": []
      },
      {
        "unitId": "94a51d73-2b6e-4400-8d7a-a5aef8601050",
        "unitName": "Aldau - Apartment - Unit 11313",
        "unitNumber": "PR-000022",
        "status": "Available",
        "statusName": "Available",
        "bookings": []
      }
    ]
  },
  "isSuccess": true,
  "message": null,
  "errors": [],
  "type": 200
}
{
  "from": "2026-09-08",
  "to": "2026-09-08",
  "totalUnits": 0,
  "inHouseCount": 0,
  "bookedCount": 0,
  "availableCount": 0,
  "units": [
    {
      "unitId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "unitName": "string",
      "unitNumber": "string",
      "status": "InHouse",
      "statusName": "string",
      "bookings": [
        {
          "bookingId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "bookingNumber": "string",
          "checkIn": "2026-09-08",
          "checkOut": "2026-09-08",
          "status": "string",
          "guestName": "string",
          "bookingSource": "Website",
          "bookingSourceName": "string"
        }
      ]
    }
  ]
}
and this endpoint should be used so that we show the admin the inhouse list he will choose the dates and after that it will generaet the data for it and we should create a way to show all of those data 
also make sure those are right 
POST
/api/property-bookings


Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "propertyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "fullName": "string",
  "email": "string",
  "phone": "string",
  "person": 0,
  "checkIn": "2026-09-08",
  "checkOut": "2026-09-08",
  "bookingSource": "Website"
}
should alsoways use the website option when the clinet try and book it 
this one
POST
/api/property-bookings/admin
Admin booking creation (confirms immediately and blocks unit)


Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "unitId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "propertyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "checkIn": "2026-09-08",
  "checkOut": "2026-09-08",
  "bookingSource": "Website",
  "fullName": "string",
  "email": "string",
  "phone": "string",
  "person": 0
}
is for the admin and he could choose any of the bookingSource as he wants 

GET
/api/property-bookings
Get paginated list of property bookings with filtering and sorting


Parameters
Try it out
Name	Description
Status
integer($int32)
(query)
Available values : 1, 2, 3, 4, 5, 6, 7, 8, 9


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
Available values : Website, PMP, Booking, Other


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
      "bookingSource": "Website",
      "bookingSourceName": "string",
      "fullName": "string",
      "checkIn": "2026-09-08",
      "checkOut": "2026-09-08",
      "totalPrice": 0,
      "status": 1,
      "statusName": "string",
      "createdAtUtc": "2026-09-08T07:59:16.536Z"
    }
  ],
  "pageNumber": 0,
  "pageSize": 0,
  "totalCount": 0,
  "totalPages": 0,
  "hasPreviousPage": true,
  "hasNextPage": true
}
GET
/api/property-bookings/{id}
Get property booking by ID with complete details


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
Booking ID

id
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
  "bookingSource": "Website",
  "bookingSourceName": "string",
  "paymentStatus": 1,
  "paymentStatusName": "string",
  "createdAtUtc": "2026-09-08T07:59:33.916Z",
  "confirmedAt": "2026-09-08T07:59:33.916Z",
  "completedAt": "2026-09-08T07:59:33.916Z",
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

now you have all the data you need could you create a plan so that everything is working right
note that i know we are hiding the buying for the UI but we should make sure everything is linked or at least the endpoint themselves in the app okay?
now create a plan telling me what you gonna do so that i can reivew it 