import { trpc } from "../utils/trpc";
import { Day } from "./_day";

export const Day1 = () => {
  const day1 = trpc.advent.day1.useQuery();

  if (day1.isLoading) {
    return <div>Loading...</div>;
  }

  if (!day1.data) {
    return <div>Not found</div>;
  }

  return (
    <Day
      dayNumber={1}
      q1={
        <div>
          <div>max Index: {day1.data.question1.index}</div>
          <div>sum: {day1.data.question1.sum}</div>
        </div>
      }
      q2={
        <div>
          <div>
            top 3:{" "}
            {day1.data.question2.orderedBySum.map((n) => n.sum).join(", ")}
          </div>
          <div>Sum of top 3: {day1.data.question2.sumOfTop3}</div>
        </div>
      }
    />
  );
};
