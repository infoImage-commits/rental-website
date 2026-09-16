review all of those endpoints as we need to update them or add them 
also note that in the booking when we canlise it we have 2 fileds it should be both as the reason we will will enter one of them and we will show it via cancellationReason
could you create a full plan so the that we have the data right and everything working right could you create a plan then i can review it 
GET
/api/bookings/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
a45e4b15-b65b-498f-9fd8-18dbca21ba27
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/bookings/a45e4b15-b65b-498f-9fd8-18dbca21ba27' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjkzNjE0MjY2LTFlN2QtNGRjZi1hMzBkLTA4ZGVmZGQ1ODQ5NCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6IjkzNjE0MjY2LTFlN2QtNGRjZi1hMzBkLTA4ZGVmZGQ1ODQ5NCIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg5NTUwNDc0LCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.QWuMvanfPeowEm5R2-48PKbe9eJ2ArM-llagG7CXOP0'
Request URL
https://rentaltech.premiumasp.net/api/bookings/a45e4b15-b65b-498f-9fd8-18dbca21ba27
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "id": "a45e4b15-b65b-498f-9fd8-18dbca21ba27",
    "bookingNumber": "BK-000062",
    "bookingType": 1,
    "bookingTypeName": "Property",
    "bookingSource": "AirPnP",
    "bookingSourceName": "AirPnP",
    "fullName": "123",
    "email": null,
    "phone": null,
    "calculatedPrice": 35,
    "actualPrice": 20,
    "effectivePrice": 35,
    "totalPrice": 35,
    "requiredPaymentAmount": 35,
    "paidAmount": 20,
    "remainingAmount": 15,
    "status": 4,
    "statusName": "Cancelled",
    "paymentStatus": 11,
    "paymentStatusName": "PartiallyPaid",
    "confirmedAt": "2026-09-16T08:28:13.0411357",
    "cancelledAt": "2026-09-16T08:30:15.0460094",
    "completedAt": null,
    "cancellationReason": "remove",
    "createdAtUtc": "2026-09-16T08:28:13.0872581",
    "hasExtensions": false,
    "extensionsCount": 0,
    "propertyBooking": {
      "propertyId": "7b769750-a629-4b87-8a5c-cd2366a414bf",
      "property": {
        "id": "7b769750-a629-4b87-8a5c-cd2366a414bf",
        "propertyNumber": "PR-000034",
        "code": "406",
        "name": "Regency - Apartment - Unit 406",
        "bedroomNo": 1,
        "bathroomNo": 1,
        "capacity": 2,
        "basePrice": 30,
        "propertyType": 12,
        "propertyTypeName": "oneBedroom",
        "propertyStatus": "Dirty",
        "isAvailable": true,
        "isFeatured": false,
        "coverImageUrl": null,
        "city": "Hurghada",
        "country": "Egypt",
        "createdAtUtc": "2026-09-08T10:53:52.9876188"
      },
      "person": 1,
      "checkIn": "2026-09-17",
      "checkOut": "2026-09-18",
      "numberOfNights": 1
    },
    "transferBooking": null
  },
  "isSuccess": true,
  "message": null,
  "errors": [],
  "type": 200
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Wed,16 Sep 2026 08:30:18 GMT 
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
  "bookingType": 1,
  "bookingTypeName": "string",
  "bookingSource": "Website",
  "bookingSourceName": "string",
  "fullName": "string",
  "email": "string",
  "phone": "string",
  "calculatedPrice": 0,
  "actualPrice": 0,
  "effectivePrice": 0,
  "totalPrice": 0,
  "requiredPaymentAmount": 0,
  "paidAmount": 0,
  "remainingAmount": 0,
  "status": 1,
  "statusName": "string",
  "paymentStatus": 1,
  "paymentStatusName": "string",
  "confirmedAt": "2026-09-16T08:30:18.083Z",
  "cancelledAt": "2026-09-16T08:30:18.083Z",
  "completedAt": "2026-09-16T08:30:18.083Z",
  "cancellationReason": "string",
  "createdAtUtc": "2026-09-16T08:30:18.083Z",
  "hasExtensions": true,
  "extensionsCount": 0,
  "propertyBooking": {
    "propertyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "property": {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "propertyNumber": "string",
      "code": "string",
      "name": "string",
      "bedroomNo": 0,
      "bathroomNo": 0,
      "capacity": 0,
      "basePrice": 0,
      "propertyType": 1,
      "propertyTypeName": "string",
      "propertyStatus": "string",
      "isAvailable": true,
      "isFeatured": true,
      "coverImageUrl": "string",
      "city": "string",
      "country": "string",
      "createdAtUtc": "2026-09-16T08:30:18.083Z"
    },
    "person": 0,
    "checkIn": "2026-09-16",
    "checkOut": "2026-09-16",
    "numberOfNights": 0
  },
  "transferBooking": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "bookingId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "bookingNumber": "string",
    "status": 1,
    "statusName": "string",
    "paymentStatus": 1,
    "paymentStatusName": "string",
    "journeyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "fromLocationName": "string",
    "toLocationName": "string",
    "tripType": 1,
    "tripTypeName": "string",
    "passengers": 0,
    "pickupDate": "2026-09-16",
    "pickupTime": "string",
    "returnDate": "2026-09-16",
    "returnTime": "string",
    "flightNumber": "string",
    "pickupNotes": "string",
    "dropOffNotes": "string"
  }
}
No links

PUT
/api/admin/bookings/{bookingId}/cancel
Admin cancels a booking with a required cause. Non-deleting status update, releases unit availability, cancels unpaid payments, appends history. Website bookings cannot be cancelled via this endpoint.


Parameters
Cancel
Reset
Name	Description
bookingId *
string($uuid)
(path)
a45e4b15-b65b-498f-9fd8-18dbca21ba27
Request body

application/json
{
  "cause": "test",
  "reason": "remove"
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://rentaltech.premiumasp.net/api/admin/bookings/a45e4b15-b65b-498f-9fd8-18dbca21ba27/cancel' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjkzNjE0MjY2LTFlN2QtNGRjZi1hMzBkLTA4ZGVmZGQ1ODQ5NCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6IjkzNjE0MjY2LTFlN2QtNGRjZi1hMzBkLTA4ZGVmZGQ1ODQ5NCIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg5NTUwNDc0LCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.QWuMvanfPeowEm5R2-48PKbe9eJ2ArM-llagG7CXOP0' \
  -H 'Content-Type: application/json' \
  -d '{
  "cause": "test",
  "reason": "remove"
}'
Request URL
https://rentaltech.premiumasp.net/api/admin/bookings/a45e4b15-b65b-498f-9fd8-18dbca21ba27/cancel
Server response
Code	Details
200	
Response body
Download
{
  "isSuccess": true,
  "message": "Booking cancelled successfully.",
  "errors": [],
  "type": 200
}

GET
/api/reports/cancelled-bookings
Get Cancelled Bookings Report in JSON format for UI display Returns bookings where cancellation date falls within the specified period


Parameters
Cancel
Name	Description
fromDate
string($date)
(query)
Start date of the cancellation period (inclusive)

2026-09-01
toDate
string($date)
(query)
End date of the cancellation period (inclusive)

2026-09-15
pageNumber
integer($int32)
(query)
Optional page number for pagination

pageNumber
pageSize
integer($int32)
(query)
Optional page size for pagination

pageSize
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/reports/cancelled-bookings?fromDate=2026-09-01&toDate=2026-09-15' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjkzNjE0MjY2LTFlN2QtNGRjZi1hMzBkLTA4ZGVmZGQ1ODQ5NCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6IjkzNjE0MjY2LTFlN2QtNGRjZi1hMzBkLTA4ZGVmZGQ1ODQ5NCIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg5NTUwNDc0LCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.QWuMvanfPeowEm5R2-48PKbe9eJ2ArM-llagG7CXOP0'
Request URL
https://rentaltech.premiumasp.net/api/reports/cancelled-bookings?fromDate=2026-09-01&toDate=2026-09-15
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "fromDate": "2026-09-01",
    "toDate": "2026-09-15",
    "summary": {
      "totalRecords": 10,
      "totalNights": 10,
      "totalAmount": 350,
      "totalPaid": 33,
      "totalRemaining": 317,
      "fullyPaidCancellations": 0,
      "partiallyPaidCancellations": 2,
      "unpaidCancellations": 8
    },
    "items": [
      {
        "bookingId": "bfe07b70-8cce-4619-8d36-7fa76ff56d1a",
        "bookingNumber": "BK-000058",
        "customerName": "kemo",
        "customerEmail": null,
        "customerPhone": null,
        "propertyCode": "406",
        "propertyName": "Regency - Apartment - Unit 406",
        "checkIn": "2026-11-17",
        "checkOut": "2026-11-18",
        "nights": 1,
        "bookingCreatedAt": "2026-09-15T14:34:17.9247731",
        "cancellationDate": "2026-09-15T14:47:34.9546801",
        "cancellationReason": "Booking hold expired - payment not completed within 5 minutes",
        "status": 4,
        "statusName": "Cancelled",
        "totalAmount": 35,
        "paidAmount": 0,
        "remainingAmount": 35,
        "paymentStatus": 10,
        "paymentStatusName": "Unpaid",
        "bookingSource": "Website",
        "bookingSourceName": "Website"
      },
      {
        "bookingId": "12f2cb1f-f836-43a0-8171-c43adf6bb343",
        "bookingNumber": "BK-000056",
        "customerName": "kemo",
        "customerEmail": null,
        "customerPhone": null,
        "propertyCode": "406",
        "propertyName": "Regency - Apartment - Unit 406",
        "checkIn": "2026-11-15",
        "checkOut": "2026-11-16",
        "nights": 1,
        "bookingCreatedAt": "2026-09-15T14:31:38.4724653",
        "cancellationDate": "2026-09-15T14:47:34.9546801",
        "cancellationReason": "Booking hold expired - payment not completed within 5 minutes",
        "status": 4,
        "statusName": "Cancelled",
        "totalAmount": 35,
        "paidAmount": 0,
        "remainingAmount": 35,
        "paymentStatus": 10,
        "paymentStatusName": "Unpaid",
        "bookingSource": "Website",
        "bookingSourceName": "Website"
      },
      {
        "bookingId": "87fe02db-d859-422f-8c2c-c9cb86b48ea6",
        "bookingNumber": "BK-000057",
        "customerName": "kemo",
        "customerEmail": null,
        "customerPhone": null,
        "propertyCode": "406",
        "propertyName": "Regency - Apartment - Unit 406",
        "checkIn": "2026-11-16",
        "checkOut": "2026-11-17",
        "nights": 1,
        "bookingCreatedAt": "2026-09-15T14:33:50.4488108",
        "cancellationDate": "2026-09-15T14:47:34.9546801",
        "cancellationReason": "Booking hold expired - payment not completed within 5 minutes",
        "status": 4,
        "statusName": "Cancelled",
        "totalAmount": 35,
        "paidAmount": 0,
        "remainingAmount": 35,
        "paymentStatus": 10,
        "paymentStatusName": "Unpaid",
        "bookingSource": "Website",
        "bookingSourceName": "Website"
      },
      {
        "bookingId": "2b542581-b569-4d2c-9be1-2bd2746e9c01",
        "bookingNumber": "BK-000051",
        "customerName": "kemo",
        "customerEmail": null,
        "customerPhone": null,
        "propertyCode": "406",
        "propertyName": "Regency - Apartment - Unit 406",
        "checkIn": "2026-11-15",
        "checkOut": "2026-11-16",
        "nights": 1,
        "bookingCreatedAt": "2026-09-15T14:13:01.1912126",
        "cancellationDate": "2026-09-15T14:31:37.1377048",
        "cancellationReason": "Booking hold expired - payment not completed within 5 minutes",
        "status": 4,
        "statusName": "Cancelled",
        "totalAmount": 35,
        "paidAmount": 0,
        "remainingAmount": 35,
        "paymentStatus": 10,
        "paymentStatusName": "Unpaid",
        "bookingSource": "Website",
        "bookingSourceName": "Website"
      },
      {
        "bookingId": "fc0f3ce3-63a8-488b-a096-5963a698f181",
        "bookingNumber": "BK-000050",
        "customerName": "kemo",
        "customerEmail": null,
        "customerPhone": null,
        "propertyCode": "406",
        "propertyName": "Regency - Apartment - Unit 406",
        "checkIn": "2026-11-15",
        "checkOut": "2026-11-16",
        "nights": 1,
        "bookingCreatedAt": "2026-09-15T14:12:56.8073715",
        "cancellationDate": "2026-09-15T14:31:37.1377048",
        "cancellationReason": "Booking hold expired - payment not completed within 5 minutes",
        "status": 4,
        "statusName": "Cancelled",
        "totalAmount": 35,
        "paidAmount": 0,
        "remainingAmount": 35,
        "paymentStatus": 10,
        "paymentStatusName": "Unpaid",
        "bookingSource": "Website",
        "bookingSourceName": "Website"
      },
      {
        "bookingId": "54587d89-110c-4d2e-a0f1-ddd533a6f43f",
        "bookingNumber": "BK-000055",
        "customerName": "kemo",
        "customerEmail": null,
        "customerPhone": null,
        "propertyCode": "406",
        "propertyName": "Regency - Apartment - Unit 406",
        "checkIn": "2026-11-16",
        "checkOut": "2026-11-17",
        "nights": 1,
        "bookingCreatedAt": "2026-09-15T14:20:34.7426395",
        "cancellationDate": "2026-09-15T14:24:28.1640583",
        "cancellationReason": "Booking hold expired - payment not completed within 5 minutes",
        "status": 4,
        "statusName": "Cancelled",
        "totalAmount": 35,
        "paidAmount": 0,
        "remainingAmount": 35,
        "paymentStatus": 10,
        "paymentStatusName": "Unpaid",
        "bookingSource": "Website",
        "bookingSourceName": "Website"
      },
      {
        "bookingId": "0d72627c-39df-4654-8dc2-d0def547856e",
        "bookingNumber": "BK-000054",
        "customerName": "kemo",
        "customerEmail": null,
        "customerPhone": null,
        "propertyCode": "406",
        "propertyName": "Regency - Apartment - Unit 406",
        "checkIn": "2026-11-16",
        "checkOut": "2026-11-17",
        "nights": 1,
        "bookingCreatedAt": "2026-09-15T14:20:19.6926748",
        "cancellationDate": "2026-09-15T14:20:29.4589871",
        "cancellationReason": "Booking hold expired - payment not completed within 5 minutes",
        "status": 4,
        "statusName": "Cancelled",
        "totalAmount": 35,
        "paidAmount": 0,
        "remainingAmount": 35,
        "paymentStatus": 10,
        "paymentStatusName": "Unpaid",
        "bookingSource": "Website",
        "bookingSourceName": "Website"
      },
      {
        "bookingId": "bc23b701-f157-44db-878d-2cf91047b1c5",
        "bookingNumber": "BK-000053",
        "customerName": "kemo",
        "customerEmail": null,
        "customerPhone": null,
        "propertyCode": "406",
        "propertyName": "Regency - Apartment - Unit 406",
        "checkIn": "2026-11-16",
        "checkOut": "2026-11-17",
        "nights": 1,
        "bookingCreatedAt": "2026-09-15T14:20:02.6210359",
        "cancellationDate": "2026-09-15T14:20:12.1989676",
        "cancellationReason": "Booking hold expired - payment not completed within 5 minutes",
        "status": 4,
        "statusName": "Cancelled",
        "totalAmount": 35,
        "paidAmount": 0,
        "remainingAmount": 35,
        "paymentStatus": 10,
        "paymentStatusName": "Unpaid",
        "bookingSource": "Website",
        "bookingSourceName": "Website"
      },
      {
        "bookingId": "cfad5e44-e86f-4785-a4cc-23f981459ec5",
        "bookingNumber": "BK-000047",
        "customerName": "resr",
        "customerEmail": null,
        "customerPhone": null,
        "propertyCode": "406",
        "propertyName": "Regency - Apartment - Unit 406",
        "checkIn": "2026-12-02",
        "checkOut": "2026-12-03",
        "nights": 1,
        "bookingCreatedAt": "2026-09-15T14:01:36.7285679",
        "cancellationDate": "2026-09-15T14:04:52.6285551",
        "cancellationReason": "test",
        "status": 4,
        "statusName": "Cancelled",
        "totalAmount": 35,
        "paidAmount": 10,
        "remainingAmount": 25,
        "paymentStatus": 11,
        "paymentStatusName": "PartiallyPaid",
        "bookingSource": "Other",
        "bookingSourceName": "Other"
      },
      {
        "bookingId": "e1711550-93fb-4a01-88cb-6acb2a23aad3",
        "bookingNumber": "BK-000034",
        "customerName": "string",
        "customerEmail": null,
        "customerPhone": null,
        "propertyCode": "406",
        "propertyName": "Regency - Apartment - Unit 406",
        "checkIn": "2026-10-22",
        "checkOut": "2026-10-23",
        "nights": 1,
        "bookingCreatedAt": "2026-09-15T10:05:31.3002644",
        "cancellationDate": "2026-09-15T11:01:29.3700671",
        "cancellationReason": "string",
        "status": 4,
        "statusName": "Cancelled",
        "totalAmount": 35,
        "paidAmount": 23,
        "remainingAmount": 12,
        "paymentStatus": 11,
        "paymentStatusName": "PartiallyPaid",
        "bookingSource": "Booking",
        "bookingSourceName": "Booking"
      }
    ],
    "pageNumber": null,
    "pageSize": null,
    "totalCount": 10,
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
 date: Wed,16 Sep 2026 08:32:37 GMT 
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
  "fromDate": "2026-09-16",
  "toDate": "2026-09-16",
  "summary": {
    "totalRecords": 0,
    "totalNights": 0,
    "totalAmount": 0,
    "totalPaid": 0,
    "totalRemaining": 0,
    "fullyPaidCancellations": 0,
    "partiallyPaidCancellations": 0,
    "unpaidCancellations": 0
  },
  "items": [
    {
      "bookingId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "bookingNumber": "string",
      "customerName": "string",
      "customerEmail": "string",
      "customerPhone": "string",
      "propertyCode": "string",
      "propertyName": "string",
      "checkIn": "2026-09-16",
      "checkOut": "2026-09-16",
      "nights": 0,
      "bookingCreatedAt": "2026-09-16T08:32:38.235Z",
      "cancellationDate": "2026-09-16T08:32:38.235Z",
      "cancellationReason": "string",
      "status": 1,
      "statusName": "string",
      "totalAmount": 0,
      "paidAmount": 0,
      "remainingAmount": 0,
      "paymentStatus": 1,
      "paymentStatusName": "string",
      "bookingSource": "Website",
      "bookingSourceName": "string"
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
400	
Bad Request

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

GET
/api/reports/cancelled-bookings/pdf
Get Cancelled Bookings Report in PDF format Returns bookings where cancellation date falls within the specified period


Parameters
Cancel
Name	Description
fromDate
string($date)
(query)
Start date of the cancellation period (inclusive)

2026-09-01
toDate
string($date)
(query)
End date of the cancellation period (inclusive)

2026-09-15
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/reports/cancelled-bookings/pdf?fromDate=2026-09-01&toDate=2026-09-15' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjkzNjE0MjY2LTFlN2QtNGRjZi1hMzBkLTA4ZGVmZGQ1ODQ5NCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6IjkzNjE0MjY2LTFlN2QtNGRjZi1hMzBkLTA4ZGVmZGQ1ODQ5NCIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg5NTUwNDc0LCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.QWuMvanfPeowEm5R2-48PKbe9eJ2ArM-llagG7CXOP0'
Request URL
https://rentaltech.premiumasp.net/api/reports/cancelled-bookings/pdf?fromDate=2026-09-01&toDate=2026-09-15
Server response
Code	Details
200	
Response body
Download file
Response headers
 content-disposition: attachment; filename=CancelledBookingsReport_2026-09-01_to_2026-09-15.pdf; filename*=UTF-8''CancelledBookingsReport_2026-09-01_to_2026-09-15.pdf 
 content-length: 37214 
 content-type: application/pdf 
 date: Wed,16 Sep 2026 08:22:43 GMT 
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
"string"
No links
400	
Bad Request

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

GET
/api/reports/cancelled-bookings/excel
Get Cancelled Bookings Report in Excel format Returns bookings where cancellation date falls within the specified period


Parameters
Cancel
Name	Description
fromDate
string($date)
(query)
Start date of the cancellation period (inclusive)

2026-09-01
toDate
string($date)
(query)
End date of the cancellation period (inclusive)

2026-09-15
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/reports/cancelled-bookings/excel?fromDate=2026-09-01&toDate=2026-09-15' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjkzNjE0MjY2LTFlN2QtNGRjZi1hMzBkLTA4ZGVmZGQ1ODQ5NCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6IjkzNjE0MjY2LTFlN2QtNGRjZi1hMzBkLTA4ZGVmZGQ1ODQ5NCIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg5NTUwNDc0LCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.QWuMvanfPeowEm5R2-48PKbe9eJ2ArM-llagG7CXOP0'
Request URL
https://rentaltech.premiumasp.net/api/reports/cancelled-bookings/excel?fromDate=2026-09-01&toDate=2026-09-15
Server response
Code	Details
200	
Response body
Download file
Response headers
 content-disposition: attachment; filename=CancelledBookingsReport_2026-09-01_to_2026-09-15.xlsx; filename*=UTF-8''CancelledBookingsReport_2026-09-01_to_2026-09-15.xlsx 
 content-length: 8503 
 content-type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet 
 date: Wed,16 Sep 2026 08:22:58 GMT 
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
"string"
No links
400	
Bad Request

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
GET
/api/payments/{paymentId}/history
Get payment history for a specific payment Returns all payment modifications ordered by most recent first


Parameters
Cancel
Name	Description
paymentId *
string($uuid)
(path)
1210e435-21d4-40c2-aad3-9b8a9fb9d799
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/payments/1210e435-21d4-40c2-aad3-9b8a9fb9d799/history' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjkzNjE0MjY2LTFlN2QtNGRjZi1hMzBkLTA4ZGVmZGQ1ODQ5NCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6IjkzNjE0MjY2LTFlN2QtNGRjZi1hMzBkLTA4ZGVmZGQ1ODQ5NCIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg5NTUwNDc0LCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.QWuMvanfPeowEm5R2-48PKbe9eJ2ArM-llagG7CXOP0'
Request URL
https://rentaltech.premiumasp.net/api/payments/1210e435-21d4-40c2-aad3-9b8a9fb9d799/history
Server response
Code	Details
200	
Response body
Download
{
  "data": [
    {
      "id": "d91e161f-a784-4232-b383-133d0cb46773",
      "paymentId": "1210e435-21d4-40c2-aad3-9b8a9fb9d799",
      "bookingId": "a45e4b15-b65b-498f-9fd8-18dbca21ba27",
      "previousAmount": 0,
      "newAmount": 20,
      "previousStatus": 3,
      "previousStatusName": "Paid",
      "newStatus": 3,
      "newStatusName": "Paid",
      "changedBy": "pola",
      "changedAt": "2026-09-16T08:28:13.0411357"
    }
  ],
  "isSuccess": true,
  "message": null,
  "errors": [],
  "type": 200
}