'use client';

import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { TicketFormData } from '@/types/ticket'; // Ensure this path points to your unified types file

interface Props {
  register: UseFormRegister<TicketFormData>;
  errors: FieldErrors<TicketFormData>;
}

export default function NetworkFormFields({ register, errors }: Props) {
  return (
    <>
      <input {...register('ip')} placeholder="آی‌پی" className="input" />
      {errors.ip && <p className="text-red-500">{errors.ip.message}</p>}

      <input {...register('connectionType')} placeholder="نوع اتصال" className="input" />
      {errors.connectionType && (
        <p className="text-red-500">{errors.connectionType.message}</p>
      )}
    </>
  );
}
