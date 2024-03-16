import type {SectionListData} from 'react-native';

type GetItemLayoutParams<T> = {
  getItemHeight:
    | number
    | ((item: T, sectionIndex: number, itemIndex: number) => number);
  getItemSeparatorHeight?:
    | number
    | ((sectionIndex: number, rowIndex: number) => number);
  getSectionHeaderHeight?: number | ((sectionIndex: number) => number);
  getSectionFooterHeight?: number | ((sectionIndex: number) => number);
  getSectionSeparatorHeight?: number | ((sectionIndex: number) => number);
  listHeaderHeight?: number | (() => number);
};

type GetItemLayoutShape = {
  length: number;
  offset: number;
  index: number;
};

const resolveValue = <T, Args extends unknown[]>(
  value: T | ((...args: Args) => T),
  ...args: Args
): T =>
  typeof value === 'function'
    ? (value as (...args: Args) => T)(...args)
    : value;

const getItemLayout =
  <T>({
    getItemHeight,
    getItemSeparatorHeight = 0,
    getSectionHeaderHeight = 0,
    getSectionFooterHeight = 0,
    getSectionSeparatorHeight = 0,
    listHeaderHeight = 0,
  }: GetItemLayoutParams<T>) =>
  (data: SectionListData<T>[] | null, index: number): GetItemLayoutShape => {
    if (!data || !data.length) {
      return {length: 0, offset: 0, index};
    }

    // Start with the offset set to the height of the list header.
    let offset = resolveValue(listHeaderHeight);
    // Initialize the global index counter to track overall position within the list.
    let globalIndex = 0;

    // Iterate through each section in the data.
    for (let sectionIndex = 0; sectionIndex < data.length; sectionIndex++) {
      // Resolve the heights at the beginning to avoid duplication
      const currentSectionHeaderHeight = resolveValue(
        getSectionHeaderHeight,
        sectionIndex,
      );
      const currentSectionFooterHeight = resolveValue(
        getSectionFooterHeight,
        sectionIndex,
      );
      const currentSectionSeparatorHeight = resolveValue(
        getSectionSeparatorHeight,
        sectionIndex,
      );

      // Handle the section header.
      if (index === globalIndex) {
        return {length: currentSectionHeaderHeight, offset, index};
      }
      offset += currentSectionHeaderHeight;
      globalIndex++;

      // Add the height of the top section separator after the section header.
      offset += currentSectionSeparatorHeight;

      // Iterate through each item within the current section.
      for (
        let itemIndex = 0;
        itemIndex < data[sectionIndex].data.length;
        itemIndex++
      ) {
        const currentItemHeight = resolveValue(
          getItemHeight,
          data[sectionIndex].data[itemIndex],
          sectionIndex,
          itemIndex,
        );

        if (index === globalIndex) {
          return {length: currentItemHeight, offset, index};
        }

        // Add the item's height to the offset and check for item separators.
        offset += currentItemHeight;
        globalIndex++;

        // If not the last item in the section, add the item separator's height.
        if (itemIndex < data[sectionIndex].data.length - 1) {
          offset += resolveValue(
            getItemSeparatorHeight,
            sectionIndex,
            itemIndex,
          );
        }
      }

      // Add the height of the bottom section separator before the section footer.
      offset += currentSectionSeparatorHeight;

      // Handle the section footer.
      if (index === globalIndex) {
        const length = currentSectionFooterHeight;
        return {length, offset, index};
      }
      offset += currentSectionFooterHeight;
      globalIndex++;
    }

    // Return a default layout object if the specified index is out of bounds.
    return {length: 0, offset: 0, index};
  };

export {getItemLayout as default, GetItemLayoutParams, GetItemLayoutShape};
