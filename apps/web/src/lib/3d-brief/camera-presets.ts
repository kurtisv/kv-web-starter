import type { ObjectType } from "./types";

export const CAMERA_PRESETS: Record<ObjectType, string> = {
  car:
    "low 3/4 front hero angle — camera at hood height, slightly off-center left, 35mm lens equivalent, slight upward tilt to emphasise stance",

  phone:
    "slightly elevated front 3/4 angle, portrait orientation, 85mm lens equivalent, minimal tilt showing side rail thickness and camera module",

  laptop:
    "3/4 front angle at desk level, lid open 104 degrees, showing keyboard and screen in equal balance, 50mm lens equivalent",

  watch:
    "45-degree raised front angle, dial facing camera, 100mm macro equivalent, slight downward tilt to reveal bezel depth and crown",

  shoe:
    "lateral 3/4 product angle at slight elevation, sole partially visible, showing full silhouette from toe cap to heel counter, 85mm equivalent",

  furniture:
    "editorial 3/4 elevated angle showing the full piece in environmental context, 35mm wide-angle with perspective control",

  bottle:
    "straight-on frontal or slight 3/4, vertical composition, 85mm equivalent, label fully legible, cap at top of frame",

  generic:
    "low 3/4 front hero angle, 50mm lens equivalent, subject centered with ground plane subtly visible",
};
