"use server";

import List from "../models/list.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface showDetailsProps {
  showId: string;
  type: string;
  name: string;
  posterPath: string;
  backdropPath: string;
}

interface Props {
  ownerId: string;
  showDetails: showDetailsProps;
}

export async function updateToLikedList({ ownerId, showDetails }: Props) {
  try {
    connectToDB();

    // Check if the user exists
    const user = await User.findById(ownerId);
    if (!user) {
      throw new Error("User not found");
    }

    // Find the existing "likedList" or create it if it doesn't exist
    let likedList = await List.findOne({ name: "likedList", owner: ownerId });

    if (!likedList) {
      // If it doesn't exist, create a new "likedList"
      likedList = new List({
        name: "likedList",
        listType: "liked",
        owner: ownerId,
        shows: [showDetails],
      });
    } else {
      // Check if the showDetails already exists in the likedList
      const existingShow = likedList.shows.find(
        (s: showDetailsProps) =>
          s.showId === showDetails.showId && s.type === showDetails.type
      );

      if (!existingShow) {
        // If it doesn't exist, add the showDetails to the existing list
        likedList.shows.push(showDetails);
      }
    }

    // Save the "likedList" to the database
    await likedList.save();

    // Update the "liked" field in the user's document
    user.liked = likedList._id;
    await user.save();

    // return likedList;
  } catch (error) {
    throw error;
  }
}

export async function updateToWatchedList({ ownerId, showDetails }: Props) {
  try {
    connectToDB();

    // Check if the user exists
    const user = await User.findById(ownerId);
    if (!user) {
      throw new Error("User not found");
    }

    // Find the existing "watchedList" or create it if it doesn't exist
    let watchedList = await List.findOne({
      name: "watchedList",
      owner: ownerId,
    });

    if (!watchedList) {
      // If it doesn't exist, create a new "watchedList"
      watchedList = new List({
        name: "watchedList",
        listType: "watched",
        owner: ownerId,
        shows: [showDetails],
      });
    } else {
      // Check if the showDetails already exists in the watchedList
      const existingShow = watchedList.shows.find(
        (s: showDetailsProps) =>
          s.showId === showDetails.showId && s.type === showDetails.type
      );

      if (!existingShow) {
        // If it doesn't exist, add the showDetails to the existing list
        watchedList.shows.push(showDetails);
      }
    }

    // Save the "watchedList" to the database
    await watchedList.save();

    // Update the "liked" field in the user's document
    user.watched = watchedList._id;
    await user.save();

    // return watchedList;
  } catch (error) {
    throw error;
  }
}

export async function updateToWatchLaterList({ ownerId, showDetails }: Props) {
  try {
    connectToDB();

    // Check if the user exists
    const user = await User.findById(ownerId);
    if (!user) {
      throw new Error("User not found");
    }

    // Find the existing "watchLaterList" or create it if it doesn't exist
    let watchLaterList = await List.findOne({
      name: "watchLaterList",
      owner: ownerId,
    });

    if (!watchLaterList) {
      // If it doesn't exist, create a new "watchLaterList"
      watchLaterList = new List({
        name: "watchLaterList",
        listType: "watchLater",
        owner: ownerId,
        shows: [showDetails],
      });
    } else {
      // Check if the showDetails already exists in the watchLaterList
      const existingShow = watchLaterList.shows.find(
        (s: showDetailsProps) =>
          s.showId === showDetails.showId && s.type === showDetails.type
      );

      if (!existingShow) {
        // If it doesn't exist, add the showDetails to the existing list
        watchLaterList.shows.push(showDetails);
      }
    }

    // Save the "watchLaterList" to the database
    await watchLaterList.save();

    // Update the "liked" field in the user's document
    user.watchLater = watchLaterList._id;
    await user.save();

    // return watchLaterList;
  } catch (error) {
    throw error;
  }
}

// Function to fetch the data in the "likedList" for a specific user
export async function fetchLikedListData(userId: string) {
  try {
    // Connect to the database
    connectToDB();

    // Find the user by their userId
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Find the "likedList" using the user's "liked" reference
    const likedList = await List.findById(user.liked);

    if (!likedList) {
      throw new Error("No likedList found for the user");
    }

    // Return the shows in the "likedList"
    return likedList.shows;
  } catch (error) {
    throw error;
  }
}

export async function fetchWatchedListData(userId: string) {
  try {
    // Connect to the database
    connectToDB();

    // Find the user by their userId
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Find the "watchedList" using the user's "liked" reference
    const watchedList = await List.findById(user.watched);

    if (!watchedList) {
      throw new Error("No watchedList found for the user");
    }

    // Return the shows in the "watchedList"
    return watchedList.shows;
  } catch (error) {
    throw error;
  }
}

export async function fetchWatchLaterListData(userId: string) {
  try {
    // Connect to the database
    connectToDB();

    // Find the user by their userId
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Find the "watchLaterList" using the user's "liked" reference
    const watchLaterList = await List.findById(user.watchLater);

    if (!watchLaterList) {
      throw new Error("No watchLaterList found for the user");
    }

    // Return the shows in the "watchLaterList"
    return watchLaterList.shows;
  } catch (error) {
    throw error;
  }
}

interface isInTheListProps {
  userId: string;
  showId: string;
  type: string;
}
export async function isShowLikedByUser({
  userId,
  showId,
  type,
}: isInTheListProps) {
  try {
    // Find the user by their userId
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Check if the show with the given showId is in the likedList
    const likedList = await List.findById(user.liked);

    if (!likedList) {
      throw new Error("No likedList found for the user");
    }

    const isLiked = likedList.shows.find(
      (show: showDetailsProps) => show.showId === showId && show.type === type
    );
    return isLiked;
  } catch (error) {
    throw error;
  }
}

export async function isShowWatchedByUser({
  userId,
  showId,
  type,
}: isInTheListProps) {
  try {
    // Find the user by their userId
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Check if the show with the given showId is in the watchedList
    const watchedList = await List.findById(user.watched);

    if (!watchedList) {
      throw new Error("No watchedlist found for the user");
    }

    const isWatched = watchedList.shows.find(
      (show: showDetailsProps) => show.showId === showId && show.type === type
    );
    return isWatched;
  } catch (error) {
    throw error;
  }
}

export async function isShowSavedForLaterByUser({
  userId,
  showId,
  type,
}: isInTheListProps) {
  try {
    // Find the user by their userId
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Check if the show with the given showId is in the watchLaterList
    const watchLaterList = await List.findById(user.watchLater);

    if (!watchLaterList) {
      throw new Error("No watchLaterList found for the user");
    }

    const isWatchLater = watchLaterList.shows.find(
      (show: showDetailsProps) => show.showId === showId && show.type === type
    );
    return isWatchLater;
  } catch (error) {
    throw error;
  }
}

export async function removeFromLikedList({
  userId,
  showId,
  type,
}: isInTheListProps) {
  try {
    // Find the user by their userId
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const likedList = await List.findById(user.liked);

    if (!likedList) {
      throw new Error("No likedList found for the user");
    }

    // Find the index of the show in the likedList based on showId and type
    const showIndex = likedList.shows.findIndex(
      (show: showDetailsProps) => show.showId === showId && show.type === type
    );

    if (showIndex !== -1) {
      // Remove the show entry from the likedList array
      likedList.shows.splice(showIndex, 1);

      // Save the updated user document
      await likedList.save();
    }
  } catch (error) {
    throw error;
  }
}
