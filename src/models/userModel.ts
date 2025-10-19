import bcrypt from "bcryptjs";
import mongoose, { Document, Schema, Model } from "mongoose";

/* ------------------------ Subdocument Interfaces ------------------------ */
interface IExperience {
  role: string;
  company: string;
  date: string;
  location: string;
  description: string;
}

interface IReference {
  name: string;
  role: string;
  text: string;
  rating: number;
}

interface IService {
  name: string;
  duration: number; // minutes
  price: number; // currency
}

interface IAvailability {
  day: string[]; // e.g. "Monday"
  from: string;
  to: string;
  slots: string[]; // e.g. ["10:00", "12:00"]
}

/* ------------------------ Role-Specific Interfaces ------------------------ */
interface IProfessional {
  name?: string;
  title?: string;
  avatar?: string;
  location?: string;
  email?: string;
  phone?: string;
  about?: string;
  skills?: string[];
  tools?: string[];
  experiences?: IExperience[];
  references?: IReference[];
  services?: IService[];
  availability?: IAvailability[];
}

interface IClient {
  avatar?: string;
  location?: string;
  phone?: string;
  favorites?: mongoose.Types.ObjectId[];
  appointments?: mongoose.Types.ObjectId[];
}

interface IAdmin {
  permissions?: string[];
}

/* ------------------------ Main User Interface ------------------------ */
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "client" | "professional" | "admin";
  professional?: IProfessional;
  client?: IClient;
  admin?: IAdmin;

  /* 🔒 Added for password reset */
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;

  createdAt: Date;
  updatedAt: Date;
  comparePassword: (password: string) => Promise<boolean>;
}

/* ------------------------ Subdocument Schemas ------------------------ */
const experienceSchema = new Schema<IExperience>({
  role: String,
  company: String,
  date: String,
  location: String,
  description: String,
});

const referenceSchema = new Schema<IReference>({
  name: String,
  role: String,
  text: String,
  rating: Number,
});

const professionalSchema = new Schema<IProfessional>({
  name: String,
  title: String,
  avatar: String,
  location: String,
  email: String,
  phone: String,
  about: String,
  skills: [String],
  tools: [String],
  experiences: [experienceSchema],
  references: [referenceSchema],
  services: [
    {
      name: String,
      duration: Number,
      price: Number,
    },
  ],
  availability: [
    {
      day: [String],
      from: String,
      to: String,
      slots: [String],
    },
  ],
});

const clientSchema = new Schema<IClient>({
  avatar: String,
  location: String,
  phone: String,
  favorites: [{ type: Schema.Types.ObjectId, ref: "User" }],
  appointments: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
});

const adminSchema = new Schema<IAdmin>({
  permissions: [String],
});

/* ------------------------ User Schema ------------------------ */
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["client", "professional", "admin"],
      default: "client",
    },

    professional: professionalSchema,
    client: clientSchema,
    admin: adminSchema,

    /* 🔒 Added fields for password reset */
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
  },
  { timestamps: true }
);

/* ------------------------ Methods ------------------------ */
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

/* ------------------------ Model ------------------------ */
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
