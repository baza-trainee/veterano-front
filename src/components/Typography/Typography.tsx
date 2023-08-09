type Variant = "h1" | "h2" | "h3" | "h4" | "h5" | "p";

interface TypographyProps {
  variant?: Variant;
  component?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}
const Typography: React.FC<TypographyProps> = ({
  variant = "h1",
  children,
  component,
  ...props
}) => {
  const Component = component || variant;
  const className = {
    h1: "text-h1-sm md:text-h1-md lg:text-h1-lg",
    h2: "text-h2-sm md:text-h2-md lg:text-h2-lg",
    h3: "text-h3-sm md:text-h3-md lg:text-h3-lg",
    h4: "text-h4-sm md:text-h4-md lg:text-h4-lg",
    h5: "text-h5-sm md:text-h5-md lg:text-h5-lg",
    p: "text-p-sm md:text-p-md lg:text-p-lg",
  };

  return (
    <Component className={className[variant]} {...props}>
      {children}
    </Component>
  );
};

export default Typography;
