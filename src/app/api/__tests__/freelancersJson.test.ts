import { GET, POST } from "../users/route";

describe("API Handler: /api/users", () => {
  it("should return 405 for non-GET requests", async () => {
    const res = await POST();
    expect(res.status).toBe(405);
    const responseBody = await res.json();
    expect(responseBody).toEqual({ message: "Method Not Allowed" });
  });

  it("should return all freelancers for GET requests without ID", async () => {
    const req = new Request("http://localhost/api/users", {
      method: "GET",
    });

    const res = await GET(req);

    expect(res.status).toBe(200);
    const responseBody = await res.json();
    expect(responseBody).toHaveLength(10);
  });

  it("should return a specific freelancer for a valid ID", async () => {
    const req = new Request("http://localhost/api/users?id=1", {
      method: "GET",
    });

    const res = await GET(req);

    expect(res.status).toBe(200);
    const responseBody = await res.json();
    expect(responseBody).toEqual([
      {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        address: {
          street: "Kulas Light",
          suite: "Apt. 556",
          city: "Gwenborough",
          zipcode: "92998-3874",
          geo: {
            lat: "-37.3159",
            lng: "81.1496",
          },
        },
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        company: {
          name: "Romaguera-Crona",
          catchPhrase: "Multi-layered client-server neural-net",
          bs: "harness real-time e-markets",
        },
      },
    ]);
  });

  it("should return 404 for a non-existent freelancer ID", async () => {
    const req = new Request("http://localhost/api/users?id=100", {
      method: "GET",
    });

    const res = await GET(req);

    expect(res.status).toBe(404);
    const responseBody = await res.json();
    expect(responseBody).toEqual({ message: "Freelancer not found" });
  });

  it("should return 400 for an invalid ID", async () => {
    const req = new Request("http://localhost/api/users?id=invalid", {
      method: "GET",
    });

    const res = await GET(req);

    expect(res.status).toBe(400);
    const responseBody = await res.json();
    expect(responseBody).toEqual({ message: "Invalid ID" });
  });
});
