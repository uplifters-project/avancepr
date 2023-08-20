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
      <Card className="min-w-[250px] max-w-[300px] h-full mx-auto">
        <CardHeader className="p-2">
          <Image
            src={news.image}
            alt="Work Image"
            height={540}
            width={320}
            className="h-[10rem] w-full max-w-full rounded-lg object-cover"
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
