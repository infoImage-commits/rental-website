those are the endpoints for contact us we should make sure those are implmented right in the admin page the admin will not create the form but he will review it mark it as read and delete it if he needs to 
okay create a plan to implmnet them for the amdin pages 
ContactUs
Contact Us Controller - Manages contact messages from website visitors



POST
/api/contact-us
Submit a contact us message (Public endpoint - No authentication required)


This endpoint is publicly accessible and sends an email notification to the system administrator.

Parameters
Cancel
Reset
No parameters

Request body

application/json
Contact message details

{
  "name": "test",
  "email": "test@test.com",
  "phone": "12316513222",
  "subject": "subject",
  "message": "message messagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessage"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/contact-us' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsInVzZXJOYW1lIjoiUG9sYTEyMyIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4NjcxMjgyNSwiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.fTUgC2h3wbifF8l8tO37iCXuCsrA4jjYU5mpN7rdiZA' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "test",
  "email": "test@test.com",
  "phone": "12316513222",
  "subject": "subject",
  "message": "message messagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessage"
}'
Request URL
https://rentaltech.premiumasp.net/api/contact-us
Server response
Code	Details
201	
Response body
Download
{
  "data": {
    "id": "1ab7af02-2b65-4e39-a235-1512642ab3a0",
    "name": "test",
    "email": "test@test.com",
    "phone": "12316513222",
    "subject": "subject",
    "message": "message messagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessage",
    "isRead": false,
    "readAt": null,
    "repliedAt": null,
    "createdAtUtc": "2026-08-14T13:04:40.3997395Z"
  },
  "isSuccess": true,
  "message": "Your message has been sent successfully. We will get back to you soon.",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Fri,14 Aug 2026 13:04:39 GMT 
 location: https://rentaltech.premiumasp.net/api/contact-us/1ab7af02-2b65-4e39-a235-1512642ab3a0 
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
  "name": "string",
  "email": "string",
  "phone": "string",
  "subject": "string",
  "message": "string",
  "isRead": true,
  "readAt": "2026-08-14T13:05:36.160Z",
  "repliedAt": "2026-08-14T13:05:36.160Z",
  "createdAtUtc": "2026-08-14T13:05:36.160Z"
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
/api/contact-us
Get paginated list of contact messages (Admin only)


Supports filtering by read status, date range, and search term.

Parameters
Cancel
Name	Description
IsRead
boolean
(query)

--
FromDate
string($date)
(query)
FromDate
ToDate
string($date)
(query)
ToDate
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
  'https://rentaltech.premiumasp.net/api/contact-us' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsInVzZXJOYW1lIjoiUG9sYTEyMyIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4NjcxMjgyNSwiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.fTUgC2h3wbifF8l8tO37iCXuCsrA4jjYU5mpN7rdiZA'
Request URL
https://rentaltech.premiumasp.net/api/contact-us
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "items": [
      {
        "id": "1ab7af02-2b65-4e39-a235-1512642ab3a0",
        "name": "test",
        "email": "test@test.com",
        "phone": "12316513222",
        "subject": "subject",
        "message": "message messagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessage",
        "isRead": true,
        "readAt": "2026-08-14T13:05:13.4688939",
        "repliedAt": null,
        "createdAtUtc": "2026-08-14T13:04:40.3997395"
      }
    ],
    "pageNumber": 1,
    "pageSize": 10,
    "totalCount": 1,
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
 date: Fri,14 Aug 2026 13:05:17 GMT 
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
      "name": "string",
      "email": "string",
      "phone": "string",
      "subject": "string",
      "message": "string",
      "isRead": true,
      "readAt": "2026-08-14T13:05:36.171Z",
      "repliedAt": "2026-08-14T13:05:36.171Z",
      "createdAtUtc": "2026-08-14T13:05:36.171Z"
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
/api/contact-us/{id}
Get contact message by ID (Admin only)


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
Contact message ID

1ab7af02-2b65-4e39-a235-1512642ab3a0
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/contact-us/1ab7af02-2b65-4e39-a235-1512642ab3a0' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsInVzZXJOYW1lIjoiUG9sYTEyMyIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4NjcxMjgyNSwiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.fTUgC2h3wbifF8l8tO37iCXuCsrA4jjYU5mpN7rdiZA'
Request URL
https://rentaltech.premiumasp.net/api/contact-us/1ab7af02-2b65-4e39-a235-1512642ab3a0
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "id": "1ab7af02-2b65-4e39-a235-1512642ab3a0",
    "name": "test",
    "email": "test@test.com",
    "phone": "12316513222",
    "subject": "subject",
    "message": "message messagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessage",
    "isRead": false,
    "readAt": null,
    "repliedAt": null,
    "createdAtUtc": "2026-08-14T13:04:40.3997395"
  },
  "isSuccess": true,
  "message": null,
  "errors": [],
  "type": 200
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,14 Aug 2026 13:05:05 GMT 
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
  "name": "string",
  "email": "string",
  "phone": "string",
  "subject": "string",
  "message": "string",
  "isRead": true,
  "readAt": "2026-08-14T13:05:36.177Z",
  "repliedAt": "2026-08-14T13:05:36.177Z",
  "createdAtUtc": "2026-08-14T13:05:36.177Z"
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
/api/contact-us/{id}
Delete a contact message (Admin only)


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
Contact message ID

1ab7af02-2b65-4e39-a235-1512642ab3a0
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://rentaltech.premiumasp.net/api/contact-us/1ab7af02-2b65-4e39-a235-1512642ab3a0' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsInVzZXJOYW1lIjoiUG9sYTEyMyIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4NjcxMjgyNSwiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.fTUgC2h3wbifF8l8tO37iCXuCsrA4jjYU5mpN7rdiZA'
Request URL
https://rentaltech.premiumasp.net/api/contact-us/1ab7af02-2b65-4e39-a235-1512642ab3a0
Server response
Code	Details
200	
Response body
Download
{
  "isSuccess": true,
  "message": "Contact message deleted successfully",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Fri,14 Aug 2026 13:05:35 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
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

PATCH
/api/contact-us/{id}/mark-as-read
Mark a contact message as read (Admin only)


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
Contact message ID

1ab7af02-2b65-4e39-a235-1512642ab3a0
Execute
Clear
Responses
Curl

curl -X 'PATCH' \
  'https://rentaltech.premiumasp.net/api/contact-us/1ab7af02-2b65-4e39-a235-1512642ab3a0/mark-as-read' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsInVzZXJOYW1lIjoiUG9sYTEyMyIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4NjcxMjgyNSwiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.fTUgC2h3wbifF8l8tO37iCXuCsrA4jjYU5mpN7rdiZA'
Request URL
https://rentaltech.premiumasp.net/api/contact-us/1ab7af02-2b65-4e39-a235-1512642ab3a0/mark-as-read
Server response
Code	Details
200	
Response body
Download
{
  "isSuccess": true,
  "message": "Message marked as read successfully",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Fri,14 Aug 2026 13:05:13 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
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