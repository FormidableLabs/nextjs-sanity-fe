import { Copyright } from "./Copyright";
import { EmailSubscribe } from "./EmailSubscribe";
import { FooterLinks } from "./FooterLinks";
import { FooterDivider } from "./FooterDivider";
export const Footer = () => {
  return (
    <div className="flex flex-wrap ">
      <div className="flex w-full">
        <div className="h-full pt-[48px] pb-[48px] pl-[34px] pr-[34px] basis-[50%]">
          <EmailSubscribe />
        </div>
        <div className="h-full pt-[48px] pb-[48px]">
          <FooterDivider />
        </div>
        <div className="h-full pt-[48px] pb-[48px] pr-[34px] pl-[34px] basis-[50%]">
          <FooterLinks />
        </div>
      </div>
      <div className="w-full">
        <Copyright />
      </div>
    </div>
  );
};
