import { Box, useMediaQuery } from "@mui/material";
import { useSelector,useDispatch } from 'react-redux'
import axios from "axios";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import { useEffect } from "react";
import { setEvent } from "state";
const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const event = useSelector((state) => state.event);

  useEffect(() => {
    const getLatestEvent = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_LOCAL}/events/latestevent`,
          { headers: 
            { Authorization: `Bearer ${token}` } });
            dispatch(setEvent({ event: response.data }));
        // console.log(event);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getLatestEvent();
  }, [])

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} isProfile={false} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
           <AdvertWidget event={event}/>
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
