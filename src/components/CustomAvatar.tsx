import React from "react";
import { Avatar } from "@mui/material";
import { getColorByLetter } from "../utils/getColorByLetter";

interface CustomAvatarProps {
  initial: string;
}

const CustomAvatar: React.FC<CustomAvatarProps> = ({ initial }) => {
  return (
    <Avatar
      sx={{
        bgcolor: getColorByLetter(initial),
        width: 56,
        height: 56,
        fontSize: 24,
        marginRight: 2,
        borderRadius: 0,
      }}
    >
      {initial}
    </Avatar>
  );
};

export default CustomAvatar;
