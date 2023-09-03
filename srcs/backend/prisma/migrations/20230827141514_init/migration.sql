-- CreateEnum
CREATE TYPE "Publicity" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('OWNER', 'ADMIN', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "staff" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT,
    "twoFactorAuthEnabled" BOOLEAN NOT NULL DEFAULT false,
    "twoFactorAuthSecret" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "bio" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBlock" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "blockedUserId" INTEGER NOT NULL,

    CONSTRAINT "UserBlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatChannels" (
    "channelId" SERIAL NOT NULL,
    "channelName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "channelType" "Publicity" NOT NULL,
    "hashedPassword" TEXT,

    CONSTRAINT "ChatChannels_pkey" PRIMARY KEY ("channelId")
);

-- CreateTable
CREATE TABLE "ChatChannelUsers" (
    "channelUserId" SERIAL NOT NULL,
    "channelId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" "UserType" NOT NULL,

    CONSTRAINT "ChatChannelUsers_pkey" PRIMARY KEY ("channelUserId")
);

-- CreateTable
CREATE TABLE "ChatMessages" (
    "messageId" SERIAL NOT NULL,
    "channelId" INTEGER NOT NULL,
    "senderId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatMessages_pkey" PRIMARY KEY ("messageId")
);

-- CreateTable
CREATE TABLE "ChatBan" (
    "id" SERIAL NOT NULL,
    "channelId" INTEGER NOT NULL,
    "bannedUserId" INTEGER NOT NULL,

    CONSTRAINT "ChatBan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatMute" (
    "id" SERIAL NOT NULL,
    "channelId" INTEGER NOT NULL,
    "mutedUserId" INTEGER NOT NULL,
    "muteUntil" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatMute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DmChannels" (
    "channelId" SERIAL NOT NULL,
    "user1Id" INTEGER NOT NULL,
    "user2Id" INTEGER NOT NULL,

    CONSTRAINT "DmChannels_pkey" PRIMARY KEY ("channelId")
);

-- CreateTable
CREATE TABLE "DmMessages" (
    "messageId" SERIAL NOT NULL,
    "channelId" INTEGER NOT NULL,
    "senderId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DmMessages_pkey" PRIMARY KEY ("messageId")
);

-- CreateTable
CREATE TABLE "GameInfo" (
    "gameId" SERIAL NOT NULL,
    "user1Id" INTEGER NOT NULL,
    "user2Id" INTEGER NOT NULL,
    "user1Score" INTEGER,
    "user2Score" INTEGER,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "endedAt" TIMESTAMP(3),

    CONSTRAINT "GameInfo_pkey" PRIMARY KEY ("gameId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserBlock_userId_blockedUserId_key" ON "UserBlock"("userId", "blockedUserId");

-- CreateIndex
CREATE UNIQUE INDEX "ChatChannels_channelName_key" ON "ChatChannels"("channelName");

-- CreateIndex
CREATE UNIQUE INDEX "ChatChannelUsers_channelId_userId_type_key" ON "ChatChannelUsers"("channelId", "userId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "ChatBan_channelId_bannedUserId_key" ON "ChatBan"("channelId", "bannedUserId");

-- CreateIndex
CREATE UNIQUE INDEX "ChatMute_channelId_mutedUserId_key" ON "ChatMute"("channelId", "mutedUserId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBlock" ADD CONSTRAINT "UserBlock_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBlock" ADD CONSTRAINT "UserBlock_blockedUserId_fkey" FOREIGN KEY ("blockedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatChannelUsers" ADD CONSTRAINT "ChatChannelUsers_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "ChatChannels"("channelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatChannelUsers" ADD CONSTRAINT "ChatChannelUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessages" ADD CONSTRAINT "ChatMessages_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "ChatChannels"("channelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessages" ADD CONSTRAINT "ChatMessages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatBan" ADD CONSTRAINT "ChatBan_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "ChatChannels"("channelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatBan" ADD CONSTRAINT "ChatBan_bannedUserId_fkey" FOREIGN KEY ("bannedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMute" ADD CONSTRAINT "ChatMute_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "ChatChannels"("channelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMute" ADD CONSTRAINT "ChatMute_mutedUserId_fkey" FOREIGN KEY ("mutedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DmChannels" ADD CONSTRAINT "DmChannels_user1Id_fkey" FOREIGN KEY ("user1Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DmChannels" ADD CONSTRAINT "DmChannels_user2Id_fkey" FOREIGN KEY ("user2Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DmMessages" ADD CONSTRAINT "DmMessages_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "DmChannels"("channelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DmMessages" ADD CONSTRAINT "DmMessages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameInfo" ADD CONSTRAINT "GameInfo_user1Id_fkey" FOREIGN KEY ("user1Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameInfo" ADD CONSTRAINT "GameInfo_user2Id_fkey" FOREIGN KEY ("user2Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
