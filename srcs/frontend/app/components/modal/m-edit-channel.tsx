import React, { useCallback, useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import makeAPIRequest from "../..//api/api";
import { TextField, FormControlLabel, Switch } from "@mui/material";
import { ChannelType, Publicity, updateChannelDTO } from "../../chat/types";

type MEditChannelType = {
  onClose: () => void;
  channel: ChannelType;
  setChannel: (c: ChannelType) => void; // eslint-disable-line no-unused-vars
  removeChannel: (channelId: number) => void; // eslint-disable-line no-unused-vars
};

const MEditChannel: NextPage<MEditChannelType> = ({
  onClose,
  channel,
  setChannel,
  removeChannel,
}) => {
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const inputChannelNameRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  // パスワードボタンが ON か OFF かを管理する
  const [passwordEnabled, setPasswordEnabled] = useState<boolean>(false);

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
    setPublicityButtonDisabled(channel.isPassword);
    setPasswordEnabled(channel.isPassword);
    setPasswordButtonDisabled(channel.channelType === "PRIVATE" ? false : true);
  }, [channel]);

  const [publicityButtonDisabled, setPublicityButtonDisabled] =
    useState<boolean>(false); // [true: private, false: public
  // パスワードボタンが disabled かどうかを管理する
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
      setPasswordButtonDisabled(false);
      setChannelDTO((c) => {
        c.channelType = Publicity.PRIVATE;
        return { ...c };
      });
    } else {
      setPasswordButtonDisabled(true);
      setChannelDTO((c) => {
        c.channelType = Publicity.PUBLIC;
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
      await makeAPIRequest<ChannelType>(
        "put",
        `/chats/${channelId}`,
        updateChannelDto,
      )
        .then((result) => {
          if (result.success) {
            setError("");
            // DTO の値を channel に反映する
            setChannel({
              ...channel,
              channelName: updateChannelDto.channelName,
              channelType: updateChannelDto.channelType,
              isPassword: updateChannelDto.password ? true : false,
            });
            // チャンネル作成後にmodalに使用するデータを初期化する
            clearModal();
            // チャンネル作成後に modal を閉じる
            onClose();
          } else {
            setError(result.error);
          }
        })
        .catch((err) => {
          setError("An unexpected error occured." + err.message);
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
          setError("An unexpected error occured." + err.message);
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
      setPasswordEnabled(true);
      setPasswordDisabled(false);
    } else {
      setPasswordDisabled(true);
      setPasswordEnabled(false);
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
      className="h-96 w-72 flex-col items-center justify-center overflow-hidden bg-darkslategray-100 p-10  font-body text-xl text-base-white"
      onClick={stopPropagation}
    >
      <div className="text-5xl tracking-widest">Edit Channel</div>
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
              checked={passwordEnabled}
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
          value={channelDTO.password ? channelDTO.password : ""}
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
            className="m-2  cursor-pointer rounded-sm bg-gray-300 px-4 py-2 [border:none]"
            onClick={() =>
              updateChannelAndSetChannels(channel.channelId, channelDTO)
            }
          >
            Edit channel
          </button>
          <span className="h-[41px] w-[200px] text-center text-xs normal-case tracking-tighter">
            {error && <p>error: {error}</p>}
          </span>
        </span>
        <span>
          <button
            className="m-2 cursor-pointer rounded-sm bg-red-500 px-4 py-2 [border:none]"
            onClick={() => removeChannelAndSetChannels(channel.channelId)}
          >
            Delete channel
          </button>
          <span className="h-[41px] w-[200px] text-center text-xs normal-case tracking-tighter">
            {error && <p>error: {error}</p>}
          </span>
        </span>
      </div>
    </div>
  );
};

export default MEditChannel;
