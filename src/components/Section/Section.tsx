import { FC, ReactNode } from "react";
import Typography from "../Typography/Typography";
import Container from "../Container";

interface SectionProps {
  title: string;
  className?: string;
  children?: ReactNode;
}

const Section: FC<SectionProps> = ({
  className = "",
  title = "",
  children,
}) => {
  return (
    <section
      className={
        className + " " + "py-section-sm md:py-section-md lg:py-section-lg"
      }
    >
      <Container>
        <Typography variant="h2" className="text-center">
          {title}
        </Typography>
        <div className="mt-section-content-sm md:mt-section-content-md lg:mt-section-content-lg">
          {children}
        </div>
      </Container>
    </section>
  );
};

export default Section;
