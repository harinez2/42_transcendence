"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import makeAPIRequest from "@/app/api/api";
import { MatchType, ProfileType, UserType } from "@/app/types";
import ModalPopup from "../components/modal/modal-popup";
import MUserOps from "../components/modal/m-user-ops";
import { ProfileContext, SocketContext } from "../layout";
import { useRouter } from "next/navigation";

const MatchComponent = ({
  match,
  userId,
}: {
  match: MatchType;
  userId: number;
}) => {
  const socket: any = useContext(SocketContext);
  const profile: ProfileType = useContext(ProfileContext);
  const router = useRouter();

  const [isMUserOpsOpen, setMUserOpsOpen] = useState(false);
  const [opponent, setOpponent] = useState<UserType>();
  const [opponentName, setOpponentName] = useState<string>("");
  const [opponentId, setOpponentId] = useState<number>(0);
  const [opponentScore, setOpponentScore] = useState<number>(0);
  const [myScore, setMyScore] = useState<number>(0);
  const [score, setScore] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [icon, setIcon] = useState<string>(
    `http://localhost:3000/api/users/avatar/0`,
  );
  const [result, setResult] = useState<string>();

  const openMUserOps = useCallback(() => {
    setMUserOpsOpen(true);
  }, []);

  const closeMUserOps = useCallback(() => {
    setMUserOpsOpen(false);
  }, []);

  useEffect(() => {
    if (userId && match) {
      if (userId === match.user1Id) {
        setMyScore(match.user1Score);
        setOpponentId(match.user2Id);
        setOpponentScore(match.user2Score);
      } else {
        setMyScore(match.user2Score);
        setOpponentId(match.user1Id);
        setOpponentScore(match.user1Score);
      }
      setScore(match.user1Score + " - " + match.user2Score);
      const playdate: string = match?.endedAt;
      const res: string = playdate?.slice(0, 10);
      setDate(res);
    }
  }, [match]);

  useEffect(() => {
    if (match && opponentId) {
      // ユーザー情報を取得
      makeAPIRequest<UserType>("get", `/users/${opponentId}`)
        .then((result) => {
          if (result.success) {
            setOpponent(result.data);
            setIcon(`http://localhost:3000/api/users/avatar/${opponentId}`);
          } else {
            console.error(result.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  }, [match, opponentId]);

  useEffect(() => {
    if (myScore || opponentScore) {
      if (myScore > opponentScore) setResult("Win");
      else setResult("Lose");
    }
  }, [myScore, opponentScore]);

  useEffect(() => {
    if (opponent) {
      setOpponentName(opponent.username);
    }
  }, [opponent]);

  return (
    <>
      <div className="border-b-10 flex h-[90px] w-[500px] shrink-0 flex-row items-center justify-start gap-[30px]">
        <img
          src={icon}
          className="relative h-[45px] w-[45px] cursor-pointer rounded-full"
          width={45}
          height={45}
          alt=""
          onClick={openMUserOps}
        />
        <div className="relative w-[150px] truncate tracking-[0.1em]">
          {opponentName}
        </div>
        <b className="relative tracking-[0.1em]">{result}</b>
        <div className="relative w-[100px]">{score}</div>
        <div className="relative w-[190px] tracking-[0.1em] text-silver-100">
          {date}
        </div>
      </div>

      {isMUserOpsOpen && (
        <ModalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeMUserOps}
        >
          <MUserOps
            onClose={closeMUserOps}
            user={opponent}
            router={router}
            socket={socket}
            profile={profile}
          />
        </ModalPopup>
      )}
    </>
  );
};

function MatchHistoryContainer({ userId }: { userId: number }) {
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
