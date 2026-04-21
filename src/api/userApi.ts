import axiosInstance from "../utils/axiosInstance";
import type { IUser } from "../types/userTypes";
import type { AxiosResponse } from "axios";

// GET ALL USERS
export const getUsers = async (): Promise<AxiosResponse> => {
  return await axiosInstance.get("/users");
};

// CREATE USER
export const createUser = async (data: IUser): Promise<AxiosResponse> => {
  return await axiosInstance.post("/user", data);
};

// DELETE USER
export const deleteUser = async (id: string): Promise<AxiosResponse> => {
  return await axiosInstance.delete(`/delete/user/${id}`);
};

// GET USER BY ID
export const getUserById = async (id: string): Promise<AxiosResponse> => {
  return await axiosInstance.get(`/user/${id}`);
};

// UPDATE USER
export const updateUser = async (
  id: string,
  data: IUser
): Promise<AxiosResponse> => {
  return await axiosInstance.put(`/update/user/${id}`, data);
};