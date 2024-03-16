import React, {useRef} from 'react';
import {Pressable, SectionList, StyleSheet, Text, View} from 'react-native';
import getItemLayout from '../src';

const DATA = [
  {
    title: 'Main dishes',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    title: 'Sides',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    title: 'Drinks',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'Desserts',
    data: ['Cheese Cake', 'Ice Cream', 'Brownies'],
  },
  {
    title: 'Salads',
    data: ['Greek Salad', 'Caesar Salad', 'Garden Salad'],
  },
  {
    title: 'Pastas',
    data: ['Spaghetti Carbonara', 'Lasagna', 'Penne alla Vodka'],
  },
  {
    title: 'Seafood',
    data: ['Grilled Salmon', 'Fish Tacos', 'Shrimp Scampi'],
  },
  {
    title: 'Soups',
    data: ['Tomato Soup', 'Chicken Noodle Soup', 'Minestrone'],
  },
  {
    title: 'Appetizers',
    data: ['Mozzarella Sticks', 'Nachos', 'Bruschetta'],
  },
  {
    title: 'BBQ',
    data: ['Pulled Pork Sandwich', 'BBQ Ribs', 'Grilled Chicken'],
  },
  {
    title: 'Deli',
    data: ['Turkey Club', 'Reuben Sandwich', 'French Dip'],
  },
  {
    title: 'Bakery',
    data: ['Croissants', 'Muffins', 'Bagels'],
  },
  {
    title: 'Cocktails',
    data: ['Margarita', 'Old Fashioned', 'Mojito'],
  },
];

const LIST_HEADER_HEIGHT = 50;
const ITEM_HEIGHT = 60;
const ITEM_SEPARATOR_HEIGHT = 5;
const SECTION_SEPARATOR_HEIGHT = 10;
const SECTION_HEADER_HEIGHT = 40;
const SECTION_FOOTER_HEIGHT = 20;

const buildGetItemLayout = getItemLayout({
  getItemHeight: ITEM_HEIGHT,
  getItemSeparatorHeight: ITEM_SEPARATOR_HEIGHT,
  getSectionHeaderHeight: SECTION_HEADER_HEIGHT,
  getSectionFooterHeight: SECTION_FOOTER_HEIGHT,
  getSectionSeparatorHeight: SECTION_SEPARATOR_HEIGHT,
  listHeaderHeight: LIST_HEADER_HEIGHT,
});

const ListHeader = () => (
  <View style={styles.listHeaderContainer}>
    <Text style={styles.listHeader}>Menu</Text>
  </View>
);

const ListFooter = () => (
  <View style={styles.listFooterContainer}>
    <Text style={styles.listFooter}>
      The `ListFooterComponent` doesn't affect `getItemLayout`
    </Text>
  </View>
);

const ItemSeparator = () => <View style={styles.itemSeparator} />;
const SectionSeparator = () => <View style={styles.sectionSeparator} />;

const Everything = () => {
  const sectionListRef = useRef<SectionList>(null);

  return (
    <View>
      <SectionList
        ref={sectionListRef}
        getItemLayout={buildGetItemLayout}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item, index) => item + index}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
        renderSectionFooter={({section: {data, title}}) => (
          <Text style={styles.footer}>Total items: {data.length}</Text>
        )}
        sections={DATA}
        SectionSeparatorComponent={SectionSeparator}
      />

      <Pressable
        style={styles.scrollToButton}
        onPress={() =>
          sectionListRef.current?.scrollToLocation({
            sectionIndex: 3,
            itemIndex: 0,
          })
        }>
        <Text>Scroll to Cheese Cake</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  listHeaderContainer: {
    height: LIST_HEADER_HEIGHT,
    backgroundColor: 'teal',
  },
  listHeader: {
    fontSize: 40,
  },
  listFooterContainer: {
    height: 100,
    justifyContent: 'center',
    backgroundColor: 'lightslategray',
  },
  listFooter: {
    fontSize: 18,
  },
  item: {
    height: ITEM_HEIGHT,
    backgroundColor: '#f9c2ff',
    justifyContent: 'center',
  },
  header: {
    height: SECTION_HEADER_HEIGHT,
    fontSize: 32,
    backgroundColor: '#eee',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
  },
  itemSeparator: {
    height: ITEM_SEPARATOR_HEIGHT,
    backgroundColor: 'black',
  },
  sectionSeparator: {
    height: SECTION_SEPARATOR_HEIGHT,
    backgroundColor: 'slategray',
  },
  footer: {
    height: SECTION_FOOTER_HEIGHT,
    fontSize: 14,
    backgroundColor: '#999',
    textAlign: 'right',
    paddingRight: 4,
  },
  scrollToButton: {
    opacity: 0.8,
    position: 'absolute',
    right: 4,
    bottom: 4,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 4,
  },
});

export default Everything;
