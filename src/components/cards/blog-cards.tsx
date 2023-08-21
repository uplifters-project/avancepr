import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const BlogCard: React.FC<{ blog: BlogPreview }> = ({ blog }) => {
  const { id, title, image, author } = blog;

  return (
    <Link href={`/blogs/${id}`}>
      <Card className="w-80 h-full mx-auto text-center relative">
        <CardHeader className="p-2">
          <Image
            src={image}
            alt="Blog Image"
            height={900}
            width={600}
            className="h-[10rem] w-full max-w-full rounded-lg object-cover"
          />
        </CardHeader>

        <CardContent className="relative">
          <p className="font-extrabold text-2xl">{title}</p>
        </CardContent>

        <CardFooter className="align-middle justify-center">
          <p className="text-muted-foreground">{author}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BlogCard;
