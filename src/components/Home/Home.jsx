export function Home({startCharacters}) {
    console.log(startCharacters)
  return (
    <div className="Home">
      <h1>Home</h1>
      {startCharacters?.length && (
          <ul>
          {
              startCharacters.map(characterObject => (
                  <li key={characterObject.name}>
                      {characterObject.name}
                  </li>
              ))
          }
      </ul>
      )}

    </div>
  );
}


