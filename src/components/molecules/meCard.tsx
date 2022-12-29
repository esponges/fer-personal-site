/* just a card to show and emoji with a lil description of me */
export const MeCard = ({ emoji, description }: { emoji: string; description: string }) => {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl p-4 text-white card--bg">
      <div className="text-5xl">{emoji}</div>
      <div className="text-lg mt-4 text-center">{description}</div>
    </div>
  );
};
