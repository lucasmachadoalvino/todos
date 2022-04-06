import React, { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
};

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskWithSameTitle = tasks.find((task) => task.title === newTaskTitle);

    if (taskWithSameTitle) {
      return Alert.alert(
        "Task ja cadastrada",
        "voce nao pode cadastrar uma task com o mesmo nome"
      );
    }

    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };
    setTasks([...tasks, data]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks((previousTasks) =>
      previousTasks.map((task) => {
        if (task.id == id) {
          task.done = !task.done;
        }
        return task;
      })
    );
  }

  function handleRemoveTask(id: number) {
    Alert.alert("Remover item", "Tem certeza que voce deseja remover", [
      {
        style: "cancel",
        text: "Não",
      },
      {
        style: "destructive",
        text: "Sim",
        onPress: () => {
          setTasks((previousTasks) =>
            previousTasks.filter((task) => task.id !== id)
          );
        },
      },
    ]);
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs) {
    const taskToBeUpdated = tasks.map((task) => {
      if (task.id == taskId) {
        task.title = taskNewTitle;
      }
      return task;
    });

    setTasks(taskToBeUpdated);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
