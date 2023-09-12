import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";

const ClientCard: React.FC<{ client: Client }> = ({ client }) => {
  return (
    <Card className="min-w-[350px] max-w-[400px] h-full mx-auto">
      <CardHeader className="p-2 relative">
        <Image
          src={client.image}
          alt="Client Image"
          height={900}
          width={600}
          className="h-[10rem] w-full max-w-full rounded-lg object-cover"
        />
      </CardHeader>
    </Card>
  );
};

export default ClientCard;
