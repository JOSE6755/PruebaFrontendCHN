import axios from "axios";
import type { Comment } from "../../interfaces";
const api = axios.create({
  baseURL: "https://dummyjson.com/",
  timeout: 10000,
});

const getRandomNumber = (min = 1, max = 50): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const fetchRandomItem = async () => {
  const randomId = getRandomNumber(1, 50);

  const response = await api.get(`/comments/${randomId}`);
  const comment: Comment = response.data;
  return comment.body;
};
