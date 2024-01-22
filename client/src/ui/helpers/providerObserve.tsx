export default (Provider: React.FC<{ children: React.ReactNode }>, Component: React.FC): React.FC => {
  return () => {
    return (
      <Provider>
        <Component />
      </Provider>
    )
  }
}