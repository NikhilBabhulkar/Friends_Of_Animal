import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import {
    Box,
    Divider,
    IconButton,
    Typography,
    useTheme,
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
} from "@mui/material";
import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const VideoPlayer = ({ videoUrl }) => {
    return (
        <video controls width="100%">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
};

const VideoWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    videoPath,
    userPicturePath,
    likes,
    comments,
}) => {
    const [isComments, setIsComments] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const { palette } = useTheme();
    const primary = palette.primary.main;
    const likeCount = Object.keys(likes).length;

    const patchLike = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_LOCAL}/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId }),
          });
          if (!response.ok) {
            throw new Error('Failed to like post');
          }
          const updatedPost = await response.json();
          dispatch(setPost({ post: updatedPost }));
        } catch (error) {
          console.error('Error liking post:', error);
          toast.error('Failed to like post. Please try again later.');
        }
      };

    const handleShareButtonClick = () => {
        setIsShareModalOpen(true);
    };

    const handleCloseShareModal = () => {
        setIsShareModalOpen(false);
    };

    const shareViaWhatsApp = () => {
        const text = "Hey here is my Video on Friends of Animals";
        const url = encodeURIComponent(`${process.env.REACT_APP_LOCAL}/${videoPath}`);
        const whatsappUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
        window.open(whatsappUrl);
    }

    const shareViaInstagram = () => {
        const text = "Hey here is my Video on Friends of Animals";
        const url = encodeURIComponent(`${process.env.REACT_APP_LOCAL}/${videoPath}`);
        const instagramUrl = `instagram://library?AssetPath=${url}&caption=${text}`;
        window.open(instagramUrl);
    }

    const shareViaLinkedIn = () => {
        const text = "Hey here is my Video on Friends of Animals";
        const url = encodeURIComponent(`${process.env.REACT_APP_LOCAL}/${videoPath}`);
        const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`;
        window.open(linkedInUrl);
    }

    return (
        <WidgetWrapper m="2rem 0">
            <Friend
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
            />
            <Typography color={palette.neutral.main} sx={{ mt: "1rem" }}>
                {description}
            </Typography>
            <Box sx={{ margin: '1rem' }}>
                <VideoPlayer videoUrl={`${process.env.REACT_APP_LOCAL}/assets/posts/${videoPath}`} />
            </Box>

            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: primary }} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>
                <IconButton onClick={handleShareButtonClick}>
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>
            {isComments && (
                <Box mt="0.5rem">
                    {comments.map((comment, i) => (
                        <Box key={`${name}-${i}`}>
                            <Divider />
                            <Typography sx={{ color: palette.neutral.main, m: "0.5rem 0", pl: "1rem" }}>
                                {comment}
                            </Typography>
                        </Box>
                    ))}
                    <Divider />
                </Box>
            )}
            <Dialog open={isShareModalOpen} onClose={handleCloseShareModal}>
                <DialogTitle>Share via</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={4} textAlign="center">
                            <IconButton onClick={shareViaWhatsApp}>
                                <WhatsAppIcon sx={{ fontSize: 40, color: '#25D366' }} />
                            </IconButton>
                            <Typography>WhatsApp</Typography>
                        </Grid>
                        <Grid item xs={4} textAlign="center">
                            <IconButton onClick={shareViaInstagram}>
                                <InstagramIcon sx={{ fontSize: 40, color: '#E1306C' }} />
                            </IconButton>
                            <Typography>Instagram</Typography>
                        </Grid>
                        <Grid item xs={4} textAlign="center">
                            <IconButton onClick={shareViaLinkedIn}>
                                <LinkedInIcon sx={{ fontSize: 40, color: '#0077B5' }} />
                            </IconButton>
                            <Typography>LinkedIn</Typography>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </WidgetWrapper>
    );
};

export default VideoWidget;
