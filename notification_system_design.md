# Stage 1

## Notification System REST API Design

The notification system is used to send placement, event and result updates to students.

# Base URL: ```http:/api/v1 ```

# Headers:```http Content-Type: application/json Authorization: Bearer <token> ```

---

### Main Features

    - Send notification
    - Get notifications
    - Get unread notifications
    - Mark notification as read
    - Delete notification
    - Real-time notification support

---

### 1. Send Notification

## Endpoint : POST /api/v1/notifications

## Request
{
  "studentId": 1042,
  "type": "Placement",
  "message": "TCS hiring drive starts tomorrow"
}

## Response
{
  "success": true,
  "message": "Notification sent successfully"
}


---

### 2. Get Student Notifications

## Endpoint : GET /api/v1/students/1042/notifications

## Response
{
  "success": true,
  "data": [
    {
      "id": "n101",
      "type": "Placement",
      "message": "Infosys hiring drive",
      "isRead": false,
      "createdAt": "2026-04-22T10:30:00Z"
    }
  ]
}

---

### 3. Get Unread Notifications

## Endpoint : GET /api/v1/students/1042/notifications/unread

## Response

{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": "n101",
      "type": "Placement",
      "message": "Infosys hiring drive"
    }
  ]
}

---

### 4. Mark Notification as Read

## Endpoint: PATCH /api/v1/notifications/n101/read

## Request

{
  "isRead": true
}

## Response
{
  "success": true,
  "message": "Notification marked as read"
}


---

### 5. Delete Notification

## Endpoint: DELETE /api/v1/notifications/n101

## Response
{
  "success": true,
  "message": "Notification deleted successfully"
}


## Notification Schema
{
  "id": "string",
  "studentId": "number",
  "type": "Placement | Event | Result",
  "message": "string",
  "isRead": "boolean",
  "createdAt": "timestamp"
}


---

### Real-Time Notification Mechanism

For real time Notification, we can Use WebSocket for real time Updated 


When a student logs into the application, the frontend creates a WebSocket connection with the server. Whenever a new notification is generated or posted by the placment or any other member , the server immediately sends the notification to the connected student without required for the reloading of the Web page 

This helps students receive  updates quickly and also reduces repeated API requests to the server.

---