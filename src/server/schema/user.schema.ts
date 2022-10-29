import z, { TypeOf } from 'zod'

export const createUserSchema = z
  .object({
    username: z.string({ required_error: 'Username is required' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    passwordConfirm: z.string({
      required_error: 'Please confirm your password',
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
  })

export const loginUserSchema = z.object({
  username: z.string({ required_error: 'Username is required' }),
  password: z.string({ required_error: 'Password is required' }).min(8, 'Invalid username or password'),
})

export type CreateUserInput = TypeOf<typeof createUserSchema>
export type LoginUserInput = TypeOf<typeof loginUserSchema>
