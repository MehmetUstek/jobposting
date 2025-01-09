import React from "react";
import { Freelancer } from "../../modals/Freelancer";
import { Card, CardContent, Box, Typography } from "@mui/material";
import CustomAvatar from "../../components/CustomAvatar";

interface FreelancerInfoProps {
  freelancer: Freelancer;
}

const FreelancerInfo: React.FC<FreelancerInfoProps> = ({ freelancer }) => {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <CustomAvatar initial={freelancer.name.charAt(0)} />
          <Box>
            <Typography variant="h5">{freelancer.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: {freelancer.phone}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Website: {freelancer.website}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              City: {freelancer.city}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FreelancerInfo;
