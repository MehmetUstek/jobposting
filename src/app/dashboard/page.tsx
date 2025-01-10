"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Freelancer } from "../../models/Freelancer";
import {
  Container,
  TextField,
  Checkbox,
  FormControlLabel,
  Alert,
} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { filterFreelancers } from "../../utils/freelancerFilters";
import UserContainer from "@/components/UserContainer";

const Dashboard: React.FC = () => {
  const [freelancers, setFreelancers] = useState<Freelancer[]>();
  const [searchName, setSearchName] = useState<string>("");
  const [minJobs, setMinJobs] = useState<number | undefined>();
  const [maxJobs, setMaxJobs] = useState<number | undefined>();
  const [searchCity, setSearchCity] = useState<string>("");
  const [savedFreelancers, setSavedFreelancers] = useState<Set<number>>(
    new Set()
  );
  const [showSavedOnly, setShowSavedOnly] = useState<boolean>(false);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(async (response) => {
        const users = response.data;
        const freelancersWithJobNumbers = await Promise.all(
          users.map(async (user: Freelancer) => {
            const postsResponse = await axios.get(
              `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
            );
            return { ...user, finishedJobs: postsResponse.data.length };
          })
        );
        setFreelancers(freelancersWithJobNumbers);
      })
      .catch((error) => {
        console.error("Error fetching freelancers:", error);
        setError("Failed to load freelancers. Please try again later.");
      });
  }, []);

  const handleViewPortfolio = (freelancerId: number) => {
    router.push(`/portfolio?freelancerId=${freelancerId}`);
  };

  const handleSaveFreelancer = (freelancerId: number) => {
    setSavedFreelancers((prev) => {
      const newSaved = new Set(prev);
      if (newSaved.has(freelancerId)) {
        newSaved.delete(freelancerId);
      } else {
        newSaved.add(freelancerId);
      }
      return newSaved;
    });
  };

  const filteredFreelancers = filterFreelancers(freelancers, {
    searchName,
    searchCity,
    minJobs,
    maxJobs,
    savedFreelancers,
    showSavedOnly,
  });

  return (
    <Container>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      <Stack spacing={3} sx={{ mb: 3 }}>
        <Box display="flex" gap={3} flexWrap="wrap">
          <Box flex={1} minWidth={240}>
            <TextField
              fullWidth
              label="Search by name"
              variant="outlined"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </Box>
          <Box flex={1} minWidth={240}>
            <TextField
              fullWidth
              type="number"
              label="Min finished jobs"
              variant="outlined"
              value={minJobs ?? ""}
              onChange={(e) =>
                setMinJobs(
                  e.target.value ? parseInt(e.target.value) : undefined
                )
              }
            />
          </Box>
          <Box flex={1} minWidth={240}>
            <TextField
              fullWidth
              type="number"
              label="Max finished jobs"
              variant="outlined"
              value={maxJobs ?? ""}
              onChange={(e) =>
                setMaxJobs(
                  e.target.value ? parseInt(e.target.value) : undefined
                )
              }
            />
          </Box>
        </Box>

        <TextField
          fullWidth
          label="Search by city"
          variant="outlined"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={showSavedOnly}
              onChange={(e) => setShowSavedOnly(e.target.checked)}
            />
          }
          label="Show Saved Freelancers Only"
        />
      </Stack>

      <Box display="flex" flexWrap="wrap" gap={3}>
        {filteredFreelancers?.map((freelancer) => (
          <UserContainer
            key={freelancer.id}
            freelancer={freelancer}
            handleViewPortfolio={handleViewPortfolio}
            handleSaveFreelancer={handleSaveFreelancer}
            isSaved={savedFreelancers.has(freelancer.id)}
          />
        ))}
      </Box>
    </Container>
  );
};

export default Dashboard;
