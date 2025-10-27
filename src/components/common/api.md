# Update Profile Intake API

## Endpoint
POST /api/customers/update_profile_intake

text

## Base URL
process.env.NEXT_PUBLIC_API_URL
text

## Description
Updates customer profile information including personal details, birth information, and location data.

## Request

### Headers
Content-Type: application/json

text

### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `customerId` | string | Yes | Unique identifier for the customer |
| `firstName` | string | Yes | Customer's first name |
| `lastName` | string | Yes | Customer's last name |
| `email` | string | Yes | Customer's email address |
| `gender` | string | Yes | Customer's gender (e.g., "Male", "Female", "Other") |
| `dateOfBirth` | string (ISO 8601) | Yes | Customer's date and time of birth in format: `YYYY-MM-DDTHH:mm` |
| `timeOfBirth` | string (ISO 8601) | Yes | Customer's time of birth in format: `YYYY-MM-DDTHH:mm` |
| `placeOfBirth` | string | Yes | Customer's place of birth (full address) |
| `latitude` | number | Yes | Latitude coordinate of birth place |
| `longitude` | number | Yes | Longitude coordinate of birth place |
| `maritalStatus` | string | No | Customer's marital status (optional) |
| `description` | string | No | Additional description or notes (optional) |
| `topic_of_concern` | string | No | Specific topics or concerns (optional) |

### Example Request Body

{
"customerId": "68dfa28e0b244b61b3035509",
"firstName": "Anuragji",
"lastName": "rathore",
"email": "anuragrathore2121@gmail.com",
"gender": "Male",
"dateOfBirth": "2025-09-11T16:50",
"timeOfBirth": "2025-09-11T16:50",
"placeOfBirth": "2H9W+WMV, طريق الاداره،, العلمين، Marsa Matrouh Governorate 5006322, Egypt",
"latitude": 31.0198642,
"longitude": 28.5966873,
"maritalStatus": "",
"description": "",
"topic_of_concern": ""
}

text

### cURL Example

curl -X POST http://localhost:3003/api/customers/update_profile_intake
-H "Content-Type: application/json"
-d '{
"customerId": "68dfa28e0b244b61b3035509",
"firstName": "Anuragji",
"lastName": "rathore",
"email": "anuragrathore2121@gmail.com",
"gender": "Male",
"dateOfBirth": "2025-09-11T16:50",
"timeOfBirth": "2025-09-11T16:50",
"placeOfBirth": "2H9W+WMV, طريق الاداره،, العلمين، Marsa Matrouh Governorate 5006322, Egypt",
"latitude": 31.0198642,
"longitude": 28.5966873,
"maritalStatus": "",
"description": "",
"topic_of_concern": ""
}'

text

## Response

### Success Response (200 OK)

{
"success": true,
"message": "Profile updated successfully",
"data": {
"customerId": "68dfa28e0b244b61b3035509",
"firstName": "Anuragji",
"lastName": "rathore",
"email": "anuragrathore2121@gmail.com"
}
}

text

### Error Responses

#### 400 Bad Request
{
"success": false,
"error": "Invalid request data",
"message": "Missing required field: customerId"
}

text

#### 404 Not Found
{
"success": false,
"error": "Customer not found",
"message": "No customer exists with the provided ID"
}

text

#### 500 Internal Server Error
{
"success": false,
"error": "Internal server error",
"message": "An error occurred while updating the profile"
}

text

## Notes

- Date and time fields should be in ISO 8601 format (`YYYY-MM-DDTHH:mm`)
- Latitude and longitude should be valid decimal coordinates
- Empty strings are accepted for optional fields (`maritalStatus`, `description`, `topic_of_concern`)
- The `placeOfBirth` field supports international characters (UTF-8 encoded)
- Coordinates should match the `placeOfBirth` location for accurate astrological calculations

## Validation Rules

- `email`: Must be a valid email format
- `latitude`: Must be between -90 and 90
- `longitude`: Must be between -180 and 180
- `customerId`: Must be a valid MongoDB ObjectId or UUID format
- `gender`: Recommended values: "Male", "Female", "Other"

## Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Profile updated successfully |
| 400 | Bad request - Invalid or missing data |
| 401 | Unauthorized - Invalid authentication |
| 404 | Customer not found |
| 500 | Internal server error |