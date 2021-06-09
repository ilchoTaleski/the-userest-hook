import { RootState } from "app/store";
import { useRest } from "hooks/useRest";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { StateStatus } from "slices/generic";
import "./App.css";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { Song } from "models/song";

function Songs() {
  const { songs } = useRest();
  const allSongs = useSelector((state: RootState) => state.songs.all);
  const [newSong, setNewSong] = useState<{
    id?: number;
    title: string;
    singer: string;
  }>({
    title: "",
    singer: "",
  });
  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    songs.getMany();
  }, []);

  if (allSongs.status < StateStatus.Done) {
    return null;
  }

  const handleSubmit = () => {
    songs.post(newSong);
    songs.getMany();
    setNewSong({ title: "", singer: "", id: null });
  };

  const handleDelete = (id) => {
    songs.delete(id);
    songs.getMany();
  };

  const handleEditAction = (song: Song) => {
    setNewSong(song);
    setEditing(true);
  };

  const handleEdit = () => {
    songs.patch(newSong, `${newSong.id}`);
    songs.getMany();
    setEditing(false);
    setNewSong({ title: "", singer: "", id: null });
  };

  return (
    <div className="App">
      <div className="d-flex">
        <div style={{ flex: 2 }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Singer</th>
                <th>Song title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allSongs.data.map((song) => (
                <tr key={song.id}>
                  <td>{song.id}</td>
                  <td>{song.singer}</td>
                  <td>{song.title}</td>
                  <td>
                    <span className="mx-2">
                      <BsPencilSquare
                        style={{ cursor: "pointer" }}
                        onClick={() => handleEditAction(song)}
                      />
                    </span>
                    <span className="mx-2">
                      <BsFillTrashFill
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(song.id)}
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div style={{ flex: 1, textAlign: "left" }} className="p-3 px-5">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="song-title">Song title</label>
              <input
                type="text"
                className="form-control"
                id="song-title"
                aria-describedby="songHelp"
                placeholder="Enter song title"
                value={newSong.title}
                onChange={(e) =>
                  setNewSong({ ...newSong, title: e.target.value })
                }
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="singer">Singer</label>
              <input
                type="text"
                className="form-control"
                id="singer"
                placeholder="Singer"
                value={newSong.singer}
                onChange={(e) =>
                  setNewSong({ ...newSong, singer: e.target.value })
                }
              />
            </div>
            {!editing && (
              <Button className="mt-3" type="submit">
                Add new song
              </Button>
            )}
            {editing && (
              <Button
                className="mt-3"
                type="submit"
                variant="secondary"
                onClick={handleEdit}
              >
                Edit song
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Songs;
