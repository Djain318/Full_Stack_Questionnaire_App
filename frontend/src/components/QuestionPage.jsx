import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { ArrowForward, ArrowBack } from "@mui/icons-material";
import { fetchNextQuestion, submitAnswer } from "../utils/apiHandling";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrUpdateQuestion,
  goToPrev,
  goToNext,
} from "../redux/questionnaireSlice";

const TOTAL_QUESTIONS = 4;

const QuestionPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("user_id");

  const { history, currentIndex } = useSelector((state) => state.questionnaire);
  const [currQuestion, setCurrQuestion] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState("");
  
  const [loading, setLoading] = useState(false);

  // Fetch the next question
  const handleFetch = async (userId) => {
    try {
      setLoading(true);
      const response = await fetchNextQuestion(userId);

      // Delay for smoother UI or simulate slow server
      //await new Promise((res) => setTimeout(res, 10000));
      
      setCurrQuestion(response); // Set question from API
      dispatch(
        addOrUpdateQuestion({
          question: response,
          answer: "",
        })
      );
    } catch (error) {
      console.error("Error fetching API data:", error);
    } finally{
      setLoading(false);
    }
  };

  // Set the question from Redux or fetch it from API when necessary
  useEffect(() => {
      // Otherwise, fetch the next question from the API
      handleFetch(userId);
  }, [userId]);

  // Move to the next question
  const handleNext = async () => {
    if (!selectedAnswer) return alert("Please select an option before continuing.");

    try {
      dispatch(
        addOrUpdateQuestion({
          question: currQuestion,
          answer: selectedAnswer,
        })
      );
      dispatch(goToNext());
      await submitAnswer(userId, currQuestion.id, selectedAnswer);
      handleFetch(userId);
    } catch (err) {
      console.error("Error submitting answer:", err);
    }
  };

  // Go to the previous question
  const handlePrev = () => {
    if (currentIndex > 0) {
      dispatch(goToPrev());
    }
  };
  useEffect(() => {
    const prevQA = history[currentIndex];

    if (prevQA) {
      // If we have a previous question in the history, use that
      setCurrQuestion(prevQA.question);
      setSelectedAnswer(prevQA.answer);
    } 
  }, [currentIndex, history]);
  

  // Handle loading UI and question progress
  const progressValue = (currentIndex / (TOTAL_QUESTIONS - 1)) * 100;

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f5f5",
        padding: 2,
      }}
    >
      {loading ? (
        // Show loading spinner
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 200,
          }}
        >
          <CircularProgress color="primary" />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Loading question...
          </Typography>
        </Box>
      ) : currQuestion?.id ? (
        // Show question if available
        <>
          <Box sx={{ position: "relative", display: "inline-flex", mb: 3 }}>
            <CircularProgress
              variant="determinate"
              value={100}
              size={80}
              thickness={5}
              sx={{ color: "#e0e0e0", position: "absolute" }}
            />
            <CircularProgress
              variant="determinate"
              value={progressValue}
              size={80}
              thickness={5}
              sx={{ color: "green" }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption" component="div" color="text.secondary">
                {`${Math.round(progressValue)}%`}
              </Typography>
            </Box>
          </Box>
  
          <Card
            variant="outlined"
            sx={{
              width: 500,
              minHeight: 300,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: 3,
              borderRadius: 3,
              boxShadow: 3,
              backgroundColor: "white",
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                {currQuestion.text}
              </Typography>
              {currQuestion.options?.map((option, idx) => (
                <Button
                  key={idx}
                  variant={selectedAnswer === option ? "contained" : "outlined"}
                  color={selectedAnswer === option ? "success" : "primary"}
                  fullWidth
                  onClick={() => setSelectedAnswer(option)}
                  sx={{ mb: 1, textTransform: "capitalize" }}
                >
                  {option}
                </Button>
              ))}
            </CardContent>
  
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                startIcon={<ArrowBack />}
              >
                Prev
              </Button>
              {currentIndex === TOTAL_QUESTIONS - 1 ? (
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => alert("Form submitted!")}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleNext}
                  endIcon={<ArrowForward />}
                >
                  Next
                </Button>
              )}
            </Box>
          </Card>
        </>
      ) : (
        // Questionnaire Completed
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" color="text.primary">
            Questionnaire Completed
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            Thank you for completing the questionnaire!
          </Typography>
        </Box>
      )}
    </Box>
  );  
};

export default QuestionPage;
