those are the endpoint for the admin page for the admin dashboard could you create a plan so that we implment it for the admin dashboard please create a plan for it 
POST
/api/admins/super-admin
Create a new SuperAdmin account (requires SuperAdmin role only)


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "firstName": "pola",
  "lastName": "pola",
  "userName": "Pola123",
  "email": "pola5samy55@gmail.com",
  "phoneNumber": "+201012345678",
  "password": "Pola123!",
  "confirmPassword": "Pola123!"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/admins/super-admin' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsInVzZXJOYW1lIjoiUG9sYTEyMyIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4NjcxODIzNywiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.ZY_YgCr6lcygNHNKz4GdmSnH-bCbGOi6WboO4CR3x7E' \
  -H 'Content-Type: application/json' \
  -d '{
  "firstName": "pola",
  "lastName": "pola",
  "userName": "Pola123",
  "email": "pola5samy55@gmail.com",
  "phoneNumber": "+201012345678",
  "password": "Pola123!",
  "confirmPassword": "Pola123!"
}'
Request URL
https://rentaltech.premiumasp.net/api/admins/super-admin
Server response
Code	Details
401
Undocumented
Error: response status is 401

Response headers
 access-control-allow-origin: * 
 date: Fri,14 Aug 2026 15:07:12 GMT 
 server: Microsoft-IIS/10.0 
 www-authenticate: Bearer error="invalid_token",error_description="The token expired at '08/14/2026 14:37:17'" 
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
  "firstName": "string",
  "lastName": "string",
  "fullName": "string",
  "userName": "string",
  "email": "string",
  "phoneNumber": "string",
  "isActive": true,
  "roles": [
    "string"
  ],
  "lastLoginAt": "2026-08-14T15:07:54.410Z",
  "createdAt": "2026-08-14T15:07:54.410Z",
  "updatedAt": "2026-08-14T15:07:54.410Z"
}
No links
403	
Forbidden

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
/api/admins
Get all admins


Parameters
Cancel
No parameters

Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/admins' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsInVzZXJOYW1lIjoiUG9sYTEyMyIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4NjcyMzY0NCwiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.xWlw9GlHyOY8Fk7OB_aj_YWKKaxnFXO4Fb4OBysN0hE'
Request URL
https://rentaltech.premiumasp.net/api/admins
Server response
Code	Details
200	
Response body
Download
{
  "data": [
    {
      "id": "d7414a08-78a4-4c7d-d983-08def9fc30df",
      "firstName": "pola",
      "lastName": "pola",
      "fullName": "pola pola",
      "userName": "Pola123",
      "email": "pola5samy55@gmail.com",
      "phoneNumber": "+201012345678",
      "isActive": true,
      "roles": [
        "SuperAdmin"
      ],
      "lastLoginAt": "2026-08-14T15:07:24.7908348",
      "createdAt": "2026-08-14T12:04:27.7988667",
      "updatedAt": "2026-08-14T15:07:24.568893"
    },
    {
      "id": "3c5d46e8-635f-4f55-ff3e-08def3ceb682",
      "firstName": "Super",
      "lastName": "Admin",
      "fullName": "Super Admin",
      "userName": "superadmin",
      "email": "superadmin@propertymanagement.com",
      "phoneNumber": null,
      "isActive": true,
      "roles": [
        "SuperAdmin"
      ],
      "lastLoginAt": "2026-08-14T12:02:00.7753688",
      "createdAt": "2026-08-06T15:23:48.2280842",
      "updatedAt": "2026-08-14T12:02:00.7683103"
    }
  ],
  "isSuccess": true,
  "message": null,
  "errors": [],
  "type": 200
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,14 Aug 2026 15:07:36 GMT 
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
[
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "firstName": "string",
    "lastName": "string",
    "fullName": "string",
    "userName": "string",
    "email": "string",
    "phoneNumber": "string",
    "isActive": true,
    "roles": [
      "string"
    ],
    "lastLoginAt": "2026-08-14T15:07:54.416Z",
    "createdAt": "2026-08-14T15:07:54.416Z",
    "updatedAt": "2026-08-14T15:07:54.416Z"
  }
]
No links

GET
/api/admins/{id}
Get admin by ID


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
3c5d46e8-635f-4f55-ff3e-08def3ceb682
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/admins/3c5d46e8-635f-4f55-ff3e-08def3ceb682' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsInVzZXJOYW1lIjoiUG9sYTEyMyIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4NjcyMzY0NCwiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.xWlw9GlHyOY8Fk7OB_aj_YWKKaxnFXO4Fb4OBysN0hE'
Request URL
https://rentaltech.premiumasp.net/api/admins/3c5d46e8-635f-4f55-ff3e-08def3ceb682
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "id": "3c5d46e8-635f-4f55-ff3e-08def3ceb682",
    "firstName": "Super",
    "lastName": "Admin",
    "fullName": "Super Admin",
    "userName": "superadmin",
    "email": "superadmin@propertymanagement.com",
    "phoneNumber": null,
    "isActive": true,
    "roles": [
      "SuperAdmin"
    ],
    "lastLoginAt": "2026-08-14T12:02:00.7753688",
    "createdAt": "2026-08-06T15:23:48.2280842",
    "updatedAt": "2026-08-14T12:02:00.7683103"
  },
  "isSuccess": true,
  "message": null,
  "errors": [],
  "type": 200
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,14 Aug 2026 15:07:47 GMT 
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
  "firstName": "string",
  "lastName": "string",
  "fullName": "string",
  "userName": "string",
  "email": "string",
  "phoneNumber": "string",
  "isActive": true,
  "roles": [
    "string"
  ],
  "lastLoginAt": "2026-08-14T15:07:54.420Z",
  "createdAt": "2026-08-14T15:07:54.420Z",
  "updatedAt": "2026-08-14T15:07:54.420Z"
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
DELETE
/api/admins/{id}
Delete admin


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
id
Execute
Responses
Code	Description	Links
200	
OK

No links
403	
Forbidden

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