import Image from "next/image";
import { API_PATH } from "@/config";

export default function AvatarPage({ params }: { params: { id: string } }) {
  const userId = Number(params.id);
  return (
    <Image
      src={`${API_PATH}/users/avatar/${userId}`}
      width={500}
      height={500}
      alt="Avatar"
    />
  );
}
