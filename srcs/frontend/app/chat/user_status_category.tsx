const UserStatusCategory = ({ categoryName }: { categoryName: string }) => {
  return (
    <span className="flex p-2 font-bold uppercase text-gray-500">
      {categoryName}
    </span>
  );
};

export default UserStatusCategory;
