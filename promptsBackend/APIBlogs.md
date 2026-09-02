those are the endpoitns for hte blogs we need to create a plan to implment them in the app in the admin page please create a plan for it so that it works right and it should follow the same arch as the same admin pages 
Blogs
Blogs Controller - Manages blog posts and articles



POST
/api/blogs
Create a new blog post


Parameters
Cancel
Reset
No parameters

Request body

multipart/form-data
Title *
string
test blog
Summary
string
descripotin of the blog
Send empty value
Content
string
the main content of the first section 
Send empty value
FeaturedImage
string($binary)
67592056.jpg
Send empty value
IsPublished
boolean

true
Send empty value
DisplayOrder
integer($int32)
1
Send empty value
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/blogs' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer [REDACTED]' \
  -H 'Content-Type: multipart/form-data' \
  -F 'Title=test blog' \
  -F 'Summary=descripotin of the blog' \
  -F 'Content=the main content of the first section ' \
  -F 'FeaturedImage=@67592056.jpg;type=image/jpeg' \
  -F 'IsPublished=true' \
  -F 'DisplayOrder=1'
Request URL
https://rentaltech.premiumasp.net/api/blogs
Server response
Code	Details
401
Undocumented
Error: response status is 401

Response headers
 access-control-allow-origin: * 
 date: Fri,21 Aug 2026 12:44:34 GMT 
 server: Microsoft-IIS/10.0 
 www-authenticate: Bearer error="invalid_token",error_description="The token expired at '08/21/2026 09:11:54'" 
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
  "title": "string",
  "summary": "string",
  "content": "string",
  "featuredImageUrl": "string",
  "isPublished": true,
  "viewCount": 0,
  "displayOrder": 0,
  "createdAtUtc": "2026-08-21T12:46:17.218Z",
  "updatedAtUtc": "2026-08-21T12:46:17.218Z",
  "blogSections": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "blogId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "title": "string",
      "content": "string",
      "imageUrl": "string",
      "displayOrder": 0,
      "sectionType": "string"
    }
  ]
}
No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links

GET
/api/blogs
Get paginated list of blogs with filtering and search


Parameters
Cancel
Name	Description
IsPublished
boolean
(query)

true
SearchTerm
string
(query)
SearchTerm
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
  'https://rentaltech.premiumasp.net/api/blogs?IsPublished=true' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer [REDACTED]'
Request URL
https://rentaltech.premiumasp.net/api/blogs?IsPublished=true
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "items": [
      {
        "id": "698f89b2-619b-4ba9-824e-08defab63f24",
        "title": "string",
        "summary": "string",
        "content": "string",
        "featuredImageUrl": null,
        "isPublished": true,
        "viewCount": 0,
        "displayOrder": 2147483647,
        "createdAtUtc": "2026-08-15T10:16:18.4221817",
        "updatedAtUtc": null,
        "blogSections": []
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
 date: Fri,21 Aug 2026 12:44:43 GMT 
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
      "title": "string",
      "summary": "string",
      "content": "string",
      "featuredImageUrl": "string",
      "isPublished": true,
      "viewCount": 0,
      "displayOrder": 0,
      "createdAtUtc": "2026-08-21T12:46:17.232Z",
      "updatedAtUtc": "2026-08-21T12:46:17.232Z",
      "blogSections": [
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "blogId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "title": "string",
          "content": "string",
          "imageUrl": "string",
          "displayOrder": 0,
          "sectionType": "string"
        }
      ]
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
/api/blogs/{id}
Get blog by ID


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
Blog ID

698f89b2-619b-4ba9-824e-08defab63f24
incrementViewCount
boolean
(query)
Whether to increment view count


false
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/blogs/698f89b2-619b-4ba9-824e-08defab63f24?incrementViewCount=false' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer [REDACTED]'
Request URL
https://rentaltech.premiumasp.net/api/blogs/698f89b2-619b-4ba9-824e-08defab63f24?incrementViewCount=false
Server response
Code	Details
200	
Response body
Download
{
  "data": {
    "id": "698f89b2-619b-4ba9-824e-08defab63f24",
    "title": "string",
    "summary": "string",
    "content": "string",
    "featuredImageUrl": null,
    "isPublished": true,
    "viewCount": 0,
    "displayOrder": 2147483647,
    "createdAtUtc": "2026-08-15T10:16:18.4221817",
    "updatedAtUtc": null,
    "blogSections": []
  },
  "isSuccess": true,
  "message": null,
  "errors": [],
  "type": 200
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,21 Aug 2026 12:45:10 GMT 
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
  "title": "string",
  "summary": "string",
  "content": "string",
  "featuredImageUrl": "string",
  "isPublished": true,
  "viewCount": 0,
  "displayOrder": 0,
  "createdAtUtc": "2026-08-21T12:46:17.240Z",
  "updatedAtUtc": "2026-08-21T12:46:17.240Z",
  "blogSections": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "blogId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "title": "string",
      "content": "string",
      "imageUrl": "string",
      "displayOrder": 0,
      "sectionType": "string"
    }
  ]
}
No links
404	
Not Found

Media type

application/json
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links

PUT
/api/blogs/{id}
Update an existing blog post


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
Blog ID

id
Request body

multipart/form-data
Title *
string
Summary
string
Content
string
FeaturedImage
string($binary)
RemoveFeaturedImage
boolean
IsPublished
boolean
DisplayOrder
integer($int32)
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
  "title": "string",
  "summary": "string",
  "content": "string",
  "featuredImageUrl": "string",
  "isPublished": true,
  "viewCount": 0,
  "displayOrder": 0,
  "createdAtUtc": "2026-08-21T12:46:17.252Z",
  "updatedAtUtc": "2026-08-21T12:46:17.252Z",
  "blogSections": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "blogId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "title": "string",
      "content": "string",
      "imageUrl": "string",
      "displayOrder": 0,
      "sectionType": "string"
    }
  ]
}
No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links
404	
Not Found

Media type

application/json
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links

DELETE
/api/blogs/{id}
Delete a blog post


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
Blog ID

id
Responses
Code	Description	Links
200	
OK

No links
404	
Not Found

Media type

application/json
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links

POST
/api/blogs/{blogId}/sections
Create a new blog section for a blog post


Parameters
Cancel
Reset
Name	Description
blogId *
string($uuid)
(path)
Blog ID

698f89b2-619b-4ba9-824e-08defab63f24
Request body

multipart/form-data
Title *
string
first section of the blog
Content *
string
the conent of it 
Image
string($binary)
aerial_resort.png
Send empty value
DisplayOrder
integer($int32)
1
Send empty value
SectionType
string
type
Send empty value
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://rentaltech.premiumasp.net/api/blogs/698f89b2-619b-4ba9-824e-08defab63f24/sections' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer [REDACTED]' \
  -H 'Content-Type: multipart/form-data' \
  -F 'Title=first section of the blog' \
  -F 'Content=the conent of it ' \
  -F 'Image=@aerial_resort.png;type=image/png' \
  -F 'DisplayOrder=1' \
  -F 'SectionType=type'
Request URL
https://rentaltech.premiumasp.net/api/blogs/698f89b2-619b-4ba9-824e-08defab63f24/sections
Server response
Code	Details
201	
Response body
Download
{
  "data": {
    "id": "f1c826af-a3ac-45c3-2d0c-08deff82310e",
    "blogId": "698f89b2-619b-4ba9-824e-08defab63f24",
    "title": "first section of the blog",
    "content": "the conent of it ",
    "imageUrl": "uploads/blogs/698f89b2-619b-4ba9-824e-08defab63f24/sections/a2fa8162-1900-4f87-92e2-ec2d08f02612.webp",
    "displayOrder": 1,
    "sectionType": "type"
  },
  "isSuccess": true,
  "message": "Blog section created successfully.",
  "errors": [],
  "type": 200
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Fri,21 Aug 2026 12:46:16 GMT 
 location: https://rentaltech.premiumasp.net/api/blogs/698f89b2-619b-4ba9-824e-08defab63f24 
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
  "blogId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "string",
  "content": "string",
  "imageUrl": "string",
  "displayOrder": 0,
  "sectionType": "string"
}
No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links
404	
Not Found

Media type

application/json
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links

PUT
/api/blogs/{blogId}/sections/{sectionId}
Update an existing blog section


Parameters
Try it out
Name	Description
blogId *
string($uuid)
(path)
Blog ID

blogId
sectionId *
string($uuid)
(path)
Section ID

sectionId
Request body

multipart/form-data
Title *
string
Content *
string
Image
string($binary)
RemoveImage
boolean
DisplayOrder
integer($int32)
SectionType
string
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
  "blogId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "string",
  "content": "string",
  "imageUrl": "string",
  "displayOrder": 0,
  "sectionType": "string"
}
No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links
404	
Not Found

Media type

application/json
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links

DELETE
/api/blogs/{blogId}/sections/{sectionId}
Delete a blog section


Parameters
Try it out
Name	Description
blogId *
string($uuid)
(path)
Blog ID

blogId
sectionId *
string($uuid)
(path)
Section ID

sectionId
Responses
Code	Description	Links
200	
OK

No links
404	
Not Found

Media type

application/json
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
