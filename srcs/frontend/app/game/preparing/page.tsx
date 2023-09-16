"use client";

import React, { useEffect, useState } from "react";
import { useCallback, useContext } from "react";
import useModal from "../../components/useModal";
import MatchMakingDialog from "./match_making";
import GameSettingsDialog from "./game_settings";
import { ProfileContext, SocketContext } from "../../layout";
import { ModalWindowType, ProfileType } from "../../types";
import {
  GameUserType,
  GameSettingsType,
  WaitStatus,
  WaitStatusType,
} from "../types";
import GameBackground from "../../components/game-background";
import { useRouter } from "next/navigation";

const GamePreparingUI = () => {
  const router = useRouter();

  const modal_matchmake: ModalWindowType = useModal();
  const modal_settings: ModalWindowType = useModal();

  const profile: ProfileType = useContext(ProfileContext);
  const socket: any = useContext(SocketContext);

  const stopPropagation = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
    },
    [],
  );

  let [settingStatus, setSettingStatus] = useState<WaitStatusType>(
    WaitStatus.Initial,
  );
  const [gameId, setGameId] = useState(-1);
  let gameUser: GameUserType;
  let gameSettings: GameSettingsType = {
    points: 3,
    isSpeedUp: false,
  };

  useEffect(() => {
    console.log("settingStatus: ", settingStatus);

    if (settingStatus === WaitStatus.Initial) {
      // waitlistに登録
      modal_matchmake.showModal();
      modal_settings.closeModal();
      console.log("game-addwaitlist: ", profile);
      socket?.emit("game-addwaitlist", profile);
      setSettingStatus(WaitStatus.NotMatched);
    }

    if (settingStatus === WaitStatus.NotMatched) {
      // user1: 設定リクエストが来たとき
      socket?.on("game-configrequest", (gameUserFromServer: any) => {
        console.log("game-configrequest: ", gameUserFromServer);
        if (settingStatus !== WaitStatus.NotMatched) {
          console.error("Status error: ", settingStatus);
          router.push("/game");
          return;
        }
        gameUser = gameUserFromServer;
        setGameId(gameUserFromServer.gameId);
        setSettingStatus(WaitStatus.WaitingForSetting);
        socket?.off("game-configrequest");
        socket?.off("game-configuring");
        modal_matchmake.closeModal();
        modal_settings.showModal();
      });
      // user2: user1が設定中のイベントが来た時
      socket?.on("game-configuring", (gameUserFromServer: any) => {
        console.log("game-configuring: ", gameUserFromServer);
        if (settingStatus !== WaitStatus.NotMatched) {
          console.error("Status error: ", settingStatus);
          router.push("/game");
          return;
        }
        gameUser = gameUserFromServer;
        setGameId(gameUserFromServer.gameId);
        setSettingStatus(WaitStatus.WaitingForSetting);
        socket?.off("game-configrequest");
        socket?.off("game-configuring");
      });
    }

    if (settingStatus === WaitStatus.WaitingForSetting) {
      // 設定が完了し、ゲーム開始したとき
      socket?.on("game-ready", (gameId: number) => {
        console.log(`game-ready: gameId=${gameId}`);
        if (settingStatus !== WaitStatus.WaitingForSetting) {
          console.error("Status error: ", settingStatus);
          router.push("/game");
          return;
        }
        setSettingStatus(WaitStatus.Gaming);
        socket?.off("game-ready");
        router.push(`/game/${gameId}`);
      });
    }
  }, [socket, settingStatus]);

  // MatchMakingDialogのキャンセルボタン操作時
  const handleMatchMakingDialogClose = () => {
    modal_matchmake.closeModal();
    socket?.emit("game-removefromwaitlist", profile);
    console.log("game-removefromwaitlist: ", profile);
    router.push("/game");
  };

  // GameSettingsDialogのPlayボタン操作時
  const handleGameSettingsDialogPlay = (
    gameSettingsFromModal: GameSettingsType,
  ) => {
    modal_settings.closeModal();
    socket?.emit("game-config", gameSettingsFromModal);
    gameSettings = gameSettingsFromModal;
  };

  return (
    <GameBackground user1="" user2="">
      <dialog
        ref={modal_matchmake.ref}
        style={{ top: "30px" }}
        className="rounded-lg bg-darkslategray-100 px-6 py-2"
      >
        <MatchMakingDialog
          closeModal={handleMatchMakingDialogClose}
          stopPropagation={stopPropagation}
          settingStatus={settingStatus}
        />
      </dialog>
      <dialog
        ref={modal_settings.ref}
        style={{ top: "30px" }}
        className="rounded-lg bg-darkslategray-100 px-6 py-2"
      >
        <GameSettingsDialog
          closeModal={handleGameSettingsDialogPlay}
          stopPropagation={stopPropagation}
          gameId={gameId}
        />
      </dialog>
    </GameBackground>
  );
};

export default GamePreparingUI;
