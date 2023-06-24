export type ValidateFieldType = {
  field: string;
  error: string;
};
export type ValidateFormType = [ValidateFieldType] | null | undefined;
