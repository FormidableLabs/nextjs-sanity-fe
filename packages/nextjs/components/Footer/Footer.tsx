import { Copyright } from "./Copyright";
import { EmailSubscribe } from "./EmailSubscribe";
import { FooterLinks } from "./FooterLinks";
import { FooterDivider } from "./FooterDivider";
export const Footer = () => {
  return (
    <div className="flex flex-wrap border-t-2 border-blue">
      <div className="container grid grid-cols-1 md:grid-cols-[1fr_2px_1fr] gap-9 py-8 md:py-12">
        <div className="h-full">
          <EmailSubscribe />
        </div>
        <div className="md:h-full hidden md:block">
          <FooterDivider />
        </div>
        <div className="h-full">
          <FooterLinks />
        </div>
      </div>
      <div className="w-full">
        <Copyright />
      </div>
    </div>
  );
};
