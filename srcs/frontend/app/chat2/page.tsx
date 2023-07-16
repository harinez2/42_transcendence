import ChannelName from "./channel_name";
import ChannelCategory from "./channel_category";

const Messages = () => {
  return (
    <>
      <aside
        id="separator-sidebar"
        className="left-0 top-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto bg-gray-800 px-3 py-4 ">
          <ChannelCategory categoryName="Channels" />
          <ul className="space-y-2 font-medium">
            <ChannelName channel={{ id: 1, name: "general" }} />
            <ChannelName channel={{ id: 2, name: "random" }} />
          </ul>
          <ul className="mt-4 space-y-2 border-t border-gray-700 pt-4 font-medium">
            <ChannelName channel={{ id: 1, name: "general" }} />
            <ChannelName channel={{ id: 2, name: "random" }} />
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Messages;
