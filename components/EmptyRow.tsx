const EmptyRow = () => {
  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="w-96 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
          You Like
        </h2>
      </div>
      <div>
        <p>No shows added to liked add one to show here</p>
      </div>
    </div>
  );
};

export default EmptyRow;
