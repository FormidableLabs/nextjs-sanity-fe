import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <div className="m-4">
        <h3 className="text-lg text-center font-bold my-5">Top Categories</h3>
        <ul className="flex justify-evenly">
          <li>
            <Link href="/categories/clothing">
              <a className="h-52 w-52 shadow-md border flex items-center justify-center font-bold">
                Clothing
              </a>
            </Link>
          </li>
          <li>
            <Link href="/categories/accessories">
              <a className="h-52 w-52 shadow-md border flex items-center justify-center font-bold">
                Accessories
              </a>
            </Link>
          </li>
          <li>
            <Link href="/categories/shoes">
              <a className="h-52 w-52 shadow-md border flex items-center justify-center font-bold">
                Shoes
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Home;
