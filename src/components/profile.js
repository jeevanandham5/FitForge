import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload, Input, message } from "antd";
import WorkoutSelector from "./WorkoutSelector";
import { useWorkoutStore } from "../store/workoutStore";
import Test from "./test";

// Helper function to convert file to base64
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UserProfileModel = () => {
  // State for image preview and user profile data
  const { level, gender, setLevel, setGender } = useWorkoutStore();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [userProfile, setUserProfile] = useState({
    username: "",
    height: "",
    weight: "",
  });
  const [multiImageList, setMultiImageList] = useState([]);

  // Handle file change (image upload)
  const handleSingleImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0 && newFileList[0].status === "done") {
      const file = newFileList[0].originFileObj;
      getBase64(file)
        .then((base64) => {
          localStorage.setItem("uploadedImage", base64);
          message.success("Profile image saved locally!");
        })
        .catch((err) => message.error("Failed to convert image."));
    }
  };

  // Handle multiple image upload
  const handleMultiImageChange = ({ fileList: newFileList }) => {
    setMultiImageList(newFileList);
    const multiImageData = newFileList.map((file) => file.url || file.preview);
    localStorage.setItem("multiImages", JSON.stringify(multiImageData)); // Save to localStorage
  };

  // Preview image on click
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  // Handle User Profile Data Change (username, height, weight)
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({
      ...userProfile,
      [name]: value,
    });
    // Save profile data in localStorage
    localStorage.setItem(name, value);
  };

  // Upload button customization for profile picture
  const uploadButton = (
    <div className="border-2 border-dashed border-gray-400 p-4 flex justify-center items-center w-24 h-24 rounded-full bg-gray-200">
      <PlusOutlined className="text-gray-600" />
    </div>
  );

  // Upload button customization for multiple images (square)
  const uploadButtonMulti = (
    <div className="border-2 border-dashed border-gray-400 p-4 flex justify-center items-center w-24 h-24 bg-gray-200">
      <PlusOutlined className="text-gray-600" />
    </div>
  );

  // Load stored profile data and image on component mount
  useEffect(() => {
    const savedImage = localStorage.getItem("uploadedImage");
    if (savedImage) {
      setPreviewImage(savedImage);
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: savedImage,
        },
      ]);
    }
    const savedName = localStorage.getItem("username");
    const savedHeight = localStorage.getItem("height");
    const savedWeight = localStorage.getItem("weight");
    if (savedName) setUserProfile((prev) => ({ ...prev, username: savedName }));
    if (savedHeight)
      setUserProfile((prev) => ({ ...prev, height: savedHeight }));
    if (savedWeight)
      setUserProfile((prev) => ({ ...prev, weight: savedWeight }));

    // Load multi-image data from localStorage
    const savedMultiImages = JSON.parse(localStorage.getItem("multiImages"));
    if (savedMultiImages) {
      const formattedMultiImageList = savedMultiImages.map((url, index) => ({
        uid: index.toString(),
        status: "done",
        url,
      }));
      setMultiImageList(formattedMultiImageList);
    }
  }, []);
  const [image, setImage] = useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imgname = file.name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = Math.max(img.width, img.height);
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          img,
          (maxSize - img.width) / 2,
          (maxSize - img.height) / 2
        );
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], imgname, {
              type: "image/png",
              lastModified: Date.now(),
            });
            setImage(file);

            // Convert the image blob to a Base64 string and store in localStorage
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => {
              localStorage.setItem("uploadedImage", reader.result);
            };
          },
          "image/jpeg",
          0.8
        );
      };
    };
  };

  return (
    <div className="p-5">
      <div className="flex flex-col items-center justify-between gap-5 my-2">
        <Test />
        <div className="flex flex-col w-full gap-2">
          <Input
            placeholder="Username"
            name="username"
            value={userProfile.username}
            onChange={handleProfileChange}
          />
          <div className="flex items-center justify-between gap-2">
            <Input
              placeholder="Height (in cm)"
              name="height"
              value={userProfile.height}
              onChange={handleProfileChange}
            />

            <Input
              placeholder="Weight (in kg)"
              name="weight"
              value={userProfile.weight}
              onChange={handleProfileChange}
            />
          </div>
        </div>
      </div>

      {/*previewImage && (
        <div className="mt-6 flex justify-center">
          <Image
            src={previewImage}
            className="w-24 h-24 rounded-full object-cover"
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
          />
        </div>
      )*/}

      {/* Display multiple uploaded images (square) */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        {multiImageList.map(
          (file) =>
            file.status === "done" && (
              <div
                key={file.uid}
                className="w-24 h-24 border border-gray-300 rounded-md"
              >
                <Image
                  src={file.url || file.preview}
                  className="w-full h-full object-cover"
                />
              </div>
            )
        )}
      </div>

      {/* Display profile details */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <h3 className="text-lg font-semibold">Profile Details</h3>
          <p>Username: {userProfile.username || "N/A"}</p>
          <p>
            Height: {userProfile.height ? `${userProfile.height} cm` : "N/A"}
          </p>
          <p>
            Weight: {userProfile.weight ? `${userProfile.weight} kg` : "N/A"}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Your Workout Plan</h3>
          <WorkoutSelector
            level={level}
            gender={gender}
            onLevelChange={setLevel}
            onGenderChange={setGender}
          />
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-2">Your Pictures</h3>
      <Upload
        action={null} // No server interaction (handle locally)
        listType="picture-card"
        fileList={multiImageList}
        onChange={handleMultiImageChange}
        beforeUpload={() => false} // Prevent automatic upload to server
        multiple
      >
        {multiImageList.length >= 5 ? null : uploadButtonMulti}
      </Upload>
    </div>
  );
};

export default UserProfileModel;
