import React from "react";

export type ProfileType = {
  userId: string;
  bio: string;
};

export type GameUserType = {
  gameId: number;
  user1Id: number;
  user2Id: number;
};

export type GameSettingsType = {
  points: number;
  isSpeedUp: boolean;
};

export type ModalWindowType = {
  ref: React.MutableRefObject<HTMLDialogElement | null>;
  showModal: () => void;
  closeModal: () => void;
};
