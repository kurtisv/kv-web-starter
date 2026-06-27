import { Composition, registerRoot } from "remotion";
import {
  LaunchReel,
  LAUNCH_REEL_DEFAULT_PROPS,
  LAUNCH_REEL_DURATION,
  LAUNCH_REEL_FPS,
  LAUNCH_REEL_WIDTH,
  LAUNCH_REEL_HEIGHT,
} from "./compositions/LaunchReel";
import {
  HeroBackground,
  HERO_BG_DEFAULT_PROPS,
  HERO_BG_DURATION,
  HERO_BG_FPS,
  HERO_BG_WIDTH,
  HERO_BG_HEIGHT,
} from "./compositions/HeroBackground";
import {
  HeroIntro,
  HERO_INTRO_DEFAULT_PROPS,
  HERO_INTRO_DURATION,
  HERO_INTRO_FPS,
  HERO_INTRO_WIDTH,
  HERO_INTRO_HEIGHT,
} from "./compositions/HeroIntro";
import {
  StatsCounter,
  STATS_COUNTER_DEFAULT_PROPS,
  STATS_COUNTER_DURATION,
  STATS_COUNTER_FPS,
  STATS_COUNTER_WIDTH,
  STATS_COUNTER_HEIGHT,
} from "./compositions/StatsCounter";
import {
  FeatureReveal,
  FEATURE_REVEAL_DEFAULT_PROPS,
  FEATURE_REVEAL_DURATION,
  FEATURE_REVEAL_FPS,
  FEATURE_REVEAL_WIDTH,
  FEATURE_REVEAL_HEIGHT,
} from "./compositions/FeatureReveal";

function RemotionRoot() {
  return (
    <>
      <Composition
        id="LaunchReel"
        component={LaunchReel}
        durationInFrames={LAUNCH_REEL_DURATION}
        fps={LAUNCH_REEL_FPS}
        width={LAUNCH_REEL_WIDTH}
        height={LAUNCH_REEL_HEIGHT}
        defaultProps={LAUNCH_REEL_DEFAULT_PROPS}
      />
      <Composition
        id="HeroBackground"
        component={HeroBackground}
        durationInFrames={HERO_BG_DURATION}
        fps={HERO_BG_FPS}
        width={HERO_BG_WIDTH}
        height={HERO_BG_HEIGHT}
        defaultProps={HERO_BG_DEFAULT_PROPS}
      />
      <Composition
        id="HeroIntro"
        component={HeroIntro}
        durationInFrames={HERO_INTRO_DURATION}
        fps={HERO_INTRO_FPS}
        width={HERO_INTRO_WIDTH}
        height={HERO_INTRO_HEIGHT}
        defaultProps={HERO_INTRO_DEFAULT_PROPS}
      />
      <Composition
        id="StatsCounter"
        component={StatsCounter}
        durationInFrames={STATS_COUNTER_DURATION}
        fps={STATS_COUNTER_FPS}
        width={STATS_COUNTER_WIDTH}
        height={STATS_COUNTER_HEIGHT}
        defaultProps={STATS_COUNTER_DEFAULT_PROPS}
      />
      <Composition
        id="FeatureReveal"
        component={FeatureReveal}
        durationInFrames={FEATURE_REVEAL_DURATION}
        fps={FEATURE_REVEAL_FPS}
        width={FEATURE_REVEAL_WIDTH}
        height={FEATURE_REVEAL_HEIGHT}
        defaultProps={FEATURE_REVEAL_DEFAULT_PROPS}
      />
    </>
  );
}

registerRoot(RemotionRoot);
