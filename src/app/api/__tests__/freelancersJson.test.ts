import { GET, POST } from "../freelancersJson/route";

describe("API Handler: /api/freelancersJson", () => {
  it("should return 405 for non-GET requests", async () => {
    const res = await POST();
    expect(res.status).toBe(405);
    const responseBody = await res.json();
    expect(responseBody).toEqual({ message: "Method Not Allowed" });
  });

  it("should return all freelancers for GET requests without ID", async () => {
    const req = new Request("http://localhost/api/freelancersJson", {
      method: "GET",
    });

    const res = await GET(req);

    expect(res.status).toBe(200);
    const responseBody = await res.json();
    expect(responseBody).toHaveLength(5);
  });

  it("should return a specific freelancer for a valid ID", async () => {
    const req = new Request("http://localhost/api/freelancersJson?id=1", {
      method: "GET",
    });

    const res = await GET(req);

    expect(res.status).toBe(200);
    const responseBody = await res.json();
    expect(responseBody).toEqual({
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      city: "New York",
      finishedJobs: 10,
      photoId: 1,
      website: "https://www.john-doe.com",
    });
  });

  it("should return 404 for a non-existent freelancer ID", async () => {
    const req = new Request("http://localhost/api/freelancersJson?id=10", {
      method: "GET",
    });

    const res = await GET(req);

    expect(res.status).toBe(404);
    const responseBody = await res.json();
    expect(responseBody).toEqual({ message: "Freelancer not found" });
  });

  it("should return 400 for an invalid ID", async () => {
    const req = new Request("http://localhost/api/freelancersJson?id=invalid", {
      method: "GET",
    });

    const res = await GET(req);

    expect(res.status).toBe(400);
    const responseBody = await res.json();
    expect(responseBody).toEqual({ message: "Invalid ID" });
  });
});
