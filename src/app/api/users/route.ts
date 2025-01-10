import { Freelancer } from "@/models/Freelancer";
import { NextResponse } from "next/server";
import freelancersData from "./freelancers.json";

const freelancersPlaceholder: Freelancer[] = freelancersData;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const freelancerId = Number(id);

    if (isNaN(freelancerId)) {
      return NextResponse.json(
        { message: "Invalid ID" },
        { status: 400 } // Bad Request
      );
    }

    const freelancer = freelancersPlaceholder.find(
      (freelancer) => freelancer.id === freelancerId
    );

    if (freelancer) {
      return NextResponse.json([freelancer], { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Freelancer not found" },
        { status: 404 } // Not Found
      );
    }
  }

  return NextResponse.json(freelancersPlaceholder, { status: 200 });
}

export async function POST() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
