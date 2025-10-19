// types.ts (or at the top of your file)

export type FormData = {
  name: string;
  title: string;
  avatar: string;
  location: string;
  email: string;
  phone: string;
  about: string;
  skills: string[];
  tools: string[];
  experiences: {
    role: string;
    company: string;
    date: string;
    location: string;
    description: string;
  }[];
  references: {
    name: string;
    role: string;
    text: string;
    rating: number;
  }[];
  services: {
    name: string;
    duration: number;
    price: number;
  }[];
  availability: {
    day: string[]; // multiple days at once
    from: string;
    to: string;
    slots: string[];
  }[];
};

// types.ts (or at the top of your file)

export type ProfessionalData = {
  _id: string;
  professional: {
    name: string;
    title: string;
    avatar: string; // now nested inside professional
    location: string;
    email: string;
    phone: string;
    about: string;
    skills: string[];
    tools: string[];

    experiences: {
      role: string;
      company: string;
      date: string;
      location: string;
      description: string;
    }[];
    references: {
      name: string;
      role: string;
      text: string;
      rating: number;
    }[];
    services: {
      name: string;
      duration: number;
      price: number;
    }[];
    availability: {
      day: string[]; // multiple days at once
      from: string;
      to: string;
      slots: string[];
    }[];
  };
};

export type AppointmentStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "completed"
  | "cancelled"
  | "rescheduled";

export interface AppointmentType {
  _id: string;
  client: {
    _id: string;
    name: string;
    email: string;
  };
  professional:
    | string
    | {
        _id: string;
        name: string;
      };
  service: string;
  date: string;
  type: string;
  location: string;
  notes: string;
  status: AppointmentStatus;
  statusHistory: any[];
  payment?: {
    amount: number;
    currency: string;
    status: string;
    method: string;
  };
  createdAt: string;
  updatedAt: string;
}
