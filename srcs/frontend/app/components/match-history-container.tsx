"use client";

import { useCallback, useEffect, useState } from "react";
import makeAPIRequest from "../api/api";
import { MatchType, UserType } from "./types";
import ModalPopup from "./modal/modal-popup";
import MUserOps from "./modal/m-user-ops";

const MatchComponent = ({
  match,
  userId,
}: {
  match: MatchType;
  userId: number;
}) => {
  const [isMUserOpsOpen, setMUserOpsOpen] = useState(false);
  const [opponent, setOpponent] = useState<UserType>();

  const openMUserOps = useCallback(() => {
    setMUserOpsOpen(true);
  }, []);

  const closeMUserOps = useCallback(() => {
    setMUserOpsOpen(false);
  }, []);

  const icon = () => {
    if (userId === match.user1Id) {
      return `http://localhost:3000/api/users/avatar/${match.user2Id}`;
    } else {
      return `http://localhost:3000/api/users/avatar/${userId}`;
    }
  };

  const getResult = () => {
    if (userId === match.user1Id) {
      if (match.user1Score > match.user2Score) return "Win";
      else return "Lose";
    } else {
      if (match.user1Score < match.user2Score) return "Win";
      else return "Lose";
    }
  };

  const getScore = () => {
    const score: string = match.user1Score + " - " + match.user2Score;
    return score;
  };

  const getOpponentId = () => {
    if (userId === match.user1Id) {
      return match.user2Id;
    } else {
      return match.user1Id;
    }
  };

  const getDate = () => {
    const date: string = match.endedAt;
    const res: string = date.slice(0, 10);
    return res;
  };

  useEffect(() => {
    if (match) {
      // ユーザー情報を取得
      makeAPIRequest<UserType>("get", `/users/${getOpponentId()}`)
        .then((result) => {
          if (result.success) {
            setOpponent(result.data);
          } else {
            console.error(result.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  }, [match]);
  console.log("match.user1Score", match.user1Score);

  return (
    <>
      <div className="border-b-10 flex h-[90px] w-[500px] shrink-0 flex-row flex-row items-center justify-start gap-[30px]">
        <img
          src={icon()}
          className="relative h-[45px] w-[45px] cursor-pointer rounded-full"
          width={45}
          height={45}
          alt=""
          onClick={openMUserOps}
        />
        <div className="relative w-[150px] truncate tracking-[0.1em]">
          {opponent?.username}
        </div>
        <b className="relative tracking-[0.1em]">{getResult()}</b>
        <div className="relative w-[100px]">{getScore()}</div>
        <div className="relative w-[190px] tracking-[0.1em] text-silver-100">
          {getDate()}
        </div>
      </div>
      {isMUserOpsOpen && (
        <ModalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeMUserOps}
        >
          <MUserOps onClose={closeMUserOps} />
        </ModalPopup>
      )}
    </>
  );
};

function MatchHistoryContainer({ userId }: any) {
  const [matches, setMatches] = useState<MatchType[]>([]);

  useEffect(() => {
    if (userId != 0) {
      // Match History一覧を取得
      makeAPIRequest<MatchType[]>("get", `/games/user/${userId}`)
        .then((result) => {
          if (result.success) {
            setMatches(result.data);
          } else {
            console.error(result.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  }, [userId]);

  return (
    <div>
      <div className="absolute left-[481px] top-[806px] tracking-[0.1em]">
        Match history
      </div>
      <div className="absolute left-[479px] top-[866px] flex w-[490px]">
        <div>
          {matches
            ?.slice(0)
            .reverse()
            .map((match) => (
              <MatchComponent
                key={match.gameId}
                match={match}
                userId={userId}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default MatchHistoryContainer;
