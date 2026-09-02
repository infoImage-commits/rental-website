PublicPropertyBuyings


GET
/api/public/property-buyings


Parameters
Cancel
Name	Description
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
Ascending
boolean
(query)

--
Search
string
(query)
Search
City
string
(query)
City
Area
string
(query)
Area
PropertyType
integer($int32)
(query)

--
Bedrooms
integer($int32)
(query)
Bedrooms
Bathrooms
integer($int32)
(query)
Bathrooms
MinPrice
number($double)
(query)
MinPrice
MaxPrice
number($double)
(query)
MaxPrice
IsFeatured
boolean
(query)

--
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/public/property-buyings' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsInVzZXJOYW1lIjoicG9sYSIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4NzQxMTU3OSwiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.CZ5J97SxQgW-WObQ88ZNy6A7OcvmgY_4hnx3eImi1eA'
Request URL
https://rentaltech.premiumasp.net/api/public/property-buyings
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "items": [
      {
        "id": "1f422eb5-6916-4e11-8dd7-08df0059f40d",
        "propertyNumber": "PB-000001",
        "title": "Modern Seaside Villa in North Coast",
        "price": 850000,
        "currency": "USD",
        "propertyTypeId": 2,
        "status": 1,
        "isFeatured": true,
        "isPublished": true,
        "bedrooms": 4,
        "bathrooms": 5,
        "area": 450,
        "coverImageUrl": "uploads/property-buyings/1f422eb5-6916-4e11-8dd7-08df0059f40d/b0196ddd-0be2-4fe4-8325-46eb494aaac6.webp",
        "city": "North Coast",
        "areaName": "Al Alamein",
        "category": {
          "id": "70c38123-4cd2-4724-92fb-a52228625f19",
          "name": "test",
          "imageUrl": "uploads/categories/8506f126-49f7-4a0e-b0fb-97fbc5a36e68.webp"
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
 date: Sat,22 Aug 2026 14:45:08 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/public/property-buyings/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
1f422eb5-6916-4e11-8dd7-08df0059f40d
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/public/property-buyings/1f422eb5-6916-4e11-8dd7-08df0059f40d' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsInVzZXJOYW1lIjoicG9sYSIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4NzQxMTU3OSwiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.CZ5J97SxQgW-WObQ88ZNy6A7OcvmgY_4hnx3eImi1eA'
Request URL
https://rentaltech.premiumasp.net/api/public/property-buyings/1f422eb5-6916-4e11-8dd7-08df0059f40d
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "id": "1f422eb5-6916-4e11-8dd7-08df0059f40d",
    "propertyNumber": "PB-000001",
    "title": "Modern Seaside Villa in North Coast",
    "description": "Experience luxury living in this beautifully designed modern villa with unobstructed sea views. Features a private infinity pool, spacious outdoor entertaining area, and state-of-the-art smart home technology.",
    "price": 850000,
    "currency": "USD",
    "propertyTypeId": 2,
    "status": 1,
    "isFeatured": true,
    "isPublished": true,
    "bedrooms": 4,
    "bathrooms": 5,
    "floors": 2,
    "garage": 2,
    "area": 450,
    "yearBuilt": 2024,
    "latitude": 30.8206,
    "longitude": 28.9541,
    "videoUrl": "",
    "virtualTourUrl": "",
    "category": {
      "id": "70c38123-4cd2-4724-92fb-a52228625f19",
      "name": "test",
      "imageUrl": "uploads/categories/8506f126-49f7-4a0e-b0fb-97fbc5a36e68.webp"
    },
    "address": {
      "id": "2ed8b19a-411f-4d64-8803-0fecc60af495",
      "country": "Egypt",
      "state": "Alexandria",
      "city": "North Coast",
      "area": "Al Alamein",
      "street": "Coastal Road",
      "zipCode": "51718"
    },
    "images": [
      {
        "id": "4b8dbbe0-349a-4a86-93a0-ccd370e7e944",
        "imageUrl": "uploads/property-buyings/1f422eb5-6916-4e11-8dd7-08df0059f40d/b0196ddd-0be2-4fe4-8325-46eb494aaac6.webp",
        "displayOrder": 1,
        "isCover": true
      },
      {
        "id": "b43b2ff8-7d03-4190-a38f-a09310669ba6",
        "imageUrl": "uploads/property-buyings/1f422eb5-6916-4e11-8dd7-08df0059f40d/f42d4cff-7498-4d59-9787-f64ae32638bc.webp",
        "displayOrder": 2,
        "isCover": false
      },
      {
        "id": "44ce1f75-6e16-47c9-9e0c-24fcb4440f3b",
        "imageUrl": "uploads/property-buyings/1f422eb5-6916-4e11-8dd7-08df0059f40d/31623ce8-c59d-4499-9cdb-0c6d3482035e.webp",
        "displayOrder": 3,
        "isCover": false
      }
    ],
    "sections": []
  },
  "isSuccess": true,
  "message": null,
  "errors": [],
  "type": 200
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,22 Aug 2026 14:45:16 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 

 the problem with the we got a unauth due to the endpoits we were using are only for the admin user so you should be createa a plan to use those epoindts to show the right data for it could you do that ?