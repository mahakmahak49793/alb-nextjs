// types/astrologer.ts
export interface MainExpertise {
  _id: string;
  mainExpertise: string;
  description: string;
  image: string;
}

export interface AstrologerState {
  astrologerMainExpertiseData: MainExpertise[];
  loading: boolean;
  error: string | null;
}
