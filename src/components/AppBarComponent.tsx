import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface AppBarComponentProps {
  title: string;
  themeMode: "light" | "dark";
  toggleTheme: () => void;
  onBack?: () => void;
}

const AppBarComponent: React.FC<AppBarComponentProps> = ({
  title,
  themeMode,
  toggleTheme,
  onBack,
}) => {
  return (
    <AppBar position="static" sx={{ mb: 5 }}>
      <Toolbar>
        {onBack && (
          <IconButton color="inherit" onClick={onBack} sx={{ color: "white" }}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <Button color="inherit" onClick={toggleTheme}>
          Switch to {themeMode === "light" ? "Dark" : "Light"} Mode
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
