import { Schema, model, Model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { IUser } from '../interfaces/IUser';

export interface IUserModel extends Model<IUser> {
  // all static method
}

const userSchema: Schema = new Schema<IUser>({
  nickname: {
    type: String,
    required: [true, 'Name Required']
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please Provide a valid email']
  },

  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },

  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (this: IUser, val: string) {
        return val === this.password;
      },
      message: 'Password does not match'
    }
  },

  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetTokenExpiresAt: Date
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = new Date(Date.now() - 1000);
  next();
});

userSchema.methods.changedPasswordAfter = function (this: IUser, jwtTimeStamp) {
  if (!this.passwordChangedAt) return false;
  return new Date(jwtTimeStamp * 1000) < new Date(this.passwordChangedAt);
};

userSchema.methods.correctPassword = async (enteredPassword, hashedPassword) =>
  await bcrypt.compare(enteredPassword, hashedPassword);

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetTokenExpiresAt = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User: IUserModel = model<IUser, IUserModel>('User', userSchema);

export default User;
