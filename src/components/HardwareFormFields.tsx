// src/components/HardwareFormFields.tsx
'use client';

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { TicketFormData } from '@/types/ticket';

interface Props {
  register: UseFormRegister<TicketFormData>;
  errors: FieldErrors<TicketFormData>;
}

export default function HardwareFormFields({ register, errors }: Props) {
  return (
    <>
      <input {...register('deviceType')} placeholder="نوع دستگاه" className="input" />
      <p className="text-red-500">{errors.deviceType?.message as string}</p>

      <input {...register('serialNumber')} placeholder="شماره سریال" className="input" />
      <p className="text-red-500">{errors.serialNumber?.message as string}</p>
    </>
  );
}
