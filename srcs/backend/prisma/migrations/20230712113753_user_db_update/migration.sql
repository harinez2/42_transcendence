/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "user_id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "avatar" TEXT
);

-- CreateTable
CREATE TABLE "ft_auth" (
    "user_id" TEXT NOT NULL,
    "access_token" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "google_auth" (
    "user_id" TEXT NOT NULL,
    "secret" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_id_key" ON "users"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_nickname_key" ON "users"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "ft_auth_user_id_key" ON "ft_auth"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "google_auth_user_id_key" ON "google_auth"("user_id");
