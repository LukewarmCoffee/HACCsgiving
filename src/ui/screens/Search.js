import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import { ServiceCard } from '../components';

const Search = ({navigation}) => {

  const [search, updateSearch] = useState('');
  const [filteredServices, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const ref = firestore().collection('services');

  searchFilter = (text) => {
    let newData = services.filter((item) => {
      let itemData = `${item.title.toUpperCase()}   
      ${item.body.toUpperCase()}`;

      let textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    setFiltered(newData);
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        onChangeText={(text) => {
          updateSearch(text);
          searchFilter(text)
        }}
        value={search}
      />
    );
  };

  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { title, body, link } = doc.data();
        list.push({
          id: doc.id,
          title,
          body,
          link,
        });
      });

      setServices(list);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={(text) => {
          updateSearch(text);
          searchFilter(text)
        }}
        value={search}
      />
      <FlatList
        data={filteredServices}
        renderItem={({ item }) => <ServiceCard service={item} navigation={navigation} />}
        keyExtractor={item => item.title}
        ItemSeparatorComponent={renderSeparator}
      //ListHeaderComponent={renderHeader}
      />
    </View>
  );
};

export default Search;