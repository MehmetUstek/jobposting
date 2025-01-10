import { GET, POST } from "../comments/route";

describe("API Handler: /api/comments", () => {
  it("should return 405 for non-GET requests", async () => {
    const res = await POST();

    expect(res.status).toBe(405);
    const responseBody = await res.json();
    expect(responseBody).toEqual({ message: "Method Not Allowed" });
  });

  it("should return all comments for GET requests without postId", async () => {
    const req = new Request("http://localhost/api/comments", {
      method: "GET",
    });

    const res = await GET(req);

    expect(res.status).toBe(200);
    const responseBody = await res.json();
    expect(responseBody).toHaveLength(500);
  });

  it("should return filtered comments for a specific postId", async () => {
    const req = new Request("http://localhost/api/comments?postId=1", {
      method: "GET",
    });

    const res = await GET(req);

    expect(res.status).toBe(200);
    const responseBody = await res.json();
    expect(responseBody).toHaveLength(5);
    expect(responseBody).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          postId: 1,
          name: "id labore ex et quam laborum",
          email: "Eliseo@gardner.biz",
        }),
        expect.objectContaining({
          postId: 1,
          name: "quo vero reiciendis velit similique earum",
          email: "Jayne_Kuhic@sydney.com",
        }),
      ])
    );
  });
});
