import { Timestamp, arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import styles from "../../constants/styles";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { db } from "../../firebase";
import sendFCMMessage from "../../apis/sendFcm";
import { IMessageData, getMessages, getRoom } from "../../apis/room";
import { IProject } from "../../apis/projects";

const URL_REGEX = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;

const Checkpoints = ({ projectData }: { projectData: IProject }) => {
  const [checkpointMessage, setCheckpointMessage] = useState("");
  const [project, setProject] = useState(projectData);
  const [panel, setPanel] = useState("checkpoints");
  const [messages, setMessages] = useState<IMessageData[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [groupid, setGroupID] = useState("");
  const [url, setURL] = useState("");
  const [urlType, setURLType] = useState("GitHub");
  const { authUser } = useAuth();

  const roomName = `${projectData.taskData.title.split(" ")[0]}-${project.usersData[0].email.slice(4).split("@")[0]}`;
  useEffect(() => {
    getRoom(roomName).then((snapshots) => {
      snapshots.forEach((d) => {
        setGroupID(d.id);
        let newmsg: IMessageData[] = [];
        getMessages(d.ref, true, 20)
          .then((msgSnapshot) => {
            msgSnapshot.forEach((d) => {
              newmsg.push(d.data() as IMessageData);
            });
          })
          .then(() => {
            newmsg = newmsg.sort((a, b) => -b.timeStamp.seconds + a.timeStamp.seconds);
            setMessages(newmsg);
          });
      });
    });
  }, [panel]);

  const onSubmit = async () => {
    if (!groupid) return;
    const name = authUser!.name;
    const timeStamp = Timestamp.fromDate(new Date());
    const newMessage = {
      from: name,
      group: groupid,
      message: inputMessage.trim(),
      timeStamp,
    };

    setInputMessage("");
    await setDoc(doc(db, "rooms", groupid, "messages", timeStamp.nanoseconds.toString()), newMessage);
    await sendFCMMessage(roomName, roomName, `${authUser!.name}: ${inputMessage.trim()}`);
    setMessages([...messages, newMessage]);
  };

  const addCheckpoint = () => {
    if (!project) return;
    if (!checkpointMessage) return;

    setCheckpointMessage("");
    const checkpointData = {
      message: checkpointMessage.trim(),
      timeDate: Timestamp.fromDate(new Date()),
      user: authUser!.name,
    };

    updateDoc(doc(db, "userTasks", project.id), {
      checkpoints: arrayUnion(checkpointData),
    }).then(async () => {
      const newCheckpoints = [...project.checkpoints, checkpointData];
      setProject({ ...project, checkpoints: newCheckpoints });
      const timeStamp = Timestamp.fromDate(new Date());
      const newMessage = {
        from: authUser!.name,
        group: groupid,
        message: `${authUser!.type === "admin" ? "[REMARK]:" : "[CHECKPOINT]:"} ${checkpointMessage.trim()}`,
        timeStamp,
      };

      await setDoc(doc(db, "rooms", groupid, "messages", timeStamp.nanoseconds.toString()), newMessage);
      await sendFCMMessage(roomName, roomName, `${authUser!.name}: ${authUser!.type === "admin" ? "Remark Added" : "Checkpoint Added"}\n${checkpointMessage}`);
    });
  };

  const addLink = () => {
    if (!project) return;
    const linkData = {
      url: url.trim(),
      timeDate: Timestamp.fromDate(new Date()),
      user: authUser!.name,
      type: urlType,
    };
    setURL("");
    updateDoc(doc(db, "userTasks", project.id), {
      links: arrayUnion(linkData),
    }).then(async () => {
      const newLinks = [...project?.links, linkData];
      setProject({ ...project, links: newLinks });
    });
  };

  return (
    <div className="">
      <h2 className="text-3xl font-bold my-2" style={styles.textPrimary}>
        {project.taskData.title}
      </h2>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
        <h2 className="text-2xl font-bold" style={styles.textPrimary}>
          {project.usersData[0].name}
        </h2>
        <div className="flex gap-2 justify-between md:justify-start">
          <a className="text-white rounded-xl px-3 py-2 font-bold text-center cursor-pointer shadow-md" style={{ background: "#0C72B0" }} href={project.taskData?.link} target="_blank">
            Problem Statement
          </a>
          <div className="bg-white px-2 pt-3 pb-1 rounded-xl border text-gray-500 relative shadow-md text-center">
            <p className="absolute top-0 left-7 font-semibold text-xs text-gray-500">Due Date</p>
            <p className="font-bold">{(project.taskData.dueDate as unknown as Timestamp).toDate().toLocaleDateString("en-CA")}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-white rounded-xl shadow-md" style={{ minHeight: "50vh" }}>
        <div className="flex">
          <button
            className="w-full p-2 font-bold rounded-tl-xl shadow-md"
            style={panel === "checkpoints" ? { background: "white", color: "#0C72B0" } : { background: "#0C72B0", color: "white" }}
            onClick={() => setPanel("checkpoints")}
          >
            Checkpoints
          </button>
          <div className="h-full w-3"></div>
          <button
            className="w-full p-2 font-bold shadow-md"
            style={panel === "messages" ? { background: "white", color: "#0C72B0" } : { background: "#0C72B0", color: "white" }}
            onClick={() => setPanel("messages")}
          >
            Messages
          </button>
          <div className="h-full w-3"></div>
          <button
            className="w-full p-2 font-bold rounded-tr-xl shadow-md"
            style={panel === "links" ? { background: "white", color: "#0C72B0" } : { background: "#0C72B0", color: "white" }}
            onClick={() => setPanel("links")}
          >
            Links
          </button>
        </div>
        <div className="flex flex-1 flex-col px-4 pt-2 pb-4">
          {panel === "checkpoints" && !project.checkpoints.length && (
            <div className="px-4 mt-2 flex-1 text-normal md:text-lg" style={{ color: "#AAAAAA" }}>
              <p className="text-center">Add all the checkpoints, challenges faced with brief description for your project here</p>
              <p className="text-center">Make sure to update your project checkpoint everyday</p>
              <p className="text-center mt-2">Start by adding your github repository link here</p>
            </div>
          )}
          {panel === "checkpoints" &&
            project.checkpoints.map((checkpoint) => (
              <div key={checkpoint.timeDate.seconds} className="flex flex-1 flex-wrap flex-col md:flex-row my-2">
                <div className="text-xs md:text-sm md:w-2/12 flex gap-4 md:gap-0 md:flex-col" style={{ color: "#8D989F" }}>
                  <p className="font-bold">{checkpoint.timeDate.toDate().toLocaleDateString("en-US", { month: "long", day: "numeric" })}</p>
                  <p className="font-bold">{checkpoint.timeDate.toDate().toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" })}</p>
                  <p className="">{checkpoint.user}</p>
                </div>
                <div className="text-sm md:text-normal break-words w-full md:w-10/12 md:ml-auto">
                  <p>
                    {checkpoint.message.split(/\s+/g).map((word) =>
                      word.match(URL_REGEX) ? (
                        <>
                          <a href={word} className="text-blue-500 underline" target="_blank">
                            {word}
                          </a>{" "}
                        </>
                      ) : (
                        word + " "
                      )
                    )}
                  </p>
                </div>
              </div>
            ))}

          {panel === "messages" && <div className="text-xs md:text-sm text-blue-500 text-center">View these messages on the Zine App!</div>}
          {panel === "messages" &&
            messages.map((message) => (
              <div key={message.timeStamp.seconds} className="flex flex-1 flex-wrap flex-col md:flex-row my-2">
                <div className="text-xs md:text-sm md:w-2/12 flex gap-4 md:gap-0 md:flex-col" style={{ color: "#8D989F" }}>
                  <p className="font-bold">{message.timeStamp.toDate().toLocaleDateString("en-US", { month: "long", day: "numeric" })}</p>
                  <p className="font-bold">{message.timeStamp.toDate().toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" })}</p>
                  <p className="">{message.from}</p>
                </div>
                <div className="text-sm md:text-normal break-words w-full md:w-10/12 md:ml-auto">
                  <p>
                    {message.message.split(/\s+/g).map((word) =>
                      word.match(URL_REGEX) ? (
                        <>
                          <a href={word} className="text-blue-500 underline" target="_blank">
                            {word}
                          </a>{" "}
                        </>
                      ) : (
                        word + " "
                      )
                    )}
                  </p>
                </div>
              </div>
            ))}

          {panel === "checkpoints" && (
            <div className="flex mt-auto flex-col md:flex-row gap-4">
              <textarea
                rows={3}
                className="w-full rounded-xl p-2 focus:outline-none shadow-md"
                value={checkpointMessage}
                placeholder="Add checkpoints here"
                onChange={(e) => setCheckpointMessage(e.target.value)}
                style={{ background: "#EFEFEF", outline: "0.5px #808080 solid" }}
              />
              <button className="font-bold p-2 rounded-xl cursor-pointer hover:opacity-80 shadow-md" style={{ ...styles.textPrimary, background: "#C2FFF4" }} onClick={() => addCheckpoint()}>
                Add Checkpoint
              </button>
            </div>
          )}

          {panel === "messages" && (
            <div className="flex mt-auto flex-col md:flex-row gap-4">
              <textarea
                rows={3}
                className="w-full rounded-xl p-2 focus:outline-none shadow-md"
                value={inputMessage}
                placeholder="Write your message here"
                onChange={(e) => setInputMessage(e.target.value)}
                style={{ background: "#EFEFEF", outline: "0.5px #808080 solid" }}
              />
              <button className="font-bold p-2 rounded-xl cursor-pointer hover:opacity-80 shadow-md" style={{ ...styles.textPrimary, background: "#C2FFF4" }} onClick={() => onSubmit()}>
                Send Message
              </button>
            </div>
          )}
        </div>
        {panel === "links" && (
          <div className="" style={{}}>
            {
              <div className="flex flex-1 flex-col px-4 pt-2 pb-4">
                {project.links?.map((ele) => {
                  return (
                    <div key={ele.timeDate.seconds} className="flex flex-1 flex-wrap flex-col md:flex-row my-2">
                      <div className="text-xs md:text-sm md:w-2/12 flex gap-4 md:gap-0 md:flex-col" style={{ color: "#8D989F" }}>
                        <p className="font-bold">{ele.timeDate.toDate().toLocaleDateString("en-US", { month: "long", day: "numeric" })}</p>
                        <p className="font-bold">{ele.timeDate.toDate().toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" })}</p>
                        <p className="">{ele.user.split(" ")[0]}</p>
                      </div>
                      <div className="text-sm md:text-normal break-words w-full md:w-10/12 md:ml-auto">
                        <p>
                          {ele.url.split(/\s+/g).map((word) =>
                            word.match(URL_REGEX) ? (
                              <>
                                <a href={word} className="text-blue-500 underline" target="_blank">
                                  {word}
                                </a>{" "}
                              </>
                            ) : (
                              word + " "
                            )
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div className="flex mt-auto flex-col md:flex-row gap-4">
                  <input
                    className="rounded-xl w-11/12 p-2 focus:outline-none shadow-md"
                    placeholder="Add link here"
                    style={{ background: "#EFEFEF", outline: "0.5px #808080 solid" }}
                    onChange={(e) => setURL(e.target.value)}
                    value={url}
                  />
                  <select className="focus:outline-none shadow-md rounded-xl px-2" style={{ outline: "0.5px #808080 solid" }} value={urlType} onChange={(e) => setURLType(e.target.value)}>
                    <option>GitHub</option>
                    <option>Figma</option>
                    <option>Deployment</option>
                    <option>Miscellaneous</option>
                  </select>
                  <button className="font-bold p-2 rounded-xl cursor-pointer hover:opacity-80 shadow-md" style={{ ...styles.textPrimary, background: "#C2FFF4" }} onClick={() => addLink()}>
                    Add Link
                  </button>
                </div>
              </div>
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkpoints;
