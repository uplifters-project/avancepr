import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const WorkCard: React.FC<{ work: Work }> = ({ work }) => {
  return (
    <Link href={`/work/${work.id}`}>
      <Card className="w-[300px] mx-auto">
        <CardHeader className="relative w-full aspect-[0.7] p-2">
          <Image
            src={work.image}
            alt="Work Image"
            fill
            className="object-cover p-2 rounded-lg"
          />
        </CardHeader>

        <CardContent className="text-center w-full overflow-auto mt-2">
          <CardTitle className="">{work.content}</CardTitle>
        </CardContent>
      </Card>
    </Link>
  );
};

export default WorkCard;
