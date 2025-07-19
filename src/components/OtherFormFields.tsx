'use client';

import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { TicketFormData } from '@/types/ticket'; // Adjust path as needed

interface Props {
  register: UseFormRegister<TicketFormData>;
  errors: FieldErrors<TicketFormData>;
}

export default function OtherFormFields({ register, errors }: Props) {
  return (
    <>
      <textarea
        {...register('description')}
        placeholder="توضیحات"
        className="input"
      />
      {errors.description && (
        <p className="text-red-500">{errors.description.message}</p>
      )}
    </>
  );
}
