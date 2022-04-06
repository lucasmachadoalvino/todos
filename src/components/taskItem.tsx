import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { ImageSource } from "react-native-vector-icons/Icon";
import { EditTaskArgs, Task } from "../pages/Home";
import { ItemWrapper } from "./ItemWrapper";

interface TasksItemProps {
  index: number;
  item: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ taskId, taskNewTitle }: EditTaskArgs) => void;
  editIcon: ImageSource;
  trashIcon: ImageSource;
}

export function TasksItem({
  index,
  item,
  toggleTaskDone,
  removeTask,
  editTask,
  editIcon,
  trashIcon,
}: TasksItemProps) {
  const refInput = useRef<TextInput>(null);

  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(item.title);

  const handleEditTask = () => {
    setIsEdit(true);
  };

  const handleCancelEditTask = () => {
    setValue(item.title);
    setIsEdit(false);
  };

  const handleSubmitEditing = () => {
    editTask({ taskId: item.id, taskNewTitle: value });
    setIsEdit(false);
  };

  useEffect(() => {
    if (refInput.current) {
      if (isEdit) {
        refInput.current.focus();
      } else {
        refInput.current.blur();
      }
    }
  }, [isEdit]);

  return (
    <ItemWrapper index={index}>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            ref={refInput}
            value={value}
            style={item.done ? styles.taskTextDone : styles.taskText}
            editable={isEdit}
            defaultValue={value}
            onChangeText={setValue}
            onSubmitEditing={handleSubmitEditing}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        {isEdit ? (
          <TouchableOpacity
            onPress={handleCancelEditTask}
            style={{ paddingRight: 12 }}
          >
            <Icon name="x" size={24} color="#B2B2B2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            testID={`edit-${index}`}
            style={{ paddingRight: 12 }}
            onPress={() => setIsEdit(true)}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          testID={`trash-${index}`}
          style={styles.buttonTrash}
          onPress={() => removeTask(item.id)}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </ItemWrapper>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  buttonContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  buttonTrash: {
    borderLeftWidth: 1,
    borderLeftColor: "#C4C4C4",
    paddingLeft: 12,
  },
});
