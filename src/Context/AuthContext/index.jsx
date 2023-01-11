import { createContext, useContext, useMemo, useState } from 'react';
import { PropTypes } from 'prop-types';

const sleep = options =>
  new Promise((resolve, reject) => {
    if (options.error) {
      setTimeout(() => {
        reject(new Error(options.message));
      }, options.delay);
    } else {
      setTimeout(() => {
        resolve(options.success);
      }, options.delay);
    }
  });

const credential = {
  check: ({ email, password }) => email === 'vibeltranr@gmail.com' && password === 'dipper123',
  messages: {
    error: 'Invalid email or wrong password',
    success: true,
  },
};
const user = {
  verified: false,
  photo: '/img/profile.png',
  disabled: false,
  email: 'vibeltranr@gmail.com',
  name: 'Victor G. Beltrán Rodriguez',
  mobile: '55 5791 8941',
  address: {
    settlement: 'COL. LOS BORDOS',
    street: 'CALLE NARDOS',
    state: 'MEX',
    municipality: 'ECATEPEC DE MORELOS',
    postal: '55319',
    number: 'MZ 27 LOTE 3',
  },
  role: 'administrator',
  company: {
    department: 'DOYSP',
    title: 'Lider administrativo',
    name: 'SEDATU',
    location: 'Piso 5',
  },
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setUser] = useState(true);

  const signin = ({ email, password }) => {
    if (!credential.check({ email, password })) {
      return sleep({ delay: 200, error: true, message: credential.messages.error });
    }
    setUser(user);
    return sleep({ delay: 200, error: false, success: credential.messages.success });
  };

  const signout = () => {
    setUser(null);
    return sleep({ delay: 2000, error: false, success: true });
  };

  const value = useMemo(
    () => ({
      auth,
      signin,
      signout,
    }),
    [auth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

const useAuthConsumer = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthConsumer must be within the AuthContext provider');
  }
  return context;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useUser must be within the AuthContext provider');
  }
  return context.user;
};

const useSignin = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useSignin must be within the AuthContext provider');
  }
  return context.signin;
};

const useSignup = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useSignup must be within the AuthContext provider');
  }
  return context.signup;
};

const useSignout = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useSignout must be within the AuthContext provider');
  }
  return context.signout;
};

const useAuthError = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthError must be within the AuthContext provider');
  }
  return {
    authError: context.authError,
    clearError: context.clearError,
  };
};

export default AuthProvider;
export { useAuthConsumer, useAuth, useSignin, useSignup, useSignout, useAuthError };
