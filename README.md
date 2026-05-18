# Notification System Design

This project focuses on designing and improving a student notification system for placement, result, and event updates.

The system includes:
- REST API design for notifications
- Database schema design using PostgreSQL
- Query optimization for large notification data
- Performance improvements using caching and pagination
- Reliable notification delivery using queue-based processing
- Priority inbox implementation for top notifications
- Reusable logging middleware for application monitoring


Students can receive notifications related to:
- Placements
- Results
- Events

In this project, I designed APIs for sending and fetching notifications. I also designed the database structure to store notification details.

As the number of notifications increases, the system can become slow. So I added solutions like indexing, pagination, caching, and real-time notifications to improve performance.

I also designed a reusable logging function to track important activities and errors inside the application.

Finally, I implemented a priority notification feature which shows the most important unread notifications first based on notification type and latest time.