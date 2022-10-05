import fetch from "node-fetch";
import { GetServerSideProps } from "next";

interface Joke {
  joke: string;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const joke: Joke = (await fetch("https://icanhazdadjoke.com/", {
    headers: { Accept: "application/json" },
  }).then((res) => res.json())) as Joke;

  return { props: { joke } };
};

export default function TestInterceptSSR(props: { joke: Joke }) {
  return (
    <>
      <h1>Testing InterceptSSR!</h1>
      <p>{props.joke.joke}</p>
    </>
  );
}
