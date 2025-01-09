"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@mui/material";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, [router]);

  return (
    <Container>
      <h1>Redirecting to Dashboard...</h1>
    </Container>
  );
}
