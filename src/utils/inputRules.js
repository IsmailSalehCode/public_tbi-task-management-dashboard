export const rules = {
  required: (v) => !!v || "Required.",
  // isStatusValid: (v) => /^([1-3])$/.test(v) || "Key must be 1, 2 or 3.", unused
  max(maxNum) {
    return (v) => (v || "").toString().length <= maxNum || "Too long!";
  },
  min(minNum) {
    return (v) => (v || "").toString().length >= minNum || "Too short!";
  },
};
