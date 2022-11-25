import AsyncStorage from '@react-native-async-storage/async-storage';
export class RegisterObj {
  static USER = 'user';

  static setUser(data) {
    return AsyncStorage.setItem(RegisterObj.USER, JSON.stringify(data));
  }
  static async getUser() {
    try {
      const response = await AsyncStorage.getItem(RegisterObj.USER);
      return JSON.parse(response);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  static clearUser() {
    return AsyncStorage.removeItem(RegisterObj.USER);
  }
}
export class userIdStorage {
  static USER = 'user';

  static setUser(data) {
    return AsyncStorage.setItem(userIdStorage.USER, JSON.stringify(data));
  }
  static async getUser() {
    try {
      const response = await AsyncStorage.getItem(userIdStorage.USER);
      return JSON.parse(response);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  static clearUser() {
    return AsyncStorage.removeItem(userIdStorage.USER);
  }
}
