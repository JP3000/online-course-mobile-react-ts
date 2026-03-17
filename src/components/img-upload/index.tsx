import { Avatar, ImageUploader } from "antd-mobile";
import "./index.scss";
import { userUpdate } from "../../api/user";
import { useUserStore } from "../../store/user";

// const getBase64 = (img: File, callback: (url: string) => void) => {
//   const reader = new FileReader();
//   reader.addEventListener("load", () => callback(reader.result as string));
//   reader.readAsDataURL(img);
// };

const getBase64 = (img: File) => {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      resolve(reader.result as string);
    });
    reader.readAsDataURL(img);
  });
};

export default function ImgUpload() {
  const { userInfo, update } = useUserStore((state) => state);

  const handleUpload = async (file: File) => {
    const base64 = await getBase64(file);
    const url = base64;

    if (userInfo) {
      const { objectId, sessionToken } = userInfo;
      await userUpdate(objectId, sessionToken, { avatar: url });
      update({ ...userInfo, avatar: url });
    }

    return {
      url,
    };
  };

  return (
    <div>
      <ImageUploader upload={handleUpload}>
        <Avatar src={userInfo?.avatar || "/images/avatar_default.jpg"} />
      </ImageUploader>
    </div>
  );
}
