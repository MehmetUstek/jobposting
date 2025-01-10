import { NextResponse } from "next/server";

import { Comment } from "@/models/Comment";
import commentsData from "./comments.json";

const commentsPlaceholder: Comment[] = commentsData;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  if (searchParams.get("postId")) {
    const postId = Number(searchParams.get("postId"));

    const filteredComments = commentsPlaceholder.filter(
      (comment) => comment.postId === postId
    );
    return NextResponse.json(filteredComments);
  }

  return NextResponse.json(commentsPlaceholder);
}

export async function POST() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
