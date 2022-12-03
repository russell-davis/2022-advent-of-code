import { type NextPage } from "next";
import { Container, Pagination, Stack } from "@mantine/core";
import { useState } from "react";
import { Day1 } from "../components/day1";
import { Day2 } from "../components/day2";
import {Day3} from "../components/day3";

const Home: NextPage = () => {
  const dayOfMonth = new Date().getDate();
  const [activePage, setPage] = useState(dayOfMonth);

  return (
    <Container py={40}>
      <Stack>
        <div>Advent of Code 2022</div>
        <Pagination page={activePage} onChange={setPage} total={31} />

        <div className="font-bold">Day {activePage}</div>
        {activePage === 1 && <Day1 />}
        {activePage === 2 && <Day2 />}
        {activePage === 2 && <Day3 />}
      </Stack>
    </Container>
  );
};

export default Home;
