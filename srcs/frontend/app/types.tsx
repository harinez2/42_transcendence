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

export const WaitStatus = {
  Initial: 0,             // 初期状態
  NotMatched: 1,          // waitlist登録済み、相手探し中
  WaitingForSetting: 2,   // マッチした、設定中
  Gaming: 3,              // 設定完了、ゲーム開始可能
} as const;

export type WaitStatusType = (typeof WaitStatus)[keyof typeof WaitStatus];
// 上は type WaitStatusType = 0 | 1 | 2 | 3 と同じ意味
