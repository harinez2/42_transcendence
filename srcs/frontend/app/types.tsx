import React from "react";

export type ProfileType = {
  userId: string;
  bio: string;
};

export type ModalWindowType = {
  ref: React.MutableRefObject<HTMLDialogElement | null>;
  showModal: () => void;
  closeModal: () => void;
};
