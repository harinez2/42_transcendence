// https://tailwindui.com/components/application-ui/navigation/navbars
const Header = () => {
  return (
    <nav className="bg-gray-900">
      <div className="flex shrink-0 items-end justify-between">
        <div className="text-5xl font-bold text-gray-200">ft_transcendence</div>
        <div className="md:ml-10 md:block md:space-x-8 md:pr-4">
          <a
            href="#"
            className="rounded-lg text-2xl font-medium text-gray-500 hover:bg-gray-700"
          >
            friends
          </a>
          <a
            href="#"
            className="rounded-lg text-2xl font-medium text-gray-500 hover:bg-gray-700"
          >
            chat
          </a>
          <a
            href="#"
            className="rounded-lg text-2xl font-medium text-gray-500 hover:bg-gray-700"
          >
            DM
          </a>
          <a
            href="#"
            className="rounded-lg text-2xl font-medium text-gray-500 hover:bg-gray-700"
          >
            game
          </a>
          <button className="grow-0 align-middle">
            <div className="rotate-[-8deg] text-white">hoge</div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
