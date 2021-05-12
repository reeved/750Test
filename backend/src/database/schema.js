import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const buttonSchema = new Schema(
  {
    buttonName: {
      type: String,
      unique: true,
      required: [true, 'Button name not received.'],
    },
    state: {
      type: Boolean,
      required: [true, 'No state information received.'],
    },
    clickCount: { type: Number, min: 0 },
  },
  {
    timestamps: {},
  }
);

const Button = mongoose.model('Button', buttonSchema, 'Buttons');

export { Button };
