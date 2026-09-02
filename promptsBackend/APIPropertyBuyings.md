now for the next section those are the properties that are listed for buying we should be create a paln for this section and the side bar should match our naming convention  we have been using so far okay
here are some things that could help you in this proccess
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

also some notes on the backend that are when you create a poroties it is by deaflut unpulish
and is not featured you have to pulish and feature it manually
and the way the addresst is handled is old could you make it look like the rental part?
alos please create a plan to implment it if you have any questoins please tell me about them okay ?
there is a differnet between categoryId and categoryValues categoryId those are the locatoins and the categoryValues those are the item catagoies for the buy please create a huge plan where you tell me what you are gonna to do 
DELETE
/api/property-buyings/{propertyBuyingId}/category-items/{categoryItemId}
Remove a category item from a property buying


Parameters
Try it out
Name	Description
propertyBuyingId *
string($uuid)
(path)
propertyBuyingId
categoryItemId *
string($uuid)
(path)
categoryItemId
Responses
Code	Description	Links
200	
OK

No links

GET
/api/property-buyings/public
Get public property buyings


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
sortBy
string
(query)
sortBy
ascending
boolean
(query)

false
search
string
(query)
search
city
string
(query)
city
area
string
(query)
area
propertyType
integer($int32)
(query)

--
bedrooms
integer($int32)
(query)
bedrooms
bathrooms
integer($int32)
(query)
bathrooms
minPrice
number($double)
(query)
minPrice
maxPrice
number($double)
(query)
maxPrice
isFeatured
boolean
(query)

--
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/property-buyings/public?pageNumber=1&pageSize=10&ascending=false' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODczMDM1MTQsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.tpr6ylsawTIA9lGdHaOFqn0SZQEtfGpuVWe2dpGaHtw'
Request URL
https://rentaltech.premiumasp.net/api/property-buyings/public?pageNumber=1&pageSize=10&ascending=false
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "items": [
      {
        "id": "2fd05b60-9a95-4be1-52ab-08deff5be49c",
        "propertyNumber": "PB-000001",
        "title": "new thing to buy",
        "price": 15000,
        "currency": "EGP",
        "propertyTypeId": 2,
        "status": 1,
        "isFeatured": true,
        "isPublished": true,
        "bedrooms": 2,
        "bathrooms": 1,
        "area": 1000,
        "coverImageUrl": null,
        "city": "hurhgda",
        "areaName": "idk",
        "category": {
          "id": "c968c3c4-9c9b-4ef6-9b5c-0c41e4a2d22a",
          "name": "etestse",
          "imageUrl": "uploads/categories/c7c0b02c-0962-4065-8c3f-fcec51f05284.webp"
        }
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
 date: Fri,21 Aug 2026 08:16:24 GMT 
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
      "title": "string",
      "price": 0,
      "currency": "string",
      "propertyTypeId": 1,
      "status": 1,
      "isFeatured": true,
      "isPublished": true,
      "bedrooms": 0,
      "bathrooms": 0,
      "area": 0,
      "coverImageUrl": "string",
      "city": "string",
      "areaName": "string",
      "category": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "string",
        "imageUrl": "string"
      }
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
/api/property-buyings/public/{id}
Get public property buying details


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
2fd05b60-9a95-4be1-52ab-08deff5be49c
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/property-buyings/public/2fd05b60-9a95-4be1-52ab-08deff5be49c' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODczMDM1MTQsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.tpr6ylsawTIA9lGdHaOFqn0SZQEtfGpuVWe2dpGaHtw'
Request URL
https://rentaltech.premiumasp.net/api/property-buyings/public/2fd05b60-9a95-4be1-52ab-08deff5be49c
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "id": "2fd05b60-9a95-4be1-52ab-08deff5be49c",
    "propertyNumber": "PB-000001",
    "title": "new thing to buy",
    "description": "very long description descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription",
    "price": 15000,
    "currency": "EGP",
    "propertyTypeId": 2,
    "status": 1,
    "isFeatured": true,
    "isPublished": true,
    "bedrooms": 2,
    "bathrooms": 1,
    "floors": 2,
    "garage": 1,
    "area": 1000,
    "yearBuilt": 2005,
    "latitude": 3.1,
    "longitude": 12.1,
    "videoUrl": "link you can click",
    "virtualTourUrl": "another URL you can view",
    "category": {
      "id": "c968c3c4-9c9b-4ef6-9b5c-0c41e4a2d22a",
      "name": "etestse",
      "imageUrl": "uploads/categories/c7c0b02c-0962-4065-8c3f-fcec51f05284.webp"
    },
    "address": {
      "id": "c51de8a3-e312-4acd-9996-cf1889b6ea30",
      "country": "egypt",
      "state": "thinkg",
      "city": "hurhgda",
      "area": "idk",
      "street": "123 street",
      "zipCode": "02120"
    },
    "images": [],
    "sections": [
      {
        "categoryId": "9e6dcc4b-463d-4d03-8a2e-26d7fbb1dee7",
        "categoryName": "testIcon",
        "categoryIcon": null,
        "displayOrder": 1,
        "items": [
          {
            "itemId": "2590d84b-ac93-4c95-9161-ed3612095d06",
            "name": "nameOFItemList",
            "icon": "IconName",
            "displayOrder": 1
          }
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
 date: Fri,21 Aug 2026 08:16:31 GMT 
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
  "propertyNumber": "string",
  "title": "string",
  "description": "string",
  "price": 0,
  "currency": "string",
  "propertyTypeId": 1,
  "status": 1,
  "isFeatured": true,
  "isPublished": true,
  "bedrooms": 0,
  "bathrooms": 0,
  "floors": 0,
  "garage": 0,
  "area": 0,
  "yearBuilt": 0,
  "latitude": 0,
  "longitude": 0,
  "videoUrl": "string",
  "virtualTourUrl": "string",
  "category": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "string",
    "imageUrl": "string"
  },
  "address": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "country": "string",
    "state": "string",
    "city": "string",
    "area": "string",
    "street": "string",
    "zipCode": "string"
  },
  "images": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "imageUrl": "string",
      "displayOrder": 0,
      "isCover": true
    }
  ],
  "sections": [
    {
      "categoryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "categoryName": "string",
      "categoryIcon": "string",
      "displayOrder": 0,
      "items": [
        {
          "itemId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "name": "string",
          "icon": "string",
          "displayOrder": 0
        }
      ]
    }
  ]
}
POST
/api/property-buyings
Create a new property buying


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "categoryId": "c968c3c4-9c9b-4ef6-9b5c-0c41e4a2d22a",
  "title": "new thing to buy",
  "description": "very long description descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription",
  "price": 15000,
  "currency": "EGP",
  "propertyTypeId": 2,
  "status": 1,
  "bedrooms": 2,
  "bathrooms": 1,
  "floors": 2,
  "garage": 1,
  "area": 1000,
  "yearBuilt": 2005,
  "latitude": 3.1,
  "longitude": 12.1,
  "videoUrl": "link you can click",
  "virtualTourUrl": "another URL you can view",
  "address": {
    "country": "egypt",
    "state": "thinkg",
    "city": "hurhgda",
    "area": "idk",
    "street": "123 street",
    "zipCode": "02120"
  },
  "categoryValues": [
    {
      "itemId": "2590d84b-ac93-4c95-9161-ed3612095d06"
    }
  ]
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/property-buyings' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODczMDM1MTQsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.tpr6ylsawTIA9lGdHaOFqn0SZQEtfGpuVWe2dpGaHtw' \
  -H 'Content-Type: application/json' \
  -d '{
  "categoryId": "c968c3c4-9c9b-4ef6-9b5c-0c41e4a2d22a",
  "title": "new thing to buy",
  "description": "very long description descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription",
  "price": 15000,
  "currency": "EGP",
  "propertyTypeId": 2,
  "status": 1,
  "bedrooms": 2,
  "bathrooms": 1,
  "floors": 2,
  "garage": 1,
  "area": 1000,
  "yearBuilt": 2005,
  "latitude": 3.1,
  "longitude": 12.1,
  "videoUrl": "link you can click",
  "virtualTourUrl": "another URL you can view",
  "address": {
    "country": "egypt",
    "state": "thinkg",
    "city": "hurhgda",
    "area": "idk",
    "street": "123 street",
    "zipCode": "02120"
  },
  "categoryValues": [
    {
      "itemId": "2590d84b-ac93-4c95-9161-ed3612095d06"
    }
  ]
}'
Request URL
https://rentaltech.premiumasp.net/api/property-buyings
Server response
Code	Details
200
Undocumented
Response body
Download
{
  "data": {
    "id": "2fd05b60-9a95-4be1-52ab-08deff5be49c",
    "propertyNumber": "PB-000001",
    "title": "new thing to buy",
    "description": "very long description descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription",
    "price": 15000,
    "currency": "EGP",
    "propertyTypeId": 2,
    "status": 1,
    "isFeatured": false,
    "isPublished": false,
    "bedrooms": 2,
    "bathrooms": 1,
    "floors": 2,
    "garage": 1,
    "area": 1000,
    "yearBuilt": 2005,
    "latitude": 3.1,
    "longitude": 12.1,
    "videoUrl": "link you can click",
    "virtualTourUrl": "another URL you can view",
    "category": {
      "id": "c968c3c4-9c9b-4ef6-9b5c-0c41e4a2d22a",
      "name": "etestse",
      "imageUrl": "uploads/categories/c7c0b02c-0962-4065-8c3f-fcec51f05284.webp"
    },
    "address": {
      "id": "c51de8a3-e312-4acd-9996-cf1889b6ea30",
      "country": "egypt",
      "state": "thinkg",
      "city": "hurhgda",
      "area": "idk",
      "street": "123 street",
      "zipCode": "02120"
    },
    "images": [],
    "sections": [
      {
        "categoryId": "9e6dcc4b-463d-4d03-8a2e-26d7fbb1dee7",
        "categoryName": "testIcon",
        "categoryIcon": null,
        "displayOrder": 1,
        "items": [
          {
            "itemId": "2590d84b-ac93-4c95-9161-ed3612095d06",
            "name": "nameOFItemList",
            "icon": "IconName",
            "displayOrder": 1
          }
        ]
      }
    ]
  },
  "isSuccess": true,
  "message": "Property Buying created successfully.",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Fri,21 Aug 2026 08:12:07 GMT 
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
  "title": "string",
  "description": "string",
  "price": 0,
  "currency": "string",
  "propertyTypeId": 1,
  "status": 1,
  "isFeatured": true,
  "isPublished": true,
  "bedrooms": 0,
  "bathrooms": 0,
  "floors": 0,
  "garage": 0,
  "area": 0,
  "yearBuilt": 0,
  "latitude": 0,
  "longitude": 0,
  "videoUrl": "string",
  "virtualTourUrl": "string",
  "category": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "string",
    "imageUrl": "string"
  },
  "address": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "country": "string",
    "state": "string",
    "city": "string",
    "area": "string",
    "street": "string",
    "zipCode": "string"
  },
  "images": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "imageUrl": "string",
      "displayOrder": 0,
      "isCover": true
    }
  ],
  "sections": [
    {
      "categoryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "categoryName": "string",
      "categoryIcon": "string",
      "displayOrder": 0,
      "items": [
        {
          "itemId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "name": "string",
          "icon": "string",
          "displayOrder": 0
        }
      ]
    }
  ]
}
No links

GET
/api/property-buyings
Get all property buyings (Admin)


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
sortBy
string
(query)
sortBy
ascending
boolean
(query)

false
propertyNumber
string
(query)
propertyNumber
title
string
(query)
title
city
string
(query)
city
area
string
(query)
area
status
integer($int32)
(query)

--
propertyType
integer($int32)
(query)

--
bedrooms
integer($int32)
(query)
bedrooms
bathrooms
integer($int32)
(query)
bathrooms
minPrice
number($double)
(query)
minPrice
maxPrice
number($double)
(query)
maxPrice
isFeatured
boolean
(query)

--
isPublished
boolean
(query)

--
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/property-buyings?pageNumber=1&pageSize=10&ascending=false' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODczMDM1MTQsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.tpr6ylsawTIA9lGdHaOFqn0SZQEtfGpuVWe2dpGaHtw'
Request URL
https://rentaltech.premiumasp.net/api/property-buyings?pageNumber=1&pageSize=10&ascending=false
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "items": [
      {
        "id": "2fd05b60-9a95-4be1-52ab-08deff5be49c",
        "propertyNumber": "PB-000001",
        "title": "new thing to buy",
        "price": 15000,
        "currency": "EGP",
        "propertyTypeId": 2,
        "status": 1,
        "isFeatured": false,
        "isPublished": false,
        "bedrooms": 2,
        "bathrooms": 1,
        "area": 1000,
        "coverImageUrl": null,
        "city": "hurhgda",
        "areaName": "idk",
        "category": {
          "id": "c968c3c4-9c9b-4ef6-9b5c-0c41e4a2d22a",
          "name": "etestse",
          "imageUrl": "uploads/categories/c7c0b02c-0962-4065-8c3f-fcec51f05284.webp"
        }
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
 date: Fri,21 Aug 2026 08:12:21 GMT 
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
      "title": "string",
      "price": 0,
      "currency": "string",
      "propertyTypeId": 1,
      "status": 1,
      "isFeatured": true,
      "isPublished": true,
      "bedrooms": 0,
      "bathrooms": 0,
      "area": 0,
      "coverImageUrl": "string",
      "city": "string",
      "areaName": "string",
      "category": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "string",
        "imageUrl": "string"
      }
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
/api/property-buyings/{id}
Get property buying by id (Admin)


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
2fd05b60-9a95-4be1-52ab-08deff5be49c
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/property-buyings/2fd05b60-9a95-4be1-52ab-08deff5be49c' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODczMDM1MTQsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.tpr6ylsawTIA9lGdHaOFqn0SZQEtfGpuVWe2dpGaHtw'
Request URL
https://rentaltech.premiumasp.net/api/property-buyings/2fd05b60-9a95-4be1-52ab-08deff5be49c
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "id": "2fd05b60-9a95-4be1-52ab-08deff5be49c",
    "propertyNumber": "PB-000001",
    "title": "new thing to buy",
    "description": "very long description descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription",
    "price": 15000,
    "currency": "EGP",
    "propertyTypeId": 2,
    "status": 1,
    "isFeatured": false,
    "isPublished": false,
    "bedrooms": 2,
    "bathrooms": 1,
    "floors": 2,
    "garage": 1,
    "area": 1000,
    "yearBuilt": 2005,
    "latitude": 3.1,
    "longitude": 12.1,
    "videoUrl": "link you can click",
    "virtualTourUrl": "another URL you can view",
    "category": {
      "id": "c968c3c4-9c9b-4ef6-9b5c-0c41e4a2d22a",
      "name": "etestse",
      "imageUrl": "uploads/categories/c7c0b02c-0962-4065-8c3f-fcec51f05284.webp"
    },
    "address": {
      "id": "c51de8a3-e312-4acd-9996-cf1889b6ea30",
      "country": "egypt",
      "state": "thinkg",
      "city": "hurhgda",
      "area": "idk",
      "street": "123 street",
      "zipCode": "02120"
    },
    "images": [],
    "sections": [
      {
        "categoryId": "9e6dcc4b-463d-4d03-8a2e-26d7fbb1dee7",
        "categoryName": "testIcon",
        "categoryIcon": null,
        "displayOrder": 1,
        "items": [
          {
            "itemId": "2590d84b-ac93-4c95-9161-ed3612095d06",
            "name": "nameOFItemList",
            "icon": "IconName",
            "displayOrder": 1
          }
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
 date: Fri,21 Aug 2026 08:15:10 GMT 
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
  "propertyNumber": "string",
  "title": "string",
  "description": "string",
  "price": 0,
  "currency": "string",
  "propertyTypeId": 1,
  "status": 1,
  "isFeatured": true,
  "isPublished": true,
  "bedrooms": 0,
  "bathrooms": 0,
  "floors": 0,
  "garage": 0,
  "area": 0,
  "yearBuilt": 0,
  "latitude": 0,
  "longitude": 0,
  "videoUrl": "string",
  "virtualTourUrl": "string",
  "category": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "string",
    "imageUrl": "string"
  },
  "address": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "country": "string",
    "state": "string",
    "city": "string",
    "area": "string",
    "street": "string",
    "zipCode": "string"
  },
  "images": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "imageUrl": "string",
      "displayOrder": 0,
      "isCover": true
    }
  ],
  "sections": [
    {
      "categoryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "categoryName": "string",
      "categoryIcon": "string",
      "displayOrder": 0,
      "items": [
        {
          "itemId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "name": "string",
          "icon": "string",
          "displayOrder": 0
        }
      ]
    }
  ]
}
No links

PUT
/api/property-buyings/{id}
Update property buying


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
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "categoryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "string",
  "description": "string",
  "price": 0,
  "currency": "string",
  "propertyTypeId": 1,
  "status": 1,
  "bedrooms": 0,
  "bathrooms": 0,
  "floors": 0,
  "garage": 0,
  "area": 0,
  "yearBuilt": 0,
  "latitude": 0,
  "longitude": 0,
  "videoUrl": "string",
  "virtualTourUrl": "string",
  "address": {
    "country": "string",
    "state": "string",
    "city": "string",
    "area": "string",
    "street": "string",
    "zipCode": "string"
  },
  "categoryValues": [
    {
      "itemId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/property-buyings/{id}
Delete property buying


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
/api/property-buyings/{id}/status
Change property buying status


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
  "status": 1
}
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/property-buyings/{id}/feature
Feature a property buying


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
2fd05b60-9a95-4be1-52ab-08deff5be49c
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://rentaltech.premiumasp.net/api/property-buyings/2fd05b60-9a95-4be1-52ab-08deff5be49c/feature' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODczMDM1MTQsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.tpr6ylsawTIA9lGdHaOFqn0SZQEtfGpuVWe2dpGaHtw'
Request URL
https://rentaltech.premiumasp.net/api/property-buyings/2fd05b60-9a95-4be1-52ab-08deff5be49c/feature
Server response
Code	Details
200	
Response body
Download
{
  "data": true,
  "isSuccess": true,
  "message": "Property Buying featured successfully",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Fri,21 Aug 2026 08:16:10 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/property-buyings/{id}/unfeature
Unfeature a property buying


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
/api/property-buyings/{id}/publish
Publish a property buying


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
2fd05b60-9a95-4be1-52ab-08deff5be49c
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://rentaltech.premiumasp.net/api/property-buyings/2fd05b60-9a95-4be1-52ab-08deff5be49c/publish' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImNkMDg1N2FiLWMwZWEtNGQ1OC0yMGMyLTA4ZGVmYWIyMzE0NiIsInVzZXJOYW1lIjoicG9sYXNhbXkiLCJmdWxsTmFtZSI6InBvbGEgc2FteSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3ODczMDM1MTQsImlzcyI6IlByb3BlcnR5TWFuYWdlbWVudEFQSSIsImF1ZCI6IlByb3BlcnR5TWFuYWdlbWVudENsaWVudHMifQ.tpr6ylsawTIA9lGdHaOFqn0SZQEtfGpuVWe2dpGaHtw'
Request URL
https://rentaltech.premiumasp.net/api/property-buyings/2fd05b60-9a95-4be1-52ab-08deff5be49c/publish
Server response
Code	Details
200	
Response body
Download
{
  "data": true,
  "isSuccess": true,
  "message": "Property Buying published successfully",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Fri,21 Aug 2026 08:16:16 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/property-buyings/{id}/unpublish
Unpublish a property buying


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
/api/property-buyings/{id}/images
Get property buying images


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

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "imageUrl": "string",
    "displayOrder": 0,
    "isCover": true
  }
]
No links

POST
/api/property-buyings/{id}/images
Upload property buying images


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
id
Request body

multipart/form-data
images
array
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
    "imageUrl": "string",
    "displayOrder": 0,
    "isCover": true
  }
]
No links

PUT
/api/property-buyings/{id}/images/{imageId}
Replace a property buying image


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
id
imageId *
string($uuid)
(path)
imageId
Request body

multipart/form-data
image
string($binary)
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
  "imageUrl": "string",
  "displayOrder": 0,
  "isCover": true
}
No links

DELETE
/api/property-buyings/{id}/images/{imageId}
Delete a property buying image


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
id
imageId *
string($uuid)
(path)
imageId
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/property-buyings/{id}/images/{imageId}/cover
Set a property buying image as cover


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
id
imageId *
string($uuid)
(path)
imageId
Responses
Code	Description	Links
200	
OK
