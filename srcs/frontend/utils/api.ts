import { API_PATH } from "@/config";

export async function getAllPosts() {
  try {
    const response = await fetch(`${API_PATH}/posts`, {
      method: "GET",
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}
