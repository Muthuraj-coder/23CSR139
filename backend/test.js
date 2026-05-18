const Log = require("./log");

async function testLogging() {
  await Log(
    "backend",
    "info",
    "handler",
    "Notification API called successfully"
  );

  await Log(
    "backend",
    "error",
    "db",
    "Database connection failed"
  );
}

testLogging();