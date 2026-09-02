we need to create a plan to implment the categoires for propoites those are different from the catgoies we had those are meant to be used as the inclueds catagoies for the propites we will name it that 
we should have a plan so that we implment it for the admin dashbaord could you create a plan for it ?
please make sure it works rigth and in the get all i want to show only the catagoies not the items cataogies when we click on it however we should view the item catagoies too please create a plan to implment it 
POST
/api/properties/categories
Create property category


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "name": "test",
  "icon": "seaVeiew",
  "defaultIcon": "corwn",
  "displayOrder": 111
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/properties/categories' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODY4Njk4ODQsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.v1XuRLPp3zyCEg7Gdz1szkL3oBvkTh9JwAPzblslZJA' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "test",
  "icon": "seaVeiew",
  "defaultIcon": "corwn",
  "displayOrder": 111
}'
Request URL
https://rentaltech.premiumasp.net/api/properties/categories
Server response
Code	Details
201
Undocumented
Response body
Download
{
  "id": "b7268d1b-7fb4-4b39-80ba-a2402f7267ba",
  "name": "test",
  "icon": "seaVeiew",
  "defaultIcon": "corwn",
  "displayOrder": 111,
  "isActive": true,
  "isDefault": false,
  "items": []
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,16 Aug 2026 07:45:45 GMT 
 location: https://rentaltech.premiumasp.net/api/properties/categories/b7268d1b-7fb4-4b39-80ba-a2402f7267ba 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/properties/categories
Get all property categories


Parameters
Cancel
Name	Description
includeItems
boolean
(query)

true
onlyActive
boolean
(query)

true
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/properties/categories?includeItems=true&onlyActive=true' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODY4Njk4ODQsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.v1XuRLPp3zyCEg7Gdz1szkL3oBvkTh9JwAPzblslZJA'
Request URL
https://rentaltech.premiumasp.net/api/properties/categories?includeItems=true&onlyActive=true
Server response
Code	Details
200	
Response body
Download
{
  "data": [
    {
      "id": "9327951e-03df-44ad-be29-08defaaede89",
      "name": "Features",
      "icon": null,
      "defaultIcon": "fa-star",
      "displayOrder": 1,
      "isActive": true,
      "isDefault": true,
      "items": [
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
        }
      ]
    },
    {
      "id": "dcf166b1-1be0-475d-be2a-08defaaede89",
      "name": "Amenities",
      "icon": null,
      "defaultIcon": "fa-check",
      "displayOrder": 2,
      "isActive": true,
      "isDefault": true,
      "items": [
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
        }
      ]
    },
    {
      "id": "d8ea5f2d-51b9-4968-be2b-08defaaede89",
      "name": "Facilities",
      "icon": null,
      "defaultIcon": "fa-building",
      "displayOrder": 3,
      "isActive": true,
      "isDefault": true,
      "items": [
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
        }
      ]
    },
    {
      "id": "07873731-f2df-4d4c-be2c-08defaaede89",
      "name": "Dining",
      "icon": null,
      "defaultIcon": "fa-utensils",
      "displayOrder": 4,
      "isActive": true,
      "isDefault": true,
      "items": []
    },
    {
      "id": "cb2f2600-ffd9-4cfe-be2d-08defaaede89",
      "name": "Kitchen",
      "icon": null,
      "defaultIcon": "fa-sink",
      "displayOrder": 5,
      "isActive": true,
      "isDefault": true,
      "items": []
    },
    {
      "id": "a941e021-708a-4ae2-be2e-08defaaede89",
      "name": "Bathroom",
      "icon": null,
      "defaultIcon": "fa-bath",
      "displayOrder": 6,
      "isActive": true,
      "isDefault": true,
      "items": []
    },
    {
      "id": "65e64748-4c3a-4db6-be2f-08defaaede89",
      "name": "Entertainment",
      "icon": null,
      "defaultIcon": "fa-tv",
      "displayOrder": 7,
      "isActive": true,
      "isDefault": true,
      "items": [
        {
          "id": "453fb51e-f357-43df-2162-08defaaeded6",
          "propertyCategoryId": "65e64748-4c3a-4db6-be2f-08defaaede89",
          "name": "TV",
          "icon": "fa-tv",
          "displayOrder": 1,
          "isActive": true,
          "isDefault": true
        }
      ]
    },
    {
      "id": "cadc31e1-3fc4-4386-be30-08defaaede89",
      "name": "Safety",
      "icon": null,
      "defaultIcon": "fa-shield-alt",
      "displayOrder": 8,
      "isActive": true,
      "isDefault": true,
      "items": [
        {
          "id": "df05b360-aa62-4dfa-2163-08defaaeded6",
          "propertyCategoryId": "cadc31e1-3fc4-4386-be30-08defaaede89",
          "name": "Smoke Detector",
          "icon": "fa-fire",
          "displayOrder": 1,
          "isActive": true,
          "isDefault": true
        }
      ]
    },
    {
      "id": "0724625d-0abd-4848-be31-08defaaede89",
      "name": "Accessibility",
      "icon": null,
      "defaultIcon": "fa-wheelchair",
      "displayOrder": 9,
      "isActive": true,
      "isDefault": true,
      "items": []
    },
    {
      "id": "b7268d1b-7fb4-4b39-80ba-a2402f7267ba",
      "name": "test",
      "icon": "seaVeiew",
      "defaultIcon": "corwn",
      "displayOrder": 111,
      "isActive": true,
      "isDefault": false,
      "items": []
    }
  ],
  "isSuccess": true,
  "message": null,
  "errors": [],
  "type": 200
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,16 Aug 2026 07:45:49 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/properties/categories/{id}
Update property category


Parameters
Cancel
Reset
Name	Description
id *
string($uuid)
(path)
b7268d1b-7fb4-4b39-80ba-a2402f7267ba
Request body

application/json
{
  "name": "notest",
  "icon": "sadf",
  "defaultIcon": "asdfasd"
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://rentaltech.premiumasp.net/api/properties/categories/b7268d1b-7fb4-4b39-80ba-a2402f7267ba' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODY4Njk4ODQsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.v1XuRLPp3zyCEg7Gdz1szkL3oBvkTh9JwAPzblslZJA' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "notest",
  "icon": "sadf",
  "defaultIcon": "asdfasd"
}'
Request URL
https://rentaltech.premiumasp.net/api/properties/categories/b7268d1b-7fb4-4b39-80ba-a2402f7267ba
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "id": "b7268d1b-7fb4-4b39-80ba-a2402f7267ba",
    "name": "notest",
    "icon": "sadf",
    "defaultIcon": "asdfasd",
    "displayOrder": 111,
    "isActive": true,
    "isDefault": false,
    "items": []
  },
  "isSuccess": true,
  "message": "Category updated successfully",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,16 Aug 2026 07:46:37 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/properties/categories/{id}
Delete property category


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
b7268d1b-7fb4-4b39-80ba-a2402f7267ba
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://rentaltech.premiumasp.net/api/properties/categories/b7268d1b-7fb4-4b39-80ba-a2402f7267ba' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODY4Njk4ODQsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.v1XuRLPp3zyCEg7Gdz1szkL3oBvkTh9JwAPzblslZJA'
Request URL
https://rentaltech.premiumasp.net/api/properties/categories/b7268d1b-7fb4-4b39-80ba-a2402f7267ba
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
 date: Sun,16 Aug 2026 07:46:44 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/properties/categories/{id}
Get property category by id


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
b7268d1b-7fb4-4b39-80ba-a2402f7267ba
includeItems
boolean
(query)

true
onlyActive
boolean
(query)

true
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/properties/categories/b7268d1b-7fb4-4b39-80ba-a2402f7267ba?includeItems=true&onlyActive=true' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODY4Njk4ODQsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.v1XuRLPp3zyCEg7Gdz1szkL3oBvkTh9JwAPzblslZJA'
Request URL
https://rentaltech.premiumasp.net/api/properties/categories/b7268d1b-7fb4-4b39-80ba-a2402f7267ba?includeItems=true&onlyActive=true
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "id": "b7268d1b-7fb4-4b39-80ba-a2402f7267ba",
    "name": "test",
    "icon": "seaVeiew",
    "defaultIcon": "corwn",
    "displayOrder": 111,
    "isActive": true,
    "isDefault": false,
    "items": []
  },
  "isSuccess": true,
  "message": null,
  "errors": [],
  "type": 200
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,16 Aug 2026 07:46:24 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/properties/categories/{id}/display-order
Update category display order


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
id
Request body

application/json
Example Value
Schema
{
  "displayOrder": 0
}
Responses
Code	Description	Links
200	
OK