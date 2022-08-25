import { GetServerSideProps, NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";

import { BlockContent } from "components/BlockContent";
import { GetBlogDocument, useGetBlogQuery } from "utils/generated/graphql";
import { initializeUrql, urqlOptions, withUrqlOptions } from "utils/urql";
import { setCachingHeaders } from "utils/setCachingHeaders";
import { isSlug } from "utils/isSlug";

const BlogPage: NextPage = () => {
  const router = useRouter();
  const [{ data }] = useGetBlogQuery({
    variables: {
      slug: router.query.slug as string,
    },
  });

  const blog = data?.allBlog[0];

  return (
    <div className="container my-5">
      <h1 className="text-2xl font-bold mb-4">{blog?.title}</h1>
      <BlockContent value={blog?.contentRaw} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query, res }) => {
  const { client, ssrCache } = initializeUrql();
  const { slug } = query;

  if (isSlug(slug)) {
    setCachingHeaders(res, [`blog_${slug}`]);
  }

  // This query is used to populate the cache for the query
  // used on this page.
  await client?.query(GetBlogDocument, { slug }).toPromise();

  return {
    props: {
      // urqlState is a keyword here so withUrqlClient can pick it up.
      urqlState: ssrCache.extractData(),
    },
  };
};

export default withUrqlClient(() => ({ ...urqlOptions }), withUrqlOptions)(BlogPage);
