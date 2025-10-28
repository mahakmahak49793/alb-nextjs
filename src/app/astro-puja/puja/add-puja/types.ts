export interface PujaCategory {
  _id: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  startingPrice: number;
}

export interface BulletSection {
  heading: string;
  bulletPoint: string[];
}

export interface PujaFormData {
  categoryId: string;
  pujaName: string;
  pujaPrice: string;
  pujaCommissionPrice: string;
}

export interface PujaFormErrors {
  categoryId?: string;
  pujaName?: string;
  pujaPrice?: string;
  pujaCommissionPrice?: string;
  image?: string;
}

export interface ImageState {
  file: string;
  bytes: File | null;
}
