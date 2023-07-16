const ChannelCategory = ({ categoryName }: { categoryName: string }) => {
  return (
    <span className="flex p-2 text-xs font-bold uppercase text-gray-500">
      {categoryName}
    </span>
  );
};

export default ChannelCategory;
