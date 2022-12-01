import { Stack } from "@mantine/core";
import { trpc } from "../utils/trpc";

export const Day1 = () => {
  const day1 = trpc.advent.day1.useQuery();

  if (day1.isLoading) {
    return <div>Loading...</div>;
  }

  if (!day1.data) {
    return <div>Not found</div>;
  }

  return (
    <Stack>
      <div className="font-bold">Day 1</div>
      <div>
        <div>Question 1</div>
        <div>max Index: {day1.data.question1.index}</div>
        <div>sum: {day1.data.question1.sum}</div>
      </div>

      <div>
        <div>Question 2</div>
        <div>
          top 3: {day1.data.question2.orderedBySum.map((n) => n.sum).join(", ")}
        </div>
        <div>Sum of top 3: {day1.data.question2.sumOfTop3}</div>
      </div>
    </Stack>
  );
};
