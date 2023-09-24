import { User } from '../Model/UserModels';
export enum LastActiveFormat {
  FULL = 'full',
  DATE = 'date',
  TIME = 'time',
  CUSTOM = 'custom',
}

export function formatLastActive(
  users: User[],
  format: LastActiveFormat = LastActiveFormat.FULL,
): User[] {
  const dateRegex = /^(\d{4}-\d{2}-\d{2})/;
  const timeRegex = /T(\d{2}:\d{2}):\d{2}/;

  return users.map((user) => {
    const lastActiveDate = user.lastActive.match(dateRegex)?.[1] ?? '';
    const lastActiveTime = user.lastActive.match(timeRegex)?.[1] ?? '';

    let formattedLastActive = '';

    switch (format) {
      case LastActiveFormat.FULL:
        formattedLastActive = user.lastActive;
        break;
      case LastActiveFormat.DATE:
        formattedLastActive = lastActiveDate;
        break;
      case LastActiveFormat.TIME:
        formattedLastActive = lastActiveTime;
        break;
      case LastActiveFormat.CUSTOM:
        // Customize the format according to your requirements
        formattedLastActive = `${lastActiveDate}, ${lastActiveTime}`;
        break;
      default:
        formattedLastActive = user.lastActive;
        break;
    }

    return {
      ...user,
      lastActiveDate,
      lastActiveTime,
      formattedLastActive, // Include the formatted last active property
    };
  });
}
