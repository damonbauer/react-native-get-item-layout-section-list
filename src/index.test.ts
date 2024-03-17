import { describe, expect, it } from "vitest";
import getItemLayout, { GetItemLayoutParams } from "../src";

const generateMockData = (numberOfSections: number, itemsPerSection: number) =>
  Array.from({ length: numberOfSections }, (_, sectionIndex) => {
    const sectionIdx = sectionIndex + 1;
    return {
      key: `section-${sectionIdx}`,
      title: `Section ${sectionIdx}`,
      data: Array.from({ length: itemsPerSection }, (_, itemIndex) => {
        const itemIdx = itemIndex + 1;
        return {
          key: `section-${sectionIdx}-item-${itemIdx}`,
          title: `Section ${sectionIdx} Item ${itemIdx}`,
        };
      }),
    };
  });

describe("#getItemLayout", () => {
  describe("when `data` is not iterable", () => {
    describe("when `data` is null", () => {
      it("returns a default object", () => {
        const params: GetItemLayoutParams<object> = {
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
        const params: GetItemLayoutParams<object> = {
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
        const params: GetItemLayoutParams<object> = {
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
      const params: GetItemLayoutParams<object> = {
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
      const itemHeight = 50;
      const params: GetItemLayoutParams<object> = {
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
      expect(getItemLayout(params)(mockData, 3)).toEqual({
        length: 0,
        offset: itemHeight,
        index: 3,
      });

      // section 2 item 1
      expect(getItemLayout(params)(mockData, 4)).toEqual({
        length: itemHeight,
        offset: itemHeight,
        index: 4,
      });
    });
  });

  describe("when `getItemHeight` and `getSectionHeaderHeight` are provided", () => {
    it("calculates the correct offset and length for items", () => {
      const sectionHeaderHeight = 40;
      const itemHeight = 50;
      const params: GetItemLayoutParams<object> = {
        getItemHeight: itemHeight,
        getSectionHeaderHeight: sectionHeaderHeight,
      };
      const mockData = generateMockData(2, 2);

      // section 1 header
      expect(getItemLayout(params)(mockData, 0)).toEqual({
        length: sectionHeaderHeight,
        offset: 0,
        index: 0,
      });

      // section 1 item 1
      expect(getItemLayout(params)(mockData, 1)).toEqual({
        length: itemHeight,
        offset: sectionHeaderHeight,
        index: 1,
      });

      // section 1 item 2
      expect(getItemLayout(params)(mockData, 2)).toEqual({
        length: itemHeight,
        offset: sectionHeaderHeight + itemHeight,
        index: 2,
      });

      // section 2 header
      expect(getItemLayout(params)(mockData, 4)).toEqual({
        length: sectionHeaderHeight,
        offset: sectionHeaderHeight + itemHeight * 2,
        index: 4,
      });

      // section 2 item 1
      expect(getItemLayout(params)(mockData, 5)).toEqual({
        length: itemHeight,
        offset: sectionHeaderHeight * 2 + itemHeight * 2,
        index: 5,
      });

      // section 2 item 2
      expect(getItemLayout(params)(mockData, 6)).toEqual({
        length: itemHeight,
        offset: sectionHeaderHeight * 2 + itemHeight * 3,
        index: 6,
      });
    });
  });

  describe("when `getItemHeight` and `getSectionFooterHeight` are provided", () => {
    it("calculates the correct offset and length for items", () => {
      const sectionFooterHeight = 40;
      const itemHeight = 50;
      const params: GetItemLayoutParams<object> = {
        getItemHeight: itemHeight,
        getSectionFooterHeight: sectionFooterHeight,
      };
      const mockData = generateMockData(2, 2);

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

      // section 1 item 2
      expect(getItemLayout(params)(mockData, 2)).toEqual({
        length: itemHeight,
        offset: itemHeight,
        index: 2,
      });

      // section 1 footer
      expect(getItemLayout(params)(mockData, 3)).toEqual({
        length: sectionFooterHeight,
        offset: itemHeight * 2,
        index: 3,
      });

      // section 2 header
      expect(getItemLayout(params)(mockData, 4)).toEqual({
        length: 0,
        offset: itemHeight * 2 + sectionFooterHeight,
        index: 4,
      });

      // section 2 item 1
      expect(getItemLayout(params)(mockData, 5)).toEqual({
        length: itemHeight,
        offset: itemHeight * 2 + sectionFooterHeight,
        index: 5,
      });

      // section 2 item 2
      expect(getItemLayout(params)(mockData, 6)).toEqual({
        length: itemHeight,
        offset: itemHeight * 3 + sectionFooterHeight,
        index: 6,
      });

      // section 2 footer
      expect(getItemLayout(params)(mockData, 7)).toEqual({
        length: sectionFooterHeight,
        offset: itemHeight * 4 + sectionFooterHeight,
        index: 7,
      });
    });
  });

  describe("when `getItemHeight` and `getSectionSeparatorHeight` are provided", () => {
    it("calculates the correct offset and length for items", () => {
      const itemHeight = 50;
      const sectionSeparatorHeight = 5;
      const params: GetItemLayoutParams<object> = {
        getItemHeight: itemHeight,
        getSectionSeparatorHeight: sectionSeparatorHeight,
      };

      const mockData = generateMockData(3, 1);

      // section 1 header
      expect(getItemLayout(params)(mockData, 0)).toEqual({
        length: 0,
        offset: 0,
        index: 0,
      });

      // section 1 item 1
      expect(getItemLayout(params)(mockData, 1)).toEqual({
        length: itemHeight,
        offset: sectionSeparatorHeight,
        index: 1,
      });

      // section 1 footer
      expect(getItemLayout(params)(mockData, 2)).toEqual({
        length: 0,
        offset: itemHeight + sectionSeparatorHeight * 2,
        index: 2,
      });

      // section 2 header
      expect(getItemLayout(params)(mockData, 3)).toEqual({
        length: 0,
        offset: itemHeight + sectionSeparatorHeight * 2,
        index: 3,
      });

      // section 2 item 1
      expect(getItemLayout(params)(mockData, 4)).toEqual({
        length: itemHeight,
        offset: itemHeight + sectionSeparatorHeight * 3,
        index: 4,
      });

      // section 2 footer
      expect(getItemLayout(params)(mockData, 5)).toEqual({
        length: 0,
        offset: itemHeight * 2 + sectionSeparatorHeight * 4,
        index: 5,
      });

      // section 3 header
      expect(getItemLayout(params)(mockData, 6)).toEqual({
        length: 0,
        offset: itemHeight * 2 + sectionSeparatorHeight * 4,
        index: 6,
      });

      // section 3 item 1
      expect(getItemLayout(params)(mockData, 7)).toEqual({
        length: itemHeight,
        offset: itemHeight * 2 + sectionSeparatorHeight * 5,
        index: 7,
      });

      // section 3 footer
      expect(getItemLayout(params)(mockData, 8)).toEqual({
        length: 0,
        offset: itemHeight * 3 + sectionSeparatorHeight * 6,
        index: 8,
      });
    });
  });

  describe("when `getItemHeight` and `getItemSeparatorHeight` are provided", () => {
    it("calculates the correct offset and length", () => {
      const itemHeight = 45;
      const itemSeparatorHeight = 10;

      const params: GetItemLayoutParams<object> = {
        getItemHeight: itemHeight,
        getItemSeparatorHeight: itemSeparatorHeight,
      };
      const mockData = generateMockData(1, 3);

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

      // section 1 item 2
      expect(getItemLayout(params)(mockData, 2)).toEqual({
        length: itemHeight,
        offset: itemHeight + itemSeparatorHeight,
        index: 2,
      });

      // section 1 item 3
      expect(getItemLayout(params)(mockData, 3)).toEqual({
        length: 45,
        offset: itemHeight * 2 + itemSeparatorHeight * 2,
        index: 3,
      });

      // section 1 footer
      expect(getItemLayout(params)(mockData, 4)).toEqual({
        length: 0,
        offset: itemHeight * 3 + itemSeparatorHeight * 2,
        index: 4,
      });
    });
  });

  describe("when `getItemHeight` and `getListHeaderHeight` are provided", () => {
    it("calculates the correct offset and length for items", () => {
      const itemHeight = 50;
      const listHeaderHeight = 30;

      const params: GetItemLayoutParams<object> = {
        getItemHeight: itemHeight,
        getListHeaderHeight: listHeaderHeight,
      };
      const mockData = generateMockData(1, 3);

      // section 1 header
      expect(getItemLayout(params)(mockData, 0)).toEqual({
        length: 0,
        offset: listHeaderHeight,
        index: 0,
      });

      // section 1 item 1
      expect(getItemLayout(params)(mockData, 1)).toEqual({
        length: itemHeight,
        offset: listHeaderHeight,
        index: 1,
      });

      // section 1 item 2
      expect(getItemLayout(params)(mockData, 2)).toEqual({
        length: itemHeight,
        offset: listHeaderHeight + itemHeight,
        index: 2,
      });

      // section 1 item 3
      expect(getItemLayout(params)(mockData, 3)).toEqual({
        length: itemHeight,
        offset: listHeaderHeight + itemHeight * 2,
        index: 3,
      });

      // section 1 footer
      expect(getItemLayout(params)(mockData, 4)).toEqual({
        length: 0,
        offset: listHeaderHeight + itemHeight * 3,
        index: 4,
      });
    });
  });

  describe("when all options are provided", () => {
    it("calculates the correct offset and length for items", () => {
      const listHeaderHeight = 100;
      const itemHeight = 40;
      const sectionHeaderHeight = 20;
      const sectionFooterHeight = 25;
      const sectionSeparatorHeight = 10;
      const itemSeparatorHeight = 5;
      const params: GetItemLayoutParams<object> = {
        getItemHeight: itemHeight,
        getItemSeparatorHeight: itemSeparatorHeight,
        getListHeaderHeight: listHeaderHeight,
        getSectionHeaderHeight: sectionHeaderHeight,
        getSectionFooterHeight: sectionFooterHeight,
        getSectionSeparatorHeight: sectionSeparatorHeight,
      };

      const mockData = generateMockData(3, 2);

      // section 1 header
      expect(getItemLayout(params)(mockData, 0)).toEqual({
        length: sectionHeaderHeight,
        offset: listHeaderHeight,
        index: 0,
      });

      // section 1 item 1
      expect(getItemLayout(params)(mockData, 1)).toEqual({
        length: itemHeight,
        offset: listHeaderHeight + sectionHeaderHeight + sectionSeparatorHeight,
        index: 1,
      });

      // section 1 item 2
      expect(getItemLayout(params)(mockData, 2)).toEqual({
        length: itemHeight,
        offset:
          listHeaderHeight +
          sectionHeaderHeight +
          sectionSeparatorHeight +
          itemHeight +
          itemSeparatorHeight,
        index: 2,
      });

      // section 1 footer
      expect(getItemLayout(params)(mockData, 3)).toEqual({
        length: sectionFooterHeight,
        offset:
          listHeaderHeight +
          sectionHeaderHeight +
          sectionSeparatorHeight +
          itemHeight +
          itemSeparatorHeight +
          itemHeight +
          sectionSeparatorHeight,
        index: 3,
      });

      // section 2 header
      expect(getItemLayout(params)(mockData, 4)).toEqual({
        length: sectionHeaderHeight,
        offset:
          listHeaderHeight +
          sectionHeaderHeight +
          sectionSeparatorHeight +
          itemHeight +
          itemSeparatorHeight +
          itemHeight +
          sectionSeparatorHeight +
          sectionFooterHeight,
        index: 4,
      });

      // section 2 item 1
      expect(getItemLayout(params)(mockData, 5)).toEqual({
        length: itemHeight,
        offset:
          listHeaderHeight +
          sectionHeaderHeight +
          sectionSeparatorHeight +
          itemHeight +
          itemSeparatorHeight +
          itemHeight +
          sectionSeparatorHeight +
          sectionFooterHeight +
          sectionHeaderHeight +
          sectionSeparatorHeight,
        index: 5,
      });

      // section 2 item 2
      expect(getItemLayout(params)(mockData, 6)).toEqual({
        length: itemHeight,
        offset:
          listHeaderHeight +
          sectionHeaderHeight +
          sectionSeparatorHeight +
          itemHeight +
          itemSeparatorHeight +
          itemHeight +
          sectionSeparatorHeight +
          sectionFooterHeight +
          sectionHeaderHeight +
          sectionSeparatorHeight +
          itemHeight +
          itemSeparatorHeight,
        index: 6,
      });

      // section 2 footer
      expect(getItemLayout(params)(mockData, 7)).toEqual({
        length: sectionFooterHeight,
        offset:
          listHeaderHeight +
          sectionHeaderHeight +
          sectionSeparatorHeight +
          itemHeight +
          itemSeparatorHeight +
          itemHeight +
          sectionSeparatorHeight +
          sectionFooterHeight +
          sectionHeaderHeight +
          sectionSeparatorHeight +
          itemHeight +
          itemSeparatorHeight +
          itemHeight +
          sectionSeparatorHeight,
        index: 7,
      });

      // section 3 header
      expect(getItemLayout(params)(mockData, 8)).toEqual({
        length: sectionHeaderHeight,
        offset:
          listHeaderHeight +
          sectionHeaderHeight +
          sectionSeparatorHeight +
          itemHeight +
          itemSeparatorHeight +
          itemHeight +
          sectionSeparatorHeight +
          sectionFooterHeight +
          sectionHeaderHeight +
          sectionSeparatorHeight +
          itemHeight +
          itemSeparatorHeight +
          itemHeight +
          sectionSeparatorHeight +
          sectionFooterHeight,
        index: 8,
      });

      // section 3 item 1
      expect(getItemLayout(params)(mockData, 9)).toEqual({
        length: itemHeight,
        offset:
          listHeaderHeight +
          sectionHeaderHeight +
          sectionSeparatorHeight +
          itemHeight +
          itemSeparatorHeight +
          itemHeight +
          sectionSeparatorHeight +
          sectionFooterHeight +
          sectionHeaderHeight +
          sectionSeparatorHeight +
          itemHeight +
          itemSeparatorHeight +
          itemHeight +
          sectionSeparatorHeight +
          sectionFooterHeight +
          sectionHeaderHeight +
          sectionSeparatorHeight,
        index: 9,
      });

      // section 3 item 2
      expect(getItemLayout(params)(mockData, 10)).toEqual({
        length: itemHeight,
        offset:
          listHeaderHeight +
          sectionHeaderHeight +
          sectionSeparatorHeight +
          itemHeight +
          itemSeparatorHeight +
          itemHeight +
          sectionSeparatorHeight +
          sectionFooterHeight +
          sectionHeaderHeight +
          sectionSeparatorHeight +
          itemHeight +
          itemSeparatorHeight +
          itemHeight +
          sectionSeparatorHeight +
          sectionFooterHeight +
          sectionHeaderHeight +
          sectionSeparatorHeight +
          itemHeight +
          itemSeparatorHeight,
        index: 10,
      });

      // section 3 footer
      expect(getItemLayout(params)(mockData, 11)).toEqual({
        length: sectionFooterHeight,
        offset:
          listHeaderHeight +
          sectionHeaderHeight +
          sectionSeparatorHeight +
          itemHeight +
          itemSeparatorHeight +
          itemHeight +
          sectionSeparatorHeight +
          sectionFooterHeight +
          sectionHeaderHeight +
          sectionSeparatorHeight +
          itemHeight +
          itemSeparatorHeight +
          itemHeight +
          sectionSeparatorHeight +
          sectionFooterHeight +
          sectionHeaderHeight +
          sectionSeparatorHeight +
          itemHeight +
          itemSeparatorHeight +
          itemHeight +
          sectionSeparatorHeight,
        index: 11,
      });
    });
  });

  describe("when `getItemHeight` and dynamic `getSectionHeaderHeight` are provided", () => {
    it("calculates the correct offset and length for items", () => {
      const evenSectionHeaderHeight = 40;
      const oddSectionHeaderHeight = 30;
      const itemHeight = 50;
      const params: GetItemLayoutParams<object> = {
        getItemHeight: itemHeight,
        getSectionHeaderHeight: (sectionIndex: number) =>
          sectionIndex % 2 === 0
            ? evenSectionHeaderHeight
            : oddSectionHeaderHeight,
      };
      const mockData = generateMockData(3, 1);

      // section 1 header
      expect(getItemLayout(params)(mockData, 0)).toEqual({
        length: evenSectionHeaderHeight,
        offset: 0,
        index: 0,
      });

      // section 1 item 1
      expect(getItemLayout(params)(mockData, 1)).toEqual({
        length: itemHeight,
        offset: evenSectionHeaderHeight,
        index: 1,
      });

      // section 1 footer
      expect(getItemLayout(params)(mockData, 2)).toEqual({
        length: 0,
        offset: evenSectionHeaderHeight + itemHeight,
        index: 2,
      });

      // section 2 header
      expect(getItemLayout(params)(mockData, 3)).toEqual({
        length: oddSectionHeaderHeight,
        offset: evenSectionHeaderHeight + itemHeight,
        index: 3,
      });

      // section 2 item 1
      expect(getItemLayout(params)(mockData, 4)).toEqual({
        length: itemHeight,
        offset: evenSectionHeaderHeight + itemHeight + oddSectionHeaderHeight,
        index: 4,
      });

      // section 2 footer
      expect(getItemLayout(params)(mockData, 5)).toEqual({
        length: 0,
        offset:
          evenSectionHeaderHeight +
          itemHeight +
          oddSectionHeaderHeight +
          itemHeight,
        index: 5,
      });

      // section 3 header
      expect(getItemLayout(params)(mockData, 6)).toEqual({
        length: evenSectionHeaderHeight,
        offset:
          evenSectionHeaderHeight +
          itemHeight +
          oddSectionHeaderHeight +
          itemHeight,
        index: 6,
      });

      // section 3 item 1
      expect(getItemLayout(params)(mockData, 7)).toEqual({
        length: itemHeight,
        offset:
          evenSectionHeaderHeight +
          itemHeight +
          oddSectionHeaderHeight +
          itemHeight +
          evenSectionHeaderHeight,
        index: 7,
      });

      // section 3 footer
      expect(getItemLayout(params)(mockData, 8)).toEqual({
        length: 0,
        offset:
          evenSectionHeaderHeight +
          itemHeight +
          oddSectionHeaderHeight +
          itemHeight +
          evenSectionHeaderHeight +
          itemHeight,
        index: 8,
      });
    });
  });
});
