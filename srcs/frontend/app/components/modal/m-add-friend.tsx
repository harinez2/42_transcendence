import React, { useContext, useEffect, useState } from "react";
import type { NextPage } from "next";
import { TextField } from "@mui/material";
import makeAPIRequest from "@/app/api/api";
import { ProfileContext } from "@/app/layout";

type MAddFriendType = {
  onClose?: () => void;
};

export type ProfileType = {
  id: number;
  bio: string;
  userId: number;
};

export type UserType = {
  id: number;
  username: string;
  avatar: Uint8Array;
  email: string;
  staff: boolean;
  password: string;
  twoFactorAuthEnabled: boolean;
  twoFactorAuthSecret: string;
};

const MAddFriend: NextPage<MAddFriendType> = ({ onClose }) => {
  const profile: ProfileType = useContext(ProfileContext);
  const [blockeds, setBlockeds] = useState<UserType[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [msg, setMsg] = useState("");
  const [users, setUsers] = useState<UserType[]>();

  useEffect(() => {
    //user一覧の取得
    makeAPIRequest<UserType[]>("get", `/users`)
      .then((result) => {
        if (result.success) {
          console.log("get_users, success");
          setUsers(result.data);
        } else {
          console.error(result.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, []);

  useEffect(() => {
    if (profile.userId != 0) {
      // Blockeds一覧を取得
      makeAPIRequest<UserType[]>(
        "get",
        `/friends/block/blockeds/${profile.userId}`,
      )
        .then((result) => {
          if (result.success) {
            setBlockeds(result.data);
          } else {
            console.error(result.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  }, [profile]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddClick = () => {
    const input: string = inputValue;
    const found: UserType | undefined = users?.find((element) => {
      return element.username === input;
    });
    console.log("found", found);
    if (found) {
      //フレンズに追加
      makeAPIRequest<UserType>("post", `/friends/follow`, {
        followeeId: found.id,
      })
        .then((result) => {
          if (result.success) {
            setMsg("Added!");
          } else {
            const found2: UserType | undefined = blockeds?.find((element) => {
              return element.username === input;
            });
            if (found2) {
                console.error(result.error);
                setMsg("Cannot add Blocked user");
              }
              else {
                console.error(result.error);
                setMsg("Already followed");
             }
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    } else {
      setMsg("Name not found");
    }
    console.log("msg;", msg);
    setInputValue("");
  };

  return (
    <div className="relative h-[280px] max-h-full w-[390px] max-w-full overflow-hidden bg-darkslategray-100 text-left font-body text-5xl text-white">
      <div className="absolute left-[32px] top-[50px] tracking-[0.1em]">
        Add friend
      </div>
      <TextField
        id="filled-basic"
        className="absolute left-[75px] top-[116px] bg-[transparent] [border:none]"
        sx={{ width: 241 }}
        color="info"
        variant="filled"
        type="text"
        label="friend name"
        size="medium"
        margin="none"
        onChange={handleInputChange}
        required
      />
      <button
        className="absolute left-[75px] top-[181px] h-[42px] w-[253px] cursor-pointer bg-[transparent] p-0 [border:none]"
        onClick={handleAddClick}
      >
        <img
          className="absolute left-[0px] top-[0px] h-[41px] w-[240.84px]"
          alt=""
          src="/rectangle-12121.svg"
        />
        <div className="absolute left-[50.9px] top-[8px] inline-block h-[34px] w-[202.1px] text-left font-body text-5xl tracking-[0.1em] text-white">
          Add friend
        </div>
      </button>
      <div className="absolute left-[75px] top-[230px] text-darkgray-200">
        {msg}
      </div>
    </div>
  );
};

export default MAddFriend;
