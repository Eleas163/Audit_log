type AuditLog = [
  {
    operation: 'Updated' | 'Created';
    nickname: string;
    date: Date;
    _id: string;
  }
];

interface ISiteObjectKey {
  [key: string]: string | number | AuditLog;
}

export interface ISite extends ISiteObjectKey {
  _id: string;
  name: string;
  city: string;
  description: string;
  latitude: number;
  longitude: number;
  auditLog: AuditLog;
}

export interface ISiteProps {
  updateSiteFn: (v: ISite) => void;
  isLoading: boolean;
  siteInfo: ISite;
}
