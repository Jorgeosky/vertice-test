import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface authBody {
  name: string | undefined;
  email: string;
  password: string;
}

const secret: jwt.Secret = process.env.JWT_SECRET || '';
const timeExpired: number = Number(process.env.JWT_EXPIRES_IN) || 3600;

const register = async ({ name, email, password }: authBody) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('El correo ya está registrado');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return {
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
  };
};

const login = async ({ email, password }: authBody) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Credenciales inválidas');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Credenciales inválidas');
  }

  const token = jwt.sign({ userId: user._id }, secret, {
    expiresIn: timeExpired,
  });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

export default {
  register,
  login,
};
