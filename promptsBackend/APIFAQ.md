for the next section we should be wokring on is the faq 
please create a plan for the admin dashbaord so that we have an interface to add the and edit them and also make them puplish or not could you do a plan for that ?
Faqs
FAQs Controller - Manages frequently asked questions



POST
/api/faqs
Create a new FAQ


Parameters
Cancel
Reset
No parameters

Request body

application/json
FAQ creation details

{
  "question": "q1",
  "answer": "answer for it ",
  "displayOrder": 1,
  "isPublished": true
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/faqs' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsInVzZXJOYW1lIjoiUG9sYTEyMyIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4NjcxODIzNywiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.ZY_YgCr6lcygNHNKz4GdmSnH-bCbGOi6WboO4CR3x7E' \
  -H 'Content-Type: application/json' \
  -d '{
  "question": "q1",
  "answer": "answer for it ",
  "displayOrder": 1,
  "isPublished": true
}'
Request URL
https://rentaltech.premiumasp.net/api/faqs
Server response
Code	Details
201	
Response body
Download
{
  "data": {
    "id": "853bcd24-c25d-42d9-9dc1-44221aa5d6e0",
    "question": "q1",
    "answer": "answer for it ",
    "displayOrder": 1,
    "isPublished": true,
    "createdAtUtc": "2026-08-14T13:37:28.334153Z",
    "updatedAtUtc": null
  },
  "isSuccess": true,
  "message": "FAQ created successfully",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Fri,14 Aug 2026 13:37:28 GMT 
 location: https://rentaltech.premiumasp.net/api/faqs/853bcd24-c25d-42d9-9dc1-44221aa5d6e0 
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
  "question": "string",
  "answer": "string",
  "displayOrder": 0,
  "isPublished": true,
  "createdAtUtc": "2026-08-14T13:38:25.900Z",
  "updatedAtUtc": "2026-08-14T13:38:25.900Z"
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
/api/faqs
Get paginated list of FAQs with filtering and search


Parameters
Cancel
Name	Description
IsPublished
boolean
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
  'https://rentaltech.premiumasp.net/api/faqs' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsInVzZXJOYW1lIjoiUG9sYTEyMyIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4NjcxODIzNywiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.ZY_YgCr6lcygNHNKz4GdmSnH-bCbGOi6WboO4CR3x7E'
Request URL
https://rentaltech.premiumasp.net/api/faqs
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "items": [
      {
        "id": "853bcd24-c25d-42d9-9dc1-44221aa5d6e0",
        "question": "q1",
        "answer": "answer for it ",
        "displayOrder": 1,
        "isPublished": true,
        "createdAtUtc": "2026-08-14T13:37:28.334153",
        "updatedAtUtc": null
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
 date: Fri,14 Aug 2026 13:37:36 GMT 
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
      "question": "string",
      "answer": "string",
      "displayOrder": 0,
      "isPublished": true,
      "createdAtUtc": "2026-08-14T13:38:25.907Z",
      "updatedAtUtc": "2026-08-14T13:38:25.907Z"
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
/api/faqs/{id}
Get FAQ by ID


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
FAQ ID

853bcd24-c25d-42d9-9dc1-44221aa5d6e0
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/faqs/853bcd24-c25d-42d9-9dc1-44221aa5d6e0' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsInVzZXJOYW1lIjoiUG9sYTEyMyIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4NjcxODIzNywiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.ZY_YgCr6lcygNHNKz4GdmSnH-bCbGOi6WboO4CR3x7E'
Request URL
https://rentaltech.premiumasp.net/api/faqs/853bcd24-c25d-42d9-9dc1-44221aa5d6e0
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "id": "853bcd24-c25d-42d9-9dc1-44221aa5d6e0",
    "question": "q1",
    "answer": "answer for it ",
    "displayOrder": 1,
    "isPublished": true,
    "createdAtUtc": "2026-08-14T13:37:28.334153",
    "updatedAtUtc": null
  },
  "isSuccess": true,
  "message": null,
  "errors": [],
  "type": 200
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,14 Aug 2026 13:37:54 GMT 
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
  "question": "string",
  "answer": "string",
  "displayOrder": 0,
  "isPublished": true,
  "createdAtUtc": "2026-08-14T13:38:25.911Z",
  "updatedAtUtc": "2026-08-14T13:38:25.911Z"
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

PUT
/api/faqs/{id}
Update an existing FAQ


Parameters
Cancel
Reset
Name	Description
id *
string($uuid)
(path)
FAQ ID

853bcd24-c25d-42d9-9dc1-44221aa5d6e0
Request body

application/json
FAQ update details

{
  "question": "q1",
  "answer": "answer for it ",
  "displayOrder": 1,
  "isPublished": false
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://rentaltech.premiumasp.net/api/faqs/853bcd24-c25d-42d9-9dc1-44221aa5d6e0' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsInVzZXJOYW1lIjoiUG9sYTEyMyIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4NjcxODIzNywiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.ZY_YgCr6lcygNHNKz4GdmSnH-bCbGOi6WboO4CR3x7E' \
  -H 'Content-Type: application/json' \
  -d '{
  "question": "q1",
  "answer": "answer for it ",
  "displayOrder": 1,
  "isPublished": false
}'
Request URL
https://rentaltech.premiumasp.net/api/faqs/853bcd24-c25d-42d9-9dc1-44221aa5d6e0
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "id": "853bcd24-c25d-42d9-9dc1-44221aa5d6e0",
    "question": "q1",
    "answer": "answer for it ",
    "displayOrder": 1,
    "isPublished": false,
    "createdAtUtc": "2026-08-14T13:37:28.334153",
    "updatedAtUtc": "2026-08-14T13:38:15.0918023Z"
  },
  "isSuccess": true,
  "message": "FAQ updated successfully",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Fri,14 Aug 2026 13:38:14 GMT 
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
  "question": "string",
  "answer": "string",
  "displayOrder": 0,
  "isPublished": true,
  "createdAtUtc": "2026-08-14T13:38:25.915Z",
  "updatedAtUtc": "2026-08-14T13:38:25.915Z"
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

DELETE
/api/faqs/{id}
Delete an FAQ


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
FAQ ID

853bcd24-c25d-42d9-9dc1-44221aa5d6e0
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://rentaltech.premiumasp.net/api/faqs/853bcd24-c25d-42d9-9dc1-44221aa5d6e0' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsInVzZXJOYW1lIjoiUG9sYTEyMyIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4NjcxODIzNywiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.ZY_YgCr6lcygNHNKz4GdmSnH-bCbGOi6WboO4CR3x7E'
Request URL
https://rentaltech.premiumasp.net/api/faqs/853bcd24-c25d-42d9-9dc1-44221aa5d6e0
Server response
Code	Details
200	
Response body
Download
{
  "isSuccess": true,
  "message": "FAQ deleted successfully",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Fri,14 Aug 2026 13:38:25 GMT 
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