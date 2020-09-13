//why is the following inactive code not working but the link its?

// https://www.typescriptlang.org/play?#code/C4TwDgpgBA0hIHkBmARAlgZ2AJzQIwFdgIATAfQCEAeAFQD4oBeKGqCAD2IDsSMoBDLiCgB+KAGt4AeyQsoALihcIANwjYA3AFgAUKEhQASv2BopGAHL8AthEq0GzOIlSYc+IqXs0A2pJAyLAC6dNo6uvrQxqbmNOB2FExQAN66UOk+AObYUgRgili4XJlBisk+2CZmBe7FpUoE1njqAL5QAPTtUNb8IM3pAQRQAO6CwFDZuWBQwFJQAORguD3YIPNQAD4LGBAAxlI8-KvrW-PE2KZHa7oturpIBFy7MVxQu9gQJhAAwgDKv98CFgpNYAAo5SAXNAQDDeNicCA8PjRMwYOKQSh0AAUlRiGEUNAAlIpDHspNgSFQUeYrLZvHQADRQQpoYoMVI6dJQAA2EHGUjwACsksk2vxkWSKVSqjSbAkHEyWWyOl1hgALExQNCyACSIzGMzmQOgwDVmCgDyeLxGaFNUCkpvUUFxqKUcoAdDa7aT9lKlZlFbVMgw9cMDmcoBq1AIiFJ9tYwLziHdOekEEK9sB3Sp+NyCDCcTKMIT3UhyQBRfi7NVYwsxQlMOhpLlpjPPd3+DB1swlsvYSvV2v+BuMdnNltcgWCvzwATIou0+X0IJJAAGAFp1wASZL+FqrsITqAtQnjwlhccfYAEbCvKdhW7hHSdKChg2zKD9fh4XmGyP8aNWWIblMERHZdBfCB3UyT1iCwT10k6alLDlSgLRyawZgwFMX0dGYzWKLU+B1eZuW5f9o2sAhuVMRNoBdcx7TbcZhltNUoBIbUkHURFxi4OVsOfLoMDmPVdkECMSDmH1yUpZDF0oQMimDCCunJZk1VybkSFfN4Pi+bpqNo38GJmeI3VsHk0EkT8IG5KRhgEHgoGNIxJTkhdUMSLZkIAJgUiglNZFShPwniiO6Xp+gAVm6ckoiLJjBUzHC1OwDStJ0sT9OIAQoAAVS4MxXkiDooHLLhGiZVi7Vzcj+MskQU1KvyAqSZxkHQFlCGIchqEiQJDAAQRoHUEF+MhfJnAJZAG2RhtG8bJpCXR9i4LAjBGsaJt8tDmA5LkljQFYQDKccuXmBjfPXI6TvXABGAAGR75kUABmBlzvSS6ZWu26rnXXznteqAABZ3Wiz7U2PKGuR2NaSCuM7oYuq713hg5EdWB7gfe2GJx+mJroxw5saBl7FHByHxxafGZnUS5VmRo9CbMa7zkZkAcYpqAPq+hY0Y5tAAfJkGqbp1HfvXIWAbe3GwYhqGaahx9VoODa4OAXbEmYd5PmIP4ASBWYwQhBnoVhCgsQW7bJsoU8n017WfHmLgpEgeYggiGEtcoF3BfN2XgaCIA


// type KeyOfDistributed_B<T> = T extends any ? keyof T : never;
// type RatiosName_B<T> = KeyOfDistributed_B<T[keyof T]>;

// type RatiosType_B = {
//    [group: string]: {[ratio: string]: number} // maybe  you want group to 'primary' | 'secondary' | 'tertiary'
// }

// function createCSSCustomProperties_B<T extends RatiosType_B>(ratios: T): Record<RatiosName_B<T>, string> {
//    let obj = {} as Record<RatiosName_B<T>, string> // what if I want to use this function with other ratios name. with Record<string, string> I won't have autocomplete

//    Object.values(ratios).forEach((ratio) =>
//       Object.keys(ratio).forEach((key) => {
//          obj[key as RatiosName_B<T>] = `--${key}`;
//       })
//    );

//    return obj;
// }

// // I want to be able to have intelisense
// // e.g. test.   //RatiosName_B from ts

// // the thing is I'll have multiple ratios object with different names
// // so I can't do Record<RatiosName_B, string>
// // or should I create multiple ratio type name like below and use Record<RatiosName_B | Ratios2Name_B, string>
// // there is maybe 5 more Ratios object

// // or should I create a Union type / Enum, with all name ?

// type Ratios2Name_B = KeyOfDistributed_B<typeof RATIOS_2_B[keyof typeof RATIOS_2_B]>
// const RATIOS_2_B = {
//    primary: {
//       'ratio2-primary-100': 3,
//       'ratio2-primary-200': 4.5,
//    },
//    secondary: {
//       'ratio2-secondary-100': 3,
//       'ratio2-secondary-200': 4.5,
//    },
//    tertiary: {
//       'ratio2-tertiary-100': 3,
//       'ratio2-tertiary-200': 4.5,
//       'ratio2-tertiary-300': 4.5,

//    },
// }

// const test2_B = createCSSCustomProperties_B(RATIOS_2_B)

// test2_B['nope']
// test2_B['ratio2-tertiary-300']