import { publicProcedure, router } from "../trpc";
import { day1 } from "../../../days/day1";
import { day2 } from "../../../days/day2";
import { z } from "zod";
import { create } from "../../../../scripts/create-test-data";
import { day3 } from "../../../days/day3";
import { day4 } from "../../../days/day4";
import { day5 } from "../../../days/day5";
// REPLACER:IMPORTS //

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
  day3: publicProcedure.query(() => {
    return day3();
  }),
  day4: publicProcedure.query(() => {
    return day4();
  }),
  day5: publicProcedure.query(() => {
    return day5();
  }),
  // REPLACER:ENTRY //
});
