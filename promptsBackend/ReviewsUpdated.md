we need to make sure the section for the reviews for both the admin and the clients work right 
first of all the only delete endpoint that will need a token from the admin the rest is okay 
the goal for this is we need to make sure it works right when we create a review so and show all of the rewivws right due to there is no data currently and we can only create a reivew after the clinet have staied the full linght of thier booking we will make sure everything follow the backend so that we make it look great please create a plan so that we can make use of all of those endpoints could you create a plan for them

Reviews
Reviews Controller - Manages property booking reviews



POST
/api/reviews
Create a new review for a completed property booking


Business Rules:

Booking must exist
Booking must be Property type
Booking Status must be Completed
Only one Review per Booking (BookingId must be unique)
Parameters
Cancel
Reset
No parameters

Request body

application/json
Review creation details

{
  "bookingNumber": "BK-000004",
  "rate": 5,
  "comment": "123"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/reviews' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsInVzZXJOYW1lIjoicG9sYSIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4ODk1OTYwMCwiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.yGmREkBx5VNdAvge9EJrNIs0P7VRDG7gOQAAFAA-n_Q' \
  -H 'Content-Type: application/json' \
  -d '{
  "bookingNumber": "BK-000004",
  "rate": 5,
  "comment": "123"
}'
Request URL
https://rentaltech.premiumasp.net/api/reviews
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
    "Review can only be created for completed bookings"
  ],
  "type": 422
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,09 Sep 2026 12:13:38 GMT 
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
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "bookingId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "bookingNumber": "string",
  "customerName": "string",
  "customerEmail": "string",
  "propertyName": "string",
  "rate": 0,
  "comment": "string",
  "createdAtUtc": "2026-09-09T12:14:06.447Z"
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
409	
Conflict

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
/api/reviews
Get paginated list of reviews with search and sorting


Parameters
Cancel
Name	Description
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
  'https://rentaltech.premiumasp.net/api/reviews' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsInVzZXJOYW1lIjoicG9sYSIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4ODk1OTYwMCwiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.yGmREkBx5VNdAvge9EJrNIs0P7VRDG7gOQAAFAA-n_Q'
Request URL
https://rentaltech.premiumasp.net/api/reviews
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "items": [],
    "pageNumber": 1,
    "pageSize": 10,
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
 date: Wed,09 Sep 2026 12:13:42 GMT 
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
      "bookingId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "bookingNumber": "string",
      "customerName": "string",
      "customerEmail": "string",
      "propertyName": "string",
      "rate": 0,
      "comment": "string",
      "createdAtUtc": "2026-09-09T12:14:06.451Z"
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
/api/reviews/{id}
Get review by ID


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
Review ID

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
  "bookingId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "bookingNumber": "string",
  "customerName": "string",
  "customerEmail": "string",
  "propertyName": "string",
  "rate": 0,
  "comment": "string",
  "createdAtUtc": "2026-09-09T12:14:06.454Z"
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

DELETE
/api/reviews/{id}
Delete review by ID


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
Review ID

id
Responses
Code	Description	Links
200	
OK

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

GET
/api/reviews/property/{propertyId}/average
Get average rating for a property


Parameters
Cancel
Name	Description
propertyId *
string($uuid)
(path)
Property ID

propertyId
Execute
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
  "averageRating": 0,
  "totalReviews": 0
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