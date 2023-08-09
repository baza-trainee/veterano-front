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
  const className =
    "text-" +
    variant +
    "-sm" +
    " " +
    "md:text-" +
    variant +
    "-md" +
    " " +
    "lg:text-" +
    variant +
    "-lg";
  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};

export default Typography;
