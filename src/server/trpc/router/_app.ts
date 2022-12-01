import { router } from "../trpc";
import { adventRouter } from "./advent";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  advent: adventRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
