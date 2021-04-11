export interface Error {
  error: string;
}

export interface DictData {
  id: number;
  label: string;
}

export interface Dict {
  dictName: string;
  result: DictData[];
  error: string;
}

export interface DictResponse {
  result: DictData[];
  error: string;
}

export interface Result {
  errorCode: string;
  errorDesc: string;
}
