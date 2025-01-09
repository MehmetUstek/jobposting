import { NextResponse } from "next/server";

import { Comment } from "@/modals/Comment";

const commentsPlaceholder: Comment[] = [
  { id: 1, postId: 1, body: "Harika bir post!" },
  { id: 2, postId: 1, body: "Çok teşekkürler." },
  { id: 3, postId: 2, body: "Çok teşekkürler." },
  { id: 4, postId: 5, body: "Çok teşekkürler tekrardan." },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  if (searchParams.get("postId")) {
    const postId = parseInt(searchParams.get("postId")!, 10);

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
