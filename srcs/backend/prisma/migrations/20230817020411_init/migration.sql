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
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ChatChannels_channelName_key" ON "ChatChannels"("channelName");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatChannelUsers" ADD CONSTRAINT "ChatChannelUsers_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "ChatChannels"("channelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatChannelUsers" ADD CONSTRAINT "ChatChannelUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessages" ADD CONSTRAINT "ChatMessages_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "ChatChannels"("channelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessages" ADD CONSTRAINT "ChatMessages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
