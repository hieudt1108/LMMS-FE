import axios from 'axios';
import { useMutation } from 'react-query';
// import { loginAuth } from '../../../src/app/api/agent';

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<string> => {
  const { data } = await axios.post('/api/login', { email, password });
  return data;
};

export function useLogin() {
  const { isLoading, mutateAsync } = useMutation(login);

  return { isLoggingIn: isLoading, login: mutateAsync };
}
