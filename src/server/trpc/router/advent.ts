import { publicProcedure, router } from "../trpc";
import { day1 } from "../../../days/day1";
import { day2 } from "../../../days/day2";
import { z } from "zod";
import { create } from "../../../../scripts/create-test-data";

export const adventRouter = router({
  testData: publicProcedure
    .input(z.object({ day: z.number() }))
    .mutation(({ input }) => {
      create(input.day);

      return {
        done: true,
      };
    }),
  day1: publicProcedure.query(() => {
    return day1();
  }),
  day2: publicProcedure.query(() => {
    return day2();
  }),
});
