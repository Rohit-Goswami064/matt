import type { ClientResult } from "@/components/ui/testimonials";

const rawClientResults: ClientResult[] = [
  {
    id: 1,
    duration: "3-month transform",
    videoSrc: "/mattImage/clint01.mp4",
  },
  {
    id: 2,
    duration: "4-month transform",
    videoSrc: "/mattImage/client02.mp4",
  },
  {
    id: 3,
    duration: "6-month transform",
    videoSrc: "/mattImage/clinet03.mp4",
  },
  {
    id: 4,
    duration: "5-month transform",
    videoSrc: "/mattImage/clinet04.mp4",
  },
  {
    id: 5,
    duration: "4-month transform",
    videoSrc: "/mattImage/clinet05.mp4",
  },
  {
    id: 6,
    duration: "3-month transform",
    videoSrc: "/mattImage/Clinet06.mp4",
  },
  {
    id: 7,
    duration: "6-month transform",
    videoSrc: "/mattImage/clinet07.mp4",
  },
  {
    id: 8,
    duration: "5-month transform",
    videoSrc: "/mattImage/Clinet08.mp4",
  },
];

/** One card per unique client video — no duplicates in the source set */
export const clientResultsData: ClientResult[] = rawClientResults.filter(
  (item, index, list) =>
    list.findIndex((entry) => entry.videoSrc === item.videoSrc) === index
);
