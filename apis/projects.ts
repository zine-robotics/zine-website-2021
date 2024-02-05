import { db } from "../firebase";
import { DocumentReference, Timestamp, addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { IUser } from "./users";
import { ITaskData } from "./tasks";
import { deleteRoomByName } from "./room";

const usersCollection = collection(db, "users");
const userTasksCollection = collection(db, "userTasks");
const tasksCollection = collection(db, "tasks");

export interface ICheckPoint {
  message: string;
  timeDate: Timestamp;
  user: string;
}
export interface IComment {
  comment: string;
  timeDate: Timestamp;
  user: string;
}
export interface ILink {
  url: string;
  type: string;
  timeDate: Timestamp;
  user: string;
}

export interface IUserProject {
  checkpoints: ICheckPoint[];
  status: string;
  users: DocumentReference[];
  task: DocumentReference;
  id: string; // added for reference
  comments: IComment[];
  links: ILink[];
  rating: number;
}

export interface IProject extends IUserProject {
  usersData: IUser[];
  taskData: ITaskData;
}

export const createProject = async (taskid: string, users: string[]) => {
  const data = {
    checkpoints: [],
    status: "Assigned",
    task: doc(tasksCollection, taskid),
    users: users.map((u) => doc(usersCollection, u)),
    comments: [],
    links: [],
    rating: 0,
  };

  const d = await addDoc(userTasksCollection, data);
  return { ...data, id: d.id } as IUserProject;
};

export const deleteProject = async (data: IProject) => {
  await deleteDoc(doc(userTasksCollection, data.id));
  const roomName = data.taskData.roomName || `${data.taskData.title.split(" ")[0]}-${data.usersData[0].email.slice(4).split("@")[0]}`;
  return deleteRoomByName(roomName);
};
