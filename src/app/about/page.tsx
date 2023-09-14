import React from "react";
import Image from "next/image";

import Progress from "public/progress.png";

const About = () => {
  return (
    <div className="grid place-items-center">
      <Image src={Progress} alt="in progress" width={500} height={500} />
    </div>
  );
};

export default About;
