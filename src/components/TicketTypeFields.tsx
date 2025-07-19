// ✅ TicketTypeFields.tsx (Updated and Clean)
'use client';

import { TicketType, TicketFormData } from '@/types/ticket';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

import SoftwareFormFields from './SoftwareFormFields';
import HardwareFormFields from './HardwareFormFields';
import NetworkFormFields from './NetworkFormFields';
import OtherFormFields from './OtherFormFields';

interface Props {
  type: TicketType;
  register: UseFormRegister<TicketFormData>;
  errors: FieldErrors<TicketFormData>;
}

export default function TicketTypeFields({ type, register, errors }: Props) {
  switch (type) {
    case 'software':
      return <SoftwareFormFields register={register} errors={errors} />;
    case 'hardware':
      return <HardwareFormFields register={register} errors={errors} />;
    case 'network':
      return <NetworkFormFields register={register} errors={errors} />;
    case 'other':
    default:
      return <OtherFormFields register={register} errors={errors} />;
  }
}
