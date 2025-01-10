import { Freelancer } from "@/models/Freelancer";
import { filterFreelancers } from "../freelancerFilters";

describe("Dashboard filtering logic", () => {
  const mockFreelancers: Freelancer[] = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      phone: "123-456-7890",
      address: {
        street: "123 Main St",
        suite: "Apt 4B",
        city: "New York",
        zipcode: "10001",
        geo: {
          lat: "40.7128",
          lng: "-74.0060",
        },
      },
      finishedJobs: 10,
      website: "https://johnsmith.com",
      username: "johnsmith",
      company: {
        name: "Acme Corp",
        catchPhrase: "Quality products at competitive prices",
        bs: "We deliver excellence",
      },
    },
  ];

  // Test cases for the filter freelancers
  test("filters freelancers correctly based on multiple criteria", () => {
    const searchName = "jo";
    const searchCity = "new";
    const minJobs = 5;
    const maxJobs = 12;
    const savedFreelancers = new Set([1]);
    const showSavedOnly = false;

    const filteredFreelancers = filterFreelancers(mockFreelancers, {
      searchName,
      searchCity,
      minJobs,
      maxJobs,
      savedFreelancers,
      showSavedOnly,
    });

    // Should only return John Smith as he matches all criteria
    expect(filteredFreelancers).toHaveLength(1);
    expect(filteredFreelancers?.[0].name).toBe("John Smith");
  });

  test("shows only saved freelancers when showSavedOnly is true", () => {
    const searchName = "";
    const searchCity = "";
    const minJobs = undefined;
    const maxJobs = undefined;
    const savedFreelancers = new Set([1]); // John Smith
    const showSavedOnly = true;

    const filteredFreelancers = filterFreelancers(mockFreelancers, {
      searchName,
      searchCity,
      minJobs,
      maxJobs,
      savedFreelancers,
      showSavedOnly,
    });

    expect(filteredFreelancers).toHaveLength(1);
  });

  test("filters by job count range correctly", () => {
    const searchName = "";
    const searchCity = "";
    const minJobs = 7;
    const maxJobs = 12;
    const savedFreelancers = new Set<number>();
    const showSavedOnly = false;

    const filteredFreelancers = filterFreelancers(mockFreelancers, {
      searchName,
      searchCity,
      minJobs,
      maxJobs,
      savedFreelancers,
      showSavedOnly,
    });

    expect(filteredFreelancers).toHaveLength(1);
    expect(filteredFreelancers![0].name).toBe("John Smith");
  });
});
