import { createRouter, createWebHistory } from "vue-router";
import Posts from "./components/Posts.vue";
import PostPage from "./components/PostPage.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Posts,
    },
    {
      path: "/posts",
      component: Posts,
    },
    {
      path: "/posts/:pid",
      component: PostPage
    }
  ] 
});

export default router;
