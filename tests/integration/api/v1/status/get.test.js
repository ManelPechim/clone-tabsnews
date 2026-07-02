import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("GET do /api/v1/status deve retornar 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  const database = responseBody.dependencies.database;

  // expect(responseBody.updated_at).toBeDefined();
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  expect(database.version).toEqual("16.0");
  expect(database.max_connections).toEqual(100);
  expect(database.opened_connections).toEqual(1);
  // expect(database.opened_connections).toBeGreaterThan(0);
  // expect(database.opened_connections).toBeLessThanOrEqual(database.max_connections);
});
