import { IBannerType } from "../api/home";
import { CourseType, CategoryType } from "../type/course";

export interface MockCourseType extends CourseType {
  createdAt: string;
  duration: string;
  price: number;
}

export interface MockCollectType {
  objectId: string;
  userId: string | number;
  courseId: string;
  name: string;
  poster: string;
  isVip: boolean;
  intro: string;
  createdAt: string;
}

const createDetail = (title: string, points: string[]) => {
  return `
    <h3>${title}</h3>
    <ul>
      ${points.map((item) => `<li>${item}</li>`).join("")}
    </ul>
  `;
};

export const MOCK_BANNERS: IBannerType[] = [
  {
    objectId: "b1",
    name: "专注训练",
    img: "/images/banner_focus.jpg",
    music: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    objectId: "b2",
    name: "夜间放松",
    img: "/images/banner_meditation.jpg",
    music: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    objectId: "b3",
    name: "晨间激活",
    img: "/images/banner_fitness.jpg",
    music: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    objectId: "b4",
    name: "深度呼吸",
    img: "/images/banner_breath.jpg",
    music: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
];

export const MOCK_CATEGORIES: CategoryType[] = [
  { objectId: "l1_mind", name: "身心平衡", parentId: "0-0", isShow: true },
  { objectId: "l1_sport", name: "运动表现", parentId: "0-0", isShow: true },
  { objectId: "l1_life", name: "生活方式", parentId: "0-0", isShow: true },

  { objectId: "l2_mind_1", name: "正念冥想", parentId: "l1_mind", isShow: true },
  { objectId: "l2_mind_2", name: "呼吸训练", parentId: "l1_mind", isShow: true },

  { objectId: "l2_sport_1", name: "力量训练", parentId: "l1_sport", isShow: true },
  { objectId: "l2_sport_2", name: "灵活性提升", parentId: "l1_sport", isShow: true },

  { objectId: "l2_life_1", name: "高效工作", parentId: "l1_life", isShow: true },
  { objectId: "l2_life_2", name: "睡眠修复", parentId: "l1_life", isShow: true },
];

export const MOCK_COURSES: MockCourseType[] = [
  {
    objectId: "course1",
    name: "7 天正念入门计划",
    intro: "从 5 分钟开始建立觉察力，减轻焦虑与内耗。",
    detail: createDetail("课程收获", [
      "建立可持续的每日冥想习惯",
      "掌握呼吸锚点与身体扫描方法",
      "快速从压力状态切换到专注状态",
    ]),
    poster: "/images/meditation.jpg",
    level1: "身心平衡",
    level2: "正念冥想",
    isVip: false,
    price: 0,
    duration: "18 分钟",
    createdAt: "2026-02-01T08:00:00.000Z",
  },
  {
    objectId: "course2",
    name: "晨间呼吸唤醒",
    intro: "用 10 分钟呼吸节奏唤醒身体与大脑，提升上午效率。",
    detail: createDetail("训练重点", [
      "箱式呼吸与节律控制",
      "快速稳定心率",
      "为通勤和工作前做状态切换",
    ]),
    poster: "/images/breathing.jpg",
    level1: "身心平衡",
    level2: "呼吸训练",
    isVip: false,
    price: 0,
    duration: "12 分钟",
    createdAt: "2026-02-03T08:00:00.000Z",
  },
  {
    objectId: "course3",
    name: "办公室颈肩解压",
    intro: "针对久坐人群的轻量放松流程，缓解肩颈紧绷和疲劳。",
    detail: createDetail("适合人群", [
      "长期伏案办公",
      "学习备考久坐",
      "希望改善体态与呼吸质量",
    ]),
    poster: "/images/stretch.jpg",
    level1: "身心平衡",
    level2: "呼吸训练",
    isVip: true,
    price: 39,
    duration: "20 分钟",
    createdAt: "2026-02-05T08:00:00.000Z",
  },
  {
    objectId: "course4",
    name: "家庭自重力量训练",
    intro: "无需器械的全身训练，覆盖上肢、核心和下肢。",
    detail: createDetail("训练结构", [
      "热身与激活",
      "循环式力量训练",
      "拉伸放松与恢复",
    ]),
    poster: "/images/fitness.jpg",
    level1: "运动表现",
    level2: "力量训练",
    isVip: false,
    price: 19,
    duration: "35 分钟",
    createdAt: "2026-02-07T08:00:00.000Z",
  },
  {
    objectId: "course5",
    name: "进阶核心稳定",
    intro: "提升腰腹稳定与控制力，减少运动代偿和腰背压力。",
    detail: createDetail("能力提升", [
      "核心抗旋转能力",
      "骨盆与脊柱控制",
      "动作稳定性与爆发前准备",
    ]),
    poster: "/images/core.jpg",
    level1: "运动表现",
    level2: "力量训练",
    isVip: true,
    price: 79,
    duration: "42 分钟",
    createdAt: "2026-02-09T08:00:00.000Z",
  },
  {
    objectId: "course6",
    name: "灵活性与活动度提升",
    intro: "改善髋、踝、肩活动范围，让训练动作更顺畅安全。",
    detail: createDetail("课程亮点", [
      "髋关节打开系列",
      "踝关节灵活度练习",
      "肩背活动链路重建",
    ]),
    poster: "/images/mobility.jpg",
    level1: "运动表现",
    level2: "灵活性提升",
    isVip: false,
    price: 29,
    duration: "28 分钟",
    createdAt: "2026-02-11T08:00:00.000Z",
  },
  {
    objectId: "course7",
    name: "跑前动态热身",
    intro: "跑步前 8 分钟完成全身激活，降低受伤风险。",
    detail: createDetail("适配场景", [
      "晨跑前热身",
      "间歇训练前激活",
      "比赛前状态唤醒",
    ]),
    poster: "/images/running.jpg",
    level1: "运动表现",
    level2: "灵活性提升",
    isVip: false,
    price: 0,
    duration: "8 分钟",
    createdAt: "2026-02-12T08:00:00.000Z",
  },
  {
    objectId: "course8",
    name: "番茄工作法深度实践",
    intro: "构建高专注工作节奏，摆脱注意力碎片化。",
    detail: createDetail("实践模块", [
      "任务拆解与优先级",
      "专注时段设计",
      "复盘与节奏迭代",
    ]),
    poster: "/images/work.jpg",
    level1: "生活方式",
    level2: "高效工作",
    isVip: true,
    price: 59,
    duration: "30 分钟",
    createdAt: "2026-02-13T08:00:00.000Z",
  },
  {
    objectId: "course9",
    name: "晚间数字排毒",
    intro: "减少睡前刷屏，建立更稳定的入睡仪式。",
    detail: createDetail("核心流程", [
      "信息输入降频",
      "光线与环境调整",
      "睡前呼吸与放松",
    ]),
    poster: "/images/sleep.jpg",
    level1: "生活方式",
    level2: "睡眠修复",
    isVip: false,
    price: 9,
    duration: "15 分钟",
    createdAt: "2026-02-15T08:00:00.000Z",
  },
  {
    objectId: "course10",
    name: "深睡质量提升训练",
    intro: "结合放松与声音引导，帮助提升深睡比例。",
    detail: createDetail("改善目标", [
      "更快入睡",
      "减少夜间惊醒",
      "提升次日精神状态",
    ]),
    poster: "/images/swimming.jpg",
    level1: "生活方式",
    level2: "睡眠修复",
    isVip: true,
    price: 49,
    duration: "25 分钟",
    createdAt: "2026-02-16T08:00:00.000Z",
  },
  {
    objectId: "course11",
    name: "流瑜伽拉伸",
    intro: "跟随呼吸完成流动式体式切换，恢复身体弹性。",
    detail: createDetail("练习编排", [
      "动态拉伸序列",
      "脊柱延展",
      "下肢后链释放",
    ]),
    poster: "/images/yoga.jpg",
    level1: "身心平衡",
    level2: "正念冥想",
    isVip: false,
    price: 19,
    duration: "22 分钟",
    createdAt: "2026-02-17T08:00:00.000Z",
  },
  {
    objectId: "course12",
    name: "攀岩体能基础",
    intro: "提升握力、核心与步伐控制，为攀爬动作打底。",
    detail: createDetail("课程模块", [
      "前臂与手指力量",
      "核心抗摆动训练",
      "下肢发力与踏点技巧",
    ]),
    poster: "/images/climbing.jpg",
    level1: "运动表现",
    level2: "力量训练",
    isVip: true,
    price: 99,
    duration: "38 分钟",
    createdAt: "2026-02-18T08:00:00.000Z",
  },
];

export const MOCK_COLLECTS: MockCollectType[] = [
  {
    objectId: "collect1",
    userId: "u1",
    courseId: "course1",
    name: "7 天正念入门计划",
    poster: "/images/meditation.jpg",
    isVip: false,
    intro: "从 5 分钟开始建立觉察力，减轻焦虑与内耗。",
    createdAt: "2026-02-20T08:00:00.000Z",
  },
  {
    objectId: "collect2",
    userId: "u1",
    courseId: "course5",
    name: "进阶核心稳定",
    poster: "/images/core.jpg",
    isVip: true,
    intro: "提升腰腹稳定与控制力，减少运动代偿和腰背压力。",
    createdAt: "2026-02-21T08:00:00.000Z",
  },
];

export const MOCK_USER = {
  objectId: "u1",
  username: "admin",
  sessionToken: "mock-session-token",
  avatar: "/images/avatar_admin.jpg",
};
