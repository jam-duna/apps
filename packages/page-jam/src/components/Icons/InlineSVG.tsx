import { useEffect, useState } from "react";

type InlineSVGProps = {
  src: string;        // e.g. "/icons/my-icon.svg"
  color: string;
  size: number;
};

const InlineSVG: React.FC<InlineSVGProps> = ({ src, color, size }) => {
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    fetch(src)
      .then((res) => res.text())
      .then((data) => {
        // Optional: Replace fill or stroke with your color
        const colored = data
          .replace(/fill="[^"]*"/g, `fill="#0000"`)
          .replace(/stroke="[^"]*"/g, `stroke="${color}"`)
          .replace(/<svg width="[^"]*" height="[^"]*"/g, `<svg width="${size}" height="${size}"`);
        setSvg(colored);
      });
  }, [src, color]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: svg }}
      style={{ width: size, height: size }}
    />
  );
};

export default InlineSVG;
