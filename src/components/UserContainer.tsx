import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import CustomAvatar from "@/components/CustomAvatar";

interface UserContainerProps {
  freelancer: {
    id: number;
    name: string;
    email: string;
    phone: string;
    city: string;
    finishedJobs: number;
  };
  handleViewPortfolio: (freelancerId: number) => void;
  handleSaveFreelancer: (freelancerId: number) => void;
  isSaved: boolean;
}

const UserContainer: React.FC<UserContainerProps> = ({
  freelancer,
  handleViewPortfolio,
  handleSaveFreelancer,
  isSaved,
}) => {
  return (
    <Box
      key={freelancer.id}
      width={{ xs: "100%", sm: "45%", md: "30%" }}
      flexGrow={1}
    >
      <Card>
        <CardMedia
          style={{ display: "flex", alignItems: "center", padding: "10px" }}
        >
          <CustomAvatar initial={freelancer.name.charAt(0)} />
          <Box marginLeft={2}>
            <Typography variant="h5" component="div">
              {freelancer.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {freelancer.email}
            </Typography>
          </Box>
        </CardMedia>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Phone: {freelancer.phone}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            City: {freelancer.city}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Finished Jobs: {freelancer.finishedJobs}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleViewPortfolio(freelancer.id)}
            style={{ marginTop: "10px" }}
          >
            View Portfolio
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleSaveFreelancer(freelancer.id)}
            style={{ marginTop: "10px" }}
          >
            {isSaved ? "Unsave" : "Save"} Freelancer
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserContainer;
