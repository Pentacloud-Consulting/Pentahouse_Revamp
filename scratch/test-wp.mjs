import { fetchWordPressPosts } from "./src/PentaHouse/Blog/wordpress.js";

async function run() {
  console.log("Testing fetchWordPressPosts()...");
  const posts = await fetchWordPressPosts();
  console.log("RESULT POSTS COUNT:", posts.length);
  if (posts.length > 0) {
    console.log("POST 1 TITLE:", posts[0].title);
    console.log("POST 1 CATEGORY:", posts[0].category);
    console.log("POST 1 IMAGE:", posts[0].image);
  }
}

run();
