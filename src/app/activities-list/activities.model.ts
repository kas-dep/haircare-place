export interface ProductOption {
  label: string;
  value: number;
  courseOfActionId: number;
}

export interface Activity {
  id: number;
  date: string;
  courseOfActionId: number;
  userId?: number;
  productId: number;
  coaLabel?: string;
  productName?: string;
}

export interface ActivityResponse {
  activities: Activity[];
  error: Error;
}

export interface CommonResponse {
  error: Error;
}
