import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";

const WorkCard: React.FC<{ work: Work }> = ({ work }) => {
  return (
    <Card className="min-w-[250px] max-w-[300px] h-full mx-auto">
      <CardHeader>
        <Image
          src={work.image}
          alt="Work Image"
          height={540}
          width={320}
          className="h-[10rem] w-full max-w-full rounded-lg object-cover"
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-y-3 text-center">
        <CardDescription>{work.content}</CardDescription>
      </CardContent>
      <CardFooter />
    </Card>
  );
};

export default WorkCard;
