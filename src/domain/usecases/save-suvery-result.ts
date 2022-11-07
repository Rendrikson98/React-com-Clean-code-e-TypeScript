// eslint-disable-next-line no-unused-vars
export interface SaveSuveyResult {
  save(params: SaveSuveyResult.Params): Promise<SaveSuveyResult.Model>;
}

//o nome dessa padrão é TypeAlias onde criamos um namespace com o mesmo nome da interface e usamos os tipos por meio de chamadas no namespace
export namespace SaveSuveyResult {
  export type Params = {
    answer: string;
  };

  export type Model = {
    question: string;
    date: Date;
    answers: Array<{
      image?: string;
      answer: string;
      count: number;
      percent: number;
      isCurrentAccountAnswer: boolean;
    }>;
  };
}
