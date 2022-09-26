import { Input } from "components/Input";
import { H3 } from "components/Typography/H3";
import { LinkText } from "components/LinkText";
import { FaChevronRight } from "react-icons/fa";
export const EmailSubscribe = () => {
  return (
    <div className="flex flex-col">
      <div className="flex-grow md:pb-[185px] pb-6">
        <H3>Keep your pantry stocked.</H3>
      </div>
      <div>
        <Input
          label="Sign up to receive news and updates."
          placeholder="E-mail address"
          inputEndIcon={
            <LinkText>
              <p className="flex items-center">
                Subscribe
                <FaChevronRight />
              </p>
            </LinkText>
          }
        />
      </div>
    </div>
  );
};
