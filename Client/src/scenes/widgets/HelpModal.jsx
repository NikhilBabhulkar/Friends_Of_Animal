import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const HelpModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius:"1rem",
          p: 4,
        }}
      >
        <Typography variant="h3" component="h2" sx={{fontFamily:"fantasy",textAlign:"center"}}>
          Welcome
        </Typography>
        <Typography variant="h2" component="h2" sx={{fontFamily:"fantasy", marginBottom:"1rem",textAlign:"center"}}>
          Friends of Animals
        </Typography>
        <Typography variant="body1" sx={{textAlign:"justify", margin:"0.3rem"}}>
        Welcome to Friends of Animals, the social app designed exclusively for animal lovers like you! Our platform is a vibrant community where you can connect with fellow animal enthusiasts, share captivating photos, and engage in meaningful discussions about our furry, feathery, and scaly friends.

But that's not all - the heart of Friends of Animals lies in our dedication to fostering real-world connections and making a positive impact for animals everywhere. That's why we host a variety of exciting animal-based events tailored just for you. Whether it's a charity fundraiser for your local animal shelter, a wildlife conservation initiative, or a pet adoption drive, there's always something happening in our vibrant community.

Joining Friends of Animals is easy - simply sign up using your email and become part of our ever-growing family of animal lovers. By joining us, you'll not only gain access to a wealth of engaging content and events, but you'll also be supporting our mission to promote animal welfare and create a better world for all creatures great and small.

Come on board and let's make a difference together. Join Friends of Animals today and unleash your passion for animals!
        </Typography>
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={onClose}
        >
          <Close />
        </IconButton>
      </Box>
    </Modal>
  );
};

export default HelpModal;
