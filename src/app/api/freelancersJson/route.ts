import { Freelancer } from "@/models/Freelancer";
import { NextResponse } from "next/server";

const freelancersPlaceholder: Freelancer[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    city: "New York",
    finishedJobs: 10,
    photoId: 1,
    website: "https://www.john-doe.com",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "098-765-4321",
    city: "Los Angeles",
    finishedJobs: 15,
    photoId: 2,
    website: "https://www.jane-smith.com",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "555-123-4567",
    city: "Chicago",
    finishedJobs: 8,
    photoId: 3,
    website: "https://www.alice-johnson.com",
  },
  {
    id: 4,
    name: "Ali Veli",
    email: "ali.veli@example.com",
    phone: "555-123-4567",
    city: "Bristol, UK",
    finishedJobs: 8,
    photoId: 4,
    website: "https://www.ali-veli.com",
  },
  {
    id: 5,
    name: "Mehmet Ustek",
    email: "mehmet.ustek@example.com",
    phone: "555-123-4567",
    city: "Bristol, UK",
    finishedJobs: 8,
    photoId: 5,
    website: "https://www.mehmet-ustek.com",
  },
];

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
      return NextResponse.json(freelancer, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Freelancer not found" },
        { status: 404 } // Not Found
      );
    }
  }

  // If no `id` is provided, return all freelancers
  return NextResponse.json(freelancersPlaceholder, { status: 200 });
}

export async function POST() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
