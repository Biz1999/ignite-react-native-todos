import React, { useEffect, useRef, useState } from 'react';

import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Task } from './TasksList';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/pen/edit.png';
import { EditTaskProps } from '../pages/Home';

type TaskItemProps = {
  item: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ taskId, taskTitle }: EditTaskProps) => void;
}

export function TaskItem(props: TaskItemProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(props.item.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEdit(true);
  }

  function handleCancelEditing() {
    setNewTitle(props.item.title);
    setIsEdit(false);
  }

  function handleSubmitEdit() {
    props.editTask({ taskId: props.item.id, taskTitle: newTitle });
    setIsEdit(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEdit) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEdit])

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
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

          {/* <Text
            style={!(props.item.done)
              ?
              styles.taskText
              :
              styles.taskTextDone
            }
          >
            {props.item.title}
          </Text> */}
          <TextInput
            value={newTitle}
            onChangeText={setNewTitle}
            editable={isEdit}
            onSubmitEditing={handleSubmitEdit}
            style={!(props.item.done)
              ?
              styles.taskText
              :
              styles.taskTextDone
            }
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {isEdit ?
          (
            <TouchableOpacity
              onPress={handleCancelEditing}
            >
              <Icon name="x" size={24} color="#b2b2b2" />
            </TouchableOpacity>
          )
          :
          (
            <TouchableOpacity
              onPress={handleStartEditing}
            >
              <Image source={editIcon} />
            </TouchableOpacity>
          )
        }
        <View style={styles.iconsDivider} />
        <TouchableOpacity
          testID={`trash-${props.index}`}
          onPress={() => props.removeTask(props.item.id)}
          disabled={isEdit}
        >
          <Image source={trashIcon} style={{ opacity: isEdit ? 0.1 : 1 }} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoContainer: {
    flex: 1,
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
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
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 24,
    paddingLeft: 12,
  },
  iconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
    marginHorizontal: 12
  }
})