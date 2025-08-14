export interface Lead {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  status: "new" | "contacted" | "qualified" | "proposal" | "closed";
  value: number;
  lastContact: string;
  notes: string;
  avatar?: string;
  documents?: Array<{
    id: string;
    name: string;
    type: string;
    uploadDate: string;
    size: string;
  }>;
  activities?: Array<{
    id: string;
    type: "note" | "call" | "email" | "meeting";
    content: string;
    timestamp: string;
  }>;
}

export interface Organization {
  id: string;
  name: string;
  domain: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  organizationId?: string;
}
