import React, {
  useState,
  KeyboardEvent,
  useEffect,
} from "react";
import Link from "next/link";
import { IEventData, fetchRecruitmentEvents } from "../../apis/events";

interface IWorkshopData {
  name: string;
  description: string;
  eventType: string;
  date: string;
  time: string;
  venue: string;
  stage: number;
  isHeading: boolean;
}

interface IStageProps {
  workshops: IWorkshopData[];
  state: { selected: number };
  stage: number;
  select: (id: number) => void;
}

export interface IWorkshopProps {
  recruitmentEvents: IEventData[]
}

const Stage = ({
  workshops,
  state,
  stage,
  select,
}: IStageProps) => {
  return (
    <>
      {workshops.map((item, key) => {
        if (item.stage !== stage) return;
        if (item.isHeading && workshops.filter(e=> e.stage == stage).length > 1)return;
        const card = (
          <div
            className={
              "p-4 my-4 text-white flex flex-col justify-center " +
              (key % 2 === 0
                ? "col-start-1 col-end-5 text-right"
                : "col-start-6 col-end-9")
            }
          >
            <h3 className="font-semibold sm:text-lg mb-1">
              {item.name}
            </h3>
            {state.selected === key && (
              <p className="leading-tight">
                {item.description}
              </p>
            )}
          </div>
        );

        const title = (
          <div
            className={
              "p-4 my-4 text-white flex flex-col justify-center " +
              (key % 2 !== 0
                ? "col-start-1 col-end-5 text-right"
                : "col-start-6 col-end-9")
            }
          >
            <h3
              className="font-semibold sm:text-lg mb-1"
              style={{ color: "#C2FFF4" }}
            >
              {item.date}
            </h3>
            <h3
              className="font-semibold sm:text-lg mb-1"
              style={{ color: "#C2FFF4" }}
            >
              {item.time}
            </h3>
            <h3
              className="font-semibold text-md mb-1"
              style={{ color: "#C2FFF4" }}
            >
              {item.venue}
            </h3>
          </div>
        );

        return (
          <div
            key={item.name}
            className="contents flex-row-reverse cursor-pointer"
            onClick={() => select(key)}
          >
            {key % 2 === 0 ? card : title}

            <div className="col-start-5 col-end-6 mx-auto relative">
              <div className="h-full w-8 flex items-center justify-center">
                <div className="h-full w-1 bg-white"></div>
              </div>
              <div className="w-8 h-8 absolute top-1/2 -mt-3 rounded-full bg-white">
                {state.selected === key && (
                  <div
                    className="w-4 h-4 mx-auto mt-2 rounded-full"
                    style={{
                      background: "#95C5E2",
                    }}
                  ></div>
                )}
              </div>
            </div>

            {key % 2 === 0 ? title : card}
          </div>
        );
      })}
    </>
  );
};

const Workshops = ({ recruitmentEvents }: IWorkshopProps) => {
  const [state, setState] = useState({
    selected: 0,
  });
  const [workshops, setWorkshops] = useState(
    [] as IWorkshopData[]
  );

  const select = (id: number) => {
    setState({ selected: id });
  };

  useEffect(() => {
    const workshopdata = [] as IWorkshopData[];
    let currentEvent = 0;
    const currentDate = new Date();
    // TODO: remove filter and apply logic
    recruitmentEvents.filter(w => w.name !== 'Workshop').map(e => {
      const { timeDate, ...wdata } = e
      const _date = new Date(timeDate as unknown as number);
      const date = _date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
      const time = _date.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" });

      if (currentDate > _date) currentEvent++;
      workshopdata.push({
        date,
        time,
        ...wdata,
      });
    })

    setWorkshops(workshopdata);
    setState({ selected: currentEvent });

  }, []);

  const handleKeyDown = (
    e: KeyboardEvent<HTMLElement>
  ) => {
    const { selected } = state;
    if (e.key === "ArrowUp" && selected > 0) {
      setState({ selected: selected - 1 });
    } else if (
      e.key === "ArrowDown" &&
      selected < workshops.length - 1
    ) {
      setState({ selected: selected + 1 });
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen items-center"
      style={{
        background:
          "linear-gradient(to right, #003D63, #0C72B0)",
        marginBottom: -35,
      }}
    >

      <h1 className="text-white font-bold mt-24 text-2xl md:text-6xl">
        Recruitment & Workshop
      </h1>

      <Link href="/workshops/registration">
        <button
          className="mt-8 p-4 block rounded-3xl font-semibold text-lg bg-white"
          style={{ width: 300, color: "#0C72B0" }}
        >
          Register Now
        </button>
      </Link>

      {/* Timeline */}
      <div className="container my-24">
        <div
          className="grid grid-cols-9 outline-none"
          tabIndex={1}
          onKeyDown={handleKeyDown}
        >
          <div className="my-4 text-2xl text-white col-start-2 col-end-9 text-center">
            <h3 className="font-bold">
              Aptitude Test
            </h3>
            <h3 style={{ color: "#C2FFF4" }}>
              Stage 1
            </h3>
          </div>
          <Stage
            workshops={workshops}
            state={state}
            select={select}
            stage={1}
          />

          <div className="my-4 text-2xl text-white col-start-2 col-end-9 text-center">
            <h3 className="font-bold">
              Workshops
            </h3>
            <h3 style={{ color: "#C2FFF4" }}>
              Stage 2
            </h3>
          </div>
          <Stage
            workshops={workshops}
            state={state}
            select={select}
            stage={2}
          />

          <div className="my-4 text-2xl text-white col-start-2 col-end-9 text-center">
            <h3 className="font-bold">
              Projects
            </h3>
            <h3 style={{ color: "#C2FFF4" }}>
              Stage 3
            </h3>
          </div>
          <Stage
            workshops={workshops}
            state={state}
            select={select}
            stage={3}
          />

          <div className="my-4 text-2xl text-white col-start-2 col-end-9 text-center">
            <h3 className="font-bold">
              Technical Screening
            </h3>
            <h3 style={{ color: "#C2FFF4" }}>
              Stage 4
            </h3>
          </div>
          <Stage
            workshops={workshops}
            state={state}
            select={select}
            stage={4}
          />

          <div className="my-4 text-2xl text-white col-start-2 col-end-9 text-center">
            <h3 className="font-bold">
              Group Discussions
            </h3>
            <h3 style={{ color: "#C2FFF4" }}>
              Stage 5
            </h3>
          </div>
          <Stage
            workshops={workshops}
            state={state}
            select={select}
            stage={5}
          />

          <div className="my-4 text-2xl text-white col-start-2 col-end-9 text-center">
            <h3 className="font-bold">
              Interviews
            </h3>
            <h3 style={{ color: "#C2FFF4" }}>
              Stage 6
            </h3>
          </div>
          <Stage
            workshops={workshops}
            state={state}
            select={select}
            stage={6}
          />
        </div>
      </div>
    </div>
  );
};

export default Workshops;
