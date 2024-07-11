const API_URL = "https://allo-b.onrender.com/api";

export const getMeals = async () => {
  const response = await fetch(`${API_URL}/meals`);
  return response.json();
};

export const getLabels = async () => {
  const response = await fetch(`${API_URL}/meals/labels`);
  return response.json();
};
