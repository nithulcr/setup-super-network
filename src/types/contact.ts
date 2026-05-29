export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export interface ContactApiResponse {
  success: boolean;
  message: string;
  enquiryId?: string;
  error?: string;
}
