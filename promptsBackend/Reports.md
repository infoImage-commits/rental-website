we should create a plan so that we could show the report tab for the admin in this tab the admin could choose the type of the report and then enter the date as in the endpoitsn what it needs and after that he click download and then we will start downloading the stuff he wants please create a full plan so that we implment those endpoints and also make sure it works right and make the UI for it the same as the rest of the pages could you create a plan for it ?
Reports
Controller for accommodation reports (Arrival, Departure, In-House)



GET
/api/reports/arrival/excel
Get Arrival Report in Excel format Returns bookings where check-in date matches the specified date


Parameters
Cancel
Name	Description
date
string($date)
(query)
The check-in date to filter by

2026-08-01
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/reports/arrival/excel?date=2026-08-01' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjkzNjE0MjY2LTFlN2QtNGRjZi1hMzBkLTA4ZGVmZGQ1ODQ5NCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6IjkzNjE0MjY2LTFlN2QtNGRjZi1hMzBkLTA4ZGVmZGQ1ODQ5NCIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg4ODU1NzYyLCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.G6HtchI_JjopiEBDfHsD4SL8A6jIdF_yAwCAn5GgqfU'
Request URL
https://rentaltech.premiumasp.net/api/reports/arrival/excel?date=2026-08-01
Server response
Code	Details
200	
Response body
Download file
Response headers
 content-disposition: attachment; filename=ArrivalReport_2026-08-01.xlsx; filename*=UTF-8''ArrivalReport_2026-08-01.xlsx 
 content-length: 6847 
 content-type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet 
 date: Tue,08 Sep 2026 07:23:13 GMT 
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
"string"
No links

GET
/api/reports/arrival/pdf
Get Arrival Report in PDF format Returns bookings where check-in date matches the specified date


Parameters
Cancel
Name	Description
date
string($date)
(query)
The check-in date to filter by

2026-08-01
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/reports/arrival/pdf?date=2026-08-01' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjkzNjE0MjY2LTFlN2QtNGRjZi1hMzBkLTA4ZGVmZGQ1ODQ5NCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6IjkzNjE0MjY2LTFlN2QtNGRjZi1hMzBkLTA4ZGVmZGQ1ODQ5NCIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg4ODU1NzYyLCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.G6HtchI_JjopiEBDfHsD4SL8A6jIdF_yAwCAn5GgqfU'
Request URL
https://rentaltech.premiumasp.net/api/reports/arrival/pdf?date=2026-08-01
Server response
Code	Details
200	
Response body
Download file
Response headers
 content-disposition: attachment; filename=ArrivalReport_2026-08-01.pdf; filename*=UTF-8''ArrivalReport_2026-08-01.pdf 
 content-length: 36420 
 content-type: application/pdf 
 date: Tue,08 Sep 2026 07:23:38 GMT 
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
"string"
No links

GET
/api/reports/departure/excel
Get Departure Report in Excel format Returns bookings where check-out date matches the specified date


Parameters
Cancel
Name	Description
date
string($date)
(query)
The check-out date to filter by

2026-08-01
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/reports/departure/excel?date=2026-08-01' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjkzNjE0MjY2LTFlN2QtNGRjZi1hMzBkLTA4ZGVmZGQ1ODQ5NCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6IjkzNjE0MjY2LTFlN2QtNGRjZi1hMzBkLTA4ZGVmZGQ1ODQ5NCIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg4ODU1NzYyLCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.G6HtchI_JjopiEBDfHsD4SL8A6jIdF_yAwCAn5GgqfU'
Request URL
https://rentaltech.premiumasp.net/api/reports/departure/excel?date=2026-08-01
Server response
Code	Details
200	
Response body
Download file
Response headers
 content-disposition: attachment; filename=DepartureReport_2026-08-01.xlsx; filename*=UTF-8''DepartureReport_2026-08-01.xlsx 
 content-length: 6847 
 content-type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet 
 date: Tue,08 Sep 2026 07:23:43 GMT 
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
"string"
No links

GET
/api/reports/departure/pdf
Get Departure Report in PDF format Returns bookings where check-out date matches the specified date


Parameters
Cancel
Name	Description
date
string($date)
(query)
The check-out date to filter by

2026-08-01
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/reports/departure/pdf?date=2026-08-01' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjkzNjE0MjY2LTFlN2QtNGRjZi1hMzBkLTA4ZGVmZGQ1ODQ5NCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6IjkzNjE0MjY2LTFlN2QtNGRjZi1hMzBkLTA4ZGVmZGQ1ODQ5NCIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg4ODU1NzYyLCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.G6HtchI_JjopiEBDfHsD4SL8A6jIdF_yAwCAn5GgqfU'
Request URL
https://rentaltech.premiumasp.net/api/reports/departure/pdf?date=2026-08-01
Server response
Code	Details
200	
Response body
Download file
Response headers
 content-disposition: attachment; filename=DepartureReport_2026-08-01.pdf; filename*=UTF-8''DepartureReport_2026-08-01.pdf 
 content-length: 36464 
 content-type: application/pdf 
 date: Tue,08 Sep 2026 07:23:47 GMT 
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
"string"
No links

GET
/api/reports/in-house/excel
Get In-House Report in Excel format Returns bookings where guests have ACTUALLY checked in and NOT checked out


IN-HOUSE DEFINITION: A booking appears in this report when ALL of the following are true:

Booking Status = Confirmed (guest has checked in)
ConfirmedAt timestamp is set (proof of actual check-in)
CompletedAt timestamp is null (guest has not checked out)
Booking period overlaps with the specified date range
IMPORTANT:

A confirmed booking where the guest hasn't arrived yet (CheckIn > CurrentDate) will NOT appear
A completed booking (guest has checked out) will NOT appear
This report shows ACTUAL occupancy, not just reservations
Parameters
Cancel
Name	Description
from
string($date)
(query)
Start date of the range (inclusive)

2026-08-01
to
string($date)
(query)
End date of the range (exclusive boundary)

2026-08-30
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/reports/in-house/excel?from=2026-08-01&to=2026-08-30' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjkzNjE0MjY2LTFlN2QtNGRjZi1hMzBkLTA4ZGVmZGQ1ODQ5NCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6IjkzNjE0MjY2LTFlN2QtNGRjZi1hMzBkLTA4ZGVmZGQ1ODQ5NCIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg4ODU1NzYyLCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.G6HtchI_JjopiEBDfHsD4SL8A6jIdF_yAwCAn5GgqfU'
Request URL
https://rentaltech.premiumasp.net/api/reports/in-house/excel?from=2026-08-01&to=2026-08-30
Server response
Code	Details
200	
Response body
Download file
Response headers
 content-disposition: attachment; filename=InHouseReport_2026-08-01_2026-08-30.xlsx; filename*=UTF-8''InHouseReport_2026-08-01_2026-08-30.xlsx 
 content-length: 6946 
 content-type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet 
 date: Tue,08 Sep 2026 07:24:01 GMT 
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
"string"
No links

GET
/api/reports/in-house/pdf
Get In-House Report in PDF format Returns bookings where guests have ACTUALLY checked in and NOT checked out


IN-HOUSE DEFINITION: A booking appears in this report when ALL of the following are true:

Booking Status = Confirmed (guest has checked in)
ConfirmedAt timestamp is set (proof of actual check-in)
CompletedAt timestamp is null (guest has not checked out)
Booking period overlaps with the specified date range
IMPORTANT:

A confirmed booking where the guest hasn't arrived yet (CheckIn > CurrentDate) will NOT appear
A completed booking (guest has checked out) will NOT appear
This report shows ACTUAL occupancy, not just reservations
Parameters
Cancel
Name	Description
from
string($date)
(query)
Start date of the range (inclusive)

2026-08-01
to
string($date)
(query)
End date of the range (exclusive boundary)

2026-08-30
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://rentaltech.premiumasp.net/api/reports/in-house/pdf?from=2026-08-01&to=2026-08-30' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjkzNjE0MjY2LTFlN2QtNGRjZi1hMzBkLTA4ZGVmZGQ1ODQ5NCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InN1cGVyYWRtaW5AcHJvcGVydHltYW5hZ2VtZW50LmNvbSIsInVzZXJJZCI6IjkzNjE0MjY2LTFlN2QtNGRjZi1hMzBkLTA4ZGVmZGQ1ODQ5NCIsInVzZXJOYW1lIjoic3VwZXJhZG1pbiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzg4ODU1NzYyLCJpc3MiOiJQcm9wZXJ0eU1hbmFnZW1lbnRBUEkiLCJhdWQiOiJQcm9wZXJ0eU1hbmFnZW1lbnRDbGllbnRzIn0.G6HtchI_JjopiEBDfHsD4SL8A6jIdF_yAwCAn5GgqfU'
Request URL
https://rentaltech.premiumasp.net/api/reports/in-house/pdf?from=2026-08-01&to=2026-08-30
Server response
Code	Details
200	
Response body
Download file
Response headers
 content-disposition: attachment; filename=InHouseReport_2026-08-01_2026-08-30.pdf; filename*=UTF-8''InHouseReport_2026-08-01_2026-08-30.pdf 
 content-length: 38841 
 content-type: application/pdf 
 date: Tue,08 Sep 2026 07:24:15 GMT 
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
"string"