import style from "./HomePage.module.css";

function HomePage() {
  return (
    <>
      <nav className={style.navbar}>
        <p className={style.titlePage}>List Notes</p>
      </nav>
      <main>
        <div>
          <p>Content</p>
        </div>
      </main>
    </>
  );
}

export default HomePage;