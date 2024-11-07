import { z } from 'zod';
import { publicProcedure, router } from './trpc';

const appRouter = router({
    // ...
    hello: publicProcedure.input(z.object({ callerName:z.string()})).query(async (opts)=>{
        const { input: { callerName }} = opts;
        return { "message": `welcome ${callerName}`}
    })
});



// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

