import { Post } from "@/models/Post";
import { NextResponse } from "next/server";
import postsData from "./posts.json";

const postsPlaceholder: Post[] = postsData;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const freelancerId = searchParams.get("userId");

  if (freelancerId) {
    const freelancerIdNumber = Number(freelancerId);

    if (isNaN(freelancerIdNumber)) {
      return NextResponse.json(
        { message: "Invalid freelancerId" },
        { status: 400 } // Bad Request
      );
    }

    const filteredPosts = postsPlaceholder.filter(
      (post) => post.userId === freelancerIdNumber
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
