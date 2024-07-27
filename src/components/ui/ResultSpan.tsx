export default function ResultSpan({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="border-l-[5px] border-primary p-2 rounded-lg bg-background cursor-default mr-2 dark:text-white">
      {children}
    </span>
  );
}
