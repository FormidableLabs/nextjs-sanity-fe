"use client";
import * as React from "react";
import { NextPage } from "next";
import NextImage from "next/legacy/image";

import cinderbread from "assets/cinderbread.jpg";
import bagelAndBread from "assets/bagel-and-bread.jpg";
import { localImageLoader } from "utils/localImageLoader";
import { BreadIcon } from "components/Bread.icon";
import { PageHead } from "components/PageHead";
import { Breadcrumbs } from "components/Breadcrumbs";

const AboutPage: NextPage = () => {
  return (
    <>
      <PageHead title="About" description="About the Formidable Boulangerie project." />
      <div className="container my-4">
        <Breadcrumbs />
      </div>
      <div className="container py-9 grid grid-cols-1 md:grid-cols-2 gap-9 text-primary">
        <div className="order-1 flex flex-col gap-9 justify-between">
          <h1 className="text-h1">Welcome to the NextJS Sanity Ecommerce Demo Site!</h1>
          <p>
            We don’t really sell bread. Est sapiente voluptates officiis iusto. Impedit explicabo eos occaecati. Maiores
            porro et magnam ut suscipit natus recusandae. Possimus voluptatem minima veniam doloribus dolor aut
            occaecati. Vitae doloremque minima. Temporibus animi accusamus.
          </p>
        </div>
        <div className="order-2">
          <NextImage
            src={cinderbread}
            loader={localImageLoader}
            layout="intrinsic"
            width={600}
            height={600}
            objectFit="cover"
            objectPosition="center"
            className="rounded-2xl"
          />
        </div>
        <div className="order-4 md:order-3">
          <NextImage
            src={bagelAndBread}
            loader={localImageLoader}
            layout="intrinsic"
            width={600}
            height={900}
            objectFit="cover"
            objectPosition="center"
            className="rounded-2xl"
          />
        </div>
        <div className="order-3 md:order-4 flex flex-col gap-9 justify-between">
          <div>
            <h4 className="text-h4 mb-4">Dolorum et nesciunt sed quia adipisci harum beatae esse.</h4>
            <ul>
              {FAKE_BULLET_POINTS.map((point, i) => (
                <li key={i} className="mb-3 last-of-type:mb-0 flex items-baseline gap-2">
                  <div className="top-1 relative">
                    <BreadIcon />
                  </div>
                  <div>{point}</div>
                </li>
              ))}
            </ul>
          </div>
          <p>
            We don’t really sell bread. Est sapiente voluptates officiis iusto. Impedit explicabo eos occaecati. Maiores
            porro et magnam ut suscipit natus recusandae. Possimus voluptatem minima veniam doloribus dolor aut
            occaecati. Vitae doloremque minima. Temporibus animi accusamus.
          </p>
        </div>
        <div className="order-5 md:col-span-2 flex justify-center">
          <div className="max-w-4xl">
            <h2 className="text-h2">Quis laboriosam sed voluptatem distinctio ut ea reprehenderit et ut.</h2>
            <p>
              Enim unde et numquam laudantium similique officia non animi. Aut quia eveniet omnis velit labore porro.
              Non eum vitae laborum id velit labore. Itaque officia consequatur. Suscipit molestiae dolorem saepe modi
              sint. Qui rerum dicta explicabo omnis officia ut eligendi laborum.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const FAKE_BULLET_POINTS = [
  "Nihil eum eos explicabo laborum. Nihil quasi quasi occaecati accusamus cumque est. Iure officiis minima qui perferendis ut non nulla.",
  "Facilis expedita quae similique ut sed. Enim hic quasi esse et qui similique repellat voluptatem.",
  "Perferendis explicabo nemo recusandae quis laborum illo.Aperiam cumque est similique. Qui nihil magnam quae molestiae id exercitationem.",
  "A voluptatem et inventore ut quam expedita architecto dolorem. Ut aut deserunt eveniet repellat consequatur et et. Sit porro est dolorum sapiente. Ipsam sed nihil autem veritatis illum. Est vel ad voluptatem aut.",
];

export default AboutPage;
