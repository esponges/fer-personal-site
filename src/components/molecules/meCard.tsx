/* just a card to show and emoji with a lil description of me */
export const MeCard = ({ emoji, description }: { emoji: string; description: string }) => {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
      <div className="text-5xl">{emoji}</div>
      <div className="text-lg mt-4 text-center">{description}</div>
    </div>
  );
};
