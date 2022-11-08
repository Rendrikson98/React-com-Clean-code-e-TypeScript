export type RemoteSurveyResultModel = {
  question: string;
  date: Date;
  answers: RemoteSurveyResultAnswerModel[];
};

export type RemoteSurveyResultAnswerModel = {
  image?: string;
  answer: string;
  count: number;
  percent: number;
  isCurrentAccountAnswer: boolean;
};
