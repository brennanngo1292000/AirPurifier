import AsyncStorage from '@react-native-async-storage/async-storage';
import {log} from '../lib/debug'
// getter
export async function get_bool_entry(entry_name) {
  try {
    let value = await( AsyncStorage.getItem( entry_name ) );
    return value == null || value == "false" ? false : true;
  } catch (e) {
    log(e);
    return false;
  }
}

export async function get_int_entry(entry_name) {
  try {
    let value = await( AsyncStorage.getItem( entry_name ) );
    return value == null ? "0" : value;
  } catch (e) {
    log(e);
    return 0
  }
}

export async function get_str_entry(entry_name) {
  try {
    return await( AsyncStorage.getItem( entry_name ) );
  } catch (e) {
    log(e);
    return false;
  }
}

// setter
export async function set_entry(entry_name, entry_value) {
  try {
    await( AsyncStorage.setItem( entry_name, String(entry_value) ) );
  } catch (e) {
    log(e);
  }
}

// delete
export async function delete_entry(entry_name) {
  try {
    await( AsyncStorage.removeItem( entry_name ) );
  } catch (e) {
    log(e);
  }
}
