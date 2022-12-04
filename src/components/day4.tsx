import { trpc } from "../utils/trpc";
import { Day } from "./_day";

export const Day4 = () => {
  const query = trpc.advent.day4.useQuery(undefined, {
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
      dayNumber={4}
      q1={<>{JSON.stringify(query.data.question1)}</>}
      q2={<>{JSON.stringify(query.data.question2)}</>}
    />
  );
};
