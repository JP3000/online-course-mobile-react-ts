import React, { useEffect, useState } from "react";
import { Avatar, ImageUploader } from "antd-mobile";
import "./index.scss";
import Cloud from "leancloud-storage";
import { userUpdate } from "../../api/user";
import { useUserStore } from "../../store/user";

// const getBase64 = (img: File, callback: (url: string) => void) => {
//   const reader = new FileReader();
//   reader.addEventListener("load", () => callback(reader.result as string));
//   reader.readAsDataURL(img);
// };

const getBase64 = (img: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      resolve(reader.result as string);
    });
    reader.readAsDataURL(img);
  });
};

export default function ImgUpload() {
  const [avatar, setAvatar] = useState<string>("");
  const { userInfo, update } = useUserStore((state) => state);
  useEffect(() => {
    if (userInfo && userInfo.avatar) {
      setAvatar(userInfo.avatar);
    }
  }, []);

  const handleUpload = async (file: File) => {
    // console.log(file);
    //采用promise优化了图片上传的操作
    const base64 = await getBase64(file);
    const res: any = await new Cloud.File(`${file.name}`, { base64 }).save();
    const { url } = res.attributes;
    if (userInfo) {
      const { objectId, sessionToken } = userInfo;
      await userUpdate(objectId, sessionToken, { avatar: url as string }); //更新后端
      update({ ...userInfo, avatar: url as string }); // 更新本地
    }
    setAvatar(url);
    return {
      url,
    };
  };

  return (
    <div>
      <ImageUploader upload={handleUpload}>
        <Avatar src={userInfo!.avatar} />
      </ImageUploader>
    </div>
  );
}
