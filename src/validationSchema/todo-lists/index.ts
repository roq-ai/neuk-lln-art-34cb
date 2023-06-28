import * as yup from 'yup';

export const todoListValidationSchema = yup.object().shape({
  user_id: yup.string().nullable(),
  art_location_id: yup.string().nullable(),
});
