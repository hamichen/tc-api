import { createRouter, createWebHistory } from "vue-router";
import StudentList from "../views/StudentList.vue";

const routes = [
  { path: "/", component: StudentList },
  {
  path: "/students",
    component: () => import("../views/StudentList.vue")
  },
  {
  path: "/teachers",
  component: () => import("../views/TeacherList.vue")
 },
  {
  path: "/score",
  component: () => import("../views/Score.vue")
 }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
