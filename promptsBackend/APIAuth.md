all of those are the endpoints we need to implment in the app before we implment we need to make sure we use the right tools and have the right arch for it 
we have those tools in the app 
zutan for the statue managment 
tanstack query for fetching the data
axuis for fetching api 
and tanstack qury devtools for making sure everything works right 
I'm sure those are all of the tools that is in the app 
so please make a plan so that we know how to use those in the right way
aslo we should have a file for the api config in it we will have the link for the base of the url of the system it will be https://rentaltech.premiumasp.net/ as later when we want to change it to the prodcutoin we only do that once in one file please create a plan for those before implmetoin anything and tell me what you gonna do 

for the auto api those are the endpoints and we will need to have pages for the forget password and the endpoint for the POST
/api/auth/verify-otp
Verify OTP code will not be used as it's only for the testing and we don't need to use it in the app 
please create a plan so each of those funtoins works right and we will alos need a prox as we are using next js 16 the new naming configus for the middleware and we need to protect the admin pages so if we don't have the access token we can't view them and we will see a 404 not found and the redirctoin for the login button should only work if the username and password are correct other than that we should view an error okay ?
now create a plan and review all of those 
Auth
Authentication endpoints for admin dashboard



POST
/api/auth/login
Login with email/username and password


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
"emailOrUserName": "pola5samy55@gmail.com",
"password": "Pola123!"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/auth/login' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjNjNWQ0NmU4LTYzNWYtNGY1NS1mZjNlLTA4ZGVmM2NlYjY4MiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6IjNjNWQ0NmU4LTYzNWYtNGY1NS1mZjNlLTA4ZGVmM2NlYjY4MiIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg2NzEyNTIwLCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.507tAT-97xf0UlwMOmf8_WarVbaV9V2kRMoYur77HG0' \
  -H 'Content-Type: application/json' \
  -d '{
"emailOrUserName": "pola5samy55@gmail.com",
"password": "Pola123!"
}'
Request URL
https://rentaltech.premiumasp.net/api/auth/login
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsInVzZXJOYW1lIjoiUG9sYTEyMyIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4NjcxMjgyNSwiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.fTUgC2h3wbifF8l8tO37iCXuCsrA4jjYU5mpN7rdiZA",
    "refreshToken": "D3S8OPgl5A6DYWrFvAaXh2QdVAZvdJyXtTfqvCSQEg+7edHwIyLpJSOXP/RTn6EJ43qTxBhqRGwNP7u4P3mxgw==",
    "expiresAt": "2026-08-14T13:07:05.1779978Z",
    "profile": {
      "id": "d7414a08-78a4-4c7d-d983-08def9fc30df",
      "firstName": "pola",
      "lastName": "pola",
      "userName": "Pola123",
      "email": "pola5samy55@gmail.com",
      "phoneNumber": "+201012345678",
      "isActive": true,
      "roles": [
        "SuperAdmin"
      ],
      "lastLoginAt": "2026-08-14T12:07:05.1844738Z",
      "createdAt": "2026-08-14T12:04:27.7988667",
      "updatedAt": "2026-08-14T12:07:05.1780786Z"
    }
  },
  "isSuccess": true,
  "message": "Login successful",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Fri,14 Aug 2026 12:07:05 GMT 
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
  "accessToken": "string",
  "refreshToken": "string",
  "expiresAt": "2026-08-14T12:08:16.065Z",
  "profile": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "firstName": "string",
    "lastName": "string",
    "userName": "string",
    "email": "string",
    "phoneNumber": "string",
    "isActive": true,
    "roles": [
      "string"
    ],
    "lastLoginAt": "2026-08-14T12:08:16.065Z",
    "createdAt": "2026-08-14T12:08:16.065Z",
    "updatedAt": "2026-08-14T12:08:16.065Z"
  }
}
No links
401	
Unauthorized

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

POST
/api/auth/logout
Logout current user


Parameters
Cancel
No parameters

Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/auth/logout' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjNjNWQ0NmU4LTYzNWYtNGY1NS1mZjNlLTA4ZGVmM2NlYjY4MiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6IjNjNWQ0NmU4LTYzNWYtNGY1NS1mZjNlLTA4ZGVmM2NlYjY4MiIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg2NzEyMzY1LCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.9Mn7RM7asBcyLg4QVb2LEhldq6WYcEs0cl2TTJhH-GU' \
  -d ''
Request URL
https://rentaltech.premiumasp.net/api/auth/logout
Server response
Code	Details
200	
Response body
Download
{
  "isSuccess": true,
  "message": "Logout successful",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Fri,14 Aug 2026 12:01:53 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/auth/refresh-token
Refresh access token using refresh token


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjNjNWQ0NmU4LTYzNWYtNGY1NS1mZjNlLTA4ZGVmM2NlYjY4MiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6IjNjNWQ0NmU4LTYzNWYtNGY1NS1mZjNlLTA4ZGVmM2NlYjY4MiIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg2NzEyMzY1LCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.9Mn7RM7asBcyLg4QVb2LEhldq6WYcEs0cl2TTJhH-GU",
  "refreshToken": "NjohNWLrCzmFb883vP8c9YnRs67TCWhaFwn+ZKAcgFnmVVmM3iuwoWXzRH/IWeIPQOp9PHsOtVYDtd7glfD/ig=="
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/auth/refresh-token' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjNjNWQ0NmU4LTYzNWYtNGY1NS1mZjNlLTA4ZGVmM2NlYjY4MiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6IjNjNWQ0NmU4LTYzNWYtNGY1NS1mZjNlLTA4ZGVmM2NlYjY4MiIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg2NzEyMzY1LCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.9Mn7RM7asBcyLg4QVb2LEhldq6WYcEs0cl2TTJhH-GU' \
  -H 'Content-Type: application/json' \
  -d '{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjNjNWQ0NmU4LTYzNWYtNGY1NS1mZjNlLTA4ZGVmM2NlYjY4MiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6IjNjNWQ0NmU4LTYzNWYtNGY1NS1mZjNlLTA4ZGVmM2NlYjY4MiIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg2NzEyMzY1LCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.9Mn7RM7asBcyLg4QVb2LEhldq6WYcEs0cl2TTJhH-GU",
  "refreshToken": "NjohNWLrCzmFb883vP8c9YnRs67TCWhaFwn+ZKAcgFnmVVmM3iuwoWXzRH/IWeIPQOp9PHsOtVYDtd7glfD/ig=="
}'
Request URL
https://rentaltech.premiumasp.net/api/auth/refresh-token
Server response
Code	Details
401	
Error: response status is 401

Response body
Download
{
  "data": null,
  "isSuccess": false,
  "message": "Invalid or expired refresh token",
  "errors": [],
  "type": 401
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Fri,14 Aug 2026 12:02:19 GMT 
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
  "accessToken": "string",
  "refreshToken": "string",
  "expiresAt": "2026-08-14T12:08:16.070Z"
}
No links
401	
Unauthorized

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

POST
/api/auth/forgot-password
Request OTP for password reset


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "email": "pola5samy55@gmail.com"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/auth/forgot-password' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjNjNWQ0NmU4LTYzNWYtNGY1NS1mZjNlLTA4ZGVmM2NlYjY4MiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6IjNjNWQ0NmU4LTYzNWYtNGY1NS1mZjNlLTA4ZGVmM2NlYjY4MiIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg2NzEyNTIwLCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.507tAT-97xf0UlwMOmf8_WarVbaV9V2kRMoYur77HG0' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "pola5samy55@gmail.com"
}'
Request URL
https://rentaltech.premiumasp.net/api/auth/forgot-password
Server response
Code	Details
200	
Response body
Download
{
  "isSuccess": true,
  "message": "If the email exists, an OTP code has been sent",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Fri,14 Aug 2026 12:05:00 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/auth/verify-otp
Verify OTP code


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "email": "pola5samy55@gmail.com",
  "code": "596129"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/auth/verify-otp' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjNjNWQ0NmU4LTYzNWYtNGY1NS1mZjNlLTA4ZGVmM2NlYjY4MiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6IjNjNWQ0NmU4LTYzNWYtNGY1NS1mZjNlLTA4ZGVmM2NlYjY4MiIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg2NzEyNTIwLCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.507tAT-97xf0UlwMOmf8_WarVbaV9V2kRMoYur77HG0' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "pola5samy55@gmail.com",
  "code": "596129"
}'
Request URL
https://rentaltech.premiumasp.net/api/auth/verify-otp
Server response
Code	Details
200	
Response body
Download
{
  "isSuccess": true,
  "message": "OTP verified successfully",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Fri,14 Aug 2026 12:05:39 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

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

POST
/api/auth/reset-password
Reset password using OTP


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "email": "pola5samy55@gmail.com",
  "code": "596129",
  "newPassword": "Pola123!",
  "confirmPassword": "Pola123!"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/auth/reset-password' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjNjNWQ0NmU4LTYzNWYtNGY1NS1mZjNlLTA4ZGVmM2NlYjY4MiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6IjNjNWQ0NmU4LTYzNWYtNGY1NS1mZjNlLTA4ZGVmM2NlYjY4MiIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg2NzEyNTIwLCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.507tAT-97xf0UlwMOmf8_WarVbaV9V2kRMoYur77HG0' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "pola5samy55@gmail.com",
  "code": "596129",
  "newPassword": "Pola123!",
  "confirmPassword": "Pola123!"
}'
Request URL
https://rentaltech.premiumasp.net/api/auth/reset-password
Server response
Code	Details
200	
Response body
Download
{
  "isSuccess": true,
  "message": "Password has been reset successfully",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Fri,14 Aug 2026 12:06:23 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

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

POST
/api/auth/change-password
Change password (authenticated user)


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "currentPassword": "Ppola123!",
  "newPassword": "Pola123!",
  "confirmPassword": "Pola123!"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/auth/change-password' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsInVzZXJOYW1lIjoiUG9sYTEyMyIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4NjcxMjgyNSwiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.fTUgC2h3wbifF8l8tO37iCXuCsrA4jjYU5mpN7rdiZA' \
  -H 'Content-Type: application/json' \
  -d '{
  "currentPassword": "Ppola123!",
  "newPassword": "Pola123!",
  "confirmPassword": "Pola123!"
}'
Request URL
https://rentaltech.premiumasp.net/api/auth/change-password
Server response
Code	Details
200	
Response body
Download
{
  "isSuccess": true,
  "message": "Password changed successfully",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Fri,14 Aug 2026 12:08:15 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

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
/api/auth/profile
Get current user profile


Parameters
Cancel
No parameters

Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/auth/profile' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImQ3NDE0YTA4LTc4YTQtNGM3ZC1kOTgzLTA4ZGVmOWZjMzBkZiIsInVzZXJOYW1lIjoiUG9sYTEyMyIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4NjcxMjgyNSwiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.fTUgC2h3wbifF8l8tO37iCXuCsrA4jjYU5mpN7rdiZA'
Request URL
https://rentaltech.premiumasp.net/api/auth/profile
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "id": "d7414a08-78a4-4c7d-d983-08def9fc30df",
    "firstName": "pola",
    "lastName": "pola",
    "userName": "Pola123",
    "email": "pola5samy55@gmail.com",
    "phoneNumber": "+201012345678",
    "isActive": true,
    "roles": [
      "SuperAdmin"
    ],
    "lastLoginAt": "2026-08-14T12:07:05.1844738",
    "createdAt": "2026-08-14T12:04:27.7988667",
    "updatedAt": "2026-08-14T12:07:05.1780786"
  },
  "isSuccess": true,
  "message": null,
  "errors": [],
  "type": 200
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,14 Aug 2026 12:07:24 GMT 
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
  "userName": "string",
  "email": "string",
  "phoneNumber": "string",
  "isActive": true,
  "roles": [
    "string"
  ],
  "lastLoginAt": "2026-08-14T12:08:16.089Z",
  "createdAt": "2026-08-14T12:08:16.089Z",
  "updatedAt": "2026-08-14T12:08:16.089Z"
}