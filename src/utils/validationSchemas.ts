import * as yup from 'yup';
import { TicketFormData, TicketType } from '@/types/ticket';

const attachmentSchema = yup.object({
  name: yup.string().required('نام فایل الزامی است'),
  url: yup.string().required('آدرس فایل الزامی است'),
});

export const getSchemaByType = (type: TicketType): yup.ObjectSchema<TicketFormData> => {
  const base = {
    title: yup.string().required('عنوان الزامی است'),
    description: yup.string().required('توضیحات الزامی است'),
    status: yup
      .mixed<TicketFormData['status']>()
      .oneOf(['open', 'in_progress', 'resolved', 'closed', 'pending'])
      .required(),
    createdAt: yup.string().required(),
    type: yup
      .mixed<TicketType>()
      .oneOf(['software', 'hardware', 'network', 'other'])
      .required(),
    attachment: attachmentSchema, // ✅ Required for all schemas

    // Optional fields
    softwareName: yup.string().optional(),
    version: yup.string().optional(),
    deviceType: yup.string().optional(),
    serialNumber: yup.string().optional(),
    ip: yup.string().optional(),
    connectionType: yup.string().optional(),
  };

  switch (type) {
    case 'software':
      return yup.object({
        ...base,
        softwareName: yup.string().required('نام نرم‌افزار الزامی است'),
        version: yup.string().required('نسخه الزامی است'),
      }) as yup.ObjectSchema<TicketFormData>;

    case 'hardware':
      return yup.object({
        ...base,
        deviceType: yup.string().required('نوع دستگاه الزامی است'),
        serialNumber: yup
          .string()
          .matches(/^[A-Za-z0-9]{8,12}$/, 'سریال باید بین ۸ تا ۱۲ کاراکتر و شامل حروف و عدد باشد')
          .required('شماره سریال الزامی است'),
      }) as yup.ObjectSchema<TicketFormData>;

    case 'network':
      return yup.object({
        ...base,
        ip: yup
          .string()
          .matches(
            /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/,
            'فرمت IP نادرست است'
          )
          .required('IP الزامی است'),
        connectionType: yup.string().required('نوع اتصال الزامی است'),
      }) as yup.ObjectSchema<TicketFormData>;

    case 'other':
    default:
      return yup.object(base) as yup.ObjectSchema<TicketFormData>;
  }
};
