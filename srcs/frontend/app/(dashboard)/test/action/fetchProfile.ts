"use server";

import makeAPIRequest from "@/app/api/api";

export type ProfileType = { userId: string; bio: string };

export async function fetchProfile() {
  return await makeAPIRequest<ProfileType>("get", "/profiles");
}
