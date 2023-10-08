import { FC, LazyExoticComponent, ReactNode, Suspense } from "react";

type LazyProps = {
  Page: LazyExoticComponent<() => JSX.Element>;
};

const Lazy: FC<LazyProps> = ({ Page }) => {
  return (
    <Suspense fallback="Loading...">
      <Page />
    </Suspense>
  );
};

export default Lazy;
