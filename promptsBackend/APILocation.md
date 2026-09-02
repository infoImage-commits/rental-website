for the next section we should be working on is the locatoin it's so simple could you create a plan so that we could implment it in the admin dashbaord pleaes create aplan for it 
Locations


POST
/api/locations


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "name": "Location name"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/locations' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsInVzZXJOYW1lIjoiUG9sYTEyMyIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4NjcxODIzNywiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.ZY_YgCr6lcygNHNKz4GdmSnH-bCbGOi6WboO4CR3x7E' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "Location name"
}'
Request URL
https://rentaltech.premiumasp.net/api/locations
Server response
Code	Details
201	
Response body
Download
{
  "data": {
    "id": "303ca75d-d549-45eb-87d1-8459ac4a0edf",
    "name": "Location name",
    "isActive": true
  },
  "isSuccess": true,
  "message": "Location created successfully.",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Fri,14 Aug 2026 14:10:00 GMT 
 location: https://rentaltech.premiumasp.net/api/locations/303ca75d-d549-45eb-87d1-8459ac4a0edf 
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
  "isActive": true
}
No links

GET
/api/locations


Parameters
Cancel
Name	Description
pageNumber
integer($int32)
(query)
1
pageSize
integer($int32)
(query)
10
searchTerm
string
(query)
searchTerm
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/locations?pageNumber=1&pageSize=10' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsInVzZXJOYW1lIjoiUG9sYTEyMyIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4NjcxODIzNywiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.ZY_YgCr6lcygNHNKz4GdmSnH-bCbGOi6WboO4CR3x7E'
Request URL
https://rentaltech.premiumasp.net/api/locations?pageNumber=1&pageSize=10
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "items": [
      {
        "id": "19a472ff-0b70-4fc2-bf5a-477419770696",
        "name": "Cairo",
        "isActive": true
      },
      {
        "id": "303ca75d-d549-45eb-87d1-8459ac4a0edf",
        "name": "Location name",
        "isActive": true
      },
      {
        "id": "f6ab2cef-deee-41a2-ae5e-c5fb4dead052",
        "name": "qena",
        "isActive": true
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
 date: Fri,14 Aug 2026 14:10:04 GMT 
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
      "isActive": true
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

PUT
/api/locations/{id}


Parameters
Cancel
Reset
Name	Description
id *
string($uuid)
(path)
303ca75d-d549-45eb-87d1-8459ac4a0edf
Request body

application/json
{
  "name": "Location name",
  "isActive": false
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://rentaltech.premiumasp.net/api/locations/303ca75d-d549-45eb-87d1-8459ac4a0edf' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsInVzZXJOYW1lIjoiUG9sYTEyMyIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4NjcxODIzNywiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.ZY_YgCr6lcygNHNKz4GdmSnH-bCbGOi6WboO4CR3x7E' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "Location name",
  "isActive": false
}'
Request URL
https://rentaltech.premiumasp.net/api/locations/303ca75d-d549-45eb-87d1-8459ac4a0edf
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "id": "303ca75d-d549-45eb-87d1-8459ac4a0edf",
    "name": "Location name",
    "isActive": false
  },
  "isSuccess": true,
  "message": "Location updated successfully.",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Fri,14 Aug 2026 14:10:38 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/locations/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
303ca75d-d549-45eb-87d1-8459ac4a0edf
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://rentaltech.premiumasp.net/api/locations/303ca75d-d549-45eb-87d1-8459ac4a0edf' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsInVzZXJOYW1lIjoiUG9sYTEyMyIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4NjcxODIzNywiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.ZY_YgCr6lcygNHNKz4GdmSnH-bCbGOi6WboO4CR3x7E'
Request URL
https://rentaltech.premiumasp.net/api/locations/303ca75d-d549-45eb-87d1-8459ac4a0edf
Server response
Code	Details
200	
Response body
Download
{
  "isSuccess": true,
  "message": "Location deleted successfully.",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Fri,14 Aug 2026 14:10:42 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/locations/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
19a472ff-0b70-4fc2-bf5a-477419770696
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/locations/19a472ff-0b70-4fc2-bf5a-477419770696' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsInVzZXJOYW1lIjoiUG9sYTEyMyIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4NjcxODIzNywiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.ZY_YgCr6lcygNHNKz4GdmSnH-bCbGOi6WboO4CR3x7E'
Request URL
https://rentaltech.premiumasp.net/api/locations/19a472ff-0b70-4fc2-bf5a-477419770696
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "id": "19a472ff-0b70-4fc2-bf5a-477419770696",
    "name": "Cairo",
    "isActive": true
  },
  "isSuccess": true,
  "message": null,
  "errors": [],
  "type": 200
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,14 Aug 2026 14:10:55 GMT 
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
  "isActive": true
}