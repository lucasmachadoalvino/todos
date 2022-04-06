import React, { MutableRefObject, useRef, useState } from "react";
import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatListProps,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import { ItemWrapper } from "./ItemWrapper";

import trashIcon from "../assets/icons/trash/trash.png";
import editIcon from "../assets/icons/edit/edit.png";
import { EditTaskArgs, Task } from "../pages/Home";
import { TasksItem } from "./taskItem";

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ taskId, taskNewTitle }: EditTaskArgs) => void;
}

export function TasksList({
  tasks,
  toggleTaskDone,
  removeTask,
  editTask,
}: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <TasksItem
            index={index}
            item={item}
            toggleTaskDone={toggleTaskDone}
            removeTask={removeTask}
            editTask={editTask}
            editIcon={editIcon}
            trashIcon={trashIcon}
          />
        );
      }}
      style={{
        marginTop: 32,
      }}
    />
  );
}
