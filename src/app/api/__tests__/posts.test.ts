import { GET, POST } from "../posts/route";

describe("API Handler: /api/posts", () => {
  it("should return 405 for non-GET requests", async () => {
    const res = await POST();
    expect(res.status).toBe(405);
    const responseBody = await res.json();
    expect(responseBody).toEqual({ message: "Method Not Allowed" });
  });

  it("should return 400 when no freelancerId is provided", async () => {
    const req = new Request("http://localhost/api/posts", {
      method: "GET",
    });

    const res = await GET(req);

    expect(res.status).toBe(400);
    const responseBody = await res.json();
    expect(responseBody).toEqual({ message: "Invalid freelancerId" });
  });

  it("should return posts for a valid freelancerId", async () => {
    const req = new Request("http://localhost/api/posts?userId=1", {
      method: "GET",
    });

    const res = await GET(req);

    expect(res.status).toBe(200);
    const responseBody = await res.json();
    expect(responseBody).toHaveLength(10);
  });

  it("should return 200 if no posts are found for a freelancerId, but the freelancerId is valid", async () => {
    const req = new Request("http://localhost/api/posts?userId=10", {
      method: "GET",
    });

    const res = await GET(req);

    expect(res.status).toBe(200);
    const responseBody = await res.json();
    expect(responseBody).toEqual([]);
  });
});
