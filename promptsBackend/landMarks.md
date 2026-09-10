we need to create a plan to implment the landmarks in the app using this endpoints we will be able to create them using the same id in the attributeGroup okay?
create a plan so that we have a section in the admin pages for the landmarks and we could add edit and delte them , also in the props we should be adding a list in the edit and in the create so that we could add those land marks please create a plan so that we could use them in the app and in the UI after the section for the Amenities we should show the section for hte Land Marks and in it we will show the key and value and we will use a defalut svg we have like the start we used in the app so far now create a full plan to do that !

POST
/api/properties
Create a new property


Parameters
Cancel
No parameters

Request body

application/json
{
  "categoryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "code": "string",
  "name": "string",
  "description": "string",
  "floor": "string",
  "bedroomNo": 0,
  "bathroomNo": 0,
  "roomNo": 0,
  "capacity": 0,
  "size": 0,
  "basePrice": 0,
  "propertyType": 1,
  "propertyStatus": 1,
  "isAvailable": true,
  "isFeatured": true,
  "hasSeaView": true,
  "hasPoolView": true,
  "hasGardenView": true,
  "hasMountainView": true,
  "hasCityView": true,
  "latitude": 0,
  "longitude": 0,
  "rulesCancellation": "string",
  "notes": "string",
  "address": {
    "country": "string",
    "city": "string",
    "area": "string",
    "zipCode": "string",
    "street": "string"
  },
  "listingDetails": {
    "lateCheckIn": "string",
    "outdoorFacility": "string",
    "originalService": "string",
    "cancellation": "string",
    "extraPeopleFee": 0,
    "privatebathroom": true,
    "familyFriendly": true,
    "privateEntrance": true,
    "extraPeople": "string"
  },
  "propertyCategoryItemIds": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  ],
  "sleepingArrangements": [
    {
      "name": "string",
      "displayOrder": 0,
      "beds": [
        {
          "bedType": 0,
          "quantity": 0
        }
      ]
    }
  ],
  "attributeGroupItemIds": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  ]
}
Execute
Responses
PUT
/api/properties/{id}
Update property


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
  "categoryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "string",
  "description": "string",
  "floor": "string",
  "bedroomNo": 0,
  "bathroomNo": 0,
  "roomNo": 0,
  "capacity": 0,
  "size": 0,
  "basePrice": 0,
  "propertyType": 1,
  "propertyStatus": 1,
  "hasSeaView": true,
  "hasPoolView": true,
  "hasGardenView": true,
  "hasMountainView": true,
  "hasCityView": true,
  "latitude": 0,
  "longitude": 0,
  "rulesCancellation": "string",
  "notes": "string",
  "sleepingArrangements": [
    {
      "name": "string",
      "displayOrder": 0,
      "beds": [
        {
          "bedType": 0,
          "quantity": 0
        }
      ]
    }
  ],
  "attributeGroupItemIds": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  ],
  "propertyCategoryItemIds": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  ]
}
Responses
AttributeGroupItems


POST
/api/attribute-group-items


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "attributeGroupId": "7e434ca6-6e86-451a-8543-180e1057e3ef",
  "key": "test",
  "value": "50 m",
  "displayOrder": 2
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/attribute-group-items' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsInVzZXJOYW1lIjoicG9sYSIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4ODk3MTcyOSwiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.ZtZ_ChErfZNDDBK25g_NuAcoKNmul3U4H-QKXqb_cbw' \
  -H 'Content-Type: application/json' \
  -d '{
  "attributeGroupId": "7e434ca6-6e86-451a-8543-180e1057e3ef",
  "key": "test",
  "value": "50 m",
  "displayOrder": 2
}'
Request URL
https://rentaltech.premiumasp.net/api/attribute-group-items
Server response
Code	Details
201
Undocumented
Response body
Download
{
  "data": {
    "id": "9f805549-214f-4107-b3ff-0836501333db",
    "attributeGroupId": "7e434ca6-6e86-451a-8543-180e1057e3ef",
    "key": "test",
    "value": "50 m",
    "displayOrder": 2
  },
  "isSuccess": true,
  "message": "AttributeGroupItem created successfully",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,09 Sep 2026 15:38:00 GMT 
 location: https://rentaltech.premiumasp.net/api/attribute-group-items/9f805549-214f-4107-b3ff-0836501333db 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/attribute-group-items/{id}


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

PUT
/api/attribute-group-items/{id}


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
  "key": "string",
  "value": "string",
  "displayOrder": 0
}
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/attribute-group-items/{id}


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
/api/attribute-group-items/group/{attributeGroupId}


Parameters
Cancel
Name	Description
attributeGroupId *
string($uuid)
(path)
7e434ca6-6e86-451a-8543-180e1057e3ef
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/attribute-group-items/group/7e434ca6-6e86-451a-8543-180e1057e3ef' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsInVzZXJOYW1lIjoicG9sYSIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4ODk3MTcyOSwiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.ZtZ_ChErfZNDDBK25g_NuAcoKNmul3U4H-QKXqb_cbw'
Request URL
https://rentaltech.premiumasp.net/api/attribute-group-items/group/7e434ca6-6e86-451a-8543-180e1057e3ef
Server response
Code	Details
200	
Response body
Download
{
  "data": [
    {
      "id": "5592e5f6-6c86-4f98-93e8-c5571290454b",
      "attributeGroupId": "7e434ca6-6e86-451a-8543-180e1057e3ef",
      "key": "Abo 3shar super market",
      "value": "50 m",
      "displayOrder": 1
    },
    {
      "id": "9f805549-214f-4107-b3ff-0836501333db",
      "attributeGroupId": "7e434ca6-6e86-451a-8543-180e1057e3ef",
      "key": "test",
      "value": "50 m",
      "displayOrder": 2
    }
  ],
  "isSuccess": true,
  "message": null,
  "errors": [],
  "type": 200
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Wed,09 Sep 2026 15:38:10 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK