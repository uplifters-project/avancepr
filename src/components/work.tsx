import React from "react";
import WorkItem from "../pages/WorkItem";

const Work: React.FC<{
  workItems: Work[];
}> = ({ workItems }) => {
  const Testimonial = () => {
    return (
      <div className="grid md:grid-cols-3 gap-8">
        {workItems.map((item) => (
          <WorkItem title={item.content} backgroundImg={item.image} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <Testimonial />
    </div>
  );
};

export default Work;
