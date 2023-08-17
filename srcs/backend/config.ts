function getEnvVariable(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined.`);
  }
  return value;
}

export const FRONT_URL: string = getEnvVariable('NEXT_PUBLIC_FRONT_URL');

export const FORTY_TWO_CLIENT_ID: string = getEnvVariable(
  'FORTY_TWO_CLIENT_ID',
);
export const FORTY_TWO_CLIENT_SECRET: string = getEnvVariable(
  'FORTY_TWO_CLIENT_SECRET',
);
export const FORTY_TWO_CALLBACK_URL: string = getEnvVariable(
  'FORTY_TWO_CALLBACK_URL',
);

export const JWT_SECRET: string = getEnvVariable('JWT_SECRET');

export const DATABASE_URL: string = getEnvVariable('DATABASE_URL');
