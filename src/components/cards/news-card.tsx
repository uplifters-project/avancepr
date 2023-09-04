import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const NewsCard: React.FC<{ news: News }> = ({ news }) => {
  return (
    <Link href={news.link ?? "#"} target="_blank">
      <Card className="w-[300px] h-full mx-auto">
        <CardHeader className="relative w-full aspect-[1.25] p-2">
          <Image
            src={news.image}
            alt="Work Image"
            fill
            className="object-cover p-2 rounded-lg"
          />
        </CardHeader>

        <CardContent className="text-center w-full overflow-auto mt-2">
          <CardDescription>{news.content}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

export default NewsCard;
