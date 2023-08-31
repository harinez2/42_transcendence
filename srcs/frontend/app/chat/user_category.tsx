const UserCategory = ({ categoryName }: { categoryName: string }) => {
  return (
    <span className="flex justify-between p-2 font-bold uppercase text-gray-500">
      <div>{categoryName}</div>
    </span>
  );
};

export default UserCategory;
