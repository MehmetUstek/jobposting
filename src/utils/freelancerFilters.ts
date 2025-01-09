import { Freelancer } from "../modals/Freelancer";

interface FilterCriteria {
  searchName: string;
  searchCity: string;
  minJobs?: number;
  maxJobs?: number;
  savedFreelancers: Set<number>;
  showSavedOnly: boolean;
}

export const filterFreelancers = (
  freelancers: Freelancer[] | undefined,
  criteria: FilterCriteria
): Freelancer[] | undefined => {
  return freelancers?.filter((freelancer) => {
    const matchesName = freelancer.name
      .toLowerCase()
      .includes(criteria.searchName.toLowerCase());
    const matchesCity = freelancer.city
      ? freelancer.city
          .toLowerCase()
          .includes(criteria.searchCity.toLowerCase())
      : true;
    const matchesJobCount =
      (criteria.minJobs == null ||
        freelancer.finishedJobs >= criteria.minJobs) &&
      (criteria.maxJobs == null || freelancer.finishedJobs <= criteria.maxJobs);
    const isSaved = criteria.savedFreelancers.has(freelancer.id);

    return (
      matchesName &&
      matchesCity &&
      matchesJobCount &&
      (!criteria.showSavedOnly || isSaved)
    );
  });
};
