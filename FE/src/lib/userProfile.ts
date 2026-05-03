export interface UserNameSource {
  username?: string | null;
  first_name?: string | null;
  last_name?: string | null;
}

const pickInitial = (value?: string | null): string => {
  const trimmed = value?.trim();
  return trimmed ? trimmed[0].toUpperCase() : '';
};

export const getUserDisplayName = (user?: UserNameSource | null): string => {
  if (!user) return 'User';
  const fullName = `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim();
  return fullName || user.username?.trim() || 'User';
};

export const getUserInitials = (user?: UserNameSource | null): string => {
  if (!user) return 'U';

  const firstInitial = pickInitial(user.first_name);
  const lastInitial = pickInitial(user.last_name);

  if (firstInitial && lastInitial) {
    return `${firstInitial}${lastInitial}`;
  }

  if (firstInitial) {
    return firstInitial;
  }

  if (lastInitial) {
    return lastInitial;
  }

  const username = user.username?.trim() || '';
  return username.slice(0, 2).toUpperCase() || 'U';
};
