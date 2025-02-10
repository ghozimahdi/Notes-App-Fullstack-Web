import style from "./HomePage.module.css";
import NoteItem from "./components/NoteItem.tsx";

function HomePage() {
  return (
    <>
      <nav className={style.navbar}>
        <p>List Notes</p>
        <div>
          <button>Add</button>
        </div>
      </nav>
      <main>
        <div>
          <NoteItem/>
          <NoteItem/>
          <NoteItem/>
        </div>
      </main>
    </>
  );
}

export default HomePage;