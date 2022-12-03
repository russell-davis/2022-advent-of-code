import { Stack, Text } from "@mantine/core";
import { formatDuration, intervalToDuration } from "date-fns";

export const Day = (props: {
  dayNumber: number;
  q1: JSX.Element;
  q2: JSX.Element;
}) => {
  // new challenges are available at midnight EST/UTC-5
  // get the current time in UTC-5
  const now = new Date();
  const elevenPM = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    0,
    0,
    0
  );
  const isAvailable = now > elevenPM || now.getDate() >= props.dayNumber;
  const availableIn = formatDuration(
    intervalToDuration({
      start: now,
      end: elevenPM,
    })
  );

  return (
    <Stack>
      {/*{isAvailable && (*/}
      {/*  <iframe*/}
      {/*    name={Date.now().toString()}*/}
      {/*    src={`https://adventofcode.com/2022/day/${props.dayNumber}`}*/}
      {/*    height={300}*/}
      {/*  ></iframe>*/}
      {/*)}*/}
      {!isAvailable && <div className="font-bold">Not available yet.</div>}
      {!isAvailable && <Text>Available in: {availableIn}</Text>}

      <div>
        <Text
          variant={"link"}
          component={"a"}
          href={`https://adventofcode.com/2022/day/${props.dayNumber}`}
        >
          Go to Challenge
        </Text>
      </div>

      <div>
        <div>Question 1</div>
        <div>{props.q1}</div>
      </div>

      <div>
        <div>Question 2</div>
        <div>{props.q2}</div>
      </div>
    </Stack>
  );
};
