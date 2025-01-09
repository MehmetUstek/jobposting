import React from "react";
import { Post } from "../../models/Post";
import { Comment } from "../../models/Comment";
import { Card, CardContent, Typography, Button } from "@mui/material";

interface PostCardProps {
  post: Post;
  comments: Comment[];
  onShowComments: (postId: number) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  comments,
  onShowComments,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{post.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {post.body}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {comments.length} Comments
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => onShowComments(post.id)}
          sx={{ mt: 1 }}
        >
          Show Comments
        </Button>
      </CardContent>
    </Card>
  );
};

export default PostCard;
