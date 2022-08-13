import { PropsWithChildren } from "react";

// not sure yet, if this component is really necessary
// TODO: check back after implementing 100vh layout, etc.
export default function ContentPane({ children }: PropsWithChildren) {
  return <>{children}</>;
}
