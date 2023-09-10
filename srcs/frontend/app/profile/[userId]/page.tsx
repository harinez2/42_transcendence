import ProfileOtherPage from "./profile-other-page";
import React from "react";
import { ProfileType } from "../../types"

export const dynamicParams = false;

export async function generateStaticParams() {
    const profiles : ProfileType[] = await getAllProfiles();
    return profiles.map((profile: ProfileType) => (
        { userId: profile.userId, }
    ))
}

const ProfileOther = async ({ params }: any) => {
  const { userId } = params 
  return <ProfileOtherPage userId={userId} />;
};

export default ProfileOther;
