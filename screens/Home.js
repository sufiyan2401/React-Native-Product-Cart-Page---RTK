// import React, {useEffect} from 'react';
// import {View, Text, FlatList, TouchableOpacity} from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
// import {fetchProducts} from '../redux/slices/productsSlice';
// import {addToCart} from '../redux/slices/cartSlice';
// const Home = () => {
//   return <Text>Home</Text>;
// };

// export default Home;

import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {addToCart} from '../src/Slices/cartSlice';
import {fetchProducts} from '../src/Slices/productSlice';
const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items);
  const productsStatus = useSelector(state => state.products.status);
  const productsError = useSelector(state => state.products.error);

  const handleAddToCart = product => {
    console.log('203', product);
    dispatch(addToCart(product));
  };

  React.useEffect(() => {
    if (productsStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, productsStatus]);

  if (productsStatus === 'loading') {
    return (
      <ActivityIndicator size="large" color="#00ff00" style={styles.loader} />
    );
  }

  if (productsStatus === 'failed') {
    return <Text>{productsError}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Carts', {product: item})}
            style={styles.itemContainer}>
            <Image
              source={{uri: item.image}}
              style={{height: 200, width: '100%'}}
              resizeMode="cover"
            />
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            <TouchableOpacity
              onPress={() => handleAddToCart(item)}
              style={styles.addToCartButton}>
              <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    marginTop: 250,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 5,
  },
  addToCartButton: {
    backgroundColor: 'orange',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addToCartButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Home;
