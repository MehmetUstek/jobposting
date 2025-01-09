import { Post } from "@/models/Post";
import { NextResponse } from "next/server";

const postsPlaceholder: Post[] = [
  {
    id: 1,
    title: "Past Job 1",
    body: "This is the body of past job 1.",
    freelancerId: 1,
  },
  {
    id: 2,
    title: "Past Job 2",
    body: "This is the body of past job 2.",
    freelancerId: 1,
  },
  {
    id: 3,
    title: "Past Job 3",
    body: "This is the body of past job 3.",
    freelancerId: 2,
  },
  {
    id: 5,
    title: "Past Job 5",
    body: "This is the body of past job 5.",
    freelancerId: 5,
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const freelancerId = searchParams.get("freelancerId");

  if (freelancerId) {
    const freelancerIdNumber = Number(freelancerId);

    if (isNaN(freelancerIdNumber)) {
      return NextResponse.json(
        { message: "Invalid freelancerId" },
        { status: 400 } // Bad Request
      );
    }

    const filteredPosts = postsPlaceholder.filter(
      (post) => post.freelancerId === freelancerIdNumber
    );

    return NextResponse.json(filteredPosts, { status: 200 });
  }

  return NextResponse.json(
    { message: "Invalid freelancerId" },
    { status: 400 } // Bad Request
  );
}

export async function POST() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
