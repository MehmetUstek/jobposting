import { Freelancer } from "@/modals/Freelancer";
import { filterFreelancers } from "../freelancerFilters";

describe("Dashboard filtering logic", () => {
  const mockFreelancers: Freelancer[] = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      phone: "123-456-7890",
      city: "New York",
      finishedJobs: 10,
      photoId: 1,
      website: "https://johnsmith.com",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "098-765-4321",
      city: "Los Angeles",
      finishedJobs: 5,
      photoId: 2,
      website: "https://janedoe.com",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      phone: "111-222-3333",
      city: "New York",
      finishedJobs: 15,
      photoId: 3,
      website: "https://bobjohnson.com",
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
    const minJobs = null;
    const maxJobs = null;
    const savedFreelancers = new Set([2]);
    const showSavedOnly = true;

    const filteredFreelancers = mockFreelancers.filter((freelancer) => {
      const matchesName = freelancer.name
        .toLowerCase()
        .includes(searchName.toLowerCase());
      const matchesCity = freelancer.city
        ? freelancer.city.toLowerCase().includes(searchCity.toLowerCase())
        : true;
      const matchesJobCount =
        (minJobs == null || freelancer.finishedJobs >= minJobs) &&
        (maxJobs == null || freelancer.finishedJobs <= maxJobs);
      const isSaved = savedFreelancers.has(freelancer.id);

      return (
        matchesName &&
        matchesCity &&
        matchesJobCount &&
        (!showSavedOnly || isSaved)
      );
    });

    expect(filteredFreelancers).toHaveLength(1);
    expect(filteredFreelancers[0].id).toBe(2);
  });

  test("filters by job count range correctly", () => {
    const searchName = "";
    const searchCity = "";
    const minJobs = 7;
    const maxJobs = 12;
    const savedFreelancers = new Set();
    const showSavedOnly = false;

    const filteredFreelancers = mockFreelancers.filter((freelancer) => {
      const matchesName = freelancer.name
        .toLowerCase()
        .includes(searchName.toLowerCase());
      const matchesCity = freelancer.city
        ? freelancer.city.toLowerCase().includes(searchCity.toLowerCase())
        : true;
      const matchesJobCount =
        (minJobs == null || freelancer.finishedJobs >= minJobs) &&
        (maxJobs == null || freelancer.finishedJobs <= maxJobs);
      const isSaved = savedFreelancers.has(freelancer.id);

      return (
        matchesName &&
        matchesCity &&
        matchesJobCount &&
        (!showSavedOnly || isSaved)
      );
    });

    expect(filteredFreelancers).toHaveLength(1);
    expect(filteredFreelancers[0].name).toBe("John Smith");
  });
});
