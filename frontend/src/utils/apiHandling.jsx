import axios from "axios";

export const fetchNextQuestion = async (userId) => {
  try {
    const response = await axios.get(`/questions`, {
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
    const response = await axios.post(`/answers`, {
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
