import axios from "axios";
export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  return data;
};

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post("/user/signup", { name, email, password });
  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status");
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = await res.data;
  return data;
};

export const sendChatRequest = async (message: string) => {
  const res = await axios.post("/books/new", { message });
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const getUserChats = async () => {
  const res = await axios.get("/books/");
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const deleteUserChats = async () => {
  const res = await axios.delete("/books/delete");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};

export const logoutUser = async () => {
  const res = await axios.get("/user/logout");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};

export const getBookById = async (id: string) => {
  const res = await axios.get(`/books/${id}`);
  if (res.status !== 200) {
    throw new Error("Unable to fetch the book");
  }
  const data = await res.data;
  return data;
};

export const updateBookProgress = async (bookId: string, progress: number) => {
  const res = await axios.put(`/books/${bookId}/progress`, { progress });
  if (res.status !== 200) {
    throw new Error("Unable to update book progress");
  }
  const data = await res.data;
  return data;
};


export const deleteBookById = async (id: any) => {
  try {
    const res = await axios.delete(`/books/${id}`);
    console.log("Book deleted:", res.data);
    return res.data;
  } catch (err) {
    console.error("Failed to delete book:", err);
  }
};

export const updateBook = async (id: string, title: string, author: string, genre: string) => {
  const res = await axios.put(`/books/${id}`, { title, author, genre});
  if (res.status !== 200) {
    throw new Error("Unable to update book");
  }
  const data = await res.data;
  return data;
};
