import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskProps = {
  taskId: number;
  taskTitle: string;
}
export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    // No find não precisa fazer isso que eu fiz pois não altera, é só buscar no estado mesmo
    const allTasks = tasks.map(task => ({ ...task }));
    if (allTasks.find(task => task.title === newTaskTitle)) {
      return Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome'
      )
    }

    const task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }
    setTasks(oldState => [...oldState, task]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));

    const updatedTodo = updatedTasks.find(task => task.id === id);

    if (!updatedTodo)
      return;

    updatedTodo.done = !updatedTodo.done;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'NÃO',
          style: 'cancel'
        },
        {
          text: 'SIM',
          onPress: () => {
            setTasks(oldState => oldState
              .filter(task =>
                task.id !== id
              ))
          }
        }
      ]
    )
  }

  function handleEditTask({ taskId, taskTitle }: EditTaskProps) {
    const updatedTasks = tasks.map(task => ({ ...task }));

    const updatedTitle = updatedTasks.find(task => task.id === taskId);

    if (!updatedTitle)
      return;

    updatedTitle.title = taskTitle;

    setTasks(updatedTasks);
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})