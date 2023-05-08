export function Links() {
  return (
    <>
      <style>{`
        a {
          color: white;
        }
        a::visited {
          color: white;
        }
      `}</style>
      <ul>
        {[
          "/poc/async/use/server",
          "/poc/async/use/client",
          "/poc/async/use-server",
          "/poc/async/use-client",
          "/poc/async/use-hybrid",
        ].map((url) => {
          return (
            <li key={url}>
              <a href={url} style={{ color: "white" }}>
                {url}
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
}
