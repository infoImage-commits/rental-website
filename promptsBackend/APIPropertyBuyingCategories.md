create a plan for the categoies but this time this is for the buying those are for the proites paying 
in the sidebar we should call them buy includes catagoies and for the 
Includes Categories make sure you also add the pre fix rent 
also with the Includes Items add rent as we have different and we want to sepearte them could you create a plan so that we implment them and also rename some of the section as i said  
PropertyBuyingCategories
Property buying categories management endpoints



POST
/api/property-buying/categories
Create a new property buying category


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "name": "test",
  "icon": "sttestring",
  "defaultIcon": "s",
  "displayOrder": 11
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/property-buying/categories' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODcyMzY0NjcsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.0kvEHh6lXDdPH-_fYeFev1_Xh-YIky8TEBb5MA-oef0' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "test",
  "icon": "sttestring",
  "defaultIcon": "s",
  "displayOrder": 11
}'
Request URL
https://rentaltech.premiumasp.net/api/property-buying/categories
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "id": "d026f43f-8b67-4f22-8e04-18c26d8125c3",
    "name": "test",
    "icon": "sttestring",
    "defaultIcon": "s",
    "displayOrder": 11,
    "isActive": true,
    "isDefault": false,
    "items": []
  },
  "isSuccess": true,
  "message": "Category created successfully",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,20 Aug 2026 13:53:31 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/property-buying/categories
Get all property buying categories


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
  'https://rentaltech.premiumasp.net/api/property-buying/categories?includeItems=true&onlyActive=true' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODcyMzY0NjcsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.0kvEHh6lXDdPH-_fYeFev1_Xh-YIky8TEBb5MA-oef0'
Request URL
https://rentaltech.premiumasp.net/api/property-buying/categories?includeItems=true&onlyActive=true
Server response
Code	Details
200	
Response body
Download
{
  "data": [
    {
      "id": "9e6dcc4b-463d-4d03-8a2e-26d7fbb1dee7",
      "name": "testIcon",
      "icon": "iconName",
      "defaultIcon": "ThatgonnaBeDefault",
      "displayOrder": 1,
      "isActive": true,
      "isDefault": false,
      "items": [
        {
          "id": "2590d84b-ac93-4c95-9161-ed3612095d06",
          "propertyBuyingCategoryId": "9e6dcc4b-463d-4d03-8a2e-26d7fbb1dee7",
          "name": "nameOFItemList",
          "icon": "IconName",
          "displayOrder": 1,
          "isActive": true,
          "isDefault": false
        },
        {
          "id": "6c8b1a60-4931-4492-bed6-5b847589ab1a",
          "propertyBuyingCategoryId": "9e6dcc4b-463d-4d03-8a2e-26d7fbb1dee7",
          "name": "nameOFItemList11",
          "icon": "IconName2",
          "displayOrder": 2,
          "isActive": true,
          "isDefault": false
        },
        {
          "id": "20ce9a2e-ed01-4ec6-9510-de9466c2e776",
          "propertyBuyingCategoryId": "9e6dcc4b-463d-4d03-8a2e-26d7fbb1dee7",
          "name": "testtttttttttttttt",
          "icon": "string",
          "displayOrder": 3,
          "isActive": true,
          "isDefault": false
        }
      ]
    },
    {
      "id": "d026f43f-8b67-4f22-8e04-18c26d8125c3",
      "name": "test",
      "icon": "sttestring",
      "defaultIcon": "s",
      "displayOrder": 11,
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
 date: Thu,20 Aug 2026 13:53:36 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/property-buying/categories/{id}
Update an existing property buying category


Parameters
Cancel
Reset
Name	Description
id *
string($uuid)
(path)
d026f43f-8b67-4f22-8e04-18c26d8125c3
Request body

application/json
{
  "id": "d026f43f-8b67-4f22-8e04-18c26d8125c3",
"name": "tes1t",
      "icon": "sttestri1ng",
      "defaultIcon": "s1"
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://rentaltech.premiumasp.net/api/property-buying/categories/d026f43f-8b67-4f22-8e04-18c26d8125c3' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODcyMzY0NjcsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.0kvEHh6lXDdPH-_fYeFev1_Xh-YIky8TEBb5MA-oef0' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": "d026f43f-8b67-4f22-8e04-18c26d8125c3",
"name": "tes1t",
      "icon": "sttestri1ng",
      "defaultIcon": "s1"
}'
Request URL
https://rentaltech.premiumasp.net/api/property-buying/categories/d026f43f-8b67-4f22-8e04-18c26d8125c3
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "id": "d026f43f-8b67-4f22-8e04-18c26d8125c3",
    "name": "tes1t",
    "icon": "sttestri1ng",
    "defaultIcon": "s1",
    "displayOrder": 11,
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
 date: Thu,20 Aug 2026 13:54:08 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/property-buying/categories/{id}
Delete a property buying category


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
id
Responses
Code	Description	Links
200	
OK

No links

GET
/api/property-buying/categories/{id}
Get property buying category by ID


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
d026f43f-8b67-4f22-8e04-18c26d8125c3
includeItems
boolean
(query)

true
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/property-buying/categories/d026f43f-8b67-4f22-8e04-18c26d8125c3?includeItems=true' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODcyMzY0NjcsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.0kvEHh6lXDdPH-_fYeFev1_Xh-YIky8TEBb5MA-oef0'
Request URL
https://rentaltech.premiumasp.net/api/property-buying/categories/d026f43f-8b67-4f22-8e04-18c26d8125c3?includeItems=true
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "id": "d026f43f-8b67-4f22-8e04-18c26d8125c3",
    "name": "tes1t",
    "icon": "sttestri1ng",
    "defaultIcon": "s1",
    "displayOrder": 11,
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
 date: Thu,20 Aug 2026 13:54:21 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/property-buying/categories/{id}/display-order
Update property buying category display order


Parameters
Cancel
Reset
Name	Description
id *
string($uuid)
(path)
d026f43f-8b67-4f22-8e04-18c26d8125c3
Request body

application/json
{
  "id": "d026f43f-8b67-4f22-8e04-18c26d8125c3",
  "displayOrder": 12
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://rentaltech.premiumasp.net/api/property-buying/categories/d026f43f-8b67-4f22-8e04-18c26d8125c3/display-order' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODcyMzY0NjcsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.0kvEHh6lXDdPH-_fYeFev1_Xh-YIky8TEBb5MA-oef0' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": "d026f43f-8b67-4f22-8e04-18c26d8125c3",
  "displayOrder": 12
}'
Request URL
https://rentaltech.premiumasp.net/api/property-buying/categories/d026f43f-8b67-4f22-8e04-18c26d8125c3/display-order
Server response
Code	Details
200	
Response body
Download
{
  "data": true,
  "isSuccess": true,
  "message": "Category display order updated successfully",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,20 Aug 2026 13:54:37 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PATCH
/api/property-buying/categories/{id}/status
Update property buying category status


Parameters
Cancel
Reset
Name	Description
id *
string($uuid)
(path)
d026f43f-8b67-4f22-8e04-18c26d8125c3
Request body

application/json
{
  "id": "d026f43f-8b67-4f22-8e04-18c26d8125c3",
  "isActive": true
}
Execute
Clear
Responses
Curl

curl -X 'PATCH' \
  'https://rentaltech.premiumasp.net/api/property-buying/categories/d026f43f-8b67-4f22-8e04-18c26d8125c3/status' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODcyMzY0NjcsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.0kvEHh6lXDdPH-_fYeFev1_Xh-YIky8TEBb5MA-oef0' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": "d026f43f-8b67-4f22-8e04-18c26d8125c3",
  "isActive": true
}'
Request URL
https://rentaltech.premiumasp.net/api/property-buying/categories/d026f43f-8b67-4f22-8e04-18c26d8125c3/status
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
 date: Thu,20 Aug 2026 13:55:22 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK