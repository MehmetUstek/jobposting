"use client";

import React, { useEffect, useState } from "react";
import "../app/globals.css";
import { Container } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AppBarComponent from "@/components/AppBarComponent";
import { usePathname, useRouter } from "next/navigation";

const RootLayout: React.FC<React.PropsWithChildren<object>> = ({
  children,
}) => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");
  const [title, setTitle] = useState("Dashboard");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);
  }, [themeMode]);

  useEffect(() => {
    if (pathname === "/portfolio") {
      setTitle("Portfolio");
    } else {
      setTitle("Dashboard");
    }
  }, [pathname]);

  const toggleTheme = () => {
    const newTheme = themeMode === "light" ? "dark" : "light";
    setThemeMode(newTheme);
  };

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  const theme = createTheme({
    palette: {
      mode: themeMode,
      background: {
        default: themeMode === "light" ? "#ffffff" : "#121212",
      },
      text: {
        primary: themeMode === "light" ? "#000000" : "#ffffff",
      },
    },
  });

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <AppBarComponent
            title={title}
            themeMode={themeMode}
            toggleTheme={toggleTheme}
            onBack={title === "Portfolio" ? handleBackToDashboard : undefined}
          />
          <Container>{children}</Container>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
