import { describe, expect, it } from "vitest";
import getItemLayout from "../example/src/index";

const generateMockData = (numberOfSections: number, itemsPerSection: number) =>
  Array.from({ length: numberOfSections }, (_, sectionIndex) => ({
    key: `section-${sectionIndex}`,
    title: `Section ${sectionIndex}`,
    data: Array.from({ length: itemsPerSection }, (_, itemIndex) => ({
      key: `item-${sectionIndex}:${itemIndex}`,
      title: `Item ${sectionIndex}:${itemIndex}`,
    })),
  }));

describe("#getItemLayout", () => {
  describe("when `data` is not iterable", () => {
    describe("when `data` is null", () => {
      it("returns a default object", () => {
        const params = {
          getItemHeight: 50,
        };

        expect(getItemLayout(params)(null, 10)).toEqual({
          length: 0,
          offset: 0,
          index: 10,
        });
      });
    });

    describe("when `data` is empty", () => {
      it("returns a default object", () => {
        const params = {
          getItemHeight: 50,
        };

        expect(getItemLayout(params)([], 10)).toEqual({
          length: 0,
          offset: 0,
          index: 10,
        });
      });
    });

    describe("when section `data` is empty", () => {
      it("returns a default object", () => {
        const params = {
          getItemHeight: 50,
        };
        const mockData = generateMockData(2, 0);

        expect(getItemLayout(params)(mockData, 0)).toEqual({
          length: 0,
          offset: 0,
          index: 0,
        });
      });
    });
  });

  describe("when the requested item index could not be found", () => {
    it("returns a default object ", () => {
      const params = {
        getItemHeight: 50,
      };
      const mockData = generateMockData(4, 4);

      expect(getItemLayout(params)(mockData, 100)).toEqual({
        length: 0,
        offset: 0,
        index: 100,
      });
    });
  });

  describe("when only `getItemHeight` is provided", () => {
    it("calculates the correct offset and length for items", () => {
      const itemHeight = 60;
      const params = {
        getItemHeight: itemHeight,
      };
      const mockData = generateMockData(2, 1);

      // section 1 header
      expect(getItemLayout(params)(mockData, 0)).toEqual({
        length: 0,
        offset: 0,
        index: 0,
      });

      // section 1 item 1
      expect(getItemLayout(params)(mockData, 1)).toEqual({
        length: itemHeight,
        offset: 0,
        index: 1,
      });

      // section 2 header
      expect(getItemLayout(params)(mockData, 2)).toEqual({
        length: 0,
        offset: itemHeight,
        index: 2,
      });

      // section 2 item 1
      expect(getItemLayout(params)(mockData, 3)).toEqual({
        length: itemHeight,
        offset: itemHeight,
        index: 3,
      });
    });
  });

  describe("when only `getItemHeight` and `getSectionHeaderHeight` are provided", () => {
    it("calculates the correct offset and length for items", () => {
      const sectionHeaderHeight = 40;
      const itemHeight = 50;
      const params = {
        getItemHeight: itemHeight,
        getSectionHeaderHeight: sectionHeaderHeight,
      };
      const mockData = generateMockData(2, 2);

      expect(getItemLayout(params)(mockData, 0)).toEqual({
        length: itemHeight,
        offset: sectionHeaderHeight,
        index: 0,
      });

      expect(getItemLayout(params)(mockData, 1)).toEqual({
        length: itemHeight,
        offset: sectionHeaderHeight + itemHeight,
        index: 1,
      });

      expect(getItemLayout(params)(mockData, 2)).toEqual({
        length: itemHeight,
        offset: sectionHeaderHeight * 2 + itemHeight * 2,
        index: 2,
      });

      expect(getItemLayout(params)(mockData, 3)).toEqual({
        length: itemHeight,
        offset: sectionHeaderHeight * 2 + itemHeight * 3,
        index: 3,
      });
    });
  });
});

// describe("when section separators are provided", () => {
//   it("calculates the correct offset and length for items", () => {
//     const itemHeight = 50;
//     const sectionSeparatorHeight = 5;
//     const params = {
//       getItemHeight: () => itemHeight,
//       getSectionSeparatorHeight: () => sectionSeparatorHeight,
//     };
//
//     const mockData = generateMockData(2, 1);
//
//     expect(getItemLayout(params)(mockData, 0)).toEqual({
//       length: itemHeight,
//       offset: sectionSeparatorHeight,
//       index: 0,
//     });
//
//     expect(getItemLayout(params)(mockData, 1)).toEqual({
//       length: itemHeight,
//       offset:
//         sectionSeparatorHeight +
//         itemHeight +
//         sectionSeparatorHeight +
//         sectionSeparatorHeight,
//       index: 1,
//     });
//   });
// });
//
// describe(" when item separators are provided", () => {
//   it("calculates the correct offset and length", () => {
//     const itemHeight = 45;
//     const itemSeparatorHeight = 10;
//
//     const params = {
//       getItemHeight: itemHeight,
//       getItemSeparatorHeight: itemSeparatorHeight,
//     };
//     const mockData = generateMockData(1, 3);
//
//     expect(getItemLayout(params)(mockData, 0)).toEqual({
//       length: itemHeight,
//       offset: 0,
//       index: 0,
//     });
//
//     expect(getItemLayout(params)(mockData, 1)).toEqual({
//       length: itemHeight,
//       offset: itemHeight + itemSeparatorHeight,
//       index: 1,
//     });
//
//     expect(getItemLayout(params)(mockData, 2)).toEqual({
//       length: itemHeight,
//       offset: itemHeight * 2 + itemSeparatorHeight * 2,
//       index: 2,
//     });
//   });
// });
//
// describe("when a list header is provided", () => {
//   it("calculates the correct offset and length for items", () => {
//     const itemHeight = 50;
//     const listHeaderHeight = 30;
//
//     const params = {
//       getItemHeight: itemHeight,
//       listHeaderHeight,
//     };
//     const mockData = generateMockData(1, 3);
//
//     expect(getItemLayout(params)(mockData, 0)).toEqual({
//       length: itemHeight,
//       offset: listHeaderHeight,
//       index: 0,
//     });
//
//     expect(getItemLayout(params)(mockData, 1)).toEqual({
//       length: itemHeight,
//       offset: listHeaderHeight + itemHeight,
//       index: 1,
//     });
//
//     expect(getItemLayout(params)(mockData, 2)).toEqual({
//       length: itemHeight,
//       offset: listHeaderHeight + itemHeight * 2,
//       index: 2,
//     });
//   });
//
//   describe("when section headers are provided", () => {
//     it("calculates the correct offset and length for items", () => {
//       const itemHeight = 50;
//       const listHeaderHeight = 20;
//       const sectionHeaderHeight = 30;
//       const params = {
//         getItemHeight: itemHeight,
//         listHeaderHeight,
//         getSectionHeaderHeight: () => sectionHeaderHeight,
//       };
//
//       const mockData = generateMockData(2, 2);
//
//       expect(getItemLayout(params)(mockData, 0)).toEqual({
//         length: itemHeight,
//         offset: listHeaderHeight + sectionHeaderHeight,
//         index: 0,
//       });
//
//       expect(getItemLayout(params)(mockData, 1)).toEqual({
//         length: itemHeight,
//         offset: listHeaderHeight + sectionHeaderHeight + itemHeight,
//         index: 1,
//       });
//
//       expect(getItemLayout(params)(mockData, 2)).toEqual({
//         length: itemHeight,
//         offset:
//           listHeaderHeight +
//           sectionHeaderHeight +
//           itemHeight * 2 +
//           sectionHeaderHeight,
//         index: 2,
//       });
//
//       expect(getItemLayout(params)(mockData, 3)).toEqual({
//         length: itemHeight,
//         offset:
//           listHeaderHeight +
//           sectionHeaderHeight +
//           itemHeight * 2 +
//           sectionHeaderHeight +
//           itemHeight,
//         index: 3,
//       });
//     });
//   });
// });
//
// describe("when all options are provided", () => {
//   it("calculates the correct offset and length for items", () => {
//     const listHeaderHeight = 100;
//     const itemHeight = 40;
//     const sectionHeaderHeight = 20;
//     const sectionFooterHeight = 25;
//     const sectionSeparatorHeight = 10;
//     const itemSeparatorHeight = 5;
//     const params = {
//       getItemHeight: itemHeight,
//       getItemSeparatorHeight: itemSeparatorHeight,
//       getSectionHeaderHeight: sectionHeaderHeight,
//       getSectionFooterHeight: sectionFooterHeight,
//       getSectionSeparatorHeight: sectionSeparatorHeight,
//       listHeaderHeight,
//     };
//
//     const mockData = generateMockData(3, 2);
//
//     expect(getItemLayout(params)(mockData, 0)).toEqual({
//       length: itemHeight,
//       offset: listHeaderHeight + sectionHeaderHeight + sectionSeparatorHeight,
//       index: 0,
//     });
//
//     expect(getItemLayout(params)(mockData, 1)).toEqual({
//       length: itemHeight,
//       offset:
//         listHeaderHeight +
//         sectionHeaderHeight +
//         sectionSeparatorHeight +
//         itemHeight +
//         itemSeparatorHeight,
//       index: 1,
//     });
//
//     expect(getItemLayout(params)(mockData, 2)).toEqual({
//       length: itemHeight,
//       offset:
//         listHeaderHeight +
//         sectionHeaderHeight * 2 +
//         sectionSeparatorHeight * 3 +
//         itemHeight * 2 +
//         itemSeparatorHeight +
//         sectionFooterHeight,
//       index: 2,
//     });
//
//     expect(getItemLayout(params)(mockData, 3)).toEqual({
//       length: itemHeight,
//       offset:
//         listHeaderHeight +
//         sectionHeaderHeight * 2 +
//         sectionSeparatorHeight * 3 +
//         itemHeight * 3 +
//         itemSeparatorHeight * 2 +
//         sectionFooterHeight,
//       index: 3,
//     });
//
//     expect(getItemLayout(params)(mockData, 4)).toEqual({
//       length: itemHeight,
//       offset:
//         listHeaderHeight +
//         sectionHeaderHeight * 3 +
//         sectionSeparatorHeight * 5 +
//         itemHeight * 4 +
//         itemSeparatorHeight * 2 +
//         sectionFooterHeight * 2,
//       index: 4,
//     });
//
//     expect(getItemLayout(params)(mockData, 5)).toEqual({
//       length: itemHeight,
//       offset:
//         listHeaderHeight +
//         sectionHeaderHeight * 3 +
//         sectionSeparatorHeight * 5 +
//         itemHeight * 5 +
//         itemSeparatorHeight * 3 +
//         sectionFooterHeight * 2,
//       index: 5,
//     });
//   });
// });
// });
