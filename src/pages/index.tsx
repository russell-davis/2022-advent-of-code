import { type NextPage } from "next";
import { Container, Pagination, Stack } from "@mantine/core";
import { useState } from "react";
import { Day1 } from "../components/day1";
import { Day2 } from "../components/day2";
import { Day3 } from "../components/day3";
import { Day4 } from "../components/day4";
import { Day5 } from "../components/day5";
import { Day6 } from "../components/day6";
    import { Day7 } from "../components/day7";
    import { Day8 } from "../components/day8";
    // Replacer:imports //

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
        {activePage === 3 && <Day3 />}
        {activePage === 4 && <Day4 />}
        {activePage === 5 && <Day5 />}
        {activePage === 6 && <Day6 />}
        {activePage === 7 && <Day7 />}
        {activePage === 8 && <Day8 />}
        {/*// Replacer:day //*/}
      </Stack>
    </Container>
  );
};

export default Home;
