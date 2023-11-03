"use server";

import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";

import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import path from "path";

interface CreateUserParams {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDB();

    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

interface UpdateUserParams {
  clerkId: string;
  updateData: {
    name: string;
    username: string;
    email: string;
    picture: string;
  };
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDB();

    const { clerkId, updateData } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    // revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserById(params: any) {
  try {
    connectToDB();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
