// ✅ Ticket Types and Statuses
export type TicketType = 'software' | 'hardware' | 'network' | 'other';
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed' | 'pending';

// ✅ Optional file attachment
export interface TicketAttachment {
  name: string;
  url: string; // Can be base64 or Blob URL
}

// ✅ Base Ticket Interface (common to all types)
export interface BaseTicket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  createdAt: string;
  type: TicketType;
  attachment?: TicketAttachment;
}

// ✅ Specific Fields per Ticket Type
export interface SoftwareFields {
  softwareName: string;
  version: string;
}

export interface HardwareFields {
  deviceType: string;
  serialNumber: string;
}

export interface NetworkFields {
  ip: string;
  connectionType: string;
}

// ✅ For 'other' ticket types (if needed)
export type OtherFields = Record<string, unknown>;

// ✅ Form fields by ticket type (used for conditional rendering)
export type TicketFormFields = {
  software: SoftwareFields;
  hardware: HardwareFields;
  network: NetworkFields;
  other: OtherFields;
};

// ✅ Form submission structure (used with react-hook-form)
export interface TicketFormData
  extends Omit<BaseTicket, 'id'>,
    Partial<SoftwareFields>,
    Partial<HardwareFields>,
    Partial<NetworkFields>,
    Partial<OtherFields> {
  attachment: TicketAttachment; // Required for form schema
}

// ✅ Notes that can be attached to any ticket
export interface TicketNote {
  message: string;
  sender: string;
  timestamp: string;
}

// ✅ Full ticket union with notes, strongly typed by discriminated union
export type TicketWithNotes =
  | (BaseTicket & { type: 'software' } & SoftwareFields & { notes?: TicketNote[] })
  | (BaseTicket & { type: 'hardware' } & HardwareFields & { notes?: TicketNote[] })
  | (BaseTicket & { type: 'network' } & NetworkFields & { notes?: TicketNote[] })
  | (BaseTicket & { type: 'other' } & OtherFields & { notes?: TicketNote[] });
