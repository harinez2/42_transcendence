"use client";

import React, { useEffect, useState } from "react";
import { useCallback, useContext } from "react";
import MatchMakingDialog from "./match_making";
import GameSettingsDialog from "./game_settings";
import { ProfileContext, SocketContext } from "../../layout";
import { ProfileType } from "@/app/types";
import { GameSettingsType, WaitStatus, WaitStatusType } from "../types";
import GameBackground from "../../components/game-background";
import { useRouter } from "next/navigation";
import ModalPopup from "../../components/modal/modal-popup";

const GamePreparingUI = () => {
  const router = useRouter();

  const [isMatchMakingModalOpen, setMatchMakingModalOpen] = useState(false);
  const [isGameSettingsModalOpen, setGameSettingsModalOpen] = useState(false);

  const closeMatchMakingModal = useCallback(() => {
    setMatchMakingModalOpen(false);
  }, []);
  const openMatchMakingModal = useCallback(() => {
    setMatchMakingModalOpen(true);
  }, []);
  const closeGameSettingsModal = useCallback(() => {
    setGameSettingsModalOpen(false);
  }, []);
  const openGameSettingsModal = useCallback(() => {
    setGameSettingsModalOpen(true);
  }, []);

  const profile: ProfileType = useContext(ProfileContext);
  const socket: any = useContext(SocketContext);

  const stopPropagation = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
    },
    [],
  );

  let [settingStatus, setSettingStatus] = useState<WaitStatusType | undefined>(
    WaitStatus.Initial,
  );
  const [gameId, setGameId] = useState(-1);
  // eslint-disable-next-line no-unused-vars
  let gameSettings: GameSettingsType = {
    points: 3,
    isSpeedUp: false,
  };

  useEffect(() => {
    if (socket) {
      // 現在のステータスをbackendに聞く
      socket.once("game-status", (status: WaitStatusType, gameId: number) => {
        console.log("received game-status: ", status);
        setSettingStatus(status);
        if (gameId) setGameId(gameId);
      });
      console.log("emitted game-getstatus: userId=", profile.userId);
      socket?.emit("game-getstatus", profile);
    }
  }, [socket]);

  useEffect(() => {
    if (!socket || settingStatus === WaitStatus.Initial) return;

    console.log("settingStatus: ", settingStatus);

    if (settingStatus === WaitStatus.NotStarted) {
      // waitlistに登録
      console.log("!!!!!");
      openMatchMakingModal();
      closeGameSettingsModal();
      console.log("game-addwaitlist: ", profile);
      socket?.emit("game-addwaitlist", profile);
      setSettingStatus(WaitStatus.NotMatched);
    } else if (settingStatus === WaitStatus.NotMatched) {
      console.log("?????");
      openMatchMakingModal();
      closeMatchMakingModal();

      // user1: 設定リクエストが来たとき
      socket?.on("game-configrequest", (gameUserFromServer: any) => {
        console.log("game-configrequest: ", gameUserFromServer);
        setGameId(gameUserFromServer.gameId);
        setSettingStatus(WaitStatus.WaitingForSetting);
        socket?.off("game-configrequest");
        socket?.off("game-configuring");
      });
      // user2: user1が設定中のイベントが来た時
      socket?.on("game-configuring", (gameUserFromServer: any) => {
        console.log("game-configuring: ", gameUserFromServer);
        setGameId(gameUserFromServer.gameId);
        setSettingStatus(WaitStatus.WaitingForOpponentSetting);
        socket?.off("game-configrequest");
        socket?.off("game-configuring");
      });
    } else if (
      settingStatus === WaitStatus.WaitingForSetting ||
      settingStatus === WaitStatus.WaitingForOpponentSetting
    ) {
      console.log("!!!!!????");
      if (settingStatus === WaitStatus.WaitingForSetting) {
        closeMatchMakingModal();
        openGameSettingsModal();
      } else {
        openMatchMakingModal();
        closeGameSettingsModal();
      }
      // 設定が完了し、ゲーム開始したとき
      socket?.once("game-ready", (gameId: number) => {
        console.log(`game-ready: gameId=${gameId}`);
        setSettingStatus(WaitStatus.Gaming);
      });
    } else if (settingStatus === WaitStatus.Gaming) {
      router.push(`/game/${gameId}`);
    }
  }, [settingStatus]);

  // MatchMakingDialogのキャンセルボタン操作時
  const handleMatchMakingDialogClose = () => {
    closeMatchMakingModal();
    socket?.emit("game-removefromwaitlist", profile);
    console.log("game-removefromwaitlist: ", profile);
    router.push("/game");
  };

  // GameSettingsDialogのPlayボタン操作時
  const handleGameSettingsDialogPlay = (
    gameSettingsFromModal: GameSettingsType,
  ) => {
    closeGameSettingsModal();
    socket?.emit("game-config", gameSettingsFromModal);
    gameSettings = gameSettingsFromModal;
  };

  return (
    <GameBackground user1="" user2="">
      {isMatchMakingModalOpen && (
        <ModalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={handleMatchMakingDialogClose}
        >
          <MatchMakingDialog
            closeModal={handleMatchMakingDialogClose}
            stopPropagation={stopPropagation}
            settingStatus={settingStatus}
          />
        </ModalPopup>
      )}

      {isGameSettingsModalOpen && (
        <ModalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={handleMatchMakingDialogClose}
        >
          <GameSettingsDialog
            closeModal={handleGameSettingsDialogPlay}
            stopPropagation={stopPropagation}
            gameId={gameId}
          />
        </ModalPopup>
      )}
    </GameBackground>
  );
};

export default GamePreparingUI;
