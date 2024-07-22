// store/mealsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMeals, getLabels } from "../../services/api";

export const fetchMeals = createAsyncThunk("meals/fetchMeals", async () => {
  const response = await getMeals();
  return response;
});

export const fetchLabels = createAsyncThunk("meals/fetchLabels", async () => {
  const response = await getLabels();
  return response;
});

const mealsSlice = createSlice({
  name: "meals",
  initialState: {
    meals: [],
    labels: [],
    selectedMealsPerson1: {},
    selectedMealsPerson2: {},
    currentPerson: 1,
    selectedLabels: [],
    status: "idle",
    error: null,
  },
  reducers: {
    selectMeal: (state, action) => {
      const { mealId, drinkId, person } = action.payload;
      if (person === 1) {
        state.selectedMealsPerson1[mealId] = { drinkId };
      } else {
        state.selectedMealsPerson2[mealId] = { drinkId };
      }
    },
    deselectMeal: (state, action) => {
      const { mealId, person } = action.payload;
      if (person === 1) {
        delete state.selectedMealsPerson1[mealId];
      } else {
        delete state.selectedMealsPerson2[mealId];
      }
    },
    setCurrentPerson: (state, action) => {
      state.currentPerson = action.payload;
    },
    toggleLabel: (state, action) => {
      const labelId = action.payload;
      const index = state.selectedLabels.indexOf(labelId);
      if (index !== -1) {
        state.selectedLabels.splice(index, 1);
      } else {
        state.selectedLabels.push(labelId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meals = action.payload;
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchLabels.fulfilled, (state, action) => {
        state.labels = action.payload;
      });
  },
});

export const { selectMeal, deselectMeal, setCurrentPerson, toggleLabel } =
  mealsSlice.actions;

export default mealsSlice.reducer;
