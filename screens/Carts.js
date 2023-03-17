import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
// import {removeFromCart, clearCart} from '../redux/slices/cartSlice';
import {removeFromCart} from '../src/Slices/cartSlice';
import {clearCart} from '../src/Slices/cartSlice';
import {addToCart} from '../src/Slices/cartSlice';

const Carts = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const handleRemoveFromCart = item => {
    dispatch(removeFromCart(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  console.log(cartItems);
  return (
    <View style={styles.container}>
      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          renderItem={({item}) => (
            <View style={styles.itemContainer}>
              <Image
                source={{uri: item.image}}
                style={{height: 200, width: '100%'}}
                resizeMode="cover"
              />
              <Text style={styles.itemTitle}>{item.title}</Text>
              {/* <Text>{item.image}</Text> */}
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
              <View style={styles.itemQuantityContainer}>
                <TouchableOpacity
                  onPress={() => handleRemoveFromCart(item)}
                  style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.itemQuantity}>{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => dispatch(addToCart(item))}
                  style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
          ListFooterComponent={
            <>
              <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total:</Text>
                <Text style={styles.totalPrice}>${cartTotal.toFixed(2)}</Text>
              </View>
              <TouchableOpacity
                onPress={handleClearCart}
                style={styles.clearButton}>
                <Text style={styles.clearButtonText}>Clear Cart</Text>
              </TouchableOpacity>
            </>
          }
        />
      ) : (
        <Text
          style={{
            color: 'black',
            display: 'flex',
            justifyContent: 'center',
            marginLeft: 80,
            marginTop: 250,
            fontSize: 20,
          }}>
          Your cart is empty
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  clearButtonText: {
    color: 'black',
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
  itemQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemQuantity: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  quantityButton: {
    backgroundColor: 'orange',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  quantityButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
});
export default Carts;
