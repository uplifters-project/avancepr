import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";

const NewsCard: React.FC<{ news: News }> = ({ news }) => {
  return (
    <Card className="min-w-[250px] max-w-[300px] h-full mx-auto">
      <CardHeader>
        <Image
          src={news.image}
          alt="Work Image"
          height={540}
          width={320}
          className="h-[10rem] w-full max-w-full rounded-lg object-cover"
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-y-3 text-center">
        <CardDescription>{news.content}</CardDescription>
      </CardContent>
      <CardFooter />
    </Card>
  );
};

export default NewsCard;
