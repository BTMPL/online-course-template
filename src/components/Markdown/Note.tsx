export default ({ children }: { children: React.ReactNode }) => {
  return (
    <aside className="px-6 py-1 my-6 rounded-lg text-pink-800 bg-pink-100">
      {children}
    </aside>
  );
};
