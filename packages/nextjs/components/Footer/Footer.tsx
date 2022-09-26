import classNames from "classnames";
import { Copyright } from "./Copyright";
import { EmailSubscribe } from "./EmailSubscribe";
import { FooterLinks } from "./FooterLinks";
import { FooterDivider } from "./FooterDivider";
export const Footer = () => {
  return (
    <div className="flex flex-wrap container">
      <div className="flex w-full md:flex-row flex-col">
        <div
          className={classNames(
            "h-full",
            ["md:pt-[48px]", "md:pb-[48px]", "md:pl-[34px]", "md:pr-[34px]", "md:basis-[50%]"],
            ["pt-[48px]", "pb-4", "pl-[14px]", "pr-[14px]"]
          )}
        >
          <EmailSubscribe />
        </div>
        <div className={classNames("md:h-full md:pt-[48px] md:pb-[48px] hidden md:block")}>
          <FooterDivider />
        </div>
        <div
          className={classNames(
            "h-full",
            ["md:pt-[48px]", "md:pb-[48px]", "md:pr-[34px]", "md:pl-[34px]", "md:basis-[50%]"],
            ["pt-4", "pb-[48px]", "pl-[14px]", "pr-[14px]"]
          )}
        >
          <FooterLinks />
        </div>
      </div>
      <div className="w-full">
        <Copyright />
      </div>
    </div>
  );
};
