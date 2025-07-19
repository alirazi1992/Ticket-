'use client';

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { TicketFormData } from '@/types/ticket'; // Adjust the path as needed

interface Props {
  register: UseFormRegister<TicketFormData>;
  errors: FieldErrors<TicketFormData>;
}

export default function SoftwareFormFields({ register, errors }: Props) {
  return (
    <>
      <input
        {...register('softwareName')}
        placeholder="نام نرم‌افزار"
        className="input"
      />
      {errors.softwareName && (
        <p className="text-red-500">{errors.softwareName.message}</p>
      )}

      <input
        {...register('version')}
        placeholder="نسخه نرم‌افزار"
        className="input"
      />
      {errors.version && (
        <p className="text-red-500">{errors.version.message}</p>
      )}
    </>
  );
}
