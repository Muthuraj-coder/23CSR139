const axios = require("axios");

const API_URL =
  "http://4.224.186.213/evaluation-service/notifications";

const weights = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

async function getTopNotifications() {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtdXRodXJhamQuMjNjc2VAa29uZ3UuZWR1IiwiZXhwIjoxNzc5MDg2Nzc3LCJpYXQiOjE3NzkwODU4NzcsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIxYjZlNzRmNi1jNTE1LTRkZWUtOWFhYy05NjQ5MDlkM2U2OTYiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJtdXRodXJhaiIsInN1YiI6IjZlZjA2OWQ0LWVhMzktNGJhOC1iNzhlLWE1OTE3YWZhN2NmMyJ9LCJlbWFpbCI6Im11dGh1cmFqZC4yM2NzZUBrb25ndS5lZHUiLCJuYW1lIjoibXV0aHVyYWoiLCJyb2xsTm8iOiIyM2NzcjEzOSIsImFjY2Vzc0NvZGUiOiJSeVpCY3kiLCJjbGllbnRJRCI6IjZlZjA2OWQ0LWVhMzktNGJhOC1iNzhlLWE1OTE3YWZhN2NmMyIsImNsaWVudFNlY3JldCI6InNCUU1IdnhzR1ZmamZKUkgifQ.z61lf7zrMIYQDhU5HldGPzM56srdd2MFo0N1AWPlUOc",
      },
    });

    const notifications = response.data.notifications;

    notifications.sort((a, b) => {
      const weightA = weights[a.Type] || 0;
      const weightB = weights[b.Type] || 0;

      if (weightB !== weightA) {
        return weightB - weightA;
      }

      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    const top10 = notifications.slice(0, 10);

    console.log("\nTop 10 Priority Notifications\n");

    top10.forEach((notification, index) => {
      console.log(
        `${index + 1}. [${notification.Type}] ${notification.Message} - ${notification.Timestamp}`
      );
    });
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
}

getTopNotifications();