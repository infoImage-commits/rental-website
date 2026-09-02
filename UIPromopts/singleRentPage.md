okay great for the next section we need to make the single rent page really work to do that we need to use the following endpoints
GET
/api/properties/{id}
Get property by id


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
edc52005-601c-424e-9f73-c55e35ad51a7
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/properties/edc52005-601c-424e-9f73-c55e35ad51a7' \
  -H 'accept: */*'
Request URL
https://rentaltech.premiumasp.net/api/properties/edc52005-601c-424e-9f73-c55e35ad51a7
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "id": "edc52005-601c-424e-9f73-c55e35ad51a7",
    "propertyNumber": "PR-000001",
    "code": "12312312",
    "name": "123123",
    "description": "312312312312321",
    "bedroomNo": 1,
    "bathroomNo": 1,
    "roomNo": 1,
    "capacity": 2,
    "size": 50,
    "basePrice": 100,
    "propertyType": 1,
    "propertyTypeName": "Apartment",
    "propertyStatus": 1,
    "propertyStatusName": "Clean",
    "isAvailable": true,
    "isFeatured": true,
    "hasSeaView": true,
    "hasPoolView": true,
    "hasGardenView": true,
    "hasMountainView": true,
    "hasCityView": false,
    "latitude": 0,
    "longitude": 0,
    "rulesCancellation": "",
    "notes": "",
    "createdAtUtc": "2026-08-22T10:41:58.5724552",
    "updatedAtUtc": "2026-08-22T10:42:29.0467348",
    "category": {
      "id": "70c38123-4cd2-4724-92fb-a52228625f19",
      "name": "test",
      "imageUrl": "uploads/categories/8506f126-49f7-4a0e-b0fb-97fbc5a36e68.webp"
    },
    "address": {
      "id": "4406946b-cc72-4084-b808-b91106dcf613",
      "propertyId": "edc52005-601c-424e-9f73-c55e35ad51a7",
      "country": "12312",
      "state": "",
      "city": "312312",
      "area": "3123",
      "zipCode": "123123",
      "street": "123123"
    },
    "listingDetails": {
      "id": "31dd634e-23cb-4a25-883e-a367cea2fef0",
      "propertyId": "edc52005-601c-424e-9f73-c55e35ad51a7",
      "listingStatus": 0,
      "listingStatusName": "",
      "lateCheckIn": "gsdfgsdfg",
      "outdoorFacility": "sdfgsdfg",
      "originalService": "sdfgsdfgsdfg",
      "cancellation": "sdfgsdfg",
      "extraPeopleFee": 120,
      "privatebathroom": true,
      "checkInHour": "14:00:00",
      "checkOutHour": "12:00:00",
      "familyFriendly": true,
      "privateEntrance": true,
      "extraPeople": "3"
    },
    "images": [
      {
        "id": "78b29a37-dd6a-45c2-a33f-ba87e2cccf07",
        "propertyId": "edc52005-601c-424e-9f73-c55e35ad51a7",
        "imageUrl": "uploads/properties/edc52005-601c-424e-9f73-c55e35ad51a7/1cce0fee-dd4b-4451-ba96-ca4bcd16790e.webp",
        "displayOrder": 1,
        "isCover": true
      }
    ],
    "prices": [
      {
        "id": "e2b6cfd8-f377-4dfa-9726-0438b6262d67",
        "propertyId": "edc52005-601c-424e-9f73-c55e35ad51a7",
        "dayNo": 1,
        "price": 100
      },
      {
        "id": "df9844ba-d395-4d69-bf0e-1f973b2dd011",
        "propertyId": "edc52005-601c-424e-9f73-c55e35ad51a7",
        "dayNo": 2,
        "price": 100
      },
      {
        "id": "20a68a65-b5b3-4555-a675-5df1b0f3a069",
        "propertyId": "edc52005-601c-424e-9f73-c55e35ad51a7",
        "dayNo": 3,
        "price": 100
      },
      {
        "id": "cc37a662-1b71-4a66-91bd-f8e2d58cff9a",
        "propertyId": "edc52005-601c-424e-9f73-c55e35ad51a7",
        "dayNo": 4,
        "price": 100
      },
      {
        "id": "70d5b798-57d2-4765-bdb2-1b7e34ad6a0d",
        "propertyId": "edc52005-601c-424e-9f73-c55e35ad51a7",
        "dayNo": 5,
        "price": 100
      },
      {
        "id": "21db22dc-2417-41c5-9de7-a174421d555d",
        "propertyId": "edc52005-601c-424e-9f73-c55e35ad51a7",
        "dayNo": 6,
        "price": 100
      },
      {
        "id": "412c0e96-a900-43e2-bcb9-7a330e1f879f",
        "propertyId": "edc52005-601c-424e-9f73-c55e35ad51a7",
        "dayNo": 7,
        "price": 100
      }
    ],
    "sleepingArrangements": [
      {
        "id": "203a916f-36dd-4c68-b9ca-b3dc138f7198",
        "name": "Master Bedroom",
        "displayOrder": 1,
        "beds": [
          {
            "id": "8a62c5f0-4f0f-434a-8acb-2f57892fc133",
            "bedType": 1,
            "bedTypeName": "Twin",
            "quantity": 1
          },
          {
            "id": "4f7ed527-0527-4bfe-aea0-e97158df86dd",
            "bedType": 4,
            "bedTypeName": "King",
            "quantity": 1
          }
        ]
      }
    ],
    "categories": [
      {
        "categoryName": "things",
        "items": [
          "123123"
        ]
      }
    ]
  },
  "isSuccess": true,
  "message": null,
  "errors": [],
  "type": 200
}
and this GET
/api/properties/{propertyId}/availability
Returns a booking availability calendar for a property over the specified date range.


The calendar shows all Pending, Confirmed, and Completed bookings that overlap the requested period. Cancelled and Rejected bookings are hidden from the calendar.

isBookable field rules:

Pending → true (does NOT block new bookings)
Confirmed → false (blocks confirming another booking for the same period)
Completed → true (historical record, does not block future bookings)
Important: Property.IsAvailable reflects whether a property is published and visible on the website. It is not related to booking availability, which is always calculated dynamically from the bookings stored in the database.

Example request:

GET /api/properties/{propertyId}/availability?startDate=2026-08-01&endDate=2026-08-31
Example response:

{
  "propertyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "propertyNumber": "PR-000021",
  "propertyName": "Luxury Villa",
  "bookingCalendar": [
    { "bookingId": "...", "bookingNumber": "BK-000031", "status": 1, "statusName": "Pending",   "from": "2026-08-03", "to": "2026-08-06", "isBookable": true  },
    { "bookingId": "...", "bookingNumber": "BK-000032", "status": 2, "statusName": "Confirmed", "from": "2026-08-10", "to": "2026-08-15", "isBookable": false },
    { "bookingId": "...", "bookingNumber": "BK-000033", "status": 5, "statusName": "Completed", "from": "2026-08-20", "to": "2026-08-22", "isBookable": true  }
  ]
}
Parameters
Cancel
Name	Description
propertyId *
string($uuid)
(path)
The property to query.

edc52005-601c-424e-9f73-c55e35ad51a7
startDate
string($date)
(query)
Start of the date range (inclusive), e.g. 2026-08-01.

2026-08-01
endDate
string($date)
(query)
End of the date range (exclusive), e.g. 2026-08-31.

2026-08-31
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/properties/edc52005-601c-424e-9f73-c55e35ad51a7/availability?startDate=2026-08-01&endDate=2026-08-31' \
  -H 'accept: application/json'
Request URL
https://rentaltech.premiumasp.net/api/properties/edc52005-601c-424e-9f73-c55e35ad51a7/availability?startDate=2026-08-01&endDate=2026-08-31
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "propertyId": "edc52005-601c-424e-9f73-c55e35ad51a7",
    "propertyNumber": "PR-000001",
    "propertyName": "123123",
    "bookingCalendar": []
  },
  "isSuccess": true,
  "message": null,
  "errors": [],
  "type": 200
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,22 Aug 2026 11:12:26 GMT 
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
  "propertyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "propertyNumber": "string",
  "propertyName": "string",
  "bookingCalendar": [
    {
      "bookingId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "bookingNumber": "string",
      "status": 1,
      "statusName": "string",
      "from": "2026-08-22",
      "to": "2026-08-22",
      "isBookable": true
    }
  ]
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
No links
422	
Unprocessable Content

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
now create a plan to fetch the id and show the name of the prop to make sure it's SEO freindly in the url show the name of it in the ulr and also we need to make sure the Availability section works right as well so that if there is booking or something it should show now could you create a plan to implnet it 