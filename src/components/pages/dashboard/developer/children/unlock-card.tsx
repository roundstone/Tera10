import { Button } from "@/components/ui/button";

const UnlockCard = ({ hasButton = true }: { hasButton?: boolean }) => {
  return (
    <div className="w-80 md:w-full bg-gray-900 h-[595px] rounded-lg overflow-hidden relative lg:flex flex-col hidden">
      <div className="flex-1 p-6 pt-64 flex flex-col justify-end text-white">
        <h3 className="text-4xl font-normal mb-2">
          Unlock Your
          <br /> Project's <br />
          Potential with
          <br /> Tera10!
        </h3>
        {hasButton && (
          <Button className="mt-4 rounded-full text-black self-start">
            List an asset
          </Button>
        )}
      </div>
      <div className="absolute top-0 right-0 left-0 h-64 bg-gradient-to-b from-black/20 to-transparent">
        {/* <img
src="/api/placeholder/320/240"
alt="Developer with building models"
className="w-full h-full object-cover object-center"
/> */}
      </div>
    </div>
  );
};

export default UnlockCard;
