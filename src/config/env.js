const { z } = require('zod');

const corsOriginSchema = z
  .string()
  .min(1)
  .transform((value) =>
    value
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean)
  );

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  CORS_ORIGIN: corsOriginSchema,
  MONGODB_URI: z
    .url()
    .min(1, { message: 'MONGODB_URI is required' })
    .transform((value) => value.trim()),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const formattedErrors = parsedEnv.error.issues?.map(
    (err) => `${err.path.join('.') || 'env'} - ${err.message}`
  );

  if (formattedErrors) {
    console.error(formattedErrors);
  }
  process.exit(1);
}

const { NODE_ENV, PORT, CORS_ORIGIN, MONGODB_URI } = parsedEnv.data;

const allowedOrigins = CORS_ORIGIN && CORS_ORIGIN.length ? CORS_ORIGIN : ['*'];

module.exports = {
  ENV: NODE_ENV,
  PORT,
  CORS_ORIGIN: allowedOrigins,
  MONGODB_URI,
};
