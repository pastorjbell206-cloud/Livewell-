/**
 * A plate by name, drawn from the lazy plate module (plates.tsx). Until the
 * module arrives the frame around it shows plain paper at its final size,
 * so nothing on the page moves when the drawing lands. A plate far down the
 * page is drawn only as it nears the screen (useNear).
 */
import { lazy, Suspense } from "react";
import { useNear } from "./useNear";

export type PlateName =
  | "book"
  | "basilica"
  | "lantern"
  | "house"
  | "tree"
  | "jar"
  | "compass"
  | "quill"
  | "books"
  | "letter"
  | "jars"
  | "tomb"
  | "table"
  | "arch"
  | "lens"
  | "sundial"
  | "lectern";

const PlateArt = lazy(() => import("./plates"));

export default function Plate({ name, decorative = false }: { name: PlateName; decorative?: boolean }) {
  const [ref, near] = useNear<HTMLSpanElement>();
  return (
    <span ref={ref} className="lw-plate-slot">
      {near && (
        <Suspense fallback={null}>
          <PlateArt name={name} decorative={decorative} />
        </Suspense>
      )}
    </span>
  );
}
