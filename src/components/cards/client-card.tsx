import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";

const ClientCard: React.FC<{ client: Client }> = ({ client }) => {
  return (
    <Card className="min-w-[250px] max-w-[300px] h-full mx-auto">
      <CardHeader className="p-2">
        <Image
          src={client.image}
          alt="Client Image"
          height={540}
          width={320}
          className="h-[10rem] w-full max-w-full rounded-lg object-cover"
        />
      </CardHeader>
    </Card>
  );
};

export default ClientCard;
