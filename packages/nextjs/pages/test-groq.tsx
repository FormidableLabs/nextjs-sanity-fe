import { GetServerSideProps } from "next";
import { sanityClient } from "utils/sanityClient";
import groq from "groq";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const result = await sanityClient.fetch(groq`
  	*[_type == "category" ] {
  	  _id,
  		name,
  		'slug': slug.current,
		}`);

  return { props: { result } };
};

export default function TestGroq(props: any) {
  return (
    <main>
      <h1>Testing GROQ</h1>
      <pre>{JSON.stringify(props.result, null, 2)}</pre>
    </main>
  );
}
