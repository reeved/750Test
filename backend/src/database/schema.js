import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const buttonSchema = new Schema(
  {
    buttonName: { type: String, unique: true },
    state: String,
  },
  {
    timestamps: {},
  }
);

export const Button = mongoose.model('Button', buttonSchema);

const button = new Button();
