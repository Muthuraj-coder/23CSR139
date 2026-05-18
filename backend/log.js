const axios = require("axios");

const LOG_API =
  "http://4.224.186.213/evaluation-service/logs";

async function Log(stack, level, packageName, message) {
  try {
    const response = await axios.post(
      LOG_API,
      {
        stack,
        level,
        package: packageName,
        message,
      },
      {
        headers: {
          Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtdXRodXJhamQuMjNjc2VAa29uZ3UuZWR1IiwiZXhwIjoxNzc5MDg2Nzc3LCJpYXQiOjE3NzkwODU4NzcsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIxYjZlNzRmNi1jNTE1LTRkZWUtOWFhYy05NjQ5MDlkM2U2OTYiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJtdXRodXJhaiIsInN1YiI6IjZlZjA2OWQ0LWVhMzktNGJhOC1iNzhlLWE1OTE3YWZhN2NmMyJ9LCJlbWFpbCI6Im11dGh1cmFqZC4yM2NzZUBrb25ndS5lZHUiLCJuYW1lIjoibXV0aHVyYWoiLCJyb2xsTm8iOiIyM2NzcjEzOSIsImFjY2Vzc0NvZGUiOiJSeVpCY3kiLCJjbGllbnRJRCI6IjZlZjA2OWQ0LWVhMzktNGJhOC1iNzhlLWE1OTE3YWZhN2NmMyIsImNsaWVudFNlY3JldCI6InNCUU1IdnhzR1ZmamZKUkgifQ.z61lf7zrMIYQDhU5HldGPzM56srdd2MFo0N1AWPlUOc",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Log created :", response.data);
  } catch (error) {
    console.log(
      error.response?.data || error.message
    );
  }
}

module.exports = Log;