those are a lot of endpoints here and to make it working all perfectly we need to create a plan for it but before that I'll tell you a lot of stuff as enums you should be knowing about 
here we start first of all 

for the 
POST
/api/properties
you will need those enums
public enum PropertyStatus
{
Clean = 1,
Dirty = 2,
Maintenance = 3
}
public enum PropertyType
{
Apartment = 1,
Villa = 2,
Studio = 3,
Chalet = 4,
TwinHouse = 5,
TownHouse = 6,
Duplex = 7,
Penthouse = 8,
Cabin = 9,
Hotel = 10
}

public enum BedType
{
Single = 0,
Twin = 1,
Double = 2,
Queen = 3,
King = 4,
SofaBed = 5,
BunkBed = 6,
BabyCrib = 7,
Futon = 8
}

POST
/api/properties
Create a new property

PUT
/api/properties/{id}/availability
this upadtes only the 
 "isAvailable": true, true or false 
 PUT
/api/properties/{id}/Status
Update property availability
here we have the statues for it 
public enum PropertyStatus
{
Clean = 1,
Dirty = 2,
Maintenance = 3
}

for the POST
/api/properties/{propertyId}/prices
dayNo
is like that 
public enum DayNo
{
Saturday = 1,
Sunday = 2,
Monday = 3,
Tuesday = 4,
Wednesday = 5,
Thursday = 6,
Friday = 7
}
those are all of the enums you gonna need now please create a plan so that we can implent this in the project all of those are for the rent propoites we need to label it like that as to make the use not confiused okay write a full plan so that we can implment all of those endpoint could you do that ?


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "categoryId": "c968c3c4-9c9b-4ef6-9b5c-0c41e4a2d22a",
  "code": "PRO-123",
  "name": "el gona city prop",
  "description": "a very long descriptions descriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptions",
  "bedroomNo": 1,
  "bathroomNo": 2,
  "roomNo": 3,
  "capacity": 4,
  "size": 100,
  "basePrice": 200,
  "propertyType": 1,
  "propertyStatus": 1,
  "isAvailable": true,
  "isFeatured": true,
  "hasSeaView": true,
  "hasPoolView": true,
  "hasGardenView": true,
  "hasMountainView": true,
  "hasCityView": true,
  "latitude": 3.1,
  "longitude": 3.1,
  "rulesCancellation": "those gonna be just strings",
  "notes": "what do you want to add ",
  "address": {
    "country": "Egypt",
    "city": "HUR",
    "area": "abo el maged",
    "zipCode": "132456",
    "street": "street number"
  },
  "listingDetails": {
    
    "lateCheckIn": "what is that ",
    "outdoorFacility": "string",
    "originalService": "string",
    "cancellation": "string",
    "extraPeopleFee": 100,
    "privatebathroom": true,
    "familyFriendly": true,
    "privateEntrance": true,
    "extraPeople": "string"
  },
  "sleepingArrangements": [
    {
      "name": "was ist das",
      "displayOrder": 1,
      "beds": [
        {
          "bedType": 1,
          "quantity": 2
        },
{
          "bedType": 2,
          "quantity": 1
        }
      ]
    }
  ],
  "propertyCategoryItemIds": [
    "b13eb2e7-a64c-48f9-215c-08defaaeded6"
  ]
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/properties' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODY4Njk4ODQsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.v1XuRLPp3zyCEg7Gdz1szkL3oBvkTh9JwAPzblslZJA' \
  -H 'Content-Type: application/json' \
  -d '{
  "categoryId": "c968c3c4-9c9b-4ef6-9b5c-0c41e4a2d22a",
  "code": "PRO-123",
  "name": "el gona city prop",
  "description": "a very long descriptions descriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptions",
  "bedroomNo": 1,
  "bathroomNo": 2,
  "roomNo": 3,
  "capacity": 4,
  "size": 100,
  "basePrice": 200,
  "propertyType": 1,
  "propertyStatus": 1,
  "isAvailable": true,
  "isFeatured": true,
  "hasSeaView": true,
  "hasPoolView": true,
  "hasGardenView": true,
  "hasMountainView": true,
  "hasCityView": true,
  "latitude": 3.1,
  "longitude": 3.1,
  "rulesCancellation": "those gonna be just strings",
  "notes": "what do you want to add ",
  "address": {
    "country": "Egypt",
    "city": "HUR",
    "area": "abo el maged",
    "zipCode": "132456",
    "street": "street number"
  },
  "listingDetails": {
    
    "lateCheckIn": "what is that ",
    "outdoorFacility": "string",
    "originalService": "string",
    "cancellation": "string",
    "extraPeopleFee": 100,
    "privatebathroom": true,
    "familyFriendly": true,
    "privateEntrance": true,
    "extraPeople": "string"
  },
  "sleepingArrangements": [
    {
      "name": "was ist das",
      "displayOrder": 1,
      "beds": [
        {
          "bedType": 1,
          "quantity": 2
        },
{
          "bedType": 2,
          "quantity": 1
        }
      ]
    }
  ],
  "propertyCategoryItemIds": [
    "b13eb2e7-a64c-48f9-215c-08defaaeded6"
  ]
}'
Request URL
https://rentaltech.premiumasp.net/api/properties
Server response
Code	Details
201	
Response body
Download
{
  "data": {
    "id": "cb93a89a-2a56-4521-955e-7876eede33eb",
    "propertyNumber": "PR-000001",
    "code": "PRO-123",
    "name": "el gona city prop",
    "description": "a very long descriptions descriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptions",
    "bedroomNo": 1,
    "bathroomNo": 2,
    "roomNo": 3,
    "capacity": 4,
    "size": 100,
    "basePrice": 200,
    "propertyType": 1,
    "propertyTypeName": "Apartment",
    "propertyStatus": 1,
    "propertyStatusName": "Clean",
    "isAvailable": true,
    "isFeatured": true,
    "hasSeaView": true,
    "hasPoolView": true,
    "hasGardenView": true,
    "hasMountainView": true,
    "hasCityView": true,
    "latitude": 3.1,
    "longitude": 3.1,
    "rulesCancellation": "those gonna be just strings",
    "notes": "what do you want to add ",
    "createdAtUtc": "2026-08-16T08:40:28.4427321Z",
    "updatedAtUtc": null,
    "category": {
      "id": "c968c3c4-9c9b-4ef6-9b5c-0c41e4a2d22a",
      "name": "etestse",
      "imageUrl": "uploads/categories/c7c0b02c-0962-4065-8c3f-fcec51f05284.webp"
    },
    "address": {
      "id": "c6f38e4c-6521-41c4-b340-4f56a1abffca",
      "propertyId": "cb93a89a-2a56-4521-955e-7876eede33eb",
      "country": "Egypt",
      "state": "",
      "city": "HUR",
      "area": "abo el maged",
      "zipCode": "132456",
      "street": "street number"
    },
    "listingDetails": {
      "id": "3157624c-6784-4345-b8c4-13f8e5a21ed6",
      "propertyId": "cb93a89a-2a56-4521-955e-7876eede33eb",
      
      
      "lateCheckIn": "what is that ",
      "outdoorFacility": "string",
      "originalService": "string",
      "cancellation": "string",
      "extraPeopleFee": 100,
      "privatebathroom": true,
      "checkInHour": "14:00:00",
      "checkOutHour": "12:00:00",
      "familyFriendly": true,
      "privateEntrance": true,
      "extraPeople": "string"
    },
    "images": [],
    "prices": [],
    "sleepingArrangements": [
      {
        "id": "7668d90a-b88a-40e2-97d1-b4bc20ee5f10",
        "name": "was ist das",
        "displayOrder": 1,
        "beds": [
          {
            "id": "a3084345-5630-4757-94d2-06e63e4e944a",
            "bedType": 1,
            "bedTypeName": "Twin",
            "quantity": 2
          },
          {
            "id": "0678d9aa-5725-4db1-b811-13dc50c7844f",
            "bedType": 2,
            "bedTypeName": "Double",
            "quantity": 1
          }
        ]
      }
    ],
    "categories": [
      {
        "categoryName": "Features",
        "items": [
          "Sea View"
        ]
      }
    ]
  },
  "isSuccess": true,
  "message": "Property created successfully",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,16 Aug 2026 08:40:28 GMT 
 location: https://rentaltech.premiumasp.net/api/properties/cb93a89a-2a56-4521-955e-7876eede33eb 
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
  "propertyNumber": "string",
  "code": "string",
  "name": "string",
  "description": "string",
  "bedroomNo": 0,
  "bathroomNo": 0,
  "roomNo": 0,
  "capacity": 0,
  "size": 0,
  "basePrice": 0,
  "propertyType": 1,
  "propertyTypeName": "string",
  "propertyStatus": 1,
  "propertyStatusName": "string",
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
  "createdAtUtc": "2026-08-16T09:14:59.598Z",
  "updatedAtUtc": "2026-08-16T09:14:59.598Z",
  "category": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "string",
    "imageUrl": "string"
  },
  "address": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "propertyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "country": "string",
    "state": "string",
    "city": "string",
    "area": "string",
    "zipCode": "string",
    "street": "string"
  },
  "listingDetails": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "propertyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    
    
    "lateCheckIn": "string",
    "outdoorFacility": "string",
    "originalService": "string",
    "cancellation": "string",
    "extraPeopleFee": 0,
    "privatebathroom": true,
    "checkInHour": "string",
    "checkOutHour": "string",
    "familyFriendly": true,
    "privateEntrance": true,
    "extraPeople": "string"
  },
  "images": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "propertyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "imageUrl": "string",
      "displayOrder": 0,
      "isCover": true
    }
  ],
  "prices": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "propertyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "dayNo": 1,
      "price": 0
    }
  ],
  "sleepingArrangements": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "displayOrder": 0,
      "beds": [
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "bedType": 0,
          "bedTypeName": "string",
          "quantity": 0
        }
      ]
    }
  ],
  "categories": [
    {
      "categoryName": "string",
      "items": [
        "string"
      ]
    }
  ]
}
No links

GET
/api/properties
Get all properties


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
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/properties?pageNumber=1&pageSize=10' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODY4Njk4ODQsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.v1XuRLPp3zyCEg7Gdz1szkL3oBvkTh9JwAPzblslZJA'
Request URL
https://rentaltech.premiumasp.net/api/properties?pageNumber=1&pageSize=10
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "items": [
      {
        "id": "cb93a89a-2a56-4521-955e-7876eede33eb",
        "propertyNumber": "PR-000001",
        "code": "PRO-123",
        "name": "el gona city prop",
        "bedroomNo": 1,
        "bathroomNo": 2,
        "capacity": 4,
        "basePrice": 200,
        "propertyType": 1,
        "propertyTypeName": "Apartment",
        "isAvailable": true,
        "isFeatured": true,
        "coverImageUrl": null,
        "city": null,
        "country": null,
        "createdAtUtc": "2026-08-16T08:40:28.4427321"
      }
    ],
    "pageNumber": 1,
    "pageSize": 10,
    "totalCount": 1,
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
 date: Sun,16 Aug 2026 08:40:37 GMT 
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
      "propertyNumber": "string",
      "code": "string",
      "name": "string",
      "bedroomNo": 0,
      "bathroomNo": 0,
      "capacity": 0,
      "basePrice": 0,
      "propertyType": 1,
      "propertyTypeName": "string",
      "isAvailable": true,
      "isFeatured": true,
      "coverImageUrl": "string",
      "city": "string",
      "country": "string",
      "createdAtUtc": "2026-08-16T09:14:59.611Z"
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

GET
/api/properties/{id}
Get property by id


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
cb93a89a-2a56-4521-955e-7876eede33eb
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/properties/cb93a89a-2a56-4521-955e-7876eede33eb' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODY4Njk4ODQsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.v1XuRLPp3zyCEg7Gdz1szkL3oBvkTh9JwAPzblslZJA'
Request URL
https://rentaltech.premiumasp.net/api/properties/cb93a89a-2a56-4521-955e-7876eede33eb
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "id": "cb93a89a-2a56-4521-955e-7876eede33eb",
    "propertyNumber": "PR-000001",
    "code": "PRO-123",
    "name": "el gona city prop",
    "description": "a very long descriptions descriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptionsdescriptions",
    "bedroomNo": 1,
    "bathroomNo": 2,
    "roomNo": 3,
    "capacity": 4,
    "size": 100,
    "basePrice": 200,
    "propertyType": 1,
    "propertyTypeName": "Apartment",
    "propertyStatus": 1,
    "propertyStatusName": "Clean",
    "isAvailable": true,
    "isFeatured": true,
    "hasSeaView": true,
    "hasPoolView": true,
    "hasGardenView": true,
    "hasMountainView": true,
    "hasCityView": true,
    "latitude": 3.1,
    "longitude": 3.1,
    "rulesCancellation": "those gonna be just strings",
    "notes": "what do you want to add ",
    "createdAtUtc": "2026-08-16T08:40:28.4427321",
    "updatedAtUtc": null,
    "category": {
      "id": "c968c3c4-9c9b-4ef6-9b5c-0c41e4a2d22a",
      "name": "etestse",
      "imageUrl": "uploads/categories/c7c0b02c-0962-4065-8c3f-fcec51f05284.webp"
    },
    "address": {
      "id": "c6f38e4c-6521-41c4-b340-4f56a1abffca",
      "propertyId": "cb93a89a-2a56-4521-955e-7876eede33eb",
      "country": "Egypt",
      "state": "",
      "city": "HUR",
      "area": "abo el maged",
      "zipCode": "132456",
      "street": "street number"
    },
    "listingDetails": {
      "id": "3157624c-6784-4345-b8c4-13f8e5a21ed6",
      "propertyId": "cb93a89a-2a56-4521-955e-7876eede33eb",
      
      
      "lateCheckIn": "what is that ",
      "outdoorFacility": "string",
      "originalService": "string",
      "cancellation": "string",
      "extraPeopleFee": 100,
      "privatebathroom": true,
      "checkInHour": "14:00:00",
      "checkOutHour": "12:00:00",
      "familyFriendly": true,
      "privateEntrance": true,
      "extraPeople": "string"
    },
    "images": [],
    "prices": [],
    "sleepingArrangements": [
      {
        "id": "7668d90a-b88a-40e2-97d1-b4bc20ee5f10",
        "name": "was ist das",
        "displayOrder": 1,
        "beds": [
          {
            "id": "a3084345-5630-4757-94d2-06e63e4e944a",
            "bedType": 1,
            "bedTypeName": "Twin",
            "quantity": 2
          },
          {
            "id": "0678d9aa-5725-4db1-b811-13dc50c7844f",
            "bedType": 2,
            "bedTypeName": "Double",
            "quantity": 1
          }
        ]
      }
    ],
    "categories": [
      {
        "categoryName": "Features",
        "items": [
          "Sea View"
        ]
      }
    ]
  },
  "isSuccess": true,
  "message": null,
  "errors": [],
  "type": 200
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,16 Aug 2026 08:41:07 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

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
  "propertyCategoryItemIds": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  ]
}
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/properties/{id}
Delete property


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
/api/properties/search


Parameters
Cancel
Name	Description
SearchTerm
string
(query)
PRO
PageNumber
integer($int32)
(query)
it works biased on code , name , des , address , 
PageSize
integer($int32)
(query)
PageSize
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/properties/search?SearchTerm=PRO' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODY4Njk4ODQsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.v1XuRLPp3zyCEg7Gdz1szkL3oBvkTh9JwAPzblslZJA'
Request URL
https://rentaltech.premiumasp.net/api/properties/search?SearchTerm=PRO
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "items": [
      {
        "id": "cb93a89a-2a56-4521-955e-7876eede33eb",
        "propertyNumber": "PR-000001",
        "code": "PRO-123",
        "name": "el gona city prop",
        "bedroomNo": 1,
        "bathroomNo": 2,
        "capacity": 4,
        "basePrice": 200,
        "propertyType": 1,
        "propertyTypeName": "Apartment",
        "isAvailable": true,
        "isFeatured": true,
        "coverImageUrl": null,
        "city": "HUR",
        "country": "Egypt",
        "createdAtUtc": "2026-08-16T08:40:28.4427321"
      }
    ],
    "pageNumber": 1,
    "pageSize": 10,
    "totalCount": 1,
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
 date: Sun,16 Aug 2026 08:42:10 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/properties/filter


Parameters
Cancel
Name	Description
PropertyType
integer($int32)
(query)

--
PropertyStatus
integer($int32)
(query)

--
Country
string
(query)
Country
City
string
(query)
City
Area
string
(query)
Area
MinPrice
number($double)
(query)
10
MaxPrice
number($double)
(query)
200
MinBedrooms
integer($int32)
(query)
MinBedrooms
MaxBedrooms
integer($int32)
(query)
MaxBedrooms
MinBathrooms
integer($int32)
(query)
MinBathrooms
MaxBathrooms
integer($int32)
(query)
MaxBathrooms
MinRooms
integer($int32)
(query)
MinRooms
MaxRooms
integer($int32)
(query)
MaxRooms
MinCapacity
integer($int32)
(query)
MinCapacity
IsFeatured
boolean
(query)

--
IsAvailable
boolean
(query)

--
HasSeaView
boolean
(query)

--
HasPoolView
boolean
(query)

--
HasGardenView
boolean
(query)

--
HasMountainView
boolean
(query)

--
HasCityView
boolean
(query)

--
PageNumber
integer($int32)
(query)
PageNumber
PageSize
integer($int32)
(query)
PageSize
SortBy
string
(query)
SortBy
IsDescending
boolean
(query)

--
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/properties/filter?MinPrice=10&MaxPrice=200' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODY4Njk4ODQsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.v1XuRLPp3zyCEg7Gdz1szkL3oBvkTh9JwAPzblslZJA'
Request URL
https://rentaltech.premiumasp.net/api/properties/filter?MinPrice=10&MaxPrice=200
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "items": [
      {
        "id": "cb93a89a-2a56-4521-955e-7876eede33eb",
        "propertyNumber": "PR-000001",
        "code": "PRO-123",
        "name": "el gona city prop",
        "bedroomNo": 1,
        "bathroomNo": 2,
        "capacity": 4,
        "basePrice": 200,
        "propertyType": 1,
        "propertyTypeName": "Apartment",
        "isAvailable": true,
        "isFeatured": true,
        "coverImageUrl": null,
        "city": "HUR",
        "country": "Egypt",
        "createdAtUtc": "2026-08-16T08:40:28.4427321"
      }
    ],
    "pageNumber": 1,
    "pageSize": 10,
    "totalCount": 1,
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
 date: Sun,16 Aug 2026 08:42:28 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/properties/featured


Parameters
Cancel
Name	Description
count
integer($int32)
(query)
6
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/properties/featured?count=6' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODY4NzQ0OTIsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.RfdvLhaOqcX3CGDTFIb7xVae_MxYmzthc4u5I1YvFsI'
Request URL
https://rentaltech.premiumasp.net/api/properties/featured?count=6
Server response
Code	Details
200	
Response body
Download
{
  "data": [
    {
      "id": "cb93a89a-2a56-4521-955e-7876eede33eb",
      "propertyNumber": "PR-000001",
      "code": "PRO-123",
      "name": "el gona city prop",
      "bedroomNo": 1,
      "bathroomNo": 2,
      "capacity": 4,
      "basePrice": 200,
      "propertyType": 1,
      "propertyTypeName": "Apartment",
      "isAvailable": true,
      "isFeatured": true,
      "coverImageUrl": null,
      "city": "HUR",
      "country": "Egypt",
      "createdAtUtc": "2026-08-16T08:40:28.4427321"
    }
  ],
  "isSuccess": true,
  "message": null,
  "errors": [],
  "type": 200
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,16 Aug 2026 09:04:06 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK
PUT
/api/properties/{id}/availability
Update property availability


Parameters
Cancel
Reset
Name	Description
id *
string($uuid)
(path)
cb93a89a-2a56-4521-955e-7876eede33eb
Request body

application/json
false
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://rentaltech.premiumasp.net/api/properties/cb93a89a-2a56-4521-955e-7876eede33eb/availability' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODY4NzQ0OTIsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.RfdvLhaOqcX3CGDTFIb7xVae_MxYmzthc4u5I1YvFsI' \
  -H 'Content-Type: application/json' \
  -d 'false'
Request URL
https://rentaltech.premiumasp.net/api/properties/cb93a89a-2a56-4521-955e-7876eede33eb/availability
Server response
Code	Details
200	
Response body
Download
{
  "isSuccess": true,
  "message": "Property availability updated successfully",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,16 Aug 2026 09:16:13 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/properties/{id}/Status
Update property availability


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
cb93a89a-2a56-4521-955e-7876eede33eb
Request body

application/json
1
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://rentaltech.premiumasp.net/api/properties/cb93a89a-2a56-4521-955e-7876eede33eb/Status' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODY4NzQ0OTIsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.RfdvLhaOqcX3CGDTFIb7xVae_MxYmzthc4u5I1YvFsI' \
  -H 'Content-Type: application/json' \
  -d '1'
Request URL
https://rentaltech.premiumasp.net/api/properties/cb93a89a-2a56-4521-955e-7876eede33eb/Status
Server response
Code	Details
200	
Response body
Download
{
  "isSuccess": true,
  "message": "Property availability updated successfully",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,16 Aug 2026 09:03:34 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/properties/{id}/featured
Update property featured status


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
cb93a89a-2a56-4521-955e-7876eede33eb
Request body

application/json
true
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://rentaltech.premiumasp.net/api/properties/cb93a89a-2a56-4521-955e-7876eede33eb/featured' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODY4NzQ0OTIsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.RfdvLhaOqcX3CGDTFIb7xVae_MxYmzthc4u5I1YvFsI' \
  -H 'Content-Type: application/json' \
  -d 'true'
Request URL
https://rentaltech.premiumasp.net/api/properties/cb93a89a-2a56-4521-955e-7876eede33eb/featured
Server response
Code	Details
200	
Response body
Download
{
  "isSuccess": true,
  "message": "Property featured status updated successfully",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,16 Aug 2026 09:04:02 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK
PUT
/api/properties/{propertyId}/address
Update property address


Parameters
Try it out
Name	Description
propertyId *
string($uuid)
(path)
propertyId
Request body

application/json
Example Value
Schema
{
  "country": "string",
  "city": "string",
  "area": "string",
  "zipCode": "string",
  "street": "string"
}
Responses
Code	Description	Links
200	
OK
PUT
/api/properties/{propertyId}/listing-details
Update listing details


Parameters
Try it out
Name	Description
propertyId *
string($uuid)
(path)
propertyId
Request body

application/json
Example Value
Schema
{
  
  "lateCheckIn": "string",
  "outdoorFacility": "string",
  "originalService": "string",
  "cancellation": "string",
  "extraPeopleFee": 0,
  "privateBathroom": true,
  "checkInHour": "string",
  "checkOutHour": "string",
  "familyFriendly": true,
  "privateEntrance": true,
  "extraPeople": "string"
}
Responses
Code	Description	Links
200	
OK

No links

GET
/api/properties/{propertyId}/images
Get property images


Parameters
Cancel
Name	Description
propertyId *
string($uuid)
(path)
cb93a89a-2a56-4521-955e-7876eede33eb
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/properties/cb93a89a-2a56-4521-955e-7876eede33eb/images' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODY4NzQ0OTIsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.RfdvLhaOqcX3CGDTFIb7xVae_MxYmzthc4u5I1YvFsI'
Request URL
https://rentaltech.premiumasp.net/api/properties/cb93a89a-2a56-4521-955e-7876eede33eb/images
Server response
Code	Details
200	
Response body
Download
{
  "data": [
    {
      "id": "d63d3ce1-de27-4a41-9948-e4737e439eee",
      "propertyId": "cb93a89a-2a56-4521-955e-7876eede33eb",
      "imageUrl": "uploads/properties/cb93a89a-2a56-4521-955e-7876eede33eb/0e20725a-da81-4d43-beef-10f8dfd8c435.webp",
      "displayOrder": 1,
      "isCover": true
    }
  ],
  "isSuccess": true,
  "message": null,
  "errors": [],
  "type": 200
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,16 Aug 2026 09:10:57 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/properties/{propertyId}/images
Upload property images


Parameters
Cancel
Reset
Name	Description
propertyId *
string($uuid)
(path)
cb93a89a-2a56-4521-955e-7876eede33eb
Request body

multipart/form-data
Images
array
cta-house.png-
hero-house.png-
Add string item
Send empty value
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/properties/cb93a89a-2a56-4521-955e-7876eede33eb/images' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODY4NzQ0OTIsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.RfdvLhaOqcX3CGDTFIb7xVae_MxYmzthc4u5I1YvFsI' \
  -H 'Content-Type: multipart/form-data' \
  -F 'Images=@cta-house.png;type=image/png' \
  -F 'Images=@hero-house.png;type=image/png'
Request URL
https://rentaltech.premiumasp.net/api/properties/cb93a89a-2a56-4521-955e-7876eede33eb/images
Server response
Code	Details
201
Undocumented
Response body
Download
{
  "data": [
    {
      "id": "d63d3ce1-de27-4a41-9948-e4737e439eee",
      "propertyId": "cb93a89a-2a56-4521-955e-7876eede33eb",
      "imageUrl": "uploads/properties/cb93a89a-2a56-4521-955e-7876eede33eb/0e20725a-da81-4d43-beef-10f8dfd8c435.webp",
      "displayOrder": 1,
      "isCover": true
    },
    {
      "id": "36f2b472-fc19-4b5b-a7db-540b301bdcaa",
      "propertyId": "cb93a89a-2a56-4521-955e-7876eede33eb",
      "imageUrl": "uploads/properties/cb93a89a-2a56-4521-955e-7876eede33eb/c0c1098a-dda7-4906-bb45-1b72cdaffdeb.webp",
      "displayOrder": 2,
      "isCover": false
    }
  ],
  "isSuccess": true,
  "message": "Images uploaded successfully",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,16 Aug 2026 09:09:58 GMT 
 location: https://rentaltech.premiumasp.net/api/properties/cb93a89a-2a56-4521-955e-7876eede33eb/images 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/properties/images/{imageId}
Delete property image


Parameters
Cancel
Name	Description
imageId *
string($uuid)
(path)
36f2b472-fc19-4b5b-a7db-540b301bdcaa
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://rentaltech.premiumasp.net/api/properties/images/36f2b472-fc19-4b5b-a7db-540b301bdcaa' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODY4NzQ0OTIsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.RfdvLhaOqcX3CGDTFIb7xVae_MxYmzthc4u5I1YvFsI'
Request URL
https://rentaltech.premiumasp.net/api/properties/images/36f2b472-fc19-4b5b-a7db-540b301bdcaa
Server response
Code	Details
200	
Response body
Download
{
  "isSuccess": true,
  "message": "Image deleted successfully",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,16 Aug 2026 09:10:11 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/properties/{propertyId}/images/{imageId}/set-cover
Set cover image


Parameters
Cancel
Name	Description
propertyId *
string($uuid)
(path)
cb93a89a-2a56-4521-955e-7876eede33eb
imageId *
string($uuid)
(path)
d63d3ce1-de27-4a41-9948-e4737e439eee
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://rentaltech.premiumasp.net/api/properties/cb93a89a-2a56-4521-955e-7876eede33eb/images/d63d3ce1-de27-4a41-9948-e4737e439eee/set-cover' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODY4NzQ0OTIsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.RfdvLhaOqcX3CGDTFIb7xVae_MxYmzthc4u5I1YvFsI'
Request URL
https://rentaltech.premiumasp.net/api/properties/cb93a89a-2a56-4521-955e-7876eede33eb/images/d63d3ce1-de27-4a41-9948-e4737e439eee/set-cover
Server response
Code	Details
200	
Response body
Download
{
  "isSuccess": true,
  "message": "Cover image set successfully",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,16 Aug 2026 09:11:08 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK
GET
/api/properties/{propertyId}/prices
Get property prices


Parameters
Cancel
Name	Description
propertyId *
string($uuid)
(path)
cb93a89a-2a56-4521-955e-7876eede33eb
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
  'https://rentaltech.premiumasp.net/api/properties/cb93a89a-2a56-4521-955e-7876eede33eb/prices' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODY4NzQ0OTIsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.RfdvLhaOqcX3CGDTFIb7xVae_MxYmzthc4u5I1YvFsI'
Request URL
https://rentaltech.premiumasp.net/api/properties/cb93a89a-2a56-4521-955e-7876eede33eb/prices
Server response
Code	Details
200	
Response body
Download
{
  "data": [
    {
      "id": "947cc94e-6402-484f-9bf9-7d7fe56a81b4",
      "propertyId": "cb93a89a-2a56-4521-955e-7876eede33eb",
      "dayNo": 1,
      "price": 150
    },
    {
      "id": "cde1e0da-3309-4afa-9ea7-a97ad7b709d4",
      "propertyId": "cb93a89a-2a56-4521-955e-7876eede33eb",
      "dayNo": 2,
      "price": 200
    }
  ],
  "isSuccess": true,
  "message": null,
  "errors": [],
  "type": 200
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,16 Aug 2026 09:14:33 GMT 
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
cb93a89a-2a56-4521-955e-7876eede33eb
Request body

application/json
[
  {
    "dayNo": 1,
    "price": 100
  },
  {
    "dayNo": 2,
    "price": 200
  }
]
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/properties/cb93a89a-2a56-4521-955e-7876eede33eb/prices' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODY4NzQ0OTIsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.RfdvLhaOqcX3CGDTFIb7xVae_MxYmzthc4u5I1YvFsI' \
  -H 'Content-Type: application/json' \
  -d '[
  {
    "dayNo": 1,
    "price": 100
  },
  {
    "dayNo": 2,
    "price": 200
  }
]'
Request URL
https://rentaltech.premiumasp.net/api/properties/cb93a89a-2a56-4521-955e-7876eede33eb/prices
Server response
Code	Details
201
Undocumented
Response body
Download
{
  "data": [
    {
      "id": "947cc94e-6402-484f-9bf9-7d7fe56a81b4",
      "propertyId": "cb93a89a-2a56-4521-955e-7876eede33eb",
      "dayNo": 1,
      "price": 100
    },
    {
      "id": "cde1e0da-3309-4afa-9ea7-a97ad7b709d4",
      "propertyId": "cb93a89a-2a56-4521-955e-7876eede33eb",
      "dayNo": 2,
      "price": 200
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
 date: Sun,16 Aug 2026 09:12:38 GMT 
 location: https://rentaltech.premiumasp.net/api/properties/cb93a89a-2a56-4521-955e-7876eede33eb/prices 
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
cb93a89a-2a56-4521-955e-7876eede33eb
priceId *
string($uuid)
(path)
947cc94e-6402-484f-9bf9-7d7fe56a81b4
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
  'https://rentaltech.premiumasp.net/api/properties/cb93a89a-2a56-4521-955e-7876eede33eb/prices/947cc94e-6402-484f-9bf9-7d7fe56a81b4' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODY4NzQ0OTIsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.RfdvLhaOqcX3CGDTFIb7xVae_MxYmzthc4u5I1YvFsI' \
  -H 'Content-Type: application/json' \
  -d '{
  "dayNo": 1,
  "price": 150
}'
Request URL
https://rentaltech.premiumasp.net/api/properties/cb93a89a-2a56-4521-955e-7876eede33eb/prices/947cc94e-6402-484f-9bf9-7d7fe56a81b4
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "id": "947cc94e-6402-484f-9bf9-7d7fe56a81b4",
    "propertyId": "cb93a89a-2a56-4521-955e-7876eede33eb",
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
 date: Sun,16 Aug 2026 09:14:27 GMT 
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
cb93a89a-2a56-4521-955e-7876eede33eb
priceId *
string($uuid)
(path)
947cc94e-6402-484f-9bf9-7d7fe56a81b4
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://rentaltech.premiumasp.net/api/properties/cb93a89a-2a56-4521-955e-7876eede33eb/prices/947cc94e-6402-484f-9bf9-7d7fe56a81b4' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODY4NzQ0OTIsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.RfdvLhaOqcX3CGDTFIb7xVae_MxYmzthc4u5I1YvFsI'
Request URL
https://rentaltech.premiumasp.net/api/properties/cb93a89a-2a56-4521-955e-7876eede33eb/prices/947cc94e-6402-484f-9bf9-7d7fe56a81b4
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
 date: Sun,16 Aug 2026 09:15:00 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK
