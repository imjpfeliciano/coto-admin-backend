import monk from "monk";

const DB_URL = process.env.DB_URL || "localhost:27017";

const db = monk(DB_URL);

const AuthUserDB = db.get("auth_users");

interface AuthUser {
  email: string;
  password: string;
}

const AuthUserModel = {
  create: async (user: AuthUser) => {
    const createdUser = await AuthUserDB.insert(user);
    return createdUser;
  },

  findOne: async (email: string) => {
    try {
      const user = await AuthUserDB.findOne({ email });
      return user;
    } catch (error) {}
  },

  update: async (email: string, user: AuthUser) => {
    const updatedUser = await AuthUserDB.update({ email }, user);
    return updatedUser;
  },

  delete: async (email: string) => {
    try {
    } catch (error) {}
  },

  list: async () => {
    try {
    } catch (error) {}
  },
};

export default AuthUserModel;
