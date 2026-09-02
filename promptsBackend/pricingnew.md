here we well have the new endpoints for the pricing we should change both the ui for the prcing and make sure we no long use the old pricing nepdpoints here are the endpoints and how to sue them

POST
/api/properties/{propertyId}/daily-prices/bulk
Bulk configure property daily prices for 1, 2, or 3 months or a custom date range


Parameters
Cancel
Reset
Name	Description
propertyId *
string($uuid)
(path)
b12462d5-ea59-42c6-9bec-7d698d54d273
Request body

application/json
{
  "startDate": "2026-09-02",
  "durationInMonths": 2,
  "endDate": null,
  "price": 200
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/properties/b12462d5-ea59-42c6-9bec-7d698d54d273/daily-prices/bulk' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsInVzZXJOYW1lIjoicG9sYSIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4ODM2NjQ0OSwiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.wuAc3CL0Tdufj5hrmOxbpMd6cX_4EnvMBrWXPxillCY' \
  -H 'Content-Type: application/json' \
  -d '{
  "startDate": "2026-09-02",
  "durationInMonths": 2,
  "endDate": null,
  "price": 200
}'
Request URL
https://rentaltech.premiumasp.net/api/properties/b12462d5-ea59-42c6-9bec-7d698d54d273/daily-prices/bulk
Server response
Code	Details
200	
Response body
Download
{
  "data": true,
  "isSuccess": true,
  "message": "Bulk daily prices configured successfully for 61 days.",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,02 Sep 2026 15:27:41 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK
first of all when we want to set the prices we have two optoins either to put the start date and the months in and it will put all of the prices for the next months as the amount we choose the next optoin we will put the durationInMonths as null and put both of the start and end data and it will work 

GET
/api/properties/{propertyId}/daily-prices
Get property daily prices with optional date range filter


Parameters
Cancel
Name	Description
propertyId *
string($uuid)
(path)
b12462d5-ea59-42c6-9bec-7d698d54d273
startDate
string($date)
(query)
2026-09-02
endDate
string($date)
(query)
2026-09-05
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/properties/b12462d5-ea59-42c6-9bec-7d698d54d273/daily-prices?startDate=2026-09-02&endDate=2026-09-05' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsInVzZXJOYW1lIjoicG9sYSIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4ODM2NjQ0OSwiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.wuAc3CL0Tdufj5hrmOxbpMd6cX_4EnvMBrWXPxillCY'
Request URL
https://rentaltech.premiumasp.net/api/properties/b12462d5-ea59-42c6-9bec-7d698d54d273/daily-prices?startDate=2026-09-02&endDate=2026-09-05
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "propertyId": "b12462d5-ea59-42c6-9bec-7d698d54d273",
    "prices": [
      {
        "date": "2026-09-02",
        "price": 200
      },
      {
        "date": "2026-09-03",
        "price": 200
      },
      {
        "date": "2026-09-04",
        "price": 200
      },
      {
        "date": "2026-09-05",
        "price": 200
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
 date: Wed,02 Sep 2026 15:29:38 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
 next is the endpoint where we could put the unit id and both of the start and enddate and it will show the pirces for this prioed okay ?
 POST
/api/properties/{propertyId}/daily-prices/check
Check property pricing availability and total price for booking dates before creating a booking


Parameters
Cancel
Reset
Name	Description
propertyId *
string($uuid)
(path)
b12462d5-ea59-42c6-9bec-7d698d54d273
Request body

application/json
{
  "checkIn": "2026-09-02",
  "checkOut": "2026-09-04"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/properties/b12462d5-ea59-42c6-9bec-7d698d54d273/daily-prices/check' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsInVzZXJOYW1lIjoicG9sYSIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4ODM2NjQ0OSwiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.wuAc3CL0Tdufj5hrmOxbpMd6cX_4EnvMBrWXPxillCY' \
  -H 'Content-Type: application/json' \
  -d '{
  "checkIn": "2026-09-02",
  "checkOut": "2026-09-04"
}'
Request URL
https://rentaltech.premiumasp.net/api/properties/b12462d5-ea59-42c6-9bec-7d698d54d273/daily-prices/check
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "isPriceAvailable": true,
    "totalPrice": 400,
    "dailyPrices": [
      {
        "date": "2026-09-02",
        "price": 200
      },
      {
        "date": "2026-09-03",
        "price": 200
      }
    ],
    "missingDates": []
  },
  "isSuccess": true,
  "message": null,
  "errors": [],
  "type": 200
}
next we have this endpoint to view the totoal price so the client could view it but this is only to view the price this does not view if the proptoies is free or not we have another enpoindpoint for it 
GET
/api/properties/{propertyId}/availability
Returns a booking availability calendar for a property over the specified date range.
this is must be checked before boooking okay so that we make sure everyting is clean 
and the last endpoitn we have 
DELETE
/api/properties/{propertyId}/daily-prices/{date}
Delete daily price for one specific calendar date


Parameters
Cancel
Name	Description
propertyId *
string($uuid)
(path)
b12462d5-ea59-42c6-9bec-7d698d54d273
date *
string($date)
(path)
2026-09-02
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://rentaltech.premiumasp.net/api/properties/b12462d5-ea59-42c6-9bec-7d698d54d273/daily-prices/2026-09-02' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsInVzZXJJZCI6ImVkODNjNzJhLTI1ZTctNGYyOC03NmIyLTA4ZGYwMDMyODYyOSIsInVzZXJOYW1lIjoicG9sYSIsImZ1bGxOYW1lIjoicG9sYSBwb2xhIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsImV4cCI6MTc4ODM2NjQ0OSwiaXNzIjoiUHJvcGVydHlNYW5hZ2VtZW50QVBJIiwiYXVkIjoiUHJvcGVydHlNYW5hZ2VtZW50Q2xpZW50cyJ9.wuAc3CL0Tdufj5hrmOxbpMd6cX_4EnvMBrWXPxillCY'
Request URL
https://rentaltech.premiumasp.net/api/properties/b12462d5-ea59-42c6-9bec-7d698d54d273/daily-prices/2026-09-02
Server response
Code	Details
200	
Response body
Download
{
  "data": true,
  "isSuccess": true,
  "message": "Daily price deleted successfully",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,02 Sep 2026 15:35:38 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK
this is for deleting a date from the admin page so that it's not availbe to rent in it okay ?
now create a plan so that we could make it easy for the admin to add pricing and also make sure that for the client he can view the price and also make sure that day is free to book 
now create a plan for that and also remove the old endpoints for pricing you could tell me what you gonna reomve so that i can tell you if we delet them or not and also for the admin pages make sure the ui is freinldy to both add prices for some priocod of time and to delete some of the date okay ? create a plan for that 