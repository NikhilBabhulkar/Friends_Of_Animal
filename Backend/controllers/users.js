import Event from "../models/Event.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const mostLiked=await calculateHighestLikes(id);
   // console.log(mostLiked);
    user.impressions=mostLiked;
    const newUser=await user.save();
    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};

export const getallUser = async (req, res) => {
  try {
    const allUser = await User.find({});
    res.status(200).json(allUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserParticipatedEvents = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await User.findById(id);
    const events = await Promise.all(user.events.map(async (eventId) => {
      const event = await Event.findById(eventId);
      return event
    }));
    res.status(200).json(events);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }

}

// Seraching the users

export const searchUsers = async (req, res) => {
  try {
    const { term } = req.params;

    // Perform case-insensitive search
    const users = await User.find({
      $or: [
        { firstName: { $regex: term, $options: 'i' } },
        { lastName: { $regex: term, $options: 'i' } },
        { location: { $regex: term, $options: 'i' } },
        { occupation: { $regex: term, $options: 'i' } }

      ]
    });

    // Otherwise, return all related users
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error searching users:', error);
    return res.status(500).json({ message: 'Failed to search users' });
  }
}
// Function to increase the number of viewedProfile by one
export const increaseViewedProfile = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.viewedProfile = (user.viewedProfile || 0) + 1;
    await user.save();
    return res.status(200).json(user.viewedProfile);
  } catch (error) {
    console.log(error);
    res.status(500).json({ "Failed to increase viewedProfile": error.message });
  }
};

// Function to calculate the highest number of likes on the user's posts
const calculateHighestLikes = async (userId) => {
  //const { userId } = req.params;
  try {
    // Find the user by ID
    const posts = await Post.find({ userId });
    //console.log("here", posts);
    if (!posts) {
      return 0;
    }
    else {

      let maxLikes = 0;

      // Iterate through each post of the user and calculate the highest number of likes
      posts.forEach(post => {
       // console.log("num",post);
        // Iterate through each post of the user and calculate the highest number of likes
        //console.log("likes",post.likes.size);
        const likeCount = post.likes.size;
        //console.log("here are post",likeCount);
        //console.log(likeCount);
        if(likeCount>maxLikes)
        maxLikes=likeCount;
      });

      return maxLikes;
    }
  } catch (error) {
    console.log(error);
  }
};

