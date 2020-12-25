export type TriviaQuestionAnswer = "True" | "False";

export type TriviaQuestion = {
  category: string;
  type: "boolean";
  difficulty: "hard";
  question: string;
  correct_answer: TriviaQuestionAnswer;
  incorrect_answers: TriviaQuestionAnswer[];
};

export type TriviaQuestionsResponse = {
  responseCode: number;
  results: TriviaQuestion[];
};
