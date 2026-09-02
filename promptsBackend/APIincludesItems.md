now we need another page for the includes items we need to create a plan for it make sure it works right and if you have any question please provide them  now create a plan for all of those there is an endpoint for the includes catagoies so make sure you use it in the right please 
PATCH
/api/properties/categories/{id}/status
Update category status


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
9327951e-03df-44ad-be29-08defaaede89
Request body

application/json
{
  "isActive": true
}
Execute
Clear
Responses
Curl

curl -X 'PATCH' \
  'https://rentaltech.premiumasp.net/api/properties/categories/9327951e-03df-44ad-be29-08defaaede89/status' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODY4Njk4ODQsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.v1XuRLPp3zyCEg7Gdz1szkL3oBvkTh9JwAPzblslZJA' \
  -H 'Content-Type: application/json' \
  -d '{
  "isActive": true
}'
Request URL
https://rentaltech.premiumasp.net/api/properties/categories/9327951e-03df-44ad-be29-08defaaede89/status
Server response
Code	Details
200	
Response body
Download
{
  "data": true,
  "isSuccess": true,
  "message": "Category status updated successfully",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,16 Aug 2026 08:10:58 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/properties/category-items
Create property category item


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "propertyCategoryId": "9327951e-03df-44ad-be29-08defaaede89",
  "name": "test",
  "icon": "ss",
  "displayOrder": 11
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/properties/category-items' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODY4Njk4ODQsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.v1XuRLPp3zyCEg7Gdz1szkL3oBvkTh9JwAPzblslZJA' \
  -H 'Content-Type: application/json' \
  -d '{
  "propertyCategoryId": "9327951e-03df-44ad-be29-08defaaede89",
  "name": "test",
  "icon": "ss",
  "displayOrder": 11
}'
Request URL
https://rentaltech.premiumasp.net/api/properties/category-items
Server response
Code	Details
201
Undocumented
Response body
Download
{
  "id": "465d1090-1458-4f92-8c8f-2a8ee8cdfa35",
  "propertyCategoryId": "9327951e-03df-44ad-be29-08defaaede89",
  "name": "test",
  "icon": "ss",
  "displayOrder": 11,
  "isActive": true,
  "isDefault": false
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,16 Aug 2026 08:11:37 GMT 
 location: https://rentaltech.premiumasp.net/api/properties/category-items/465d1090-1458-4f92-8c8f-2a8ee8cdfa35 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/properties/category-items
Get all category items


Parameters
Cancel
Name	Description
onlyActive
boolean
(query)

true
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/properties/category-items?onlyActive=true' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODY4Njk4ODQsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.v1XuRLPp3zyCEg7Gdz1szkL3oBvkTh9JwAPzblslZJA'
Request URL
https://rentaltech.premiumasp.net/api/properties/category-items?onlyActive=true
Server response
Code	Details
200	
Response body
Download
{
  "data": [
    {
      "id": "b13eb2e7-a64c-48f9-215c-08defaaeded6",
      "propertyCategoryId": "9327951e-03df-44ad-be29-08defaaede89",
      "name": "Sea View",
      "icon": "fa-water",
      "displayOrder": 1,
      "isActive": true,
      "isDefault": true
    },
    {
      "id": "06a1f67f-598d-47f7-215d-08defaaeded6",
      "propertyCategoryId": "9327951e-03df-44ad-be29-08defaaede89",
      "name": "Mountain View",
      "icon": "fa-mountain",
      "displayOrder": 2,
      "isActive": true,
      "isDefault": true
    },
    {
      "id": "465d1090-1458-4f92-8c8f-2a8ee8cdfa35",
      "propertyCategoryId": "9327951e-03df-44ad-be29-08defaaede89",
      "name": "test",
      "icon": "ss",
      "displayOrder": 11,
      "isActive": true,
      "isDefault": false
    },
    {
      "id": "d25098a1-a712-40d9-215e-08defaaeded6",
      "propertyCategoryId": "dcf166b1-1be0-475d-be2a-08defaaede89",
      "name": "WiFi",
      "icon": "fa-wifi",
      "displayOrder": 1,
      "isActive": true,
      "isDefault": true
    },
    {
      "id": "ff8469c2-f40a-4254-215f-08defaaeded6",
      "propertyCategoryId": "dcf166b1-1be0-475d-be2a-08defaaede89",
      "name": "Air Conditioning",
      "icon": "fa-snowflake",
      "displayOrder": 2,
      "isActive": true,
      "isDefault": true
    },
    {
      "id": "17c6f72c-39c8-4db0-2160-08defaaeded6",
      "propertyCategoryId": "d8ea5f2d-51b9-4968-be2b-08defaaede89",
      "name": "Swimming Pool",
      "icon": "fa-swimming-pool",
      "displayOrder": 1,
      "isActive": true,
      "isDefault": true
    },
    {
      "id": "70eb7d42-f829-429c-2161-08defaaeded6",
      "propertyCategoryId": "d8ea5f2d-51b9-4968-be2b-08defaaede89",
      "name": "Parking",
      "icon": "fa-car",
      "displayOrder": 2,
      "isActive": true,
      "isDefault": true
    },
    {
      "id": "453fb51e-f357-43df-2162-08defaaeded6",
      "propertyCategoryId": "65e64748-4c3a-4db6-be2f-08defaaede89",
      "name": "TV",
      "icon": "fa-tv",
      "displayOrder": 1,
      "isActive": true,
      "isDefault": true
    },
    {
      "id": "df05b360-aa62-4dfa-2163-08defaaeded6",
      "propertyCategoryId": "cadc31e1-3fc4-4386-be30-08defaaede89",
      "name": "Smoke Detector",
      "icon": "fa-fire",
      "displayOrder": 1,
      "isActive": true,
      "isDefault": true
    }
  ],
  "isSuccess": true,
  "message": null,
  "errors": [],
  "type": 200
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,16 Aug 2026 08:11:42 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/properties/category-items/{id}
Update property category item


Parameters
Cancel
Reset
Name	Description
id *
string($uuid)
(path)
465d1090-1458-4f92-8c8f-2a8ee8cdfa35
Request body

application/json
{
  "name": "tsts",
  "icon": "stst"
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://rentaltech.premiumasp.net/api/properties/category-items/465d1090-1458-4f92-8c8f-2a8ee8cdfa35' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODY4Njk4ODQsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.v1XuRLPp3zyCEg7Gdz1szkL3oBvkTh9JwAPzblslZJA' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "tsts",
  "icon": "stst"
}'
Request URL
https://rentaltech.premiumasp.net/api/properties/category-items/465d1090-1458-4f92-8c8f-2a8ee8cdfa35
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "id": "465d1090-1458-4f92-8c8f-2a8ee8cdfa35",
    "propertyCategoryId": "9327951e-03df-44ad-be29-08defaaede89",
    "name": "tsts",
    "icon": "stst",
    "displayOrder": 11,
    "isActive": true,
    "isDefault": false
  },
  "isSuccess": true,
  "message": "Category item updated successfully",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,16 Aug 2026 08:12:18 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/properties/category-items/{id}
Delete property category item


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
465d1090-1458-4f92-8c8f-2a8ee8cdfa35
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://rentaltech.premiumasp.net/api/properties/category-items/465d1090-1458-4f92-8c8f-2a8ee8cdfa35' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODY4Njk4ODQsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.v1XuRLPp3zyCEg7Gdz1szkL3oBvkTh9JwAPzblslZJA'
Request URL
https://rentaltech.premiumasp.net/api/properties/category-items/465d1090-1458-4f92-8c8f-2a8ee8cdfa35
Server response
Code	Details
200	
Response body
Download
{
  "data": true,
  "isSuccess": true,
  "message": "Category item deleted successfully",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,16 Aug 2026 08:13:42 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/properties/category-items/{id}
Get category item by id


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
465d1090-1458-4f92-8c8f-2a8ee8cdfa35
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/properties/category-items/465d1090-1458-4f92-8c8f-2a8ee8cdfa35' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODY4Njk4ODQsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.v1XuRLPp3zyCEg7Gdz1szkL3oBvkTh9JwAPzblslZJA'
Request URL
https://rentaltech.premiumasp.net/api/properties/category-items/465d1090-1458-4f92-8c8f-2a8ee8cdfa35
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "id": "465d1090-1458-4f92-8c8f-2a8ee8cdfa35",
    "propertyCategoryId": "9327951e-03df-44ad-be29-08defaaede89",
    "name": "tsts",
    "icon": "stst",
    "displayOrder": 11,
    "isActive": true,
    "isDefault": false
  },
  "isSuccess": true,
  "message": null,
  "errors": [],
  "type": 200
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,16 Aug 2026 08:12:25 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/properties/category-items/category/{categoryId}
Get category items by category


Parameters
Cancel
Name	Description
categoryId *
string($uuid)
(path)
9327951e-03df-44ad-be29-08defaaede89
onlyActive
boolean
(query)

true
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/properties/category-items/category/9327951e-03df-44ad-be29-08defaaede89?onlyActive=true' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODY4Njk4ODQsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.v1XuRLPp3zyCEg7Gdz1szkL3oBvkTh9JwAPzblslZJA'
Request URL
https://rentaltech.premiumasp.net/api/properties/category-items/category/9327951e-03df-44ad-be29-08defaaede89?onlyActive=true
Server response
Code	Details
200	
Response body
Download
{
  "data": [
    {
      "id": "b13eb2e7-a64c-48f9-215c-08defaaeded6",
      "propertyCategoryId": "9327951e-03df-44ad-be29-08defaaede89",
      "name": "Sea View",
      "icon": "fa-water",
      "displayOrder": 1,
      "isActive": true,
      "isDefault": true
    },
    {
      "id": "06a1f67f-598d-47f7-215d-08defaaeded6",
      "propertyCategoryId": "9327951e-03df-44ad-be29-08defaaede89",
      "name": "Mountain View",
      "icon": "fa-mountain",
      "displayOrder": 2,
      "isActive": true,
      "isDefault": true
    },
    {
      "id": "465d1090-1458-4f92-8c8f-2a8ee8cdfa35",
      "propertyCategoryId": "9327951e-03df-44ad-be29-08defaaede89",
      "name": "tsts",
      "icon": "stst",
      "displayOrder": 11,
      "isActive": true,
      "isDefault": false
    }
  ],
  "isSuccess": true,
  "message": null,
  "errors": [],
  "type": 200
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,16 Aug 2026 08:12:38 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/properties/category-items/{id}/display-order
Update category item display order


Parameters
Cancel
Reset
Name	Description
id *
string($uuid)
(path)
465d1090-1458-4f92-8c8f-2a8ee8cdfa35
Request body

application/json
{
  "displayOrder": 31
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://rentaltech.premiumasp.net/api/properties/category-items/465d1090-1458-4f92-8c8f-2a8ee8cdfa35/display-order' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODY4Njk4ODQsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.v1XuRLPp3zyCEg7Gdz1szkL3oBvkTh9JwAPzblslZJA' \
  -H 'Content-Type: application/json' \
  -d '{
  "displayOrder": 31
}'
Request URL
https://rentaltech.premiumasp.net/api/properties/category-items/465d1090-1458-4f92-8c8f-2a8ee8cdfa35/display-order
Server response
Code	Details
200	
Response body
Download
{
  "data": true,
  "isSuccess": true,
  "message": "Category item display order updated successfully",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,16 Aug 2026 08:13:20 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/properties/category-items/{id}/status
Update category item status


Parameters
Cancel
Reset
Name	Description
id *
string($uuid)
(path)
465d1090-1458-4f92-8c8f-2a8ee8cdfa35
Request body

application/json
{
  "isActive": false
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://rentaltech.premiumasp.net/api/properties/category-items/465d1090-1458-4f92-8c8f-2a8ee8cdfa35/status' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODY4Njk4ODQsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.v1XuRLPp3zyCEg7Gdz1szkL3oBvkTh9JwAPzblslZJA' \
  -H 'Content-Type: application/json' \
  -d '{
  "isActive": false
}'
Request URL
https://rentaltech.premiumasp.net/api/properties/category-items/465d1090-1458-4f92-8c8f-2a8ee8cdfa35/status
Server response
Code	Details
200	
Response body
Download
{
  "data": true,
  "isSuccess": true,
  "message": "Category item status updated successfully",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,16 Aug 2026 08:13:31 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK