"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Post } from "../../models/Post";
import { Freelancer } from "../../models/Freelancer";
import { Comment } from "../../models/Comment";
import {
  Container,
  Typography,
  Box,
  Stack,
  Button,
  Snackbar,
} from "@mui/material";
import FreelancerInfo from "@/app/portfolio/FreelancerInfo";
import PostCard from "@/app/portfolio/PostCard";
import HireFreelancerDialog from "@/app/portfolio/HireFreelancerDialog";
import CommentsDialog from "@/app/portfolio/CommentsDialog";
import Alert from "@mui/material/Alert";

const Portfolio: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [freelancer, setFreelancer] = useState<Freelancer | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    subject: false,
    message: false,
  });
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [comments, setComments] = useState<{ [key: number]: Comment[] }>({});
  const [dialogComments, setDialogComments] = useState<Comment[]>([]);
  const [commentsDialogOpen, setCommentsDialogOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const freelancerId = searchParams ? searchParams.get("freelancerId") : null;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!freelancerId) {
      setError("Invalid ID provided.");
      return;
    }

    setError(null);

    axios
      .get(`/api/freelancersJson?id=${freelancerId}`)
      .then((response) => setFreelancer(response.data))
      .catch((error) => {
        console.error("Error fetching freelancer:", error);
        if (error.response?.status === 400) {
          setError("Invalid ID provided.");
        } else if (error.response?.status === 404) {
          setError("Freelancer not found.");
        } else {
          setError(
            "Failed to load freelancer details. Please try again later."
          );
        }
      });

    axios
      .get(`/api/posts?freelancerId=${freelancerId}`)
      .then((response) => {
        setPosts(response.data);
        // Fetch comments for each post
        response.data.forEach((post: Post) => {
          axios
            .get(`/api/comments?postId=${post.id}`)
            .then((response) => {
              setComments((prevComments) => ({
                ...prevComments,
                [post.id]: response.data,
              }));
            })
            .catch((error) => {
              console.error("Error fetching comments for post:", error);
              setError("Failed to load comments. Please try again later.");
            });
        });
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        if (error.response?.status === 404) {
          setError("No posts found for this freelancer.");
        } else {
          setError("Failed to load posts. Please try again later.");
        }
      });
  }, [freelancerId]);

  const handleShowComments = (postId: number) => {
    setDialogComments(comments[postId] || []);
    setCommentsDialogOpen(true);
  };

  const handleCloseCommentsDialog = () => {
    setCommentsDialogOpen(false);
  };

  const handleHireFreelancer = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormErrors({ name: false, subject: false, message: false });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
  };

  const handleSubmit = () => {
    const errors = {
      name: formData.name === "",
      subject: formData.subject === "",
      message: formData.message === "",
    };

    if (errors.name || errors.subject || errors.message) {
      setFormErrors(errors);
    } else {
      console.log("Form submitted:", formData);
      setOpenDialog(false);
      setSnackbarMessage("Freelancer hired!");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      {!error && (
        <>
          {freelancer && <FreelancerInfo freelancer={freelancer} />}
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleHireFreelancer}
            >
              Hire Freelancer
            </Button>
          </Stack>
        </>
      )}

      <Box display="flex" flexWrap="wrap" gap={3} sx={{ mt: 3 }}>
        {posts.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No posts yet.
          </Typography>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              comments={comments[post.id] || []}
              onShowComments={handleShowComments}
            />
          ))
        )}
      </Box>

      <HireFreelancerDialog
        open={openDialog}
        onClose={handleCloseDialog}
        formData={formData}
        formErrors={formErrors}
        onFormChange={handleFormChange}
        onSubmit={handleSubmit}
        snackbarOpen={snackbarOpen}
        snackbarMessage={snackbarMessage}
        onSnackbarClose={handleSnackbarClose}
      />

      <CommentsDialog
        open={commentsDialogOpen}
        onClose={handleCloseCommentsDialog}
        comments={dialogComments}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Portfolio;
