import Image from "next/image";
import { ProfileType, DmChannelType } from "./types";

const UserComponent = ({ profile, channel, onSelectChannel }
  :{
    profile: ProfileType,
    channel: DmChannelType,
    onSelectChannel: (c: DmChannelType) => void  // eslint-disable-line no-unused-vars
  }) => {

  const handleClick = () => {
    onSelectChannel(channel);
  };

  const user_name = channel.user1.id === Number(profile.userId)
    ? channel.user2.username
    : channel.user1.username;

  return (
    <>
      <li>
        <a
          href="#"
          className="group flex items-center rounded-lg p-2 text-white hover:bg-gray-700"
          onClick={handleClick}
        >
          <Image
            src="http://localhost:3000/favicon.ico"
            className="h-auto max-w-full rounded-full"
            width={30}
            height={30}
            alt=""
          />
          <span className="ml-3 shrink-0 pr-8">{user_name}</span>
        </a>
      </li>
    </>
  );
};

const UserListComponent = ({ profile, channels, onSelectChannel }
  : {
    profile: ProfileType,
    channels: DmChannelType[],
    onSelectChannel: (c: DmChannelType) => void  // eslint-disable-line no-unused-vars
  }) => {
    
  console.log("Profile:", profile);
  console.log("Channels:", channels);
  console.log("onSelectChannel Function:", onSelectChannel);


  return (<div className="h-full overflow-y-auto bg-gray-800 px-3 py-4 ">
    <ul className="divide-y divide-gray-500/30">
      {channels?.map((c) => (
        <UserComponent
          key={c.channelId} 
          profile={profile}
          channel={c}
          onSelectChannel={onSelectChannel}
        />
      ))}
    </ul>
  </div>);
}

export default UserListComponent;
