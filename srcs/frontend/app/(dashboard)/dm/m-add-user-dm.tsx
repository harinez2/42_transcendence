import React, { useCallback, useContext, useState } from "react";
import type { NextPage } from "next";
import { TextField } from "@mui/material";
import makeAPIRequest from "@/app/api/api";
import { ProfileContext } from "../layout";
import { ProfileType, UserType } from "@/app/types";

type MAddUserType = {
  onClose: () => void;
};

// eslint-disable-next-line no-unused-vars
const MAddUserDm: NextPage<MAddUserType> = ({ onClose }) => {
  const profile: ProfileType = useContext(ProfileContext);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const stopPropagation = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
    },
    [],
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddClick = async () => {
    let userId = 0;

    // 入力したユーザ名からuserIdを取得
    await makeAPIRequest<UserType>("get", `/users/username/${inputValue}`)
      .then((result) => {
        if (result.success && result.data) {
          userId = result.data.id;
        } else {
          setError("Error: Could not find the user.");
        }
      })
      .catch((error) => {
        console.error("Error: Could not find the user:", error.message);
        setError(`Error: Could not find the user: ${error.message}`);
      });

    if (userId !== 0) {
      // DMルームを作成
      await makeAPIRequest<any>("post", "/dms", {
        user1Id: profile.userId,
        user2Id: userId,
      })
        .then((result) => {
          if (result.success) {
            setError("");
            onClose();
          } else {
            setError("Error: " + result.error);
          }
        })
        .catch((error) => {
          console.error("Error: Could not add DM room:", error.message);
          setError(`Error: Could not add DM room: ${error.message}`);
        });
    }
    setInputValue("");
  };

  return (
    <div
      onClick={stopPropagation}
      className="relative h-[280px] max-h-full w-[390px] max-w-full overflow-hidden bg-darkslategray-100 text-left font-body text-5xl text-white"
    >
      <div className="absolute left-[32px] top-[50px] tracking-[0.1em]">
        Add user
      </div>
      <TextField
        id="filled-basic"
        className="absolute left-[75px] top-[116px] bg-[transparent] [border:none]"
        sx={{ width: 241 }}
        color="info"
        variant="filled"
        type="text"
        label="user name"
        size="medium"
        margin="none"
        onChange={handleInputChange}
        required
        value={inputValue}
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
          Add user
        </div>
      </button>
      <div className="absolute left-[75px] top-[230px] text-sm text-red-600">
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default MAddUserDm;
