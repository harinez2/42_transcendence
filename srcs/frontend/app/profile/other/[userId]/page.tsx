import ProfileOtherPage from "./profile-other-page";
import React from "react";
import { ProfileType } from "../../../types";
import { getAllProfile } from "@/app/api/api";

export const dynamicParams = false;

// export async function generateStaticParams() {
//     const profiles : ProfileType[] = await getAllProfile();
//     return profiles.map((profile: ProfileType) => (
//         { userId: profile.id, } //need to change profile.id to profile.userId
//     ))
// }

const ProfileOther = async ({ params }: any) => {
  const { userId } = params;
  return <ProfileOtherPage userId={userId} />;
};

export default ProfileOther;
