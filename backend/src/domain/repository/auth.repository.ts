const AuthRepositoryDI = {
  Name: Symbol.for('AuthRepository'),
};

interface AuthRepository {
  login(email: string, password: string): Promise<void>;
}

export {AuthRepository, AuthRepositoryDI}