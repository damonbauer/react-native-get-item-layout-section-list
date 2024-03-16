import React, {Dispatch, SetStateAction, useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Simple from './screens/Simple';
import ItemSeparators from './screens/ItemSeparators';
import HeadersAndFooters from './screens/HeadersAndFooters';
import Everything from './screens/Everything';

enum TabNames {
  Simple = 'simple',
  ItemSeparators = 'itemSeparators',
  HeadersAndFooters = 'headersAndFooters',
  Everything = 'everything',
}

const TABS = [
  {
    name: TabNames.Simple,
    title: 'Simple',
  },
  {
    name: TabNames.ItemSeparators,
    title: 'Item Separators',
  },
  {
    name: TabNames.HeadersAndFooters,
    title: 'Headers & Footers',
  },
  {
    name: TabNames.Everything,
    title: 'Everything',
  },
];

type TabsProps = {
  activeExample: TabNames;
  setActiveExample: Dispatch<SetStateAction<TabNames>>;
};

const Tabs = ({activeExample, setActiveExample}: TabsProps) => (
  <View style={styles.container}>
    {TABS.map(({name, title}) => {
      return (
        <Pressable
          key={name}
          onPress={() => {
            setActiveExample(name);
          }}>
          <Text
            style={[styles.tab, activeExample === name && styles.activeTab]}>
            {title}
          </Text>
        </Pressable>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderTopWidth: 4,
    borderTopColor: '#ccc',
    backgroundColor: '#f9f9f9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64,
  },
  tab: {
    fontSize: 12,
  },
  activeTab: {
    fontWeight: 'bold',
  },
});

const App = () => {
  const [activeExample, setActiveExample] = useState<TabNames>(TabNames.Simple);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        {activeExample === TabNames.Simple && <Simple />}
        {activeExample === TabNames.ItemSeparators && <ItemSeparators />}
        {activeExample === TabNames.HeadersAndFooters && <HeadersAndFooters />}
        {activeExample === TabNames.Everything && <Everything />}
      </View>
      <Tabs activeExample={activeExample} setActiveExample={setActiveExample} />
    </SafeAreaView>
  );
};

export default App;
