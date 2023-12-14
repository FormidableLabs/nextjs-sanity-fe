"use client";

import Image from "next/image";
import { localImageLoader } from "utils/localImageLoader";

const LocalImage = (props: React.ComponentProps<typeof Image>) => {
  return <Image {...props} alt={props.alt} loader={localImageLoader} />;
};

export default LocalImage;
