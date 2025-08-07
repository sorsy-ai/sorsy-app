import Image from "next/image";

export default function SorsyLogoImg({ style }: { style?: React.CSSProperties }) {
  return (
    <Image src="/sorsy-logo-red.svg" alt="SORSY Logo" style={style} width={160} height={40} />
  );
}
