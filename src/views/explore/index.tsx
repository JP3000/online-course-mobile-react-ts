import React, { useEffect, useState } from "react";
import "./index.scss";
import Course from "../../components/course";
import { categoryGet, ICourseParams } from "../../api/course";
import { CategoryType } from "../../type/course";
import { CapsuleTabs, Tabs } from "antd-mobile";

// type Props = {}; {}: Props

export default function Explore() {
  const [cateList, setCateList] = useState<Array<CategoryType>>([]);
  const [cateLevel1, setCateLevel1] = useState<number>(0);
  const [cateLevel2, setCateLevel2] = useState<number>(0);
  const [condition, setCondition] = useState<ICourseParams>({}); // 查询条件

  const handleCateLevel1 = (key: string) => {
    const idx = Number(key);
    setCateLevel1(idx);
    condition.level1 = cateList[idx].name;
    delete condition.level2;
    setCateLevel2(0);
    setCondition({ ...condition });
  };

  const handleTabs = (key: string) => {
    const idx = Number(key);
    setCateLevel2(idx);
    if (idx === 0) {
      delete condition.level2;
    } else {
      condition.level2 = cateList[cateLevel1].children![idx - 1].name;
    }
    setCondition({ ...condition });
  };

  useEffect(() => {
    categoryGet().then((res) => {
      const { results } = res.data;
      // 筛选出一级分类
      const arr = results.filter((item: CategoryType) => {
        return item.parentId === "0-0";
      });
      // 将子分类给到父级的children属性上
      arr.forEach((level1: CategoryType) => {
        level1.children = results.filter(
          (item: CategoryType) => item.parentId === level1.objectId
        );
      });
      //处理完成后，将数据给到cateList
      setCateList(arr);
    });
  }, []);

  return (
    <div>
      <div>
        <h1 className="title">探索</h1>
        {/* 课程分类显示 第一级 */}
        <CapsuleTabs activeKey={cateLevel1 + ""} onChange={handleCateLevel1}>
          {cateList.map((item: CategoryType, index) => {
            return (
              <CapsuleTabs.Tab title={item.name} key={index}></CapsuleTabs.Tab>
            );
          })}
        </CapsuleTabs>
        {/* 课程有子分类，则显示子分类 */}
        {cateList.length ? (
          <Tabs onChange={handleTabs} activeKey={cateLevel2 + ""}>
            <Tabs.Tab title="全部" key="0"></Tabs.Tab>
            {cateList[cateLevel1].children?.map((item, index) => {
              return <Tabs.Tab title={item.name} key={index + 1} />;
            })}
          </Tabs>
        ) : (
          ""
        )}
        {/* 课程详情显示 */}
        <Course condition={condition} />
      </div>
    </div>
  );
}
