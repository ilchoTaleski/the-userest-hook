import mock from "utils/mock";

const songs = [
  {
    id: 1,
    title: "Driver's licence",
    singer: "Olivia Rodrigo",
  },
  {
    id: 2,
    title: "Blinding Lights",
    singer: "The Weeknd",
  },
  {
    id: 3,
    title: "Solid",
    singer: "Young Thug, Gunna feat. Drake",
  },
  {
    id: 4,
    title: "On Me",
    singer: "Lil Baby",
  },
];

mock.onGet("/api/songs").reply(200, { songs });
