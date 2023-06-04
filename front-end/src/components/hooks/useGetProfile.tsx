import { useQuery } from '@tanstack/react-query';
import { profileAPI } from '../api/api';

export function useGetProfile(username: string, userToken: string) {
  return useQuery(['getProfileUseHook', userToken], async () => {
    const data = await profileAPI(username, userToken ?? '');
    
    return data;
  });
}
