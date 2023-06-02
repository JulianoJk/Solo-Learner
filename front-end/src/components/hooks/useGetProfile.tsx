import { useQuery } from '@tanstack/react-query';
import { profileAPI } from '../api/api';

export function useGetProfile(userToken: string) {
  return useQuery(['getProfileUseHook', userToken], async () => {
    const data = await profileAPI(userToken ?? 'test');
    return data;
  });
}
