
// question How can I get the key of the nested objects pls ?
// he wants the nested keys but is getting the outer keys
//credit Kirdes
const RATIOS = {
  WELCOME: {
    '--welcome-100': 3,
    '--welcome-200': 4.5,
  },
  HOME: {
    '--home-100': 3,
    '--home-200': 4.5,
  },
};

type RatiosName = keyof typeof RATIOS
// "WELCOME" "HOME"

type KeyOfDistributed<T> = T extends any ? keyof T : never;
type ZZ = KeyOfDistributed<typeof RATIOS[keyof typeof RATIOS]>
//credit GerritO

type KeyOfDistributedRemake<T> = T extends object ? keyof T : never;
type innerKeys = KeyOfDistributedRemake<typeof RATIOS[keyof typeof RATIOS]>

type XX = { [K in keyof typeof RATIOS]: keyof typeof RATIOS[K] }[keyof typeof RATIOS]
