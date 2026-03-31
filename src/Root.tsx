import { Composition } from "remotion";
import { DisputeKitPromo } from "./DisputeKitPromo";

export const RemotionRoot = () => {
  return (
    <Composition
      id="DisputeKitPromo"
      component={DisputeKitPromo}
      durationInFrames={300}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{
        title: "DisputeKit Pro",
        subtitle: "Professional Credit Repair Suite",
        features: [
          "AI-Powered Dispute Letters",
          "Bureau-Specific Templates",
          "Smart Legal Citations",
          "One-Click PDF Export",
        ],
        ctaText: "Start Repairing Your Credit Today",
      }}
    />
  );
};
