import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  DialogActions,
  Button,
} from "@mui/material";
import { Comment } from "../../modals/Comment";

interface CommentsDialogProps {
  open: boolean;
  onClose: () => void;
  comments: Comment[];
}

const CommentsDialog: React.FC<CommentsDialogProps> = ({
  open,
  onClose,
  comments,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Comments</DialogTitle>
      <DialogContent>
        <List>
          {comments.map((comment) => (
            <ListItem
              key={comment.id}
              sx={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: "8px",
                padding: "8px",
              }}
            >
              <ListItemText primary={comment.body} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommentsDialog;
