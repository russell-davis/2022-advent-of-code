import { trpc } from "../utils/trpc";
import { Day } from "./_day";

export const Day3 = () => {
    const query = trpc.advent.day3.useQuery();

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
            dayNumber={3}
            q1={<div>{query.data.question1.toString()}</div>}
            q2={<>{query.data.question2.toString()}</>}
        />
    );
};
