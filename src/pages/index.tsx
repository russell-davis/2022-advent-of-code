import { type NextPage } from "next";
import { Container, Pagination, Stack } from "@mantine/core";
import { useState } from "react";
import { Day1 } from "../components/day1";

const Home: NextPage = () => {
  const dayOfMonth = new Date().getDate();
  const [activePage, setPage] = useState(dayOfMonth);

  return (
    <Container py={40}>
      <Stack>
        <div>Advent of Code 2022</div>
        <Pagination page={activePage} onChange={setPage} total={31} />

        {activePage === 1 && <Day1 />}
      </Stack>
    </Container>
  );
};

export default Home;
