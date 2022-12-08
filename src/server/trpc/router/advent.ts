import { publicProcedure, router } from "../trpc";
import { day1 } from "../../../days/day1";
import { day2 } from "../../../days/day2";
import { z } from "zod";
import { create } from "../../../../scripts/create-test-data";
import { day3 } from "../../../days/day3";
import { day4 } from "../../../days/day4";
import { day5 } from "../../../days/day5";
import { day6 } from "../../../days/day6";
import { day7 } from "../../../days/day7";
import { day8 } from "../../../days/day8";
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
  day6: publicProcedure.query(() => {
    return day6();
  }),
  day7: publicProcedure.query(() => {
    return day7();
  }),
  day8: publicProcedure.query(() => {
    return day8();
  }),
  // REPLACER:ENTRY //
});
