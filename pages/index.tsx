import type { NextPage } from "next";
import { Card } from "../components/Card";

const Home: NextPage = () => {
  return (
    <>
      <div className="m-4">
        <h3 className="text-lg text-center font-bold my-5">Top Categories</h3>
        <ul className="flex justify-evenly">
          <li>
            <Card to="/products/clothing">Clothing</Card>
          </li>
          <li>
            <Card to="/products/accessories">Accessories</Card>
          </li>
          <li>
            <Card to="/products/shoes">Shoes</Card>
          </li>
          <li>
            <Card to="/products">View All</Card>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Home;
