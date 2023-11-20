export const Copyright = () => {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-[86px] border-t-2 border-t-primary text-primary flex items-center justify-start px-[34px] py-[34px] w-full">
      <div className="container">
        <p className="m-0 p-0">© {year} Formidable Labs, LLC.</p>
      </div>
    </div>
  );
};
