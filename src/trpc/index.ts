import { router } from './trpc';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const {getUser} = getKindeServerSession{}
    const user = getUser()

    if(!user.id || !user.email)
      throw new TRPCError({ code: 'UNAUTHORIZED' })

      // check if user is in the database
      const dbUser = await db.user.findFirst({
        where: {
          id: user.id
        }
      })

      if (!dbUser) {
        // create user in db
        await db.user.create({
          data: {
            id: user.id,
            email: user.email
          }
        })
      }

      return { success: true }
  }),
});


export type AppRouter = typeof appRouter;