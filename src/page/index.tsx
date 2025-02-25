
// export function useAfterQuery<TData = unknown, TError>({
//   queryResult,
//   enabled,
//   onSuccess,
//   onError,
// }: QueryCallbacks<TData, TError>) {
//   useEffect(() => {
//     if (!enabled) return;
//     if (queryResult.isSuccess && onSuccess) {
//       onSuccess(queryResult.data);
//     }
//   }, [enabled, queryResult.isSuccess, queryResult.data, onSuccess]);

//   useEffect(() => {
//     if (!enabled) return;
//     if (queryResult.isError && onError) {
//       onError(queryResult.error);
//     }
//   }, [enabled, queryResult.isError, queryResult.error, onError]);
// }

function Main() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Main</h1>
      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more.
      </p>
    </>
  )
}

export default Main
