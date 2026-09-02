now for the next section we will have the categories of the properties 
the names does not match right as this is meant to be places in the homepage in the locaionts so in the admin UI we will call it propites locatoins and later we will link it with the properties 
could you create a plan for it ?
Categories


POST
/api/Categories


Parameters
Cancel
Reset
No parameters

Request body

multipart/form-data
Name
string
test
Send empty value
Image
string($binary)
hero-house.png
Send empty value
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/Categories' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImE3YjE3YjE5LTZhNDQtNGVkNi05ZDhiLTA4ZGVmYWFlZGYyNiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6ImE3YjE3YjE5LTZhNDQtNGVkNi05ZDhiLTA4ZGVmYWFlZGYyNiIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg2NzkwNzU2LCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.aLVsQ4aqwQDLybwctrihgTYyzZ9AlWbBtZ1gGQIjXzo' \
  -H 'Content-Type: multipart/form-data' \
  -F 'Name=test' \
  -F 'Image=@hero-house.png;type=image/png'
Request URL
https://rentaltech.premiumasp.net/api/Categories
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "id": "f5224a0c-847f-461e-a396-e2bb713f802e",
    "name": "test",
    "imageUrl": "uploads/categories/d8947c62-3c90-4329-a97f-b12818ebd91a.webp",
    "propertiesCount": 0,
    "propertyBuyingsCount": 0,
    "totalCount": 0
  },
  "isSuccess": true,
  "message": "Category created successfully",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,15 Aug 2026 09:57:43 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/Categories


Parameters
Cancel
No parameters

Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/Categories' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImE3YjE3YjE5LTZhNDQtNGVkNi05ZDhiLTA4ZGVmYWFlZGYyNiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6ImE3YjE3YjE5LTZhNDQtNGVkNi05ZDhiLTA4ZGVmYWFlZGYyNiIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg2NzkwNzU2LCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.aLVsQ4aqwQDLybwctrihgTYyzZ9AlWbBtZ1gGQIjXzo'
Request URL
https://rentaltech.premiumasp.net/api/Categories
Server response
Code	Details
200	
Response body
Download
{
  "data": [
    {
      "id": "f5224a0c-847f-461e-a396-e2bb713f802e",
      "name": "test",
      "imageUrl": "uploads/categories/d8947c62-3c90-4329-a97f-b12818ebd91a.webp",
      "propertiesCount": 0,
      "propertyBuyingsCount": 0,
      "totalCount": 0
    },
    {
      "id": "a5e4f2d7-0144-4983-8d54-e4d752dcf7d0",
      "name": "ssss",
      "imageUrl": "uploads/categories/84ebd90d-a6e3-49a4-83a7-3b443b1636b9.webp",
      "propertiesCount": 0,
      "propertyBuyingsCount": 0,
      "totalCount": 0
    }
  ],
  "isSuccess": true,
  "message": null,
  "errors": [],
  "type": 200
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,15 Aug 2026 10:02:34 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/Categories/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
f5224a0c-847f-461e-a396-e2bb713f802e
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/Categories/f5224a0c-847f-461e-a396-e2bb713f802e' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImE3YjE3YjE5LTZhNDQtNGVkNi05ZDhiLTA4ZGVmYWFlZGYyNiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6ImE3YjE3YjE5LTZhNDQtNGVkNi05ZDhiLTA4ZGVmYWFlZGYyNiIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg2NzkwNzU2LCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.aLVsQ4aqwQDLybwctrihgTYyzZ9AlWbBtZ1gGQIjXzo'
Request URL
https://rentaltech.premiumasp.net/api/Categories/f5224a0c-847f-461e-a396-e2bb713f802e
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "id": "f5224a0c-847f-461e-a396-e2bb713f802e",
    "name": "test",
    "imageUrl": "uploads/categories/d8947c62-3c90-4329-a97f-b12818ebd91a.webp",
    "propertiesCount": 0,
    "propertyBuyingsCount": 0,
    "totalCount": 0
  },
  "isSuccess": true,
  "message": null,
  "errors": [],
  "type": 200
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,15 Aug 2026 10:02:48 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/Categories/{id}


Parameters
Cancel
Reset
Name	Description
id *
string($uuid)
(path)
f5224a0c-847f-461e-a396-e2bb713f802e
Request body

multipart/form-data
Id
string($uuid)
f5224a0c-847f-461e-a396-e2bb713f802e
Send empty value
Name
string
testsetset
Send empty value
Image
string($binary)
property-card.png
Send empty value
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://rentaltech.premiumasp.net/api/Categories/f5224a0c-847f-461e-a396-e2bb713f802e' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImE3YjE3YjE5LTZhNDQtNGVkNi05ZDhiLTA4ZGVmYWFlZGYyNiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6ImE3YjE3YjE5LTZhNDQtNGVkNi05ZDhiLTA4ZGVmYWFlZGYyNiIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg2NzkwNzU2LCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.aLVsQ4aqwQDLybwctrihgTYyzZ9AlWbBtZ1gGQIjXzo' \
  -H 'Content-Type: multipart/form-data' \
  -F 'Id=f5224a0c-847f-461e-a396-e2bb713f802e' \
  -F 'Name=testsetset' \
  -F 'Image=@property-card.png;type=image/png'
Request URL
https://rentaltech.premiumasp.net/api/Categories/f5224a0c-847f-461e-a396-e2bb713f802e
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "id": "f5224a0c-847f-461e-a396-e2bb713f802e",
    "name": "testsetset",
    "imageUrl": "uploads/categories/93009a40-b3ae-4a02-af44-2688044dfed0.webp",
    "propertiesCount": 0,
    "propertyBuyingsCount": 0,
    "totalCount": 0
  },
  "isSuccess": true,
  "message": "Category updated successfully",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,15 Aug 2026 10:03:16 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/Categories/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
f5224a0c-847f-461e-a396-e2bb713f802e
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://rentaltech.premiumasp.net/api/Categories/f5224a0c-847f-461e-a396-e2bb713f802e' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImE3YjE3YjE5LTZhNDQtNGVkNi05ZDhiLTA4ZGVmYWFlZGYyNiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6ImE3YjE3YjE5LTZhNDQtNGVkNi05ZDhiLTA4ZGVmYWFlZGYyNiIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg2NzkwNzU2LCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.aLVsQ4aqwQDLybwctrihgTYyzZ9AlWbBtZ1gGQIjXzo'
Request URL
https://rentaltech.premiumasp.net/api/Categories/f5224a0c-847f-461e-a396-e2bb713f802e
Server response
Code	Details
200	
Response body
Download
{
  "data": true,
  "isSuccess": true,
  "message": "Category deleted successfully",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,15 Aug 2026 10:03:38 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK