import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const buttonSchema = new Schema(
  {
    buttonName: {
      type: String,
      unique: true,
      required: [true, 'Button name not received.'],
    },
    // Added default values so that only buttonName is required at creation
    state: {
      type: Boolean,
      default: false,
    },
    clickCount: { type: Number, min: 0, default: 0 },
  },
  {
    timestamps: {},
  }
);

const Button = mongoose.model('Button', buttonSchema);

export { Button };
