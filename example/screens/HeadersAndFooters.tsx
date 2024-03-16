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

const ITEM_HEIGHT = 60;
const SECTION_HEADER_HEIGHT = 40;
const SECTION_FOOTER_HEIGHT = 20;

const buildGetItemLayout = getItemLayout({
  getItemHeight: ITEM_HEIGHT,
  getSectionHeaderHeight: SECTION_HEADER_HEIGHT,
  getSectionFooterHeight: SECTION_FOOTER_HEIGHT,
});

const HeadersAndFooters = () => {
  const sectionListRef = useRef<SectionList>(null);

  return (
    <View>
      <SectionList
        ref={sectionListRef}
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
        renderSectionFooter={({section: {data, title}}) => (
          <Text style={styles.footer}>Total items: {data.length}</Text>
        )}
        sections={DATA}
      />

      <Pressable
        style={styles.scrollToButton}
        onPress={() =>
          sectionListRef.current?.scrollToLocation({
            sectionIndex: 8,
            itemIndex: 1,
            viewOffset: (SECTION_HEADER_HEIGHT + SECTION_FOOTER_HEIGHT) * -1,
          })
        }>
        <Text>Scroll to Nachos</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default HeadersAndFooters;
