now for the next section we need to create a plan for it use the same naming conventions we used before and also use the same request and response format use the same pleaes create a plan
POST
/api/property-buying/category-items
Create a new property buying category item


Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "propertyBuyingCategoryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "string",
  "icon": "string",
  "displayOrder": 0
}
Responses
Code	Description	Links
200	
OK

No links

GET
/api/property-buying/category-items
Get all property buying category items


Parameters
Try it out
Name	Description
onlyActive
boolean
(query)
Default value : true


true
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/property-buying/category-items/{id}
Update an existing property buying category item


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
  "name": "string",
  "icon": "string"
}
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/property-buying/category-items/{id}
Delete a property buying category item


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
/api/property-buying/category-items/{id}
Get property buying category item by ID


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
PUT
/api/property-buying/category-items/{id}/display-order
Update property buying category item display order


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
  "displayOrder": 0
}
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/property-buying/category-items/{id}/status
Update property buying category item status


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
  "isActive": true
}
Responses
Code	Description	Links
200	
OK