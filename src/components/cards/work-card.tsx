import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const WorkCard: React.FC<{ work: Work }> = ({ work }) => {
  return (
    <Link href={`/work/${work.id}`}>
      <Card className="min-w-[250px] max-w-[300px] h-auto mx-auto">
        <CardHeader className="p-2 ">
          <Image
            src={work.image}
            alt="Work Image"
            height={540}
            width={320}
            className="h-[10rem] w-full max-w-full rounded-lg object-cover"
          />
        </CardHeader>

        <CardContent className="text-center w-full overflow-auto mt-2">
          <CardDescription className="pt-2">{work.content}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

export default WorkCard;
