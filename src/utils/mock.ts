import { IBannerType } from "../api/home";

export const MOCK_BANNERS: IBannerType[] = [
  { objectId: "b1", name: "健身生活", img: "/images/banner_fitness.jpg" },
  { objectId: "b2", name: "冥想时光", img: "/images/banner_meditation.jpg" }
];

export const MOCK_CATEGORIES = [
  { objectId: "c_lifestyle", name: "生活方式", parentId: "0-0" },
  { objectId: "c_sport", name: "运动健身", parentId: "0-0" },
  { objectId: "c1", name: "正念冥想", parentId: "c_lifestyle" },
  { objectId: "c2", name: "哈他瑜伽", parentId: "c_lifestyle" },
  { objectId: "c3", name: "力量训练", parentId: "c_sport" },
  { objectId: "c4", name: "室内攀岩", parentId: "c_sport" },
  { objectId: "c5", name: "自由泳", parentId: "c_sport" },
];

export const MOCK_COURSES = [
  {
    objectId: "course1",
    name: "基础正念冥想",
    desc: "适合初学者的正念冥想课程，帮助你放松身心，减轻日常压力。",
    poster: "/images/meditation.jpg",
    category: "冥想",
    level1: "冥想",
    isVip: false,
    price: 0,
    time: "20",
    createdAt: new Date().toISOString()
  },
  {
    objectId: "course2",
    name: "流瑜伽入门",
    desc: "通过连贯的体式练习，提升身体的柔韧性和力量。",
    poster: "/images/yoga.jpg",
    category: "瑜伽",
    level1: "瑜伽",
    isVip: true,
    price: 99,
    time: "45",
    createdAt: new Date().toISOString()
  },
  {
    objectId: "course3",
    name: "力量训练基础",
    desc: "科学的力量训练指南，帮助你塑造理想体型，提升体能。",
    poster: "/images/fitness.jpg",
    category: "健身",
    level1: "健身",
    isVip: false,
    price: 199,
    time: "60",
    createdAt: new Date().toISOString()
  },
  {
    objectId: "course4",
    name: "室内攀岩技巧",
    desc: "掌握基础的室内攀岩技巧，感受向上攀登的乐趣和挑战。",
    poster: "/images/climbing.jpg",
    category: "攀岩",
    level1: "攀岩",
    isVip: true,
    price: 159,
    time: "30",
    createdAt: new Date().toISOString()
  },
  {
    objectId: "course5",
    name: "自由泳提速训练",
    desc: "针对自由泳爱好者的进阶训练，教你如何游得更快、更省力。",
    poster: "/images/swimming.jpg",
    category: "游泳",
    level1: "游泳",
    isVip: false,
    price: 99,
    time: "40",
    createdAt: new Date().toISOString()
  }
];

export let MOCK_COLLECTS: any[] = [];
export const MOCK_USER = {
  objectId: "u1",
  username: "admin",
  sessionToken: "mock-session-token",
  avatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
};
