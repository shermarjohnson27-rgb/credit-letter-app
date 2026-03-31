import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { loadFont } from "@remotion/google-fonts/Sora";

const { fontFamily } = loadFont("normal", {
  weights: ["300", "400", "600", "700", "800"],
  subsets: ["latin"],
});

const COLORS = {
  bg: "#08090f",
  card: "#10131f",
  accent: "#22d3a5",
  accentDark: "#1ab88e",
  blue: "#4f8ef7",
  purple: "#9b6fff",
  text: "#eaecf6",
  muted: "#6b7590",
};

export type DisputeKitPromoProps = {
  title: string;
  subtitle: string;
  features: string[];
  ctaText: string;
};

const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 12 } });
  const titleOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [15, 35], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleY = interpolate(frame, [30, 50], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glowPulse = interpolate(frame, [0, 60, 120], [0.4, 0.8, 0.4], {
    extrapolateRight: "extend",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 80% 50% at 50% 40%, rgba(34,211,165,${glowPulse * 0.12}) 0%, ${COLORS.bg} 70%)`,
        justifyContent: "center",
        alignItems: "center",
        fontFamily,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            width: 100,
            height: 100,
            background: COLORS.accent,
            borderRadius: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${logoScale})`,
            boxShadow: `0 0 60px rgba(34,211,165,0.4)`,
          }}
        >
          <span
            style={{
              color: "#03120b",
              fontWeight: 800,
              fontSize: 28,
              letterSpacing: "0.04em",
            }}
          >
            DK
          </span>
        </div>

        <h1
          style={{
            fontSize: 88,
            fontWeight: 800,
            color: COLORS.text,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          Dispute<span style={{ color: COLORS.accent }}>Kit</span> Pro
        </h1>

        <p
          style={{
            fontSize: 32,
            fontWeight: 400,
            color: COLORS.muted,
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
            margin: 0,
            letterSpacing: "0.02em",
          }}
        >
          Professional Credit Repair Suite
        </p>
      </div>
    </AbsoluteFill>
  );
};

const FeatureScene: React.FC<{
  features: string[];
}> = ({ features }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
        fontFamily,
      }}
    >
      <div
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, rgba(79,142,247,0.08) 0%, transparent 70%)`,
          position: "absolute",
          inset: 0,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
          zIndex: 1,
        }}
      >
        <h2
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.text,
            margin: 0,
            opacity: interpolate(frame, [0, 15], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Everything You Need
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            width: 800,
          }}
        >
          {features.map((feature, i) => {
            const delay = 15 + i * 12;
            const s = spring({
              frame,
              fps,
              delay,
              config: { damping: 14, stiffness: 150 },
            });
            const x = interpolate(s, [0, 1], [80, 0]);

            return (
              <div
                key={feature}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  background: COLORS.card,
                  border: `1px solid rgba(255,255,255,0.07)`,
                  borderRadius: 16,
                  padding: "24px 32px",
                  opacity: s,
                  transform: `translateX(${x}px)`,
                }}
              >
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.blue})`,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: 30,
                    fontWeight: 600,
                    color: COLORS.text,
                  }}
                >
                  {feature}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const DemoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardScale = spring({
    frame,
    fps,
    config: { damping: 200 },
  });
  const checkmarks = [0, 1, 2].map((i) =>
    spring({
      frame,
      fps,
      delay: 20 + i * 15,
      config: { damping: 12 },
    }),
  );

  const items = [
    "Select dispute reason",
    "Choose credit bureau",
    "Generate & export PDF",
  ];

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
        fontFamily,
      }}
    >
      <div
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 50%, rgba(155,111,255,0.06) 0%, transparent 70%)`,
          position: "absolute",
          inset: 0,
        }}
      />

      <div
        style={{
          transform: `scale(${cardScale})`,
          background: COLORS.card,
          border: `1px solid rgba(255,255,255,0.1)`,
          borderRadius: 24,
          padding: "48px 64px",
          display: "flex",
          flexDirection: "column",
          gap: 32,
          boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
          zIndex: 1,
        }}
      >
        <h2
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: COLORS.text,
            margin: 0,
            textAlign: "center",
          }}
        >
          3 Simple Steps
        </h2>

        {items.map((item, i) => (
          <div
            key={item}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: interpolate(checkmarks[i], [0, 1], [0, 1])
                  ? `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.blue})`
                  : "rgba(255,255,255,0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${checkmarks[i]})`,
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  color: "#fff",
                  fontSize: 24,
                  fontWeight: 800,
                }}
              >
                {i + 1}
              </span>
            </div>
            <span
              style={{
                fontSize: 28,
                fontWeight: 500,
                color: COLORS.text,
                opacity: checkmarks[i],
              }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const CtaScene: React.FC<{ ctaText: string }> = ({ ctaText }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 12 } });
  const buttonSpring = spring({
    frame,
    fps,
    delay: 20,
    config: { damping: 10, stiffness: 120 },
  });
  const glowPulse = interpolate(
    frame,
    [0, 30, 60],
    [0.3, 0.7, 0.3],
    { extrapolateRight: "extend" },
  );

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 80% 60% at 50% 50%, rgba(34,211,165,${glowPulse * 0.15}) 0%, ${COLORS.bg} 70%)`,
        justifyContent: "center",
        alignItems: "center",
        fontFamily,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        <h1
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: COLORS.text,
            margin: 0,
            transform: `scale(${titleSpring})`,
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.2,
          }}
        >
          {ctaText}
        </h1>

        <div
          style={{
            transform: `scale(${buttonSpring})`,
            background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDark})`,
            color: "#03120b",
            fontSize: 28,
            fontWeight: 700,
            padding: "20px 56px",
            borderRadius: 16,
            boxShadow: `0 0 40px rgba(34,211,165,${glowPulse})`,
          }}
        >
          Get Started Free
        </div>

        <p
          style={{
            fontSize: 20,
            color: COLORS.muted,
            margin: 0,
            opacity: interpolate(frame, [35, 50], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          DisputeKit Pro — Your Credit, Your Power
        </p>
      </div>
    </AbsoluteFill>
  );
};

export const DisputeKitPromo: React.FC<DisputeKitPromoProps> = ({
  features,
  ctaText,
}) => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={90}>
        <IntroScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 15 })}
      />
      <TransitionSeries.Sequence durationInFrames={90}>
        <FeatureScene features={features} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: 15 })}
      />
      <TransitionSeries.Sequence durationInFrames={90}>
        <DemoScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 15 })}
      />
      <TransitionSeries.Sequence durationInFrames={90}>
        <CtaScene ctaText={ctaText} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
