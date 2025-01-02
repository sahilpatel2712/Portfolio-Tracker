export const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};
export const stringAvatar = (name: string) => {
  const nameParts = name.trim().split(" ");
  let initials = "";

  if (nameParts.length === 1) {
    initials = nameParts[0][0].toUpperCase();
  } else if (nameParts.length > 1) {
    initials = `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
  }

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials,
  };
};

