import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  history: [],       // [{ question, answer }]
  currentIndex: 0,
};

const questionnaireSlice = createSlice({
  name: 'questionnaire',
  initialState,
  reducers: {
    addOrUpdateQuestion: (state, action) => {
      const { question, answer } = action.payload;
      const currentQues = state.history[state.currentIndex];
    
      if (currentQues && currentQues.question.id === question.id) {
        if (currentQues.answer !== answer) {
          // Answer changed → remove all after currentIndex and update
          state.history = state.history.slice(0, state.currentIndex + 1);
          state.history[state.currentIndex].answer = answer;
    
          console.log("after answer change", state.currentIndex, state.history[state.currentIndex].question.id, state.history[state.currentIndex].answer, state.history.length);
        }
        // Else answer is same → do nothing
        else 
          console.log("No Answer Change");
      } else {
        // New question
        state.history.push({ question, answer });
        console.log("ques fetch state", state.currentIndex, question.id, answer, state.history.length);
      }
    },    

    goToPrev: (state) => {
      state.currentIndex -= 1;
      console.log(state.currentIndex, state.history[state.currentIndex].question.id);
    },

    goToNext: (state) => {
      state.currentIndex += 1;
      console.log(state.currentIndex, state.history[state.currentIndex]);
    },

    resetQuestionnaire: () => initialState,
  },
});

export const {
  addOrUpdateQuestion,
  goToPrev,
  goToNext,
  resetQuestionnaire,
} = questionnaireSlice.actions;

export default questionnaireSlice.reducer;
