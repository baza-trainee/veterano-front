import { FC, ReactNode } from "react";
import Typography from "../Typography/Typography";
import Container from "../Container";

interface SectionProps {
  title: string;
  children: ReactNode;
}

const Section: FC<SectionProps> = ({ title = "Title", children }) => {
  return (
    <section className="py-[80px md:py-[100px] lg:py-[120px]]">
      <Container>
        <Typography variant="h2" className="text-center">
          {title}
        </Typography>
        <div className="mt-[48px]">{children}</div>
      </Container>
    </section>
  );
};

export default Section;
