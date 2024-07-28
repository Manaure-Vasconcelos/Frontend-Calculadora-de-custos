export default function ResultSpan({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="border-l-[5px] border-primary p-2 rounded-lg cursor-default mr-2 bg-white dark:bg-background dark:text-white">
      {children}
    </span>
  );
}
