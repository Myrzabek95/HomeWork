export interface ResponseData {
  translatedText: string;
  match: number;
}

export interface Matches {
  id: number;
  segment: string;
  translation: string;
  reference: string;
  match: number;
}
export interface Data {
  lang: string;
  text: string;
}
export interface TranslateResult {
  responseStatus: number;
  responseData: ResponseData;
  matches: Matches[];
  responderId: string;
}
export interface Translate {
  id: number;
  date: Date;
  values: Data[];
}
