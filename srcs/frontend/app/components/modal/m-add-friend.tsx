import React, { useEffect, useState } from 'react';
import type { NextPage } from "next";
import { TextField } from "@mui/material";
import makeAPIRequest from '@/app/api/api';

type MAddFriendType = {
  onClose?: () => void;
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

  const [inputValue, setInputValue] = useState('');
  const [users, setUsers] = useState<UserType[]>();
  // const [user, setUser] = useState<UserType>();
  let msg: string = "";

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddClick = () => {
    const input :string = inputValue;
    
    useEffect(() => {
      //user一覧の取得
      makeAPIRequest<UserType[]>("get", `/users`)
        .then((result) => {
          if (result.success) {
            setUsers(result.data);
          } else {
            console.error(result.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }, []);
    
    const found :UserType | undefined = users?.find((element) => element.username === input);
    if (found) {
      useEffect(() => {
        //フレンズに追加
        //    makeAPIRequest("post", "/auth/2fa", { userId: userId, code: otp })
      // .then((result) => {

        makeAPIRequest<UserType>("post", `/friends/follow`, { followeeId: found.id})
          .then((result) => {
            if (result.success) {
              msg = "Added!";
            } else {
              console.error(result.error);
            }
          })
          .catch((error) => {
            console.error("Error:", error.message);
          });
    
      }, []);
    }
    else {
      msg = "Name not found"
    }
    setInputValue('');
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
      <button className="absolute left-[75px] top-[181px] h-[42px] w-[253px] cursor-pointer bg-[transparent] p-0 [border:none]" onClick={handleAddClick}>
        <img
          className="absolute left-[0px] top-[0px] h-[41px] w-[240.84px]"
          alt=""
          src="/rectangle-12121.svg"
        />
        <div className="absolute left-[50.9px] top-[8px] inline-block h-[34px] w-[202.1px] text-left font-body text-5xl tracking-[0.1em] text-white">
          Add friend
        </div>
      </button>
      <div>
        {msg}
      </div>
    </div>
  );
};

export default MAddFriend;
