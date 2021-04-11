export interface ToastModel {
  message: string;
  type: ToastType;
}
export enum ToastType {
  INFO = 'info',
  SUCCESS = 'success',
  ERROR = 'error',
}
