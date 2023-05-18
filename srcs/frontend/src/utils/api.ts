
export async function getAllPosts() {
    const response = await fetch("http://localhost:5000/posts", {
        method: "GET",
    });
    const data = await response.json();
    return data;
}
