import type { NextPage } from "next";
import { useMemo } from "react";
import CSS, { Property } from "csstype";

interface HeaderMenuType {
  icon1?: string;

  /** Style props */
  headerMenuPosition?: Property.Position;
  headerMenuTop?: Property.Top;
  headerMenuLeft?: Property.Left;
  iconCursor?: Property.Cursor;
  friendsCursor?: Property.Cursor;
  friendsBorder?: Property.Border;
  friendsPadding?: Property.Padding;
  friendsBackgroundColor?: Property.BackgroundColor;
  dMCursor?: Property.Cursor;
  dMBorder?: Property.Border;
  dMPadding?: Property.Padding;
  dMBackgroundColor?: Property.BackgroundColor;
  gameCursor?: Property.Cursor;
  gameBorder?: Property.Border;
  gamePadding?: Property.Padding;
  gameBackgroundColor?: Property.BackgroundColor;
  ftTranscendenceCursor?: Property.Cursor;
  ftTranscendenceBorder?: Property.Border;
  ftTranscendencePadding?: Property.Padding;
  ftTranscendenceBackgroundColor?: Property.BackgroundColor;
  headerMenuWidth?: Property.Width;
  headerMenuRight?: Property.Right;

  /** Action props */
  onIconClick?: () => void;
  onFriendsClick?: () => void;
  onDMClick?: () => void;
  onGameClick?: () => void;
  onFtTranscendenceClick?: () => void;
}

const HeaderMenu: NextPage<HeaderMenuType> = ({
  icon1,
  headerMenuPosition,
  headerMenuTop,
  headerMenuLeft,
  iconCursor,
  friendsCursor,
  friendsBorder,
  friendsPadding,
  friendsBackgroundColor,
  dMCursor,
  dMBorder,
  dMPadding,
  dMBackgroundColor,
  gameCursor,
  gameBorder,
  gamePadding,
  gameBackgroundColor,
  ftTranscendenceCursor,
  ftTranscendenceBorder,
  ftTranscendencePadding,
  ftTranscendenceBackgroundColor,
  headerMenuWidth,
  headerMenuRight,
  onIconClick,
  onFriendsClick,
  onDMClick,
  onGameClick,
  onFtTranscendenceClick,
}) => {
  const headerMenuStyle: CSS.Properties = useMemo(() => {
    return {
      position: headerMenuPosition,
      top: headerMenuTop,
      left: headerMenuLeft,
      width: headerMenuWidth,
      right: headerMenuRight,
    };
  }, [
    headerMenuPosition,
    headerMenuTop,
    headerMenuLeft,
    headerMenuWidth,
    headerMenuRight,
  ]);

  const iconStyle: CSS.Properties = useMemo(() => {
    return {
      cursor: iconCursor,
    };
  }, [iconCursor]);

  const friendsStyle: CSS.Properties = useMemo(() => {
    return {
      cursor: friendsCursor,
      border: friendsBorder,
      padding: friendsPadding,
      backgroundColor: friendsBackgroundColor,
    };
  }, [dMCursor, dMBorder, dMPadding, dMBackgroundColor]);

  const dMStyle: CSS.Properties = useMemo(() => {
    return {
      cursor: dMCursor,
      border: dMBorder,
      padding: dMPadding,
      backgroundColor: dMBackgroundColor,
    };
  }, [dMCursor, dMBorder, dMPadding, dMBackgroundColor]);

  const gameStyle: CSS.Properties = useMemo(() => {
    return {
      cursor: gameCursor,
      border: gameBorder,
      padding: gamePadding,
      backgroundColor: gameBackgroundColor,
    };
  }, [gameCursor, gameBorder, gamePadding, gameBackgroundColor]);

  const ftTranscendenceStyle: CSS.Properties = useMemo(() => {
    return {
      cursor: ftTranscendenceCursor,
      border: ftTranscendenceBorder,
      padding: ftTranscendencePadding,
      backgroundColor: ftTranscendenceBackgroundColor,
    };
  }, [
    ftTranscendenceCursor,
    ftTranscendenceBorder,
    ftTranscendencePadding,
    ftTranscendenceBackgroundColor,
  ]);

  return (
    <div
      className="relative h-[100px] w-[1440px] text-left font-body text-5xl text-white"
      style={headerMenuStyle}
    >
      <div className="absolute inset-x-0 top-[calc(50%_-_50px)] h-[100px] w-full bg-darkslategray-300" />
      <img
        className="absolute right-[30px] top-[calc(50%_-_22px)] h-[45px] w-[45px]"
        alt=""
        src={icon1}
        style={iconStyle}
        onClick={onIconClick}
      />
      <div className="absolute right-[138px] top-[calc(50%_-_5px)] h-[29px] w-[279px]">
        <div
          className="absolute right-[190px] top-[calc(50%_-_13.5px)] tracking-[0.1em]"
          style={friendsStyle}
          onClick={onFriendsClick}
        >
          friends
        </div>
        <div
          className="absolute right-[109px] top-[calc(50%_-_13.5px)] tracking-[0.1em]"
          style={dMStyle}
          onClick={onDMClick}
        >
          DM
        </div>
        <div
          className="absolute right-[0px] top-[calc(50%_-_14.5px)] tracking-[0.1em]"
          style={gameStyle}
          onClick={onGameClick}
        >
          game
        </div>
      </div>
      <div
        className="absolute left-[37px] top-[calc(50%_-_26px)] text-29xl tracking-[0.1em]"
        style={ftTranscendenceStyle}
        onClick={onFtTranscendenceClick}
      >
        ft_transcendence
      </div>
    </div>
  );
};

export default HeaderMenu;
