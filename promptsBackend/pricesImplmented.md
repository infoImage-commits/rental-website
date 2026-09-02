now in the rent prpoites we need to make sure the prices are implmetneed right the current issue is that when we have a proites we don't use the endpoint for the POST no we use only the PUT and this is not correct if the porites does not have any pirces we should be using the POST and for that single price we could edit with PUT and note that we can view the pirces for a porites and also we could delete a prices and when we do that we have to use POST in order to create a new prices okay 
pelaes create a plan so that we make sure we ill implnet the next section in the right way could you do that ?

GET
/api/properties/{propertyId}/prices
Get property prices


Parameters
Cancel
Name	Description
propertyId *
string($uuid)
(path)
97decaff-5bf0-4117-b211-1c64b9169a8e
startDayNo
integer($int32)
(query)

--
endDayNo
integer($int32)
(query)

--
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/properties/97decaff-5bf0-4117-b211-1c64b9169a8e/prices' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODY5NjUyMjgsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.oLu7WPdhMYSdybpxvpHY2Yic1W2gBXzCSxm2r_nNU4o'
Request URL
https://rentaltech.premiumasp.net/api/properties/97decaff-5bf0-4117-b211-1c64b9169a8e/prices
Server response
Code	Details
200	
Response body
Download
{
  "data": [
    {
      "id": "80eee002-1591-4476-a595-d18dca318eee",
      "propertyId": "97decaff-5bf0-4117-b211-1c64b9169a8e",
      "dayNo": 1,
      "price": 150
    }
  ],
  "isSuccess": true,
  "message": null,
  "errors": [],
  "type": 200
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Mon,17 Aug 2026 10:15:23 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/properties/{propertyId}/prices
Create property prices


Parameters
Cancel
Reset
Name	Description
propertyId *
string($uuid)
(path)
97decaff-5bf0-4117-b211-1c64b9169a8e
Request body

application/json
[
  {
    "dayNo": 1,
    "price": 100
  }
]
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/properties/97decaff-5bf0-4117-b211-1c64b9169a8e/prices' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODY5NjUyMjgsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.oLu7WPdhMYSdybpxvpHY2Yic1W2gBXzCSxm2r_nNU4o' \
  -H 'Content-Type: application/json' \
  -d '[
  {
    "dayNo": 1,
    "price": 100
  }
]'
Request URL
https://rentaltech.premiumasp.net/api/properties/97decaff-5bf0-4117-b211-1c64b9169a8e/prices
Server response
Code	Details
201
Undocumented
Response body
Download
{
  "data": [
    {
      "id": "80eee002-1591-4476-a595-d18dca318eee",
      "propertyId": "97decaff-5bf0-4117-b211-1c64b9169a8e",
      "dayNo": 1,
      "price": 100
    }
  ],
  "isSuccess": true,
  "message": "Property prices created successfully",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Mon,17 Aug 2026 10:14:52 GMT 
 location: https://rentaltech.premiumasp.net/api/properties/97decaff-5bf0-4117-b211-1c64b9169a8e/prices 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/properties/{propertyId}/prices/{priceId}
Update property price


Parameters
Cancel
Reset
Name	Description
propertyId *
string($uuid)
(path)
97decaff-5bf0-4117-b211-1c64b9169a8e
priceId *
string($uuid)
(path)
80eee002-1591-4476-a595-d18dca318eee
Request body

application/json
{
  "dayNo": 1,
  "price": 150
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://rentaltech.premiumasp.net/api/properties/97decaff-5bf0-4117-b211-1c64b9169a8e/prices/80eee002-1591-4476-a595-d18dca318eee' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODY5NjUyMjgsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.oLu7WPdhMYSdybpxvpHY2Yic1W2gBXzCSxm2r_nNU4o' \
  -H 'Content-Type: application/json' \
  -d '{
  "dayNo": 1,
  "price": 150
}'
Request URL
https://rentaltech.premiumasp.net/api/properties/97decaff-5bf0-4117-b211-1c64b9169a8e/prices/80eee002-1591-4476-a595-d18dca318eee
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "id": "80eee002-1591-4476-a595-d18dca318eee",
    "propertyId": "97decaff-5bf0-4117-b211-1c64b9169a8e",
    "dayNo": 1,
    "price": 150
  },
  "isSuccess": true,
  "message": "Property price updated successfully",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Mon,17 Aug 2026 10:15:14 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/properties/{propertyId}/prices/{priceId}
Delete property price


Parameters
Cancel
Name	Description
propertyId *
string($uuid)
(path)
97decaff-5bf0-4117-b211-1c64b9169a8e
priceId *
string($uuid)
(path)
80eee002-1591-4476-a595-d18dca318eee
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://rentaltech.premiumasp.net/api/properties/97decaff-5bf0-4117-b211-1c64b9169a8e/prices/80eee002-1591-4476-a595-d18dca318eee' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODY5NjUyMjgsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.oLu7WPdhMYSdybpxvpHY2Yic1W2gBXzCSxm2r_nNU4o'
Request URL
https://rentaltech.premiumasp.net/api/properties/97decaff-5bf0-4117-b211-1c64b9169a8e/prices/80eee002-1591-4476-a595-d18dca318eee
Server response
Code	Details
200	
Response body
Download
{
  "data": true,
  "isSuccess": true,
  "message": "Property price deleted successfully",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Mon,17 Aug 2026 10:15:55 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

those are the endpoints