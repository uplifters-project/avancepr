import React from "react";
import Image from "next/image";
import WorkItem from "../pages/WorkItem";
import content_marketing from "public/content_marketing.jpg";
import influencer_marketing from "public/influencer_marketing.jpg";
import public_relation from "public/public_relation.jpg";
import social_media_marketing from "public/social_media_marketing.jpg";
import event from "public/event.jpg";

export default function Work() {
  const Testimonial = () => {
    return (
      <div className="grid md:grid-cols-3 gap-8">
        <WorkItem title="Work 1" backgroundImg={content_marketing} />
        <WorkItem title="Work 2" backgroundImg={influencer_marketing} />
        <WorkItem title="Work 3" backgroundImg={public_relation} />
      </div>
    );
  };

  return (
    <div>
      <Testimonial />
    </div>
  );
}
