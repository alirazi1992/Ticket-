'use client';

import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TicketFormData, TicketType } from '@/types/ticket';
import { useState } from 'react';
import { getSchemaByType } from '@/utils/validationSchemas';
import TicketTypeFields from './TicketTypeFields';

export default function TicketForm() {
  const [ticketType, setTicketType] = useState<TicketType>('software');

  // ✅ Proper type-safe schema resolver
  const schema = getSchemaByType(ticketType);
  const resolver = yupResolver(schema) as Resolver<TicketFormData>;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TicketFormData>({
    resolver,
    defaultValues: {
      status: 'open',
      createdAt: new Date().toISOString(),
      type: ticketType,
      attachment: { name: '', url: '' }, // Required for type safety
    },
  });

  const onSubmit: SubmitHandler<TicketFormData> = (data) => {
    console.log('📨 Submitted Ticket:', data);
    // TODO: send to backend
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setValue('attachment', {
        name: file.name,
        url: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 bg-white shadow-md rounded">
      {/* Ticket Type */}
      <div>
        <label className="block text-sm font-medium">نوع تیکت</label>
        <select
          {...register('type')}
          value={ticketType}
          onChange={(e) => {
            const selected = e.target.value as TicketType;
            setTicketType(selected);
            setValue('type', selected);
          }}
          className="w-full p-2 border rounded"
        >
          <option value="software">نرم‌افزار</option>
          <option value="hardware">سخت‌افزار</option>
          <option value="network">شبکه</option>
          <option value="other">سایر</option>
        </select>
      </div>

      {/* Title */}
      <input {...register('title')} placeholder="عنوان" className="w-full p-2 border rounded" />
      {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}

      {/* Description */}
      <textarea
        {...register('description')}
        placeholder="توضیحات"
        className="w-full p-2 border rounded"
      />
      {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}

      {/* Dynamic Fields */}
      <TicketTypeFields type={ticketType} register={register} errors={errors} />

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium mb-1">ضمیمه فایل</label>
        <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded" />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
      >
        ارسال تیکت
      </button>
    </form>
  );
}
