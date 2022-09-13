import { Button } from "components/Button";
import { MdArrowForward } from "react-icons/md";

export default function ComponentsPage() {
  return (
    <div className="container mt-20">
      <h1 className="text-xl">Buttons</h1>
      <div className="flex justify-between mt-4">
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
    </div>
  );
}
