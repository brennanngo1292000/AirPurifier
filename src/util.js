import FlashMessage from './component/FlashMessage';
import { getStatusBarHeight } from './component/StatusBar';
/**
 * 
 * @param {String} type 
 * @param {String} title 
 * @param {String} description 
 * @param {Boolean} autoHide 
 * @param {Function} onShow 
 * @param {Function} onHide 
 * @param {Function} onPress 
 */
export function showFlashMessage(type, title, description, autoHide = true, onShow, onHide, onPress) {
    let statusBar = getStatusBarHeight();
    return FlashMessage && FlashMessage.show({
      type,
      position: 'top',
      text1: title,
      text2: description,
      visibilityTime: 4000,
      autoHide,
      topOffset: statusBar,
      bottomOffset: 30,
      onShow,
      onHide,
      onPress
    });
  }