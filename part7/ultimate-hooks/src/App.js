import { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    !event ? setValue("") : setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    async function fetchAll() {
      try {
        const result = await axios.get(baseUrl);
        setResources(result.data);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchAll();
  }, [baseUrl]);

  const create = async (resource) => {
    try {
      const result = await axios.post(baseUrl, resource);
      setResources([...resources, result.data]);
    } catch (err) {
      console.log(err.message);
    }
  };

  const service = {
    create,
  };

  return [resources, service];
};

const App = () => {
  const content = useField("text");
  const name = useField("text");
  const number = useField("text");

  const [notes, noteService] = useResource("http://localhost:3005/notes");
  const [persons, personService] = useResource("http://localhost:3005/persons");

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    if (noteService.create({ content: content.value })) {
      content.onChange(null);
    }
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    console.log(
      personService.create({ name: name.value, number: number.value })
    );
    name.onChange(null);
    number.onChange(null);
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  );
};

export default App;
