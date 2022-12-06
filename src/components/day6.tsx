import { trpc } from "../utils/trpc";
import { Day } from "./Day";

export const Day6 = () => {
  const query = trpc.advent.day6.useQuery(undefined, {
    refetchInterval: 5000,
  });

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>{query.error.message}</div>;
  }

  if (!query.data) {
    return <div>Not found</div>;
  }

  return (
    <Day
      dayNumber={6}
      q1={<>{JSON.stringify(query.data.question1)}</>}
      q2={<>{JSON.stringify(query.data.question2)}</>}
    />
  );
};
