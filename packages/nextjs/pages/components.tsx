import { Button } from "components/Button";
import { LinkText } from "components/LinkText";
import { Pill } from "components/Pill";
import { MdArrowForward } from "react-icons/md";

export default function ComponentsPage() {
  return (
    <div className="container mt-10">
      <h1 className="text-h4">Buttons</h1>
      <div className="flex justify-between my-4">
        <Button variant="primary" className="flex items-center">
          <MdArrowForward fontSize={32} className="mr-2" /> Show now
        </Button>
        <Button variant="secondary" className="flex items-center">
          Show now <MdArrowForward fontSize={32} className="ml-2" />
        </Button>
        <Button variant="tertiary" className="flex items-center">
          Show now
        </Button>
        <Button variant="primary" disabled className="flex items-center">
          <MdArrowForward fontSize={32} />
        </Button>
      </div>

      <h1 className="text-h4">Link Buttons</h1>
      <div className="flex justify-between my-4">
        <LinkText>Show now</LinkText>
        <LinkText disabled>Show now</LinkText>
      </div>

      <h1 className="text-h4">Pill</h1>
      <div className="flex justify-between my-4">
        <Pill>Option 1</Pill>
        <Pill selected>Option 1</Pill>
        <Pill disabled>Option 1</Pill>
      </div>
    </div>
  );
}
