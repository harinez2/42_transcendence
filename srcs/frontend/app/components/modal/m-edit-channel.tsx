import React, { useCallback, useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import makeAPIRequest from "../..//api/api";
import { TextField, FormControlLabel, Switch } from "@mui/material";
import { ChannelType, Publicity, updateChannelDTO } from "../../chat/types";

type MEditChannelType = {
  onClose: () => void;
  channel: ChannelType;
  setChannel: (c: ChannelType) => void;
  removeChannel: (channelId: number) => void;
};

const MEditChannel: NextPage<MEditChannelType> = ({ onClose, channel, setChannel, removeChannel }) => {
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const inputChannelNameRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const [channelDTO, setChannelDTO] = useState<updateChannelDTO>({
    channelName: channel.channelName,
    channelType: channel.channelType as Publicity,
    password: null,
  });

  useEffect(() => {
    // channelDTO を channel の値で更新する
    setChannelDTO({
      channelName: channel.channelName,
      channelType: channel.channelType as Publicity,
      password: null,
    });
  }, [channel]);

  const [publicityButtonDisabled, setPublicityButtonDisabled] =
    useState<boolean>(false); // [true: private, false: public
  const [passwordButtonDisabled, setPasswordButtonDisabled] =
    useState<boolean>(true);
  const [passwordDisabled, setPasswordDisabled] = useState<boolean>(true);


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
      setChannelDTO((c) => {
        c.channelType = Publicity.PRIVATE;
        setPasswordButtonDisabled(false);
        return { ...c };
      });
    } else {
      setChannelDTO((c) => {
        c.channelType = Publicity.PUBLIC;
        setPasswordButtonDisabled(true);
        return { ...c };
      });
    }
  };

  // button を click して channel を update する
  // onclick に設定する
  // channels を更新する
  const updateChannelAndSetChannels = useCallback(
    async (channelId: number, updateChannelDto: updateChannelDTO) => {
      console.log(updateChannelDto);
      await makeAPIRequest<ChannelType>("put", `/chats/${channelId}`, updateChannelDto)
        .then((result) => {
          if (result.success) {
            setError("");
            // DTO の値を channel に反映する
            setChannel(
              {
                ...channel,
                channelName: updateChannelDto.channelName,
                channelType: updateChannelDto.channelType,
              }
            );
            // チャンネル作成後にmodalに使用するデータを初期化する
            clearModal();
            // チャンネル作成後に modal を閉じる
            onClose();
          } else {
            setError(result.error);
          }
        })
        .catch((err) => {
          setError("An unexpected error occured.");
        });
    },
    [channel], // TODO:  channel？じゃないほうが適切かも？
  );

  // button を click して channel を remove する
  // onclick に設定する
  // channels を更新する
  const removeChannelAndSetChannels = useCallback(
    async (channelId: number) => {
      await makeAPIRequest("delete", `/chats/${channelId}`)
        .then((result) => {
          if (result.success) {
            setError("");
            // DTO の値を channel に反映する
            removeChannel(channelId);
            // チャンネル作成後にmodalに使用するデータを初期化する
            clearModal();
            // チャンネル作成後に modal を閉じる
            onClose();
          } else {
            setError(result.error);
          }
        })
        .catch((err) => {
          setError("An unexpected error occured.");
        });
    },
    [channel], // TODO:  channel？じゃないほうが適切かも？
  );

  // チャンネル名を設定する
  const setChannelName = (channelName: string) => {
    setChannelDTO((c) => {
      c.channelName = channelName;
      return { ...c };
    });
  };

  // チャンネルのパスワードを設定する
  const setChannelPassword = (channelPassword: string) => {
    setChannelDTO((c) => {
      c.password = channelPassword;
      return { ...c };
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
      setChannelDTO((c) => {
        c.password = null;
        return { ...c };
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
      channelType: Publicity.PUBLIC,
      password: null,
    });
  };




  return (
    <div
      className="flex-col items-center h-96 w-72 justify-center overflow-hidden bg-darkslategray-100 p-10  font-body text-xl text-base-white"
      onClick={stopPropagation}
    >
      <div className="text-5xl tracking-widest">
        Edit Channel
      </div>
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
        value={channelDTO.channelName}
        inputRef={inputChannelNameRef}
        onChange={(e) => setChannelName(e.target.value)}
      />

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
              checked={channel.channelType === "PRIVATE" ? true : false}
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
              checked={channel.isPassword}
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
          value=""
          onChange={(e) => {
            setChannelPassword(e.target.value);
          }}
          inputRef={inputPasswordRef}
          disabled={passwordDisabled}
        />
      </div>
      <div className="h-4 flex-col justify-between">
        <span>
          <button
            className="cursor-pointer  rounded-sm bg-gray-300 m-2 px-4 py-2 [border:none]"
            onClick={() => updateChannelAndSetChannels(channel.channelId, channelDTO)}
          >
            Edit channel
          </button>
          <span className="h-[41px] w-[200px] text-center text-xs normal-case tracking-tighter">
            {error && <p>error: {error}</p>}
          </span>
        </span>
        <span>
          <button
            className="cursor-pointer rounded-sm bg-red-500 m-2 px-4 py-2 [border:none]"
            onClick={() => removeChannelAndSetChannels(channel.channelId)}
          >
            Delete channel
          </button>
          <span className="h-[41px] w-[200px] text-center text-xs normal-case tracking-tighter">
            {error && <p>error: {error}</p>}
          </span>
        </span>
      </div>
    </div >
  );
};

export default MEditChannel;
