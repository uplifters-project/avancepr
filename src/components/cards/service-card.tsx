import Image from "next/image";
import Link from "next/link";

const ServiceCard: React.FC<{ title: string; image: string; url: string }> = ({
  title,
  image,
  url,
}) => {
  return (
    <div className="relative flex items-center justify-center w-[300px] h-[200px] shadow-xl shadow-gray-400 rounded-xl overflow-hidden group hover:bg-gradient-to-r from-[#FFFF8F] to-[#FFAA33]">
      <Image
        className="rounded-xl group-hover:opacity-10 object-cover"
        src={image}
        alt={title}
        fill
        sizes="300px"
      />
      <div className="hidden group-hover:block absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 px-4">
        <h3 className="text-2xl text-black font-bold tracking-wider text-center break-words">
          {title}
        </h3>

        <div className="h-4" />

        <Link href={url}>
          <p className="text-center py-3 rounded-lg bg-white text-gray-700 font-bold text-lg cursor-pointer">
            More Info
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;