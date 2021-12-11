import { Document } from 'mongoose';

export interface ISite extends Document {
  name: string;
  city: string;
  description: string;
  latitude: number;
  longitude: number;
  role: string;
  auditLog: [
    {
      operation: 'Updated' | 'Created';
      nickname: string;
      date: Date;
    }
  ];
}
