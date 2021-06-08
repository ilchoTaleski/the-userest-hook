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

mock.onGet("/api/songs").reply(200, songs);
mock.onGet(/\/api\/songs\/\d+/).reply(function (config) {
  // the actual id can be grabbed from config.url

  const id = +config.url.replace("/api/songs/", "");
  const song = songs.find((s) => s.id === id);

  return [200, song];
});

mock.onPost("/api/songs").reply(function (config) {
  // the actual id can be grabbed from config.url

  const song = JSON.parse(config.data);
  songs.push(song);

  return [200, {}];
});

mock.onDelete(/\/api\/songs\/\d+/).reply(function (config) {
  // the actual id can be grabbed from config.url

  const id = +config.url.replace("/api/songs/", "");
  const songIndex = songs.findIndex((s) => s.id === id);
  songs.splice(songIndex, 1);

  return [200, {}];
});

mock.onPatch(/\/api\/songs\/\d+/).reply(function (config) {
  // the actual id can be grabbed from config.url

  const id = +config.url.replace("/api/songs/", "");
  const songIndex = songs.findIndex((s) => s.id === id);
  const song = JSON.parse(config.data);
  songs[songIndex] = { ...songs[songIndex], ...song };

  return [200, {}];
});
