import { useMutation } from '@tanstack/react-query';
import { logoutAPI } from '../api/api'; // Import the logoutAPI

interface LogoutApiProps {
  token: string;
  lastVisitedPath: string | null;
}

export const useLogout = () => {
  return useMutation(async ({ token, lastVisitedPath }: LogoutApiProps) => {
    // Use the logoutAPI instead of native fetch
    return logoutAPI(token, lastVisitedPath);
  });
};
