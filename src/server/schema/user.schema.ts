import z, { TypeOf } from 'zod'

export const createUserSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(32, 'Username must be less than 32 characters'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    passwordConfirm: z.string({
      required_error: 'Please confirm your password',
    }),
    userDetails: z.string(),
    profileUrl: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
  })

export const loginUserSchema = z.object({
  username: z.string().min(1, 'Username is required').max(32, 'Username must be less than 32 characters'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
})

export const likeUserSchema = z.object({
  userId: z.string().min(1, 'Required'),
  likedId: z.string().min(1, 'Required'),
})

export type CreateUserInput = TypeOf<typeof createUserSchema>
export type LoginUserInput = TypeOf<typeof loginUserSchema>
export type LikeUserInput = TypeOf<typeof likeUserSchema>
