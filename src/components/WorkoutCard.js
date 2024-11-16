import React from "react";
import { Card, List, Typography, Tag } from "antd";
import { Timer, Dumbbell, RefreshCw } from "lucide-react";

const { Title, Text } = Typography;

export const WorkoutCard = ({ title, exercises }) => {
  const getIcon = (exercise) => {
    if (exercise.duration) return <Timer className="w-4 h-4" />;
    if (exercise.sets && exercise.reps) return <Dumbbell className="w-4 h-4" />;
    return <RefreshCw className="w-4 h-4" />;
  };

  const getDescription = (exercise) => {
    if (exercise.sets && exercise.reps) {
      return `${exercise.sets} sets × ${exercise.reps} reps`;
    }
    return exercise.duration;
  };

  return (
    <Card
      className="mb-6 shadow-lg hover:shadow-xl transition-shadow"
      title={<Title level={4}>{title}</Title>}
    >
      <List
        itemLayout="horizontal"
        dataSource={exercises}
        renderItem={(exercise) => (
          <List.Item>
            <List.Item.Meta
              avatar={getIcon(exercise)}
              title={exercise.name}
              description={
                <div className="flex items-center gap-2">
                  <Tag color="blue">{getDescription(exercise)}</Tag>
                  {exercise.description && (
                    <Text type="secondary" italic>
                      {exercise.description}
                    </Text>
                  )}
                </div>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default WorkoutCard;
