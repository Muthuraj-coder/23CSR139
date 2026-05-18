### Stage 1

### Notification System REST API Design

The notification system is used to send placement, event and result updates to students.

### Base URL: ```http:/api/v1 ```

### Headers:```http Content-Type: application/json Authorization: Bearer <token> ```

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


### Stage 2

## Database Choice

I prefer PostgreSQL for this notification system.

Reason:
    - Notification data is structured (That means it is predefined if it is not predefined we can go for NoSQL like MongoDB) 
    - Easy to store data
    - SQL queries are simple
    - Supports indexing

---

### Tables

## students
```sql
CREATE TABLE students (
    id INT PRIMARY KEY, ```(Act as a relation B/w Notification Table)```
    name VARCHAR(100),
    email VARCHAR(100)
);
```

### notifications
```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY,
    studentId INT,
    type VARCHAR(20),
    message TEXT,
    isRead BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (studentId) REFERENCES students(id)
);
```

---

## Problems When Data Grows

- Queries from the DB may get slower that is retrival time
- Database load increases

---

### Solutions

## Indexing - It Improves the speed of the searching by making the unique column as index . this make the quering easier and retrival faster

## DisAdvantages - If we want to improve the query , and we creating index for all the fields means .. then index will be stored in DB .. storage of the DB will increase 

### Add Index

```sql
CREATE INDEX idx_student_read
ON notifications(studentId, isRead);
```

### Queries

## Insert Notification

```sql
INSERT INTO notifications(id, studentId, type, message)
VALUES (
    gen_random_uuid(),
    1042,
    'Placement',
    'TCS hiring drive starts tomorrow'
);
```

## Get All Notifications

```sql
SELECT * FROM notifications
WHERE studentId = 1042
ORDER BY createdAt DESC;
```

## Get Unread Notifications

```sql
SELECT * FROM notifications
WHERE studentId = 1042
AND isRead = false;
```

## Mark Notification as Read

```sql
UPDATE notifications
SET isRead = true
WHERE id = 'n101';
```

## Delete Notification

```sql
DELETE FROM notifications
WHERE id = 'n101';
```


