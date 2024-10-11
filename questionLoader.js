// Function to load question data from JSON files
export const loadQuestions = async () => {
  try {
    const questions = {};
    
    // Replace with your actual file paths and fetching logic
    const response2024 = await fetch('/2024_mains.json');
    const data2024 = await response2024.json();
    questions['2024 Mains'] = data2024;

    const response2023 = await fetch('/2023_mains.json');
    const data2023 = await response2023.json();
    questions['2023 Mains'] = data2023;

    // Add additional question sets as needed
    // Example:
    // const response2022 = await fetch('/2022_mains.json');
    // const data2022 = await response2022.json();
    // questions['2022 Mains'] = data2022;

    return questions;
  } catch (error) {
    console.error('Error loading questions:', error);
    return {};
  }
};
