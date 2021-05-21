type QuizInputType = {
    label: string;
    value: string;
  };
  
type QuizPagesType = {
  id: string;
  question: string;
  shortQuestion: string;
  input: {
    type: string;
    values: QuizInputType[];
    };
  }
  
export type QuizQuestionsResponse = {
  quiz: {
    pages: QuizPagesType[];
  };
}