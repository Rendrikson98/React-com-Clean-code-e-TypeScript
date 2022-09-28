// eslint-disable-next-line no-unused-vars

export interface LoadSuveyList {
  loadAll(): Promise<LoadSuveyList.Model[]>;
}

//o nome dessa padrão é TypeAlias onde criamos um namspace com o mesmo nome da interface e usamos os tipos por meio de chamadas no namespace
export namespace LoadSuveyList {
  export type Model = {
    id: string;
    question: string;
    date: Date;
    didAnswer: boolean;
  };
}
