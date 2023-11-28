
type ExpiresIn = `${number}${'s' | 'm' | 'h' | 'd'}`;

export const jwtExpiresIn: ExpiresIn = '1h';

export const expiresInToMilliseconds = () : number => {
  const amount = jwtExpiresIn.slice(0, -1);
  const unit = jwtExpiresIn.slice(-1);
  const milliseconds = parseInt(amount) * 1000;
  switch (unit) {
    case 's':
      return milliseconds;
    case 'm':
      return milliseconds * 60;
    case 'h':
      return milliseconds * 60 * 60;
    case 'd':
      return milliseconds * 60 * 60 * 24;
    default:
      return 0;
  }
};