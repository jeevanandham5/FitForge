import React, { useEffect, useState } from "react";
import {
  Layout,
  Typography,
  ConfigProvider,
  theme,
  Avatar,
  FloatButton,
  Modal,
} from "antd";
import { Dumbbell } from "lucide-react";
import { useWorkoutStore } from "./store/workoutStore";
import { SetupForm } from "./components/SetupForm";
import { ActiveWorkout } from "./components/ActiveWorkout";
import { UserOutlined } from "@ant-design/icons";
import UserProfilemodel from "./components/profile";
import TypewriterQuoteScroller from "./components/QuoteScroller";
import Theme from "./components/theme";

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const { isWorkoutStarted } = useWorkoutStore();
  const [isUserModalOpen, setUserIsModalOpen] = useState(false);
  const [themeModal, setThemeModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Check for an image in localStorage when the component loads
    const savedImage = localStorage.getItem("uploadedImage");
    if (savedImage) {
      setProfile(savedImage);
    }
  }, []);

  const showUserModal = () => {
    setUserIsModalOpen(true);
  };
  const handleOk = () => {
    setUserIsModalOpen(false);
    setThemeModal(false);
  };

  const handleCancel = () => {
    setUserIsModalOpen(false);
    setThemeModal(false);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#1890ff",
          borderRadius: 8,
        },
      }}
    >
      <Modal
        title="Themes"
        open={themeModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Theme isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </Modal>
      <Modal
        title="UserProfile"
        open={isUserModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <UserProfilemodel />
      </Modal>
      <Layout className="min-h-screen">
        <FloatButton
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
              className=" size-5"
            >
              <path d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
              <path d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8m-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7" />
            </svg>
          }
          onClick={() => setThemeModal(true)}
        />
        <Header
          className={`flex items-center justify-between gap-4  shadow-md px-2  ${
            !isDarkMode && "bg-white"
          }`}
        >
          <div className="flex items-center gap-2">
            <Dumbbell className="text-blue-500" size={32} />
            <Title level={3} className=" !m-0">
              FitForge
            </Title>
          </div>

          <Avatar icon={<UserOutlined />} onClick={showUserModal} />
        </Header>

        <TypewriterQuoteScroller />
        <Content className="p-6">
          <div className="max-w-4xl mx-auto w-full flex justify-center">
            {isWorkoutStarted ? (
              <ActiveWorkout />
            ) : (
              <SetupForm setUserIsModalOpen={setUserIsModalOpen} />
            )}
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
