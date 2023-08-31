const ChannelCategory = ({ categoryName }: { categoryName: string }) => {
  return (
    <span className="flex justify-between p-2 font-bold uppercase text-gray-500">
      <div>{categoryName}</div>
      <div className="font-bold">+</div>
    </span>
  );
};

export default ChannelCategory;
