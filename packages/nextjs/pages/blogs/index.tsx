import { GetServerSideProps, NextPage } from "next";
import { withUrqlClient } from "next-urql";
import Link from "next/link";

import { GetBlogsSlugsDocument, useGetBlogsSlugsQuery } from "utils/generated/graphql";
import { setCachingHeaders } from "utils/setCachingHeaders";
import { initializeUrql, urqlOptions, withUrqlOptions } from "utils/urql";

const BlogsPage: NextPage = () => {
  const [{ data }] = useGetBlogsSlugsQuery();

  return (
    <div className="container my-5">
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>
      {data?.allBlog.map(({ _id, title, slug, _createdAt }) => (
        <div key={_id} className="text-lg my-2 border w-full block p-8 rounded">
          <Link href={`/blogs/${slug?.current}`}>
            <a>{title}</a>
          </Link>
          <div className="text-sm mt-1">{new Intl.DateTimeFormat("en-US").format(new Date(_createdAt))}</div>
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { client, ssrCache } = initializeUrql();
  const { res } = ctx;

  // This query is used to populate the cache for the query
  // used on this page.
  await client?.query(GetBlogsSlugsDocument).toPromise();

  setCachingHeaders(res, ["blog"]);

  return {
    props: {
      // urqlState is a keyword here so withUrqlClient can pick it up.
      urqlState: ssrCache.extractData(),
    },
  };
};

export default withUrqlClient(() => ({ ...urqlOptions }), withUrqlOptions)(BlogsPage);
