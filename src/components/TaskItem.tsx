import React, { useRef, useState } from 'react';

import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Task } from './TasksList';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';

type TaskItemProps = {
  item: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, title: string) => void;
}

export function TaskItem(props: TaskItemProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(props.item.title);
  const textInputRef = useRef<TextInput>(null)

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${props.index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => props.toggleTaskDone(props.item.id)}
        >
          <View
            testID={`marker-${props.index}`}
            style={!(props.item.done)
              ?
              styles.taskMarker
              :
              styles.taskMarkerDone
            }
          >
            {props.item.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <Text
            style={!(props.item.done)
              ?
              styles.taskText
              :
              styles.taskTextDone
            }
          >
            {props.item.title}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        testID={`trash-${props.index}`}
        style={{ paddingHorizontal: 24 }}
        onPress={() => props.removeTask(props.item.id)}
      >
        <Image source={trashIcon} />
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
})