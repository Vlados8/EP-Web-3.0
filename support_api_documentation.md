# Support API Documentation

This document describes how to interact with the Support API (`/api/v1/support`) for creating and managing tickets.

## Authentication

The API supports two authentication methods via the `flexibleAuth` middleware:

1.  **JWT (Admin Panel)**:
    - **Header**: `Authorization: Bearer <your_jwt_token>`
    - Use this for requests from the internal Admin Panel.
2.  **API Key (External Websites)**:
    - **Header**: `x-api-key: <your_api_key>`
    - **Alternate Header**: `Authorization: Bearer <your_api_key>`
    - Use this for requests from external landing pages or customer sites.
    - The `source_website` will be automatically identified based on the domain registered with the API Key.

## Endpoints

### 1. Create a Support Ticket
`POST /api/v1/support`

Creates a new support ticket. Can be called with either a JWT or an API Key.

**Headers:**
- `Content-Type: application/json`
- `x-api-key: your-api-key-here` (or JWT)

**Payload (JSON):**
```json
{
  "subject": "Issue with solar panel layout",
  "description": "The current layout does not accurately reflect the roof dimensions.",
  "priority": "normal",
  "client_name": "John Doe",
  "client_email": "john.doe@example.com",
  "client_phone": "+49 123 456789",
  "project_id": "optional-uuid-of-project",
  "source_website": "optional-override-domain.com"
}
```
*Note: `company_id` is automatically handled by the system based on the authenticated user or API Key.*

### 2. List Support Tickets
`GET /api/v1/support`

Returns a list of tickets for the authenticated company.

**Headers:**
- `Authorization: Bearer <token>` or `x-api-key: <key>`

### 3. Add a Response to a Ticket
`POST /api/v1/support/:id/responses`

Adds a message/note to an existing ticket. This action is restricted to **Admin** or **Büro** roles.

**Payload (JSON):**
```json
{
  "message": "We are looking into this issue and will get back to you shortly.",
  "response_type": "note"
}
```

### 4. Update Ticket Status
`PATCH /api/v1/support/:id/status`

Updates the status or assignee of a ticket. Restricted to **Admin** or **Büro** roles.

**Payload (JSON):**
```json
{
  "status": "in_progress",
  "assigned_to_id": "uuid-of-staff-member"
}
```

## Ticket Sources
The system tracks the origin of each ticket via the `source_website` field. 
- If created via an **API Key**, the domain associated with the key is automatically saved as the source.
- You can manually override this by providing a `source_website` string in the creation payload.
