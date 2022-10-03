import { LinkText } from "components/LinkText";
export const FooterLinks = () => {
  return (
    <div className="flex flex-col justify-between h-full w-full">
      <div className="flex md:pb-0 pb-[53px]">
        <div className="flex md:pr-[100px] pr-[140px]">
          <ul>
            <li className="pb-4">
              <h6 className="text-h6 text-primary font-medium">Shop</h6>
            </li>
            <li className="pb-2">
              <LinkText>Shop All</LinkText>
            </li>
            <li className="pb-2">
              <LinkText>Baguette</LinkText>
            </li>
            <li className="pb-2">
              <LinkText>Buns</LinkText>
            </li>
            <li className="pb-2">
              <LinkText>Flatbreads</LinkText>
            </li>
            <li className="pb-2">
              <LinkText>Loaves</LinkText>
            </li>
            <li>
              <LinkText>Pastries</LinkText>
            </li>
          </ul>
        </div>
        <div className="flex md:flex-row flex-col">
          <div className="flex md:pr-[100px] pb-8 md:pb-0">
            <ul>
              <li className="pb-4">
                <h6 className="text-h6 text-primary font-medium">Help</h6>
              </li>
              <li className="pb-2">
                <LinkText>FAQ</LinkText>
              </li>
              <li className="pb-2">
                <LinkText>Returns & Exchanges</LinkText>
              </li>
            </ul>
          </div>
          <div className="flex pr-[100px]">
            <ul>
              <li className="pb-4">
                <h6 className="text-h6 text-primary font-medium">Social</h6>
              </li>
              <li className="pb-2">
                <LinkText>Instagram</LinkText>
              </li>
              <li className="pb-2">
                <LinkText>Twitter</LinkText>
              </li>
              <li className="pb-2">
                <LinkText>Facebook</LinkText>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="pr-[53px]">
          <LinkText>Privacy Policy</LinkText>
        </div>
        <div>
          <LinkText>Terms of Service</LinkText>
        </div>
      </div>
    </div>
  );
};
