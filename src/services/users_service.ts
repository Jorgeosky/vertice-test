import User from '../models/User';
import { ApiError } from '../utils/ApiError';

const get = async (userId: string | null) => {
  const user = await User.findById(userId).select('-password');

  if (!user) {
    throw new ApiError(404, 'Usuario no encontrado');
  }

  return user;
};

export default { get };
