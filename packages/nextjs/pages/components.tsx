import { MdArrowForward } from "react-icons/md";
import { Button } from "shared-ui";
import { Input } from "shared-ui";
import { Checkbox } from "components/Checkbox";
import { LinkText } from "components/LinkText";
import { Pill } from "components/Pill";
import { Select } from "components/Select";

export default function ComponentsPage() {
  return (
    <div className="container mt-10">
      <h1 className="text-h4">Buttons</h1>
      <div className="flex justify-between mb-8 mt-2">
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
      <div className="flex justify-between mb-8 mt-2">
        <LinkText>Show now</LinkText>
        <LinkText disabled>Show now</LinkText>
      </div>

      <h1 className="text-h4">Pill</h1>
      <div className="flex justify-between mb-8 mt-2">
        <Pill>Option 1</Pill>
        <Pill selected>Option 1</Pill>
        <Pill disabled>Option 1</Pill>
      </div>

      <h1 className="text-h4">Select</h1>
      <div className="mb-8 mt-2">
        <Select
          label="Label"
          placeholder="Placeholder Text"
          options={[
            { title: "Option 1", value: "1" },
            { title: "Option 2", value: "2" },
            { title: "Option 3", value: "3" },
          ]}
        />
      </div>

      <h1 className="text-h4">Input</h1>
      <div className="flex justify-between mb-8 mt-2">
        <Input label="Label" placeholder="Placeholder Text" />
        <Input label="Label" placeholder="Placeholder Text" disabled />
      </div>

      <h1 className="text-h4">Checkbox</h1>
      <div className="flex justify-between mb-8 mt-2">
        <Checkbox name="checkbox" label="Option" />
      </div>
    </div>
  );
}
