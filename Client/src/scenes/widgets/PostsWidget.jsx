import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostsWidget = ({ userId, isProfile }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_LOCAL}/posts/`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to fetch posts. Please try again later.');
    }
  };

  const getUserPosts = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCAL}/posts/${userId}/posts`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch user posts');
      }
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    } catch (error) {
      console.error('Error fetching user posts:', error);
      toast.error('Failed to fetch user posts. Please try again later.');
    }
  };
  


  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
