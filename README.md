# react-native-get-item-layout-section-list

Create the `getItemLayout` prop for a `SectionList` with React Native.

![NPM Version](https://img.shields.io/npm/v/react-native-get-item-layout-section-list?registry_uri=https%3A%2F%2Fregistry.npmjs.org&logo=npm)
![NPM Downloads](https://img.shields.io/npm/dm/react-native-get-item-layout-section-list?logo=npm)

<!-- TOC -->
* [react-native-get-item-layout-section-list](#react-native-get-item-layout-section-list)
  * [Motivation](#motivation)
    * [Background](#background)
    * [Why this library?](#why-this-library)
  * [Installation](#installation)
  * [Usage](#usage)
    * [Basic](#basic)
    * [Advanced](#advanced)
  * [Examples](#examples)
  * [Contributing](#contributing)
  * [Releasing](#releasing)
  * [License](#license)
<!-- TOC -->

## Motivation
### Background
The `getItemLayout` prop in a `SectionList` is an optimization prop that improves performance of the list by helping it to quickly calculate the size and position of its items.

When you provide the `getItemLayout` prop, React Native can:

* Jump directly to any list item without sequentially rendering all previous items.
* Maintain scroll position accurately during layout changes or content updates.
* Reduce the need for dynamic measurement as users scroll, leading to smoother experiences.
* Access other props, such as `initialScrollIndex` and `scrollToLocation`

### Why this library?
The `getItemLayout` prop is not trivial to implement for a `SectionList`. This library provides a simple way to create the `getItemLayout` prop for a `SectionList` with fixed or dynamic heights.

## Installation

```sh
npm install react-native-get-item-layout-section-list
```

## Usage

### Basic
This example shows how to use the `getItemLayout` prop with fixed heights.

```tsx
import getItemLayout from 'react-native-get-item-layout-section-list';

const ITEM_HEIGHT = 60;
const SECTION_HEADER_HEIGHT = 40;

const buildGetItemLayout = getItemLayout({
  getItemHeight: ITEM_HEIGHT,
  getSectionHeaderHeight: SECTION_HEADER_HEIGHT,
});

<SectionList
  getItemLayout={buildGetItemLayout} 
  keyExtractor={(item, index) => item + index} 
  renderItem={({item}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item}</Text>
    </View>
  )} 
  renderSectionHeader={({section: {title}}) => (
    <Text style={styles.header}>{title}</Text>
  )} 
  sections={DATA}
/>
```

### Advanced
This example shows how to use the `getItemLayout` prop with dynamic heights.

```tsx
import getItemLayout from 'react-native-get-item-layout-section-list';

const SECTION_HEADER_HEIGHT = 40;

const buildGetItemLayout = getItemLayout({
  getItemHeight: (_item, _sectionIndex, itemIndex) => {
    // Return a different height for even and odd items
    return itemIndex % 2 === 0 ? 60 : 40;
  },
  getSectionHeaderHeight: SECTION_HEADER_HEIGHT,
});

<SectionList
  getItemLayout={buildGetItemLayout}
  keyExtractor={(item, index) => item + index}
  renderItem={({item}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item}</Text>
    </View>
  )}
  renderSectionHeader={({section: {title}}) => (
    <Text style={styles.header}>{title}</Text>
  )}
  sections={DATA}
/>
````

## Examples
There are fully functional examples in the `exmaple` directory.

If you'd like to actually run the examples, clone the repository and run the following commands:

```sh
cd example
npm install && pod install
npm run ios # or npm run android
```

## Contributing
See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## Releasing
See the [releasing guide](RELEASING.md) to learn how to release new versions.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
