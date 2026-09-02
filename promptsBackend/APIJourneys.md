we have updated how we work with journeys could you create a plan so it works right after we hvae added more data for it ?
POST
/api/journeys


Parameters
Cancel
Reset
No parameters

Request body

multipart/form-data
Name
string
trip from cario to alex
Send empty value
Description
string
des
Send empty value
Image
string($binary)
No file chosen
Send empty value
FromLocationId
string($uuid)
4eac7749-5264-4d51-b839-837584e76bd6
Send empty value
ToLocationId
string($uuid)
78ea7987-0f8b-44fc-ba1d-ade4965a6855
Send empty value
BasePrice
number($double)
50
Send empty value
EstimatedDurationMinutes
integer($int32)
60
Send empty value
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/journeys' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImE3YjE3YjE5LTZhNDQtNGVkNi05ZDhiLTA4ZGVmYWFlZGYyNiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6ImE3YjE3YjE5LTZhNDQtNGVkNi05ZDhiLTA4ZGVmYWFlZGYyNiIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg2NzkwNzU2LCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.aLVsQ4aqwQDLybwctrihgTYyzZ9AlWbBtZ1gGQIjXzo' \
  -H 'Content-Type: multipart/form-data' \
  -F 'Name=trip from cario to alex' \
  -F 'Description=des' \
  -F 'Image=@hero-house.png;type=image/png' \
  -F 'FromLocationId=4eac7749-5264-4d51-b839-837584e76bd6' \
  -F 'ToLocationId=78ea7987-0f8b-44fc-ba1d-ade4965a6855' \
  -F 'BasePrice=50' \
  -F 'EstimatedDurationMinutes=60'
Request URL
https://rentaltech.premiumasp.net/api/journeys
Server response
Code	Details
201	
Response body
Download
{
  "data": {
    "id": "8e897c7f-a588-4bd8-abee-d9abf7f7bb11",
    "name": "",
    "description": "",
    "fromLocationId": "4eac7749-5264-4d51-b839-837584e76bd6",
    "fromLocationName": "Alex",
    "toLocationId": "78ea7987-0f8b-44fc-ba1d-ade4965a6855",
    "toLocationName": "Cario",
    "basePrice": 50,
    "estimatedDurationMinutes": 60,
    "imageUrl": null,
    "isActive": true
  },
  "isSuccess": true,
  "message": "Journey created successfully.",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,15 Aug 2026 09:58:22 GMT 
 location: https://rentaltech.premiumasp.net/api/journeys/8e897c7f-a588-4bd8-abee-d9abf7f7bb11 
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
  "fromLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "fromLocationName": "string",
  "toLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "toLocationName": "string",
  "basePrice": 0,
  "estimatedDurationMinutes": 0,
  "isActive": true
}
No links

GET
/api/journeys


Parameters
Cancel
Name	Description
fromLocationId
string($uuid)
(query)
fromLocationId
toLocationId
string($uuid)
(query)
toLocationId
isActive
boolean
(query)

--
pageNumber
integer($int32)
(query)
1
pageSize
integer($int32)
(query)
10
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/journeys?pageNumber=1&pageSize=10' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImE3YjE3YjE5LTZhNDQtNGVkNi05ZDhiLTA4ZGVmYWFlZGYyNiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6ImE3YjE3YjE5LTZhNDQtNGVkNi05ZDhiLTA4ZGVmYWFlZGYyNiIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg2NzkwNzU2LCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.aLVsQ4aqwQDLybwctrihgTYyzZ9AlWbBtZ1gGQIjXzo'
Request URL
https://rentaltech.premiumasp.net/api/journeys?pageNumber=1&pageSize=10
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "items": [
      {
        "id": "8e897c7f-a588-4bd8-abee-d9abf7f7bb11",
        "name": "trip from cario to alex",
        "description": "des",
        "fromLocationId": "4eac7749-5264-4d51-b839-837584e76bd6",
        "fromLocationName": "Alex",
        "toLocationId": "78ea7987-0f8b-44fc-ba1d-ade4965a6855",
        "toLocationName": "Cario",
        "basePrice": 50,
        "estimatedDurationMinutes": 60,
        "imageUrl": "uploads/journey-images/fac6ae99-fddf-460a-ae9c-9377108a7d3f.webp",
        "isActive": true
      },
      {
        "id": "8e1c4029-c39d-4e95-8efb-785ef4caffcc",
        "name": "trip from cario to alex",
        "description": "here we will have the description",
        "fromLocationId": "78ea7987-0f8b-44fc-ba1d-ade4965a6855",
        "fromLocationName": "Cario",
        "toLocationId": "4eac7749-5264-4d51-b839-837584e76bd6",
        "toLocationName": "Alex",
        "basePrice": 50,
        "estimatedDurationMinutes": 60,
        "imageUrl": "uploads/journey-images/f264fff2-8545-485b-8889-984889c0bcd7.webp",
        "isActive": true
      }
    ],
    "pageNumber": 1,
    "pageSize": 10,
    "totalCount": 2,
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
 date: Sat,15 Aug 2026 09:58:37 GMT 
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
      "fromLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "fromLocationName": "string",
      "toLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "toLocationName": "string",
      "basePrice": 0,
      "estimatedDurationMinutes": 0,
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
/api/journeys/{id}


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
id
Request body

multipart/form-data
Name
string
Description
string
Image
string($binary)
FromLocationId
string($uuid)
ToLocationId
string($uuid)
BasePrice
number($double)
EstimatedDurationMinutes
integer($int32)
IsActive
boolean
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/journeys/{id}



GET
/api/journeys/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
8e1c4029-c39d-4e95-8efb-785ef4caffcc
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/journeys/8e1c4029-c39d-4e95-8efb-785ef4caffcc' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImE3YjE3YjE5LTZhNDQtNGVkNi05ZDhiLTA4ZGVmYWFlZGYyNiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6ImE3YjE3YjE5LTZhNDQtNGVkNi05ZDhiLTA4ZGVmYWFlZGYyNiIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg2NzkwNzU2LCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.aLVsQ4aqwQDLybwctrihgTYyzZ9AlWbBtZ1gGQIjXzo'
Request URL
https://rentaltech.premiumasp.net/api/journeys/8e1c4029-c39d-4e95-8efb-785ef4caffcc
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "id": "8e1c4029-c39d-4e95-8efb-785ef4caffcc",
    "name": "trip from cario to alex",
    "description": "here we will have the description",
    "fromLocationId": "78ea7987-0f8b-44fc-ba1d-ade4965a6855",
    "fromLocationName": "Cario",
    "toLocationId": "4eac7749-5264-4d51-b839-837584e76bd6",
    "toLocationName": "Alex",
    "basePrice": 50,
    "estimatedDurationMinutes": 60,
    "imageUrl": "uploads/journey-images/f264fff2-8545-485b-8889-984889c0bcd7.webp",
    "isActive": true
  },
  "isSuccess": true,
  "message": null,
  "errors": [],
  "type": 200
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,15 Aug 2026 09:59:26 GMT 
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
  "fromLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "fromLocationName": "string",
  "toLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "toLocationName": "string",
  "basePrice": 0,
  "estimatedDurationMinutes": 0,
  "isActive": true
}