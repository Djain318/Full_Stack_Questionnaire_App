import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8000";

export const fetchNextQuestion = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/questions`, {
      params: { user_id: userId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching next question:", error);
    throw error;
  }
};

export const submitAnswer = async (userId, questionId, answer) => {
  try {
    const response = await axios.post(`${BASE_URL}/answers`, {
      user_id: userId,
      question_id: questionId,
      answer: answer,
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting answer:", error);
    throw error;
  }
};
