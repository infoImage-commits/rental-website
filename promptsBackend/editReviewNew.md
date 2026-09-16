GET
/api/reviews/property/{propertyId}/average-rating


Parameters
Cancel
Name	Description
propertyId *
string($uuid)
(path)
7b769750-a629-4b87-8a5c-cd2366a414bf
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/reviews/property/7b769750-a629-4b87-8a5c-cd2366a414bf/average-rating' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjkzNjE0MjY2LTFlN2QtNGRjZi1hMzBkLTA4ZGVmZGQ1ODQ5NCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6IjkzNjE0MjY2LTFlN2QtNGRjZi1hMzBkLTA4ZGVmZGQ1ODQ5NCIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg5NDgxNTUyLCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.E_l30HFoyIudVUkww8y5msOHUJu4AvWTKfJ5d_69Yq4'
Request URL
https://rentaltech.premiumasp.net/api/reviews/property/7b769750-a629-4b87-8a5c-cd2366a414bf/average-rating
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "propertyId": "7b769750-a629-4b87-8a5c-cd2366a414bf",
    "averageRating": 0,
    "totalReviews": 0
  },
  "isSuccess": true,
  "message": null,
  "errors": [],
  "type": 200
}