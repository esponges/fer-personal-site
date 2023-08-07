export const PageHeader = ({ title, description }: { title: string; description?: string }) => {
  return (
    <div className="my-10 flex flex-col gap-4 rounded-xl p-4 dark:text-gray-300 text-white text-center">
      <h3 className="text-4xl font-bold dark:text-white">{title}</h3>
      {description && <div className="text-lg">{description}</div>}
    </div>
  );
};
