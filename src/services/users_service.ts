import User from '../models/User';

const get = async (userId: string | null) => {
  const user = await User.findById(userId).select('-password');

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  return user;
};

export default { get };
