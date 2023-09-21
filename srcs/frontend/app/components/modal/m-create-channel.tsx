import React, { useCallback, useRef, useState } from "react";
import makeAPIRequest from "../..//api/api";
import type { NextPage } from "next";
import {
  TextField,
  FormControlLabel,
  Switch,
  createChainedFunction,
} from "@mui/material";
import { ChannelType, Publicity, createChannelDTO } from "../../chat/types";

type MCreateChannelType = {
  closeModal: () => void;
  channels: ChannelType[];
  setChannels: (channels: ChannelType[]) => void;
};

const MCreateChannel: NextPage<MCreateChannelType> = ({
  closeModal,
  channels,
  setChannels,
}) => {
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const inputChannelNameRef = useRef<HTMLInputElement>(null);

  const [channelDTO, setChannelDTO] = useState<createChannelDTO>({
    channelName: "",
    ownerId: 0,
    channelType: Publicity.PUBLIC,
    password: null,
  });

  const [publicityButtonDisabled, setPublicityButtonDisabled] =
    useState<boolean>(false); // [true: private, false: public
  const [passwordButtonDisabled, setPasswordButtonDisabled] =
    useState<boolean>(true);
  const [passwordDisabled, setPasswordDisabled] = useState<boolean>(true);
  const [error, setError] = useState("");

  // dialog の外側をクリックしたときに閉じるために使用する
  const stopPropagation = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
    },
    [],
  );

  // channelDTO の channelType を変更する
  const onSwitchType = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setChannelDTO((channel) => {
        channel.channelType = Publicity.PRIVATE;
        setPasswordButtonDisabled(false);
        return channel;
      });
    } else {
      setChannelDTO((channel) => {
        channel.channelType = Publicity.PUBLIC;
        setPasswordButtonDisabled(true);
        return channel;
      });
    }
  };
  // button を click して channel を作成する
  // onclick に設定する
  // channels を更新する
  const createChannelAndSetChannels = useCallback(
    async (createChannelDto: createChannelDTO) => {
      await makeAPIRequest<ChannelType>("post", "/chats", createChannelDto)
        .then((result) => {
          if (result.success) {
            setError("");
            setChannels([...channels, result.data]);
            // チャンネル作成後にmodalに使用するデータを初期化する
            clearModal();
            // チャンネル作成後に modal を閉じる
            closeModal();
          } else {
            setError(result.error);
          }
        })
        .catch((err) => {
          setError("An unexpected error occured.");
        });
    },
    [channels],
  );

  // チャンネル名を設定する
  const setChannelName = (channelName: string) => {
    setChannelDTO((channel) => {
      channel.channelName = channelName;
      return channel;
    });
  };

  // チャンネルのパスワードを設定する
  const setChannelPassword = (channelPassword: string) => {
    setChannelDTO((channel) => {
      channel.password = channelPassword;
      return channel;
    });
  };

  // チェックボックスの on/off によって password の入力を有効/無効にする
  const onSwitchPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setPublicityButtonDisabled(true);
      setPasswordDisabled(false);
    } else {
      setPasswordDisabled(true);
      setPublicityButtonDisabled(false);
      // チェックボックスを off にしたときに password を空にする
      if (inputPasswordRef.current) {
        inputPasswordRef.current.value = "";
      }
      setChannelDTO((channel) => {
        channel.password = null;
        return channel;
      });
    }
  };

  const clearModal = () => {
    if (inputChannelNameRef.current) {
      inputChannelNameRef.current.value = "";
    }
    if (inputPasswordRef.current) {
      inputPasswordRef.current.value = "";
    }
    setChannelDTO({
      channelName: "",
      ownerId: 0,
      channelType: Publicity.PUBLIC,
      password: null,
    });
  };

  return (
    <div
      className="flex-col items-center justify-center overflow-hidden bg-darkslategray-100 p-10  font-body text-xl text-base-white"
      onClick={stopPropagation}
    >
      <div className="p-2 text-5xl tracking-widest">Create Channel</div>
      <div className="p-1">
        <TextField
          className="bg-[transparent] [border:none]"
          sx={{ width: 240 }}
          color="info"
          variant="filled"
          type="text"
          name="Channel name"
          label="Channel name"
          size="medium"
          margin="none"
          inputRef={inputChannelNameRef}
          onChange={(e) => setChannelName(e.target.value)}
        />
      </div>
      {/* チャンネルの公開/非公開を設定する */}
      <div className="w-6 p-2">
        <FormControlLabel
          className=""
          label="private" // private/public
          control={
            <Switch
              color="info"
              size="medium"
              onChange={(e) => onSwitchType(e)}
            />
          }
          disabled={publicityButtonDisabled}
        />
      </div>

      {/* チャンネルのパスワードを設定する */}
      <div className="w-6 p-2">
        <FormControlLabel
          className=""
          label="password" // password on/off
          control={
            <Switch
              color="info"
              size="medium"
              onChange={(e) => {
                onSwitchPassword(e);
              }}
            />
          }
          disabled={passwordButtonDisabled}
        />
      </div>

      <div className="p-2">
        <TextField
          className="bg-[transparent] [border:none]"
          sx={{ width: 241 }}
          color="info"
          variant="filled"
          type="text"
          name="Password"
          label="Password"
          size="medium"
          margin="none"
          onChange={(e) => {
            setChannelPassword(e.target.value);
          }}
          inputRef={inputPasswordRef}
          disabled={passwordDisabled}
        />
      </div>
      <span>
        <button
          className="cursor-pointer justify-self-center rounded-sm bg-gray-300 px-4 py-2 [border:none]"
          onClick={() => createChannelAndSetChannels(channelDTO)}
        >
          Create channel
        </button>
        <span className="h-[41px] w-[200px] text-center text-xs normal-case tracking-tighter">
          {error && <p>error: {error}</p>}
        </span>
      </span>
    </div>
  );
};

export default MCreateChannel;
